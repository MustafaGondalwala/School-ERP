<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentAttendance;
use App\StudentInfo;
class AttendanceController extends Controller
{
	public function getStudentAttendance(Request $request){
		$request->validate([
			"classes" => "required",
  			"date" => "required|date"
  		]);
		$all_students = StudentInfo::select('roll_no','student_name','father_name')->where(["class"=>$request->classes,"section"=>$request->section_name])->get();
		$check_if_avaible = StudentAttendance::where(["class_name"=>$request->classes,"attendance_date"=>$request->date,"section_name"=>$request->section_name])->get();

		if(count($check_if_avaible) == 0){
			foreach ($all_students as $key => $student) {
				$new_student_attendance = new StudentAttendance;
				$new_student_attendance->student_roll_no = $student->roll_no;
				$new_student_attendance->student_name = $student->student_name;
				$new_student_attendance->student_father_name = $student->father_name;
				$new_student_attendance->attendance_date = $request->date;
				$new_student_attendance->class_name = $request->classes;
				$new_student_attendance->section_name = $request->section_name;
				$new_student_attendance->save();
			}
		}

		$all_student_class_attendance = StudentAttendance::select('id','student_roll_no','student_name','student_father_name','attendance_date','attendance_type')->where(["class_name"=>$request->classes,"attendance_date"=>$request->date,"section_name"=>$request->section_name])->get();
		return response()->json(["success"=>["student_attendance"=>$all_student_class_attendance]]);
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
		$all_student_class_attendance = StudentAttendance::select('id','student_roll_no','student_name','student_father_name','attendance_date','attendance_type')->where(["class_name"=>$request->classes,"attendance_date"=>$request->date,"section_name"=>$request->section_name])->get();

		return response()->json(["success"=>["student_attendance"=>$all_student_class_attendance]]);
	}
}
