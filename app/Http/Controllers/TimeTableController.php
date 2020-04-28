<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ClassPeriod;
use App\HandleTimeTable;
use App\Classes;
use App\Teacher;

class TimeTableController extends Controller
{
    //
    public function updateTimeTable(Request $request){
        $request->validate([
            "classes"=>'required',
            'time_table'=>'required'
        ]);
        foreach ($request->time_table as $key => $value) {
            $select_row = HandleTimeTable::where(["class"=>$request->classes,"section"=>$request->section,"period_id"=>$key])->first();
            foreach ($value as $key => $i) {
                $select_row->$key = $i;
            }
            $select_row->save();
        }

        $class_id = Classes::where(["class_title"=>$request->classes,"section"=>$request->section])->first();
        if($class_id == null)
            return response()->json(["errors"=>"Invalid Classes"],422);

        $time_table = [];

        $get_all_classperiod = ClassPeriod::select(['period_id','start_time','end_time'])->get();


        foreach ($get_all_classperiod as $key => $period) {
            $get_details = HandleTimeTable::where(['period_id'=>$period->period_id,"class"=>$request->classes,"section"=>$request->section])->first();
            $time_table[$period->period_id] = $get_details;
        }
        return response()->json(["success"=>["time_table"=>$time_table]]);   
    }
    public function updateClassPeriod(Request $request){
    	$request->validate([
    		"period_id"=>'required',
    		'start_time'=>'required',
    		'end_time'=>'required',
    	]);
    	$period_id = $request->period_id;
    	$start_time = $request->start_time;
    	$end_time = $request->end_time;

        $week_days = array("monday","tuesday","wednesday","thursday","friday","saturday");
        $all_classes = Classes::all();

    	$check = ClassPeriod::where(['period_id'=>$period_id])->first();
    	if($check == null){
    		$new_class_period = new ClassPeriod;
    		$new_class_period->period_id = $period_id;
    		$new_class_period->start_time = $start_time;
    		$new_class_period->end_time = $end_time;
    		$new_class_period->save();
    	}else{
    		$check->update(["start_time"=>$start_time,"end_time"=>$end_time]);
    	}

        foreach ($all_classes as $key => $class) {
                $handle_time = HandleTimeTable::where([
                    "period_id"=>$period_id,
                    "class"=>$class->class_title,
                    "section"=>$class->section,
                ]);
                if($handle_time->count() == 0){
                    $new_handle_time = new HandleTimeTable;
                    $new_handle_time->period_id = $period_id;
                    $new_handle_time->start_time = $start_time;
                    $new_handle_time->end_time = $end_time;
                    $new_handle_time->class = $class->class_title;
                    $new_handle_time->section = $class->section;
                    $new_handle_time->save();
                }else{
                    HandleTimeTable::where([
                    "period_id"=>$period_id,
                    "class"=>$class->class_title,
                    "section"=>$class->section,
                ])->update(["start_time"=>$start_time,"end_time"=>$end_time]);
        
                }
        }

    	$get_all_classperiod = ClassPeriod::select(['period_id','start_time','end_time'])->get(); 

    	return response()->json(["success"=>["class_period"=>$get_all_classperiod]]);
    }

    public function getClassPeriod(){
    	$get_all_classperiod = ClassPeriod::select(['period_id','start_time','end_time'])->get(); 

    	return response()->json(["success"=>["class_period"=>$get_all_classperiod]]);
    }


    public function getClassWiseTimeTable(Request $request){
        $request->validate([
            "classes"=>"required",
        ]);
        $class_id = Classes::where(["class_title"=>$request->classes,"section"=>$request->section])->first();
        if($class_id == null)
            return response()->json(["errors"=>"Invalid Classes"],422);

        $time_table = [];

        $get_all_classperiod = ClassPeriod::select(['period_id','start_time','end_time'])->get();


        foreach ($get_all_classperiod as $key => $period) {
            $get_details = HandleTimeTable::where(['period_id'=>$period->period_id,"class"=>$request->classes,"section"=>$request->section])->first();
            $time_table[$period->period_id] = $get_details;
        }
        return response()->json(["success"=>["time_table"=>$time_table]]);
    }

    public function getTeacherTimeTable(Request $request){
        $request->validate([
            'teacher_id'=>'required'
        ]);

        $teacher_name = Teacher::findOrFail($request->teacher_id)->teacher_name;
        $time_table = [];

        $get_all_classperiod = ClassPeriod::select(['period_id','start_time','end_time'])->get();


        foreach ($get_all_classperiod as $key => $period) {
            $get_details = HandleTimeTable::where([
                    'period_id'=>$period->period_id,
                    ])->first();


            $time_table[$period->period_id] = $get_details;
        }        

    }
}
