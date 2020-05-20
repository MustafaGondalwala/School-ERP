<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExamType;
use App\Classes;
use App\MonthlyTestType;
use App\Subject;
use App\ExamAdmitCard;
use App\ExamMarksheet;
use App\SystemYear;

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


    public function getExamMarksheet(Request $request){
        $request->validate([
            "exam_type"=>"required|integer",
            "subject"=>'required|array',
            "class_id"=>"required|integer",
            "student_id"=>"required|integer",
            "exam_type_type"=>"required|integer"
        ]);
        $exam_type_type = $request->exam_type_type;
        $exam_id = $request->exam_type;
        $class_id = $request->class_id;
        $student_id = $request->student_id;

        if($request->select_year == ""){
            $select_year = SystemYear::where("selected_year",1)->first()->id;
        }
        $send_array = [];
        foreach ($request->subject as $key => $subject) {
            $check_exist = ExamMarksheet::where([
                "exam_type"=>$exam_type_type,
                "exam_id"=>$exam_id,
                "class_id"=>$class_id,
                "student_id"=>$student_id,
                "subject_id"=>$subject,
                "year_id"=>$select_year
            ])->first();
            if($check_exist == NULL){

                $new_exam_item = new ExamMarksheet;
                $new_exam_item->exam_type = 1;
                $new_exam_item->exam_id = $exam_id;
                $new_exam_item->year_id = $select_year;
                $new_exam_item->class_id = $class_id;
                $new_exam_item->subject_id = $subject;
                $new_exam_item->max_marks = 100;
                $new_exam_item->min_marks = 0;
                $new_exam_item->grace_marks = 0;
                $new_exam_item->marks = 0;
                $new_exam_item->student_id = $student_id;
                $new_exam_item->save();
                $check_exist = $new_exam_item;
            }
        $send_array[Subject::find($subject)->subject_name] = $check_exist;
        }
        return response()->json(["success"=>["exam_marksheet"=>$send_array]]);
    }   

    public function updateExamMarksheet(Request $request){
        $request->validate([
            "exam_marksheet"=>"required|array"
        ]);

        $exam_marksheet = $request->exam_marksheet;

        foreach ($exam_marksheet as $key => $value) {
            $get_item = ExamMarksheet::find($value['id']);
            $get_item->max_marks = $value["max_marks"];
            $get_item->min_marks = $value["min_marks"];
            $get_item->grace_marks = $value["grace_marks"];
            $get_item->marks = $value["marks"];
            $get_item->update();
            $value = $get_item;
        }
        return response()->json(["success"=>["exam_marksheet"=>$exam_marksheet]]);
    }
}


