<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FeesInstallment;
use App\FeesDueDate;
use App\Classes;
use App\HandleFees;
use App\FeesType;
use App\FeesClassWise;
class FeesController extends Controller
{
    //
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
        if($value["input_data"] != null){
          $check_exists = FeesDueDate::where("installments",$value["installments"])->where('year',$request->select_year)->count();
          if($check_exists == 0){
            $new_fees_due = new FeesDueDate;
            $new_fees_due->installments = $value["installments"];
            $new_fees_due->year = $request->select_year;
            $new_fees_due->due_date = $value["input_data"];
            $new_fees_due->save();
          }else{
            $update_due_date = FeesDueDate::where("installments",$value["installments"])->where('year',$request->select_year)->update(["due_date"=>$value["input_data"]]);
          }
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
          $from_db->amount = $value["amount"];
          $from_db->discount_amount = $value["discount_amount"];
          $from_db->after_discount = $value["after_discount"];
          $from_db->total_paid = $value["total_paid"];

          $from_db->update(); 
        }
      }

      foreach ($request->total_installment as $key => $installment) {
        $get_fees = HandleFees::select(['fees_type','year','amount','discount_amount','after_discount','total_paid'])->where(['student_id'=>$request->student_id,'year'=>$request->select_year,'installment'=>$installment])->get();
        $total_installments[$installment] = $get_fees;
      }
      return response()->json(["success"=>["total_installments"=>$total_installments,"message"=>"Fees Successfully Updated"]]);

    }


    public function getIndividualStudentFees(Request $request){
      $request->validate([
        'student_id'=>'required|integer',
        'select_year'=>'required|string',
        'installments'=>'required|array'
      ]);
      $all_fees_type = FeesType::all();


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
        $get_fees = HandleFees::select(['fees_type','year','amount','discount_amount','after_discount','total_paid'])->where(['student_id'=>$request->student_id,'year'=>$request->select_year,'installment'=>$installment])->get();
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

    public function payIndividualFees(Request $request){
      $request->validate([
        'total_fees_type'=>'required',
        'total_installment'=>'required|array',
        'select_year'=>'required|string'
      ]);

      foreach ($request->total_fees_type as $each_installment_name => $each_installment) {

        foreach ($each_installment as $key => $value) {
          $from_db = HandleFees::where(["fees_type"=>$value["fees_type"],"year"=>$request->select_year,"installment"=>$each_installment_name,"student_id"=>$request->student_id])->first();
          $from_db->amount = $value["amount"];
          $from_db->discount_amount = $value["discount_amount"];
          $from_db->after_discount = $value["after_discount"];
          $from_db->total_paid = $value["total_paid"];

          $from_db->update(); 
        }
      }

      foreach ($request->total_installment as $key => $installment) {
        $get_fees = HandleFees::select(['fees_type','year','amount','discount_amount','after_discount','total_paid'])->where(['student_id'=>$request->student_id,'year'=>$request->select_year,'installment'=>$installment])->get();
        $total_installments[$installment] = $get_fees;
      }
      return response()->json(["success"=>["total_installments"=>$total_installments,"message"=>"Fees Successfully Updated"]]);
    }
}
