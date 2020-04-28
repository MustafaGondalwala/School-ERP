<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExamType;
use App\Classes;
use App\MonthlyTestType;
use App\Subject;
use App\ExamAdmitCard;
class ExamController extends Controller
{
    //


    public function addExamType(Request $request){
    	$request->validate([
    		'exam_type' => "required|string"
    	]);
    	$exam_type = $request->exam_type;
    	$check_if_avaible = ExamType::where('exam_type',$exam_type)->count();

    	if($check_if_avaible == 0){
    		$new_exam_type  = new ExamType;
    		$new_exam_type->exam_type = $exam_type;
    		$new_exam_type->save();
    		$all_exam_type = ExamType::all();
    		return response()->json(["success"=>["exam_type"=>$all_exam_type]]);
    	}
    	else{
    		return response()->json(["errors"=>["exam_type"=>["Exam Type Already Set"]]],422);
    	}
    }

    public function addMonthlyTestType(Request $request){
    	$request->validate([
    		'monthly_test'=>"required|string"
    	]);
    	$monthly_test = $request->monthly_test;
    	$check_if_avaible = MonthlyTestType::where('monthly_test',$monthly_test)->count();

    	if($check_if_avaible == 0){
    		$new_exam_type  = new MonthlyTestType;
    		$new_exam_type->monthly_test = $monthly_test;
    		$new_exam_type->save();
    		$all_monthly_test_type = MonthlyTestType::all();
    		return response()->json(["success"=>["monthly_test"=>$all_monthly_test_type]]);
    	}
    	else{
    		return response()->json(["errors"=>["monthly_test"=>["Monthly Test Type Already Set"]]],422);
    	}
    }

    public function getExamType(){
    	$all_exam_type = ExamType::all();
    	return response()->json(["success"=>["exam_type"=>$all_exam_type]]);
    }

    public function getMonthlyTestType(){
    		$all_monthly_test_type = MonthlyTestType::all();
    		return response()->json(["success"=>["monthly_test"=>$all_monthly_test_type]]);
    }

    public function getAdmitCard(Request $request){
        $request->validate([
            'classes'=>'required|string',
            "select_year"=>'required',
            "exam_type"=>"required|integer",
            "subject"=>"required|array"
        ]);

        $class_id = Classes::where("class_title",$request->classes)->where("section",$request->section)->first()->id;
        foreach ($request->subject as $key => $value) {
            $check_if_avaible = ExamAdmitCard::where(["class_id"=>$class_id,"subject_id"=>$value,"year"=>$request->select_year])->first();
            if($check_if_avaible == null){
                $new_admit_card = new ExamAdmitCard;
                $new_admit_card->subject_id = $value;
                $new_admit_card->class_id = $class_id;
                $new_admit_card->year = $request->select_year;
                $new_admit_card->save();
            }
        }
        $main_array = [];
        foreach ($request->subject as $key => $value) {
            $subject_name = Subject::findOrFail($value)->subject_name;
            $admit_card = ExamAdmitCard::where(["class_id"=>$class_id,"subject_id"=>$value,"year"=>$request->select_year])->first();
            array_push($main_array,[$subject_name,$admit_card]);
        }
        return response()->json(["success"=>["admit_card"=>$main_array]]);
    }

    public function updateAdmitCard(Request $request){
        $request->validate([
            "exam_entrys"=>"required|array",
            "classes"=>'required|string',
            "select_year"=>"required|string",
            "exam_type"=>"required|integer",
            "subject"=>"required|array"

        ]);

        $class_id = Classes::where("class_title",$request->classes)->where("section",$request->section)->first()->id;     
      
        foreach ($request->exam_entrys as $key => $value) {
            $subject_id = $value[1]["subject_id"];
            $exam_admit_card = ExamAdmitCard::where(["class_id"=>$class_id,"subject_id"=>$subject_id,"year"=>$request->select_year])->first();

            $exam_admit_card->start_time = $value[1]["start_time"];
            $exam_admit_card->end_time = $value[1]["end_time"];
            $exam_admit_card->exam_date = $value[1]["exam_date"];
            $exam_admit_card->update();
        }

        $main_array = [];
        foreach ($request->subject as $key => $value) {
            $subject_name = Subject::findOrFail($value)->subject_name;
            $admit_card = ExamAdmitCard::where(["class_id"=>$class_id,"subject_id"=>$value,"year"=>$request->select_year])->first();
            array_push($main_array,[$subject_name,$admit_card]);
        }
        return response()->json(["success"=>["admit_card"=>$main_array]]);

    }
}


