<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FeeInstallments;
use \DB;
use App\FeeDueDate;
use App\FeeType;
use App\FeeClassWise;
use App\StudentInfo;
use App\StudentFee;
use App\HandleReceipt;
use App\FeeReceipt;

class FeeController extends Controller
{   
    public function getReceiptDetails(Request $request,$receipt_id){
        $receiptDetails = HandleReceipt::where('receipt_id',$receipt_id)->get();
        return $this->ReS(["receiptDetails"=>$receiptDetails]);
    }
    public function getReceipts(Request $request){
        $request->validate([
            'student_id'=>'required|integer'
        ]);
        if($request->year_id == ""){
            $year_id = $this->getCurrentYear($request);
        }else{
            $year_id = $request->year_id;
        }
        $school_id = $this->getSchoolId($request);
        $student_id = $request->student_id;
        $fee_receipts = FeeReceipt::where([
            'student_id'=>$student_id,
            'system_year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();
        return $this->ReS(["fee_receipts"=>$fee_receipts]);
    }
    public function payIndividualFees(Request $request){
        $request->validate([
            'send_message'=>'required|boolean',
            'payment_type'=>'required',
            'fee_individual'=>'required|array'
        ]);
        $school_id = $this->getSchoolId($request);
        $student_id = $request->student_id;
        if($request->year_id == ""){
            $year_id = $this->getCurrentYear($request);
        }else{
            $year_id = $request->year_id;
        }
        try{
            DB::beginTransaction();
            $new_fee_receipt = new FeeReceipt;
            $new_fee_receipt->amount_name = Auth()->user()->name;
            $new_fee_receipt->payment_type = $request->payment_type;
            $new_fee_receipt->school_id = $this->getSchoolId($request);
            $new_fee_receipt->student_id = $request->student_id;
            $new_fee_receipt->system_year_id = $year_id;
            $new_fee_receipt->save();

            $fee_individual = $request->fee_individual;
            foreach($fee_individual as $installment){
                foreach($installment as $type){
                    if($type['current_paid'] > 0){
                        
                        $total_pending = $type['total_pending'];
                        $new_total_pending = $type['total_amount'] - $type['current_paid'];
                        $update_student_fees = StudentFee::where([
                            'id'=>$type['id'],
                            'fee_installment_id'=>$type['fee_installment_id'],
                            'fee_type_id'=>$type['fee_type_id'],
                            'amount'=>$type['amount'],
                            'waiver_amount'=>$type['waiver_amount'],
                            'total_amount'=>$type['total_amount']
                        ])->update([
                            'total_pending'=>$new_total_pending,
                            'current_paid'=>0
                        ]);
                        if($update_student_fees){
                            $handleReceipt = new HandleReceipt;
                            $handleReceipt->receipt_id = $new_fee_receipt->id;
                            $handleReceipt->fee_installment = $type['fee_installment_id'];
                            $handleReceipt->fee_type = $type['fee_type_id'];
                            $handleReceipt->amount = $type['amount'];
                            $handleReceipt->waiver_amount = $type['waiver_amount'];
                            $handleReceipt->total_amount = $type['total_amount'];
                            $handleReceipt->total_paid = $type['current_paid'];
                            $handleReceipt->save();
                        }
                    }
                }
            }

        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit();
        $fee_receipts = FeeReceipt::where([
                'school_id'=>$school_id,
                'student_id'=>$student_id,
        ])->get();
        return $this->ReS(["fee_individual"=>$request->fee_individual,'fee_receipt'=>$fee_receipts]);
    }
    public function updateIndividualFees(Request $request){
        $request->validate([
            'fee_individual'=>'required|array',
            'send_message'=>'required'
        ]);
        $fee_individual = $request->fee_individual;
        try{
            DB::beginTransaction();
            foreach($fee_individual as $installment){
                foreach($installment as $type){
                    $update = StudentFee::where([
                        'id'=>$type['id'],
                        'fee_installment_id'=>$type['fee_installment_id'],
                        'fee_type_id'=>$type['fee_type_id']
                    ])->update([
                        'amount'=>$type['amount'],
                        'waiver_amount'=>$type['waiver_amount'],
                        'total_amount'=>$type['total_amount'],
                        'indivitual_set'=>1
                    ]);
                }
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit();
        return $this->ReS(["fee_individual"=>$request->fee_individual]);
    }
    public function getIndividualFees(Request $request,$only_read){
        $request->validate([
            'student_id'=>'required|integer'
        ]);
        if($request->year_id == ""){
            $year_id = $this->getCurrentYear($request);
        }else{
            $year_id = $request->year_id;
        }
        $student_id = $request->student_id;
        $school_id = $this->getSchoolId($request);
        $send_array = array();
        foreach($this->getInstallment($school_id) as $installment){
            $fees_per_installments = StudentFee::select('id','fee_installment_id','fee_type_id','amount','waiver_amount','total_amount','total_pending','current_paid')->where([
                'student_info_id'=>$student_id,
                'system_year_id'=>$year_id,
                'fee_installment_id'=>$installment['id']
                ])->get();
            if($only_read == 0 && count($fees_per_installments) == 0){
                return $this->ReE(["message"=>"Fees of Student is Not Set."],422);
            }
            $send_array[$installment['installment']] = $fees_per_installments;
        }
        return $this->ReS(["fee_individual"=>$send_array]);
    }
    private function handleFees($student_id,$class_id,$school_id,$fee_type_id,$fee_installment_id,$system_year_id,$amount,$exist_update=true){     
        $count = StudentFee::where([
            'school_info_id'=>$school_id,
            'student_info_id'=>$student_id,
            'classes_id'=>$class_id,
            'fee_installment_id'=>$fee_installment_id,
            'fee_type_id'=>$fee_type_id,
            'system_year_id'=>$system_year_id
        ])->count();
        
        if($count == 0){
            $new_fees = new StudentFee;
            $new_fees->school_info_id = $school_id;
            $new_fees->student_info_id = $student_id;
            $new_fees->classes_id = $class_id;
            $new_fees->fee_installment_id = $fee_installment_id;
            $new_fees->fee_type_id = $fee_type_id;
            $new_fees->system_year_id = $system_year_id;
            $new_fees->amount = $amount;
            $new_fees->save();
        }else{
            if($exist_update){
                StudentFee::where([
                    'school_info_id'=>$school_id,
                    'student_info_id'=>$student_id,
                    'classes_id'=>$class_id,
                    'fee_installment_id'=>$fee_installment_id,
                    'fee_type_id'=>$fee_type_id,
                    'system_year_id'=>$system_year_id,
                    'indivitual_set'=>1
                ])->update(['amount'=>$amount]);
            }else{
                StudentFee::where([
                    'school_info_id'=>$school_id,
                    'student_info_id'=>$student_id,
                    'classes_id'=>$class_id,
                    'fee_installment_id'=>$fee_installment_id,
                    'fee_type_id'=>$fee_type_id,
                    'system_year_id'=>$system_year_id,
                    'indivitual_set'=>0
                ])->update(['amount'=>$amount]);
            }
        }
    }
    public function updateClassWiseFees(Request $request){
        $request->validate([
            'overwrite'=>'required|boolean',
            'send_message'=>'required|boolean',
            'fee_class_wise'=>'required|array'
        ]);      
        $school_id = $this->getSchoolId($request);
        $class_id = $request->class_id;
        $fee_class_wise = $request->fee_class_wise;

        if($request->year_id == ""){
            $year_id = $this->getCurrentYear($request);
        }else{
            $year_id = $request->year_id;
        }

        try{
            DB::beginTransaction();
            $students = StudentInfo::select('id')->where('school_info_id',$school_id)->where('class_id',$class_id)->get();
            foreach($fee_class_wise as $key => $fee_types){
                foreach($fee_types as $type){
                    $update = FeeClassWise::select('amount')->where([
                        'school_info_id'=>$school_id,
                        'classes_id'=>$class_id,
                        'system_year_id'=>$year_id,
                        'fee_type_id'=>$type['fee_type_id'],
                        'fee_installment_id'=>$type['fee_installment_id']
                    ])->update(['amount'=>$type['amount']]);
                }
            }
            foreach($students as $student){
                foreach($fee_class_wise as $key => $fee_types){
                    foreach($fee_types as $type){
                        $this->handleFees($student['id'],$class_id,$school_id,$type['fee_type_id'],$type['fee_installment_id'],$year_id,$type['amount'],$request->overwrite);
                    }
                }
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit();
        return $this->ReS(["message"=>"Fee Class Wise Updated!!","fee_class_wise"=>$fee_class_wise]);
    }
    public function getClassWiseFees(Request $request){
        $year_id = $request->year_id;
        $class_id = $request->class_id;
        if($year_id == ""){
            $year_id = $this->getCurrentYear($request);
        }
        $school_id = $this->getSchoolId($request);
        $fee_installments = Auth()->user()->school()->with('installments')->first()['installments'];
        
        $checkifExist = FeeClassWise::where([
            'school_info_id'=>$school_id,
            'classes_id'=>$class_id,
        ])->count();
        if($checkifExist == 0){
            DB::beginTransaction();
            try{
                foreach($fee_installments as $installment){
                    foreach($this->getAllFeeType() as $fee_type){
                        $new_feeclasswise = new FeeClassWise;
                        $new_feeclasswise->school_info_id = $school_id;
                        $new_feeclasswise->classes_id = $class_id;
                        $new_feeclasswise->fee_installment_id = $installment['id'];
                        $new_feeclasswise->fee_type_id = $fee_type['id'];
                        $new_feeclasswise->system_year_id = $year_id;
                        $new_feeclasswise->save();
                    }
                }
                DB::commit();     
            }catch(\Exception $e){
                DB::rollback();
                return $this->ReE(["message"=>$e->getMessage(),400]);
            }
        }
        
        $send_array = [];
        foreach($fee_installments as $installment){
            $installment_name = $installment['installment'];
            $getInstallmentFeeType = FeeClassWise::with('feeType')->select('fee_installment_id','fee_type_id','amount')->where([
                'school_info_id'=>$school_id,
                'classes_id'=>$class_id,
                'fee_installment_id'=>$installment['id']
            ])->get();
            $send_array[$installment_name] = $getInstallmentFeeType;
        }
        return $this->ReS(["fee_class_wise"=>$send_array]);
    }
    public function deleteFeeType(Request $request,$fee_type_id){
        try{
            FeeType::find($fee_type_id)->delete();
        }catch(\Exception $e){
            return $this->ReE(["message"=>$e->getMessage(),400]);
        }finally{
            return $this->ReS(["fee_types"=>$this->getAllFeeType()]);
        }
    }
    public function getFeeType(Request $request){
        return $this->ReS(["fee_types"=>$this->getAllFeeType()]);
    }
    private function getAllFeeType(){
        $school = Auth()->user()->school()->with('fee_type')->first();
        return $school['fee_type'];
    }
    public function addFeeType(Request $request){
        $request->validate([
            "fee_type"=>"required|string"
        ]);

        $checkIfExist = FeeType::where("fee_type",$request->fee_type)->count();
        if($checkIfExist == 0){
            $new_fee_type = new FeeType;
            $new_fee_type->school_info_id = $this->getSchoolId($request);
            $new_fee_type->fee_type = $request->fee_type;
            $new_fee_type->save();
            return $this->ReS(["fee_types"=>$this->getAllFeeType()]);
        }else{
            return $this->ReE(["message"=>"Fee Type Already Exists. Try another"],422);
        }
    }
    public function updateDueDate(Request $request){
        $id = $request->data['id'];
        $last_due_date = $request->data['last_due_date'];
        $db_status = FeeDueDate::find($id)->update(["last_due_date"=>$last_due_date]);
        if($db_status)
            return $this->ReS(["due_date"=>["last_due_date"=>$last_due_date,"id"=>$id]]);
        else
            return $this->ReE(["message"=>"Error Ocurred"],400);
    }
    public function getDueDate(Request $request){
        $request->validate([
            "installment"=>"required|string",
            "select_year"=>"required|integer"
        ]);
        $school_id = $this->getSchoolId($request);
        $installment_id  = FeeInstallments::select('id')->where('installment',$request->installment)->first()->id;
        $selectFeeDueDate = FeeDueDate::select('last_due_date','id')->where(
                    ['school_info_id'=>$school_id,
                    'system_year_id'=>$request->select_year,
                    'fee_installment_id'=>$installment_id
                    ])->first();
        if(!$selectFeeDueDate){
            $new_due_date = new FeeDueDate;
            $new_due_date->school_info_id = $school_id;
            $new_due_date->system_year_id = $request->select_year;
            $new_due_date->fee_installment_id = $installment_id;
            $new_due_date->last_due_date = null;
            $new_due_date->save();
            return $this->ReS(["due_date"=>["last_due_date"=>$new_due_date->last_due_date,"id"=>$new_due_date->id]]);
        }else{
            return $this->ReS(["due_date"=>["last_due_date"=>$selectFeeDueDate->last_due_date,"id"=>$selectFeeDueDate->id]]);
        }
    }
    public function updateFeeInstallments(Request $request){
        $school_id = $this->getSchoolId($request);
        DB::beginTransaction();
        try{
            $delete = FeeInstallments::where("school_info_id",$school_id)->delete();
            foreach($request->total_installments as $installment){
                $new_installments = new FeeInstallments;
                $new_installments->school_info_id = $school_id;
                $new_installments->installment = $installment;
                $new_installments->save();
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()]);
        }finally{
            DB::commit();
            $fee_installments = $this->feeInstallments($school_id);
            return $this->ReS(["installments"=>$fee_installments]);
        }
    }

    public function getFeeInstallments(Request $request){
        $school_id = $this->getSchoolId($request);
        $fee_installments = $this->feeInstallments($school_id);
        return $this->ReS(["installments"=>$fee_installments]);
    }

    private function feeInstallments($school_id){
        return Auth()->user()->school()->with('installments')->first()['installments']->pluck('installment');
    }
}
