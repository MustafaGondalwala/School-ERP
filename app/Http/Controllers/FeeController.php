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
    public function getPendingFeesClassWise(Request $request){
        $request->validate([
            'class_id'=>'required|integer',
            'installment'=>'required|integer'
        ]);
        $class_id = $request->class_id;
        $installment_id = $request->installment;
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);

        $studentInfo = StudentInfo::with('fees')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id,
        ])->get();
        
        return $this->ReS(["installment"=>$studentInfo]);
    }
    public function deleteClassWiseFeeType(Request $request,$class_id,$row_id){
        
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        FeeType::find($row_id)->delete();
        $data = FeeType::select('id','fee_type')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
        ])->get();
        return $this->ReS(["fee_type"=>$data,"message"=>"Fee Type Delete!!"]);
    }
    public function updateClassWiseFeeType(Request $request,$class_id){
        $request->validate([
            'fee_type'=>'required|string|max:100',
            'id'=>'required|integer'
        ]);
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        FeeType::find($request->id)->update([
            'fee_type'=>$request->fee_type
        ]);
        $data = FeeType::select('id','fee_type')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id
        ])->get();
        return $this->ReS(["fee_type"=>$data,"message"=>"Fee Type Updated!!"]);
    }
    public function addClassWiseFeeType(Request $request,$class_id){
        $request->validate([
            'fee_type'=>'required|string|max:100'
        ]);
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $checkIfExist = FeeType::where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id,
            'fee_type'=>$request->fee_type
        ])->count();
        if($checkIfExist != 0){
            return $this->ReE(["message"=>"Fee Type Already Exist"],422);
        }
        $new_fee_type = new FeeType;
        $new_fee_type->year_id = $year_id;
        $new_fee_type->school_id = $school_id;
        $new_fee_type->class_id = $class_id;
        $new_fee_type->fee_type = $request->fee_type;
        $new_fee_type->save();
        $data = FeeType::select('id','fee_type')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id
        ])->get();
        return $this->ReS(["fee_type"=>$data]);
    }
    public function getClassWiseFeeType(Request $request,$class_id){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $data = FeeType::select('id','fee_type')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id
        ])->get();
        return $this->ReS(["fee_type"=>$data]);
    }
    public function getReceiptDetails(Request $request,$receipt_id){
        $receiptDetails = HandleReceipt::where('receipt_id',$receipt_id)->get();
        return $this->ReS(["receiptDetails"=>$receiptDetails]);
    }
    public function getReceipts(Request $request){
        $request->validate([
            'student_id'=>'required|integer'
        ]);
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $student_id = $request->student_id;
        $fee_receipts = FeeReceipt::where([
            'student_id'=>$student_id,
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();
        if(count($fee_receipts) == 0){
            return $this->ReE(["message"=>"No Fee Receipt Found"],400);
        }
        return $this->ReS(["fee_receipts"=>$fee_receipts]);
    }
    public function payIndividualFees(Request $request){
        $request->validate([
            'payment_type'=>'required',
            'fee_individual'=>'required|array'
        ]);
        $school_id = $this->getSchoolId($request);
        $student_id = $request->student_id;
        $class_id = StudentInfo::find($student_id)->class_id;
        $year_id = $this->getSchoolYearId($request);
        try{
            DB::beginTransaction();
            $new_fee_receipt = new FeeReceipt;
            $new_fee_receipt->amount_name = Auth()->user()->name;
            $new_fee_receipt->payment_type = $request->payment_type;
            $new_fee_receipt->school_id = $this->getSchoolId($request);
            $new_fee_receipt->student_id = $request->student_id;
            $new_fee_receipt->year_id = $year_id;
            $new_fee_receipt->save();

            $fee_individual = $request->fee_individual;
            foreach($fee_individual as $installment){
                foreach($installment as $type){
                    if($type['temp_paid'] > 0){
                        $total_pending = $type['total_pending'];
                        $new_total_pending = $total_pending - $type['temp_paid'];
                        $new_current_paid = $type['current_paid'] + $type['temp_paid'];
                        
                        $update_student_fees = StudentFee::find($type['id'])->update([
                            'total_pending'=>$new_total_pending,
                            'current_paid'=>$new_current_paid,
                            'temp_paid'=>0
                        ]);
                        if($update_student_fees){
                            $handleReceipt = new HandleReceipt;
                            $handleReceipt->receipt_id = $new_fee_receipt->id;
                            $handleReceipt->fee_installment = $type['fee_installment_id'];
                            $handleReceipt->fee_type = $type['fee_type_id'];
                            $handleReceipt->amount = $type['amount'];
                            $handleReceipt->waiver_amount = $type['waiver_amount'];
                            $handleReceipt->total_amount = $type['total_amount'];
                            $handleReceipt->total_pending = $type['total_pending'];
                            $handleReceipt->total_paid = $type['current_paid'];
                            $handleReceipt->current_paid = $type['temp_paid'];
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
        $fee_installments = FeeInstallments::select('id','installment')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();
        $send_array = [];
        foreach($fee_installments as $installment){
            $getInstallmentFeeType = StudentFee::with('feeType','feeInstallment')->where([
                'fee_installment_id'=>$installment['id'],
                'classes_id'=>$class_id,
                'student_id'=>$student_id,
                'school_id'=>$school_id,
                'year_id'=>$year_id,
                'student_id'=>$student_id
            ])->get();
            $send_array[$installment['installment']] = $getInstallmentFeeType;
        }
        return $this->ReS(["fee_individual"=>$send_array]);
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
                    $check = $update = StudentFee::where([
                        'id'=>$type['id'],
                        'fee_installment_id'=>$type['fee_installment_id'],
                        'fee_type_id'=>$type['fee_type_id']
                    ])->update([
                        'amount'=>$type['amount'],
                        'waiver_amount'=>$type['waiver_amount'],
                        'total_amount'=>$type['total_amount'],
                        'total_pending'=>$type['total_pending'],
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
    public function getIndividualFees(Request $request){
        $request->validate([
            'student_id'=>'required|integer'
        ]);
        $student_id = $request->student_id;
        $class_id = StudentInfo::find($student_id)->class_id;
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $send_array = array();
        $fee_installments = FeeInstallments::select('id','installment')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();
        $fee_types = $this->getAllFeeType($class_id,$school_id,$year_id)->pluck('id');
        try{
            DB::beginTransaction();
            foreach($fee_installments as $installment){
                foreach($fee_types as $type){
                    $checkIfExist = StudentFee::where([
                        'fee_installment_id'=>$installment['id'],
                        'fee_type_id'=>$type,
                        'classes_id'=>$class_id,
                        'student_id'=>$student_id,
                        'school_id'=>$school_id,
                        'year_id'=>$year_id,
                        'student_id'=>$student_id
                    ])->count();
                    if($checkIfExist == 0){
                        $new_student_fee = new StudentFee;
                        $new_fees = new StudentFee;
                        $new_fees->school_id = $school_id;
                        $new_fees->student_id = $student_id;
                        $new_fees->classes_id = $class_id;
                        $new_fees->fee_installment_id = $installment['id'];
                        $new_fees->fee_type_id = $type;
                        $new_fees->year_id = $year_id;
                        $new_fees->save();
                    }
                }
            }
            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        $send_array = [];
        foreach($fee_installments as $installment){
            $getInstallmentFeeType = StudentFee::with('feeType','feeInstallment')->where([
                'fee_installment_id'=>$installment['id'],
                'classes_id'=>$class_id,
                'student_id'=>$student_id,
                'school_id'=>$school_id,
                'year_id'=>$year_id,
                'student_id'=>$student_id
            ])->get();
            $send_array[$installment['installment']] = $getInstallmentFeeType;
        }
        return $this->ReS(["fee_individual"=>$send_array]); 
    }
    private function handleFees($student_id,$class_id,$school_id,$fee_type_id,$fee_installment_id,$system_year_id,$amount,$exist_update=true){     
        $count = StudentFee::where([
            'school_id'=>$school_id,
            'student_id'=>$student_id,
            'classes_id'=>$class_id,
            'fee_installment_id'=>$fee_installment_id,
            'fee_type_id'=>$fee_type_id,
            'year_id'=>$system_year_id
        ])->count();
        
        if($count == 0){
            $new_fees = new StudentFee;
            $new_fees->school_id = $school_id;
            $new_fees->student_id = $student_id;
            $new_fees->classes_id = $class_id;
            $new_fees->fee_installment_id = $fee_installment_id;
            $new_fees->fee_type_id = $fee_type_id;
            $new_fees->year_id = $system_year_id;
            $new_fees->amount = $amount;
            $new_fees->total_pending = $amount;
            $new_fees->total_amount = $amount;
            $new_fees->save();
        }else{
            if($exist_update){
                StudentFee::where([
                    'school_id'=>$school_id,
                    'student_id'=>$student_id,
                    'classes_id'=>$class_id,
                    'fee_installment_id'=>$fee_installment_id,
                    'fee_type_id'=>$fee_type_id,
                    'year_id'=>$system_year_id,
                ])->update([
                    'amount'=>$amount,
                    'indivitual_set'=>1,
                    'total_pending'=>$amount,
                    'total_amount'=>$amount
                ]);
            }else{
                StudentFee::where([
                    'school_id'=>$school_id,
                    'student_id'=>$student_id,
                    'classes_id'=>$class_id,
                    'fee_installment_id'=>$fee_installment_id,
                    'fee_type_id'=>$fee_type_id,
                    'year_id'=>$system_year_id,
                ])->update([
                    'amount'=>$amount,
                    'indivitual_set'=>0,
                    'total_pending'=>$amount,
                    'total_amount'=>$amount
                ]);
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
        $year_id = $this->getSchoolYearId($request);

        $all_students = StudentInfo::select('id')->where('school_id',$school_id)->where('class_id',$class_id)->pluck('id');
        try{
            DB::beginTransaction();
                    foreach($fee_class_wise as $installment_type => $fee_types){
                        foreach($fee_types as $type){
                            $update = FeeClassWise::select('amount')->where([
                                        'school_id'=>$school_id,
                                        'classes_id'=>$class_id,
                                        'year_id'=>$year_id,
                                        'fee_type_id'=>$type['fee_type_id'],
                                        'fee_installment_id'=>$type['fee_installment_id']
                                    ])->update(['amount'=>$type['amount']]);
                        }
                    }
                    foreach($all_students as $student){
                        foreach($fee_class_wise as $installment_type => $fee_types){
                            foreach($fee_types as $type){
                                $fee_installment_id = $type['fee_installment_id'];
                                $fee_type_id = $type['fee_type_id'];
                                $amount = $type['amount'];
                                    $count = StudentFee::where([
                                        'school_id'=>$school_id,
                                        'student_id'=>$student,
                                        'classes_id'=>$class_id,
                                        'fee_installment_id'=>$fee_installment_id,
                                        'fee_type_id'=>$fee_type_id,
                                        'year_id'=>$year_id
                                    ])->count();
                                    if($count == 0){
                                        $new_fees = new StudentFee;
                                        $new_fees->school_id = $school_id;
                                        $new_fees->student_id = $student;
                                        $new_fees->classes_id = $class_id;
                                        $new_fees->fee_installment_id = $fee_installment_id;
                                        $new_fees->fee_type_id = $fee_type_id;
                                        $new_fees->year_id = $year_id;
                                        $new_fees->amount = $amount;
                                        $new_fees->total_pending = $amount;
                                        $new_fees->total_amount = $amount;
                                        $new_fees->save();
                                    }else{
                                        if($request->overwrite == true){
                                            StudentFee::where([
                                                'school_id'=>$school_id,
                                                'student_id'=>$student,
                                                'classes_id'=>$class_id,
                                                'fee_installment_id'=>$fee_installment_id,
                                                'fee_type_id'=>$fee_type_id,
                                                'year_id'=>$year_id,
                                            ])->update([
                                                'amount'=>$amount,
                                                'indivitual_set'=>1,
                                                'total_pending'=>$amount,
                                                'total_amount'=>$amount
                                            ]);
                                        }else{
                                            StudentFee::where([
                                                'school_id'=>$school_id,
                                                'student_id'=>$student,
                                                'classes_id'=>$class_id,
                                                'fee_installment_id'=>$fee_installment_id,
                                                'fee_type_id'=>$fee_type_id,
                                                'year_id'=>$year_id,
                                            ])->update([
                                                'amount'=>$amount,
                                                'indivitual_set'=>0,
                                                'total_pending'=>$amount,
                                                'total_amount'=>$amount
                                            ]);
                                        }
                                    }
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
        $class_id = $request->class_id;
        $year_id = $this->getSchoolId($request);
        $school_id = $this->getSchoolId($request);
        $fee_installments = FeeInstallments::where([
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();
        
        $checkifExist = FeeClassWise::where([
            'school_id'=>$school_id,
            'classes_id'=>$class_id,
        ])->count();
        if($checkifExist == 0){
            DB::beginTransaction();
            try{
                foreach($fee_installments as $installment){
                    foreach($this->getAllFeeType($class_id,$school_id,$year_id) as $fee_type){
                        $new_feeclasswise = new FeeClassWise;
                        $new_feeclasswise->school_id = $school_id;
                        $new_feeclasswise->classes_id = $class_id;
                        $new_feeclasswise->fee_installment_id = $installment['id'];
                        $new_feeclasswise->fee_type_id = $fee_type['id'];
                        $new_feeclasswise->year_id = $year_id;
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
            $getInstallmentFeeType = FeeClassWise::with('feeType','feeInstallment')->where([
                'school_id'=>$school_id,
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
    private function getAllFeeType($class_id,$school_id,$year_id){
        $fee_type = FeeType::where(['class_id'=>$class_id,'school_id'=>$school_id,'year_id'=>$year_id])->get();
        return $fee_type;
    }
    public function addFeeType(Request $request){
        $request->validate([
            "fee_type"=>"required|string"
        ]);

        $checkIfExist = FeeType::where("fee_type",$request->fee_type)->count();
        if($checkIfExist == 0){
            $new_fee_type = new FeeType;
            $new_fee_type->school_id = $this->getSchoolId($request);
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
            "installment"=>"required|integer",
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $installment_id  = FeeInstallments::find($request->installment)->id;
        $selectFeeDueDate = FeeDueDate::select('last_due_date','id')->where(
                    ['school_id'=>$school_id,
                    'year_id'=>$year_id,
                    'fee_installment_id'=>$installment_id
                    ])->first();
        if(!$selectFeeDueDate){
            $new_due_date = new FeeDueDate;
            $new_due_date->school_id = $school_id;
            $new_due_date->year_id = $year_id;
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
            $delete = FeeInstallments::where("school_id",$school_id)->delete();
            foreach($request->total_installments as $installment){
                $new_installments = new FeeInstallments;
                $new_installments->school_id = $school_id;
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
        return FeeInstallments::where([
            'school_id'=>$school_id
        ])->get();
    }
}
