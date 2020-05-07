<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentAttendance;
use App\StudentInfo;
use App\StaffInfo;
class AttendanceController extends Controller
{
	public function updateStaffAttendance(Request $request){
		$request->validate([
  			"date" => "required|date"
  		]);
  		foreach ($request->staff_attendance as $key => $value) {
			StudentAttendance::where('id',$value["id"])->update(["attendance_type"=>$value["attendance_type"]]);
		}
		return response()->json(["success"=>["staff_attendance"=>$request->staff_attendance]]);
	}
	public function getStaffAttendance(Request $request){
		$request->validate([
  			"date" => "required|date"
  		]);
		$all_staff = StaffInfo::select('id','empid','name','designation')->get();
		$send_array = [];
		foreach ($all_staff as $key => $value) {
			$staff_attendance = StudentAttendance::where(["user_type"=>2,"user_id"=>$value["id"],"attendance_date"=>$request->date])->first();	
			if($staff_attendance == NULL){
				$new_staff_attendance = new StudentAttendance;
				$new_staff_attendance->user_type = 2;
				$new_staff_attendance->user_id = $value["id"];
				$new_staff_attendance->attendance_date = $request->date;
				$new_staff_attendance->save();
				$new_staff_attendance["staff"] = $value;
				array_push($send_array,$new_staff_attendance);
			}else{
				$staff_attendance["staff"] = $value;
				array_push($send_array,$staff_attendance);
			}
		}
		return response()->json(["success"=>["staff_attendance"=>$send_array]]);
	}	
	public function getStudentAttendance(Request $request){
		$request->validate([
			"classes" => "required",
  			"date" => "required|date"
  		]);
		$all_students = StudentInfo::select('id','roll_no','father_name','student_name')->where(["class"=>$request->classes,"section"=>$request->section_name])->get();
		$send_array = [];
		foreach ($all_students as $key => $value) {
			$check_if_avaible = StudentAttendance::where(["user_type"=>1,"user_id"=>$value["id"],"attendance_date"=>$request->date])->first();
			if($check_if_avaible == []){
				$new_student_attendance = new StudentAttendance;
				$new_student_attendance->user_type = 1;
				$new_student_attendance->user_id = $value["id"];
				$new_student_attendance->attendance_date = $request->date;
				$new_student_attendance->save();
			}else{
				$check_if_avaible["student"] = $value;
				array_push($send_array,$check_if_avaible);
			}
		}
		return response()->json(["success"=>["student_attendance"=>$send_array]]);
	}

	public function updateStudentAttendance(Request $request){
		$request->validate([
			"classes"=> 'required|string',
			"date"=> 'required|date',
			"student_attendance"=>'required|array'
		]);
		foreach ($request->student_attendance as $key => $value) {
			StudentAttendance::where('id',$value["id"])->update(["attendance_type"=>$value["attendance_type"]]);
		}
		return response()->json(["success"=>["student_attendance"=>$request->student_attendance]]);
	}
}
