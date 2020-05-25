<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FeesInstallment;
use App\FeesDueDate;
use App\Classes;
use App\HandleFees;
use App\FeesType;
use App\StudentInfo;
use App\FeesClassWise;
use App\FeeReceipt;
use App\StaffInfo;
use App\User;
use App\ClerkPermission;
use DB;
use \Str;
class FeesController extends Controller
{ 
    public function getClerkInfo($clerk_id){
      $clerk_info = StaffInfo::where('designation','clerk')->find($clerk_id);
      $clerk_info["permission"] = ClerkPermission::where('staff_id',$clerk_id)->first();
      return response()->json(["success"=>["clerk_info"=>$clerk_info]]);
    }
    public function getManageLoginUser(){
      $staff_info = StaffInfo::select('id','name','empid','email','contact_no')->where('designation','clerk')->get();
      $i = 1;
      foreach ($staff_info as $key => $value) {
        $value["sr_no"] = $i++;
        $value["permission"] = ClerkPermission::where("staff_id",$value['id'])->get();
      }
      return response()->json(["success"=>["staff_info"=>$staff_info]]);
    }
    private function fileUpload($image){
      if($image == NULL)
        return NULL;
      $image_name = Str::random(25);
      $folder = '/uploads/images';
      $filepath = $image->storeAs($folder, $image_name . '.' . $image->getClientOriginalExtension() , 'public');
      return $filepath;
    }
    public function addManageLoginUser(Request $request){
      if($request->id){}
      else
        $request->validate([
          'empid'=>"required|string|unique:staff_infos|unique:users",
          'clerk_name'=>"required|string",
          "gender"=>"required|string",
          "relative_name"=>"required|string",
          "email"=>"required|string|unique:staff_infos|unique:users",
          "contact_no"=>"required|string|unique:staff_infos",
          "address"=>"required|string",
          "dob"=>"required|string",
          "salary"=>"required|string",
      ]);
      
      DB::beginTransaction();
      try{
        if($request->id)
          $new_staff = StaffInfo::find($request->id);
        else
          $new_staff = new StaffInfo;
        $new_staff->empid = $request->empid;
        $new_staff->name = $request->clerk_name;
        $new_staff->gender = $request->gender;
        $new_staff->relative_name = $request->relative_name;
        $new_staff->email = $request->email;
        $new_staff->contact_no = $request->contact_no;
        $new_staff->address = $request->address;
        $new_staff->dob = $request->dob;
        $new_staff->salary = $request->salary;
        $new_staff->blood_group = $request->blood_group;
        $new_staff->pan_card_no = $request->pan_card_no;
        $new_staff->aadhar_no = $request->aadhar_no;
        $new_staff->bank_name = $request->bank_name;
        $new_staff->bank_account_no = $request->bank_account_no;
        $new_staff->bank_ifc_no = $request->bank_ifc_no;
        $new_staff->pf_no = $request->pf_no;
        $new_staff->pf_amount = $request->pf_amount;
        $new_staff->da_amount = $request->da_amount;
        $new_staff->hra_amount = $request->hra_amount;
        $new_staff->remark = $request->remark;
        $new_staff->casual_leave = $request->casual_leave;
        $new_staff->sick_leave = $request->sick_leave;
        $new_staff->pay_earn_leave = $request->pay_earn_leave;
        $new_staff->other_leave = $request->other_leave;
        $new_staff->designation = "clerk";

        $new_staff->staff_photo_img_path = $this->fileUpload($request->clerk_photo);
        $new_staff->id_proof_img_path = $this->fileUpload($request->id_proof);
        $new_staff->experience_letter_photo_img_path = $this->fileUpload($request->experience_letter);
        $new_staff->other_document1_photo_img_path = $this->fileUpload($request->other_document1);
        $new_staff->other_document2_photo_img_path = $this->fileUpload($request->other_document2);
        $new_staff->salary  = $request->salary;
        if($request->id)
          $new_staff->update();
        else
          $new_staff->save();

        if($request->id)
          $new_user = User::where('empid',$new_staff->empid)->first();
        else
          $new_user = new User;
        $new_user->name = $request->clerk_name;
        $new_user->email = $request->email;
        $new_user->mobile_no = $request->contact_no;
        $new_user->empid = $request->empid;
        $new_user->password = bcrypt($request->empid);
        $new_user->user_type = "clerk";
        $new_user->login_text = $request->empid;
        $new_user->profile_pic = $new_staff->clerk_photo;
        if($request->id)
          $new_user->update();
        else
          $new_user->save();
        if($request->id){
          $new_clerk_permission = ClerkPermission::where('staff_id',$new_staff->id)->first();
        }else
          $new_clerk_permission = new ClerkPermission;
        $new_clerk_permission->set_fee_installments = (int)(bool)$request->set_fee_installments;
        $new_clerk_permission->set_fee_due_date = (int)(bool)$request->set_fee_due_date;
        $new_clerk_permission->set_fee = (int)(bool)$request->set_fee;
        $new_clerk_permission->set_fee_class_wise = (int)(bool)$request->set_fee_class_wise;
        $new_clerk_permission->pay_fees = (int)(bool)$request->pay_fees;
        $new_clerk_permission->staff_id = $new_staff->id;
        $new_clerk_permission->user_login_id = $new_user->id;
        if($request->id)
          $new_clerk_permission->update();
        else
          $new_clerk_permission->save();
        DB::commit();
        return response()->json(["success"=>["message"=>"New Clerk Added","clerk_permission"=>$new_clerk_permission,"user"=>$new_user,"staff"=>$new_staff]]);
      }catch (\Exception $e) {
          DB::rollback();
          return response()->json(["error"=>["message"=>$e->getMessage()]],400);
      }
    }
    public function updateFeesInstallment(Request $request){
      $request->validate([
        'installments'=>'required|array'
      ]);
      if(FeesInstallment::count() == 0){
        $first_time = new FeesInstallment;
        $first_time->total_installments = implode(",",$request->installments);
        $first_time->save();
      }else
        FeesInstallment::first()->update(["total_installments"=>implode(",",$request->installments)]);
        return response()->json(["success"=>["message"=>"Data Updated"]]);
    }
    public function getAllInstallment(Request $request){
      $total_installment =  FeesInstallment::first();
      $array_of_total_installment = explode(",",$total_installment->total_installments);
      foreach ($array_of_total_installment as $key => $value) {
        $available = FeesDueDate::where(['installments'=>$value,'year'=>$request->select_year])->count();
        if($available == 0){
          $new_fees_due = new FeesDueDate;
          $new_fees_due->installments = $value;
          $new_fees_due->year = $request->select_year;
          $new_fees_due->save();
        }
      }

      $total_fees_due = FeesDueDate::where(["year"=>$request->select_year])->get();
      return response()->json(["success"=>["total_installment"=>$total_fees_due]]);
    }
    public function updateDueDate(Request $request){
      $request->validate([
        'select_year'=>'required',
        'data'=>'array'
      ]);
      foreach ($request->data as $key => $value) {
          $check_exists = FeesDueDate::where("installments",$value["installments"])->where('year',$request->select_year)->count();
          if($check_exists == 0){
            $new_fees_due = new FeesDueDate;
            $new_fees_due->installments = $value["installments"];
            $new_fees_due->year = $request->select_year;
            if($value["input_data"] == "")
              $new_fees_due->due_date = null;
            $new_fees_due->due_date = $value["input_data"];
            $new_fees_due->save();
          }else{
            $update_due_date = FeesDueDate::where("installments",$value["installments"])->where('year',$request->select_year)->update(["due_date"=>$value["input_data"]]);
          }
      }

      return response()->json(["success"=>"true"]);
    }
    public function getOnlyTotalInstallment(){
      if(FeesInstallment::count()){
          $total_installment =  FeesInstallment::first();
          $array_of_total_installment = explode(",",$total_installment->total_installments);
          return response()->json(["success"=>["total_installment"=>$array_of_total_installment]]);
      }else{
          return response()->json(["success"=>["total_installment"=>[]]]);
      }
    }
    public function AddFeesType(Request $request){
        $request->validate([
          'fees_type'=>'required|min:3|unique:fees_types'
        ]);
        $new_fees_type = new FeesType;
        $new_fees_type->fees_type = $request->fees_type;
        $new_fees_type->save();
        $all_fees_type = FeesType::all();
        return response()->json(["success"=>["fees_type"=>$all_fees_type]]);

    }

    public function getAllFeesType(){
      $all_fees_type = FeesType::all();
      return response()->json(["success"=>["fees_type"=>$all_fees_type]]);
    }
    public function updateFeesIndividual(Request $request){
      $request->validate([
        'total_fees_type'=>'required',
        'total_installment'=>'required|array',
        'select_year'=>'required|string'
      ]);

      foreach ($request->total_fees_type as $each_installment_name => $each_installment) {

        foreach ($each_installment as $key => $value) {
          $from_db = HandleFees::where(["fees_type"=>$value["fees_type"],"year"=>$request->select_year,"installment"=>$each_installment_name,"student_id"=>$request->student_id])->first();

          if($value["amount"] == null)
              $value["amount"] = 0;
          $from_db->amount = $value["amount"];
          if($value["discount_amount"] == null)
              $value["discount_amount"] = 0;
          $from_db->discount_amount = $value["discount_amount"];

          if($value["after_discount"] == null)
              $value["after_discount"] = 0;
          $from_db->after_discount = $value["after_discount"];
           
          if($value["total_pending"] == null)
              $value["total_pending"] = 0;
          $from_db->total_pending = $value["total_pending"];

          $from_db->update(); 
        }
      }

      foreach ($request->total_installment as $key => $installment) {
        $get_fees = HandleFees::select(['id','fees_type','year','amount','discount_amount','after_discount','total_pending','current_paid'])->where(['student_id'=>$request->student_id,'year'=>$request->select_year,'installment'=>$installment])->get();
        $total_installments[$installment] = $get_fees;
      }
      return response()->json(["success"=>["total_installments"=>$total_installments,"message"=>"Fees Successfully Updated"]]);

    }


    public function getIndividualStudentFees(Request $request){
      $request->validate([
        'student_id'=>'required|integer',
        'select_year'=>'required|string',
      ]);
      $all_fees_type = FeesType::all();
      if(!$request->installment)
      {
        $total_installment =  FeesInstallment::first();
        $request->installments = explode(",",$total_installment->total_installments);
      }
      foreach ($all_fees_type as $key => $value) {
          $fees_type = $value->fees_type;
        foreach ($request->installments as $key => $installment) {  
            $check_avaible = HandleFees::where(['student_id'=>$request->student_id,'year'=>$request->select_year,'installment'=>$installment,'fees_type'=>$fees_type])->count();
            if($check_avaible <= 0){
              $new_handle_fees = new HandleFees;
              $new_handle_fees->year = $request->select_year;
              $new_handle_fees->installment = $installment;
              $new_handle_fees->fees_type = $fees_type;
              $new_handle_fees->student_id = $request->student_id;
              $new_handle_fees->save();            
            }
        }
      }


      $total_installments = [];
      foreach ($request->installments as $key => $installment) {
        $get_fees = HandleFees::select(['id','fees_type','year','amount','discount_amount','after_discount','total_pending','current_paid'])->where(['student_id'=>$request->student_id,'year'=>$request->select_year,'installment'=>$installment])->get();
        $total_installments[$installment] = $get_fees;
      }

      return response()->json(["success"=>["total_installments"=>$total_installments]]);
    }


    public function getClassWiseFees(Request $request){
      $request->validate([
        "classes"=>'required|string',
        "select_year"=>"required|string",
        "total_installment"=>'required|array'
      ]);

      $class_id = Classes::where(["class_title"=>$request->classes,"section"=>$request->section])->first()->id;

            $all_fees_type = FeesType::all();
            foreach ($all_fees_type as $key => $value) {
                $fees_type = $value->fees_type;  

              foreach ($request->total_installment as $key => $installment) {
                $check_exists = FeesClassWise::where(['class_id'=>$class_id,"installment"=>$installment,"year"=>$request->select_year,"fees_type"=>$fees_type])->count();
                if($check_exists == 0){
                  $class_wise_fees = new FeesClassWise;
                  $class_wise_fees->class_id = $class_id;
                  $class_wise_fees->installment = $installment;
                  $class_wise_fees->year = $request->select_year;
                  $class_wise_fees->fees_type = $fees_type;
                  $class_wise_fees->save();
                }
              }
            }
      $total_installments = [];
      foreach ($request->total_installment as $key => $installment) {
        $get_fees = FeesClassWise::select(['fees_type','year','amount','discount_amount','after_discount'])->where(['class_id'=>$class_id,'year'=>$request->select_year,'installment'=>$installment])->get();
        $total_installments[$installment] = $get_fees;
      }
      return response()->json(["success"=>["total_installments"=>$total_installments]]);
    } 

    public function updateClassWiseFees(Request $request){
      $request->validate([
        'classes' => 'required|string',
        'select_year'=>'required|string',
        'total_fees_type'=>'required|array'
      ]);
      
      $class_id = Classes::where(["class_title"=>$request->classes,"section"=>$request->section])->first()->id;
      foreach ($request->total_fees_type as $each_installment_name => $each_installment) {

        foreach ($each_installment as $key => $value) {
          $from_db = FeesClassWise::where(["fees_type"=>$value["fees_type"],"year"=>$request->select_year,"installment"=>$each_installment_name,"class_id"=>$class_id])->first();
          $from_db->amount = $value["amount"];
          $from_db->discount_amount = $value["discount_amount"];
          $from_db->after_discount = $value["after_discount"];
          $from_db->update(); 
        }
      }

      foreach ($request->total_installment as $key => $installment) {
        $get_fees = FeesClassWise::select(['fees_type','year','amount','discount_amount','after_discount'])->where(['class_id'=>$class_id,'year'=>$request->select_year,'installment'=>$installment])->get();
        $total_installments[$installment] = $get_fees;
      }
      return response()->json(["success"=>["total_installments"=>$total_installments]]);

    }


    public function getStudentReceipts(Request $request){
      $request->validate([
        'select_year'=>'required|string',
        'student_id'=>'required|integer',
      ]);
      $fee_receipt = FeeReceipt::select('reciept',"created_at",'account_name')->where(['student_id'=>$request->student_id,"select_year"=>$request->select_year])->distinct()->get();
      return response()->json(["success"=>["receipts"=>$fee_receipt]]);
    }

    public function payIndividualFees(Request $request){
      $request->validate([
        'total_fees_type'=>'required',
        'total_installment'=>'required|array',
        'select_year'=>'required|string',
        "student_id"=>"required|integer",
        "payDetails"=>"required|array",
      ]);
      $receipt = rand ( 10000 , 99999 );;
      foreach ($request->total_fees_type as $each_installment_name => $each_installment) {
        foreach ($each_installment as $key => $value) {
          $from_db = HandleFees::where(["fees_type"=>$value["fees_type"],"year"=>$request->select_year,"installment"=>$each_installment_name,"student_id"=>$request->student_id])->first();
          if($value["current_paid"] != 0){
            $new_receipt = new FeeReceipt;
            $new_receipt->reciept = $receipt;
            $new_receipt->fee_id = $value['id'];
            $new_receipt->current_paid = $value["current_paid"];
            $new_receipt->student_id = $request->student_id;
            $new_receipt->select_year = $request->select_year;
            $new_receipt->installment = $each_installment_name;
            try{
              $new_receipt->account_name = Auth()->user()->name;
            }catch(\Exception $e){
              $new_receipt->account_name = "admin";
            }
            $new_receipt->payment_type = $request->payDetails["payment_type"];
            $new_receipt->save();
          }
          
        }
      }

      foreach ($request->total_fees_type as $each_installment_name => $each_installment) {
        foreach ($each_installment as $key => $value) {
          $from_db = HandleFees::where(["fees_type"=>$value["fees_type"],"year"=>$request->select_year,"installment"=>$each_installment_name,"student_id"=>$request->student_id])->first();
          $from_db->amount = $value["amount"];
          $from_db->discount_amount = $value["discount_amount"];
          $from_db->after_discount = $value["after_discount"];
          $from_db->total_pending =   $value["total_pending"] - $value["current_paid"];
          $from_db->update(); 
        }
      }

      foreach ($request->total_installment as $key => $installment) {
        $get_fees = HandleFees::select(['id','fees_type','year','amount','discount_amount','after_discount','total_pending','current_paid'])->where(['student_id'=>$request->student_id,'year'=>$request->select_year,'installment'=>$installment])->get();
        $total_installments[$installment] = $get_fees;
      }

      $fee_receipt = FeeReceipt::select('reciept',"created_at",'account_name')->where(['student_id'=>$request->student_id,"select_year"=>$request->select_year])->distinct()->get();

      return response()->json(["success"=>["total_installments"=>$total_installments,"message"=>"Fees Successfully Updated","receipts"=>$fee_receipt]]);
    }


    public function getIndividualReceipDetails($receipt_id){
      $receiptDetails = FeeReceipt::select('fee_id','current_paid','account_name')->where('reciept',$receipt_id)->get();
      $send_array = [];
      foreach ($receiptDetails as $key => $receipt) {
          $feeDetails = HandleFees::select('fees_type','student_id','after_discount','installment','total_pending')->findorFail($receipt->fee_id);
          $send_array[$feeDetails->installment][$receipt->fee_id]["fee"] = $feeDetails;
          $send_array[$feeDetails->installment][$receipt->fee_id]["reciept"] = $receipt;
          
          try{
          $send_array[$feeDetails->installment]["total_amount"] += $feeDetails["after_discount"];
          }catch(\Exception $e){
            $send_array[$feeDetails->installment]["total_amount"] = $feeDetails["after_discount"];
          }
          try{
            $send_array[$feeDetails->installment]["total_pending"] += $feeDetails["total_pending"];
          }catch(\Exception $e){
            $send_array[$feeDetails->installment]["total_pending"] = $feeDetails["total_pending"];
          }
          try{
          $send_array[$feeDetails->installment]["current_paid"] += $receipt["current_paid"];
          }catch(\Exception $e){
          $send_array[$feeDetails->installment]["current_paid"] = $receipt["current_paid"];
          }

      } 

      $studenDetails = StudentInfo::select('roll_no','class','section','student_name','father_name','father_contact_no1')->findorFail($feeDetails['student_id']);
      return response()->json(["success"=>["studenDetails"=>$studenDetails,"receiptDetails"=>$send_array]]);
    }
}
