<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Leave;
use App\StudentInfo;
use App\StaffInfo;
use Carbon\Carbon;
use App\StudentAttendance;
class LeaveController extends Controller
{   

    public function updateLeaveRequestAdmin(Request $request){
        $request->validate([
            'id'=>'required|integer',
            'status'=>'required|integer',
            'user_type'=>'required|integer',
            'actiontoTaken'=>'required|string'
        ]);
        $leave_record = Leave::where(["id"=>$request->id,"accepted"=>$request->status,"user_type"=>$request->user_type])->first();
        if($request->actiontoTaken == "accept"){
            $leave_record->accepted = 1;
            $Date1 = $leave_record->from;
            $Date2 = $leave_record->to;
            $start = strtotime($Date1. '+1 day'); 

            if($leave_record->user_type == 1)
                $attendance_record = StudentInfo::find($leave_record->user_id);
            else
                $attendance_record = StaffInfo::find($leave_record->user_id);
            $end = strtotime($Date2. '-1 day'); 
            for ($currentDate = $start; $currentDate <= $end; $currentDate += (86400)) { 
                $Store = date('Y-m-d', $currentDate);
                $new_attendance = new StudentAttendance;
                $new_attendance->user_type = $leave_record->user_type;
                $new_attendance->user_id = $leave_record->user_id;
                $new_attendance->attendance_date = $Store;
                $new_attendance->attendance_type = 3;
                $new_attendance->save();
            }
        }
        else
            $leave_record->accepted = 0;
        $leave_record->update();
        $leave_request = Leave::where('accepted',2)->get();
        $send_array = [];
        foreach ($leave_request as $key => $value) {
            if($value["user_type"] == 1){
                $student_info = StudentInfo::select(['student_name',"father_name"])->find($value["user_id"]);
                $value["student_info"] = $student_info;
                array_push($send_array, $value);
            }else{
                $staff = StaffInfo::select(['name','designation'])->find($value["user_id"]);
                $value["staff"] = $staff;
                array_push($send_array, $value);
            }
        }
        return response()->json(["success"=>["leave_request"=>$send_array]]);
    }
    public function updateLeaveRequest(Request $request){
        $request->validate([
            "user_type" => "required|integer"
        ]);

        switch($request->user_type){

            case 1:
                $request->validate([
                    'id'=>"required|integer",
                    "accepted"=>"required|integer"
                ]);
                $id = $request->id;
                $accepted = $request->accepted;
                $leaveApplication = Leave::find($id);
                if($accepted == "2"){
                    $Date1 = $leaveApplication->from; // 2019-03-20
                    $Date2 = $leaveApplication->to; // 2019-03-28
                    $start = strtotime($Date1. '+1 day'); 
                    $student = StudentInfo::find($leaveApplication->user_id);
                    $end = strtotime($Date2. '-1 day'); 
                    for ($currentDate = $start; $currentDate <= $end; $currentDate += (86400)) { 
                        $Store = date('Y-m-d', $currentDate);
                        $new_student_attendance = new StudentAttendance;
                         $new_student_attendance->student_roll_no = $student->roll_no;
                         $new_student_attendance->student_name = $student->student_name;
                         $new_student_attendance->student_father_name = $student->father_name;
                         $new_student_attendance->attendance_date = $Store;
                         $new_student_attendance->class_name = $student->class;
                         $new_student_attendance->section_name = $student->section;
                         $new_student_attendance->attendance_type = 3;
                         $new_student_attendance->save();
                    }
                    $leaveApplication->accepted = 1;
                }else{
                    $leaveApplication->accepted = 3;
                }
                $leaveApplication->update();

                return response()->json(["success"=>["leave"=>$leaveApplication]]);

                break;



        }
    }
    public function getLeaveRequest(Request $request){
        $leave_request = Leave::where('accepted',2)->get();
        $send_array = [];
        foreach ($leave_request as $key => $value) {
            if($value["user_type"] == 1){
                $student_info = StudentInfo::select(['student_name',"father_name"])->find($value["user_id"]);
                $value["student_info"] = $student_info;
                array_push($send_array, $value);
            }else{
                $staff = StaffInfo::select(['name','designation'])->find($value["user_id"]);
                $value["staff"] = $staff;
                array_push($send_array, $value);
            }
        }
        return response()->json(["success"=>["leave_request"=>$send_array]]);
    }
    public function newLeaveRequest(Request $request){
    	$request->validate([
    		'from'=>"required|date",
    		"to"=>"required|date|after_or_equal:from",
    		"reason"=>"required|string",
    		"id"=>"required|integer",
    		"type"=>"required|integer",
    	]);
    	$check_if_already = Leave::where(['to'=>$request->to,"from"=>$request->from,"user_id"=>$request->user_id,"user_type"=>$request->user_type])->first(); 
    	if($check_if_already == NULL){

   //  		$student = StudentInfo::find($request->id);
   //  		$Date1 = $request->from; // 2019-03-20
			// $Date2 = $request->to; // 2019-03-28
			// $start = strtotime($Date1. '+1 day'); 
			// $end = strtotime($Date2. '-1 day'); 
			// for ($currentDate = $start; $currentDate <= $end; $currentDate += (86400)) { 
			//     $Store = date('Y-m-d', $currentDate);
			//     $new_student_attendance = new StudentAttendance;
			// 	$new_student_attendance->student_roll_no = $student->roll_no;
			// 	$new_student_attendance->student_name = $student->student_name;
			// 	$new_student_attendance->student_father_name = $student->father_name;
			// 	$new_student_attendance->attendance_date = $Store;
			// 	$new_student_attendance->class_name = $student->class;
			// 	$new_student_attendance->section_name = $student->section;
			// 	$new_student_attendance->attendance_type = 3;
			// 	$new_student_attendance->save();
			// }
    		$new_leave_request = new Leave;
    		$new_leave_request->user_id = $request->id;
    		$new_leave_request->user_type = $request->type;
    		$new_leave_request->from = $request->from;
    		$new_leave_request->to = $request->to;
    		$new_leave_request->reason = $request->reason;
    		$new_leave_request->save();
    		return response()->json(["success"=>["leave"=>$new_leave_request,"message"=>"Leave Request Sended."]]);
    	}else{
    		$new_leave_request = new Leave;
    		$new_leave_request->user_id = $request->id;
    		$new_leave_request->user_type = $request->type;
    		$new_leave_request->from = $request->from;
    		$new_leave_request->to = $request->to;
    		$new_leave_request->reason = $request->reason;
    		$new_leave_request->update();
    		return response()->json(["success"=>["leave"=>$check_if_already,"message"=>"Leave Request Updated."]]);
    	}
    }
}
