<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentAttendance;
use App\StudentInfo;
use App\Classes;
use Carbon\Carbon;
use App\StaffInfo;
use \DB;
class AttendanceController extends Controller
{	
	public function getStudentAttendanceStudentModule(Request $request){
		$id = StudentInfo::where("user_login_id",Auth()->user()->id)->first()->id;
		$getStudent = StudentInfo::select('id','roll_no','father_name','student_name')->findorFail($id);
			$carbon_date = Carbon::parse($request->data);
			$month = $carbon_date->month;
			$year = $carbon_date->year;
			$details_fetch = StudentAttendance::whereYear('attendance_date', '=', $year)
              ->whereMonth('attendance_date', '=', $month)->where(["user_id"=>$id,"user_type"=>1])->orderBy('attendance_date')->
              get();
            $every_count = StudentAttendance::select('attendance_type', DB::raw('count(*) as total'))
                 ->groupBy('attendance_type')
                 ->whereYear('attendance_date', '=', $year)
              	 ->whereMonth('attendance_date', '=', $month)->where(["user_id"=>$id,"user_type"=>1])
                 ->get();

            return response()->json(["success"=>["student_details"=>$getStudent,"attendance_details"=>$details_fetch,"total_month_count"=>count($details_fetch),"total_count"=>$every_count]]);

	}
	public function getAttendanceHeader(Request $request){
	$student = StudentAttendance::select('attendance_type', DB::raw('count(*) as total'))->groupBy('attendance_type')->whereDate('created_at', Carbon::today())->where(["user_type"=>1])->get();
        $staff = StudentAttendance::select('attendance_type', DB::raw('count(*) as total'))->groupBy('attendance_type')->whereDate('created_at', Carbon::today())->where(["user_type"=>2])->get();
        return response()->json(["success"=>["header"=>["student"=>$student,"staff"=>$staff]]]);
	}

	public function updateStaffAttendance(Request $request){
		$request->validate([
  			"date" => "required|date"
  		]);
  		foreach ($request->staff_attendance as $key => $value) {
			StudentAttendance::where('id',$value["id"])->update(["attendance_type"=>$value["attendance_type"]]);
		}
		return response()->json(["success"=>["staff_attendance"=>$request->staff_attendance]]);
	}
	public function getParticularAttendance(Request $request,$user_type,$id){
		if($user_type == "student"){
			$getStudent = StudentInfo::select('id','roll_no','father_name','student_name')->findorFail($id);
			$carbon_date = Carbon::parse($request->data);
			$month = $carbon_date->month;
			$year = $carbon_date->year;
			
			$details_fetch = StudentAttendance::whereYear('attendance_date', '=', $year)
              ->whereMonth('attendance_date', '=', $month)->where(["user_id"=>$id,"user_type"=>1])->orderBy('attendance_date')->
              get();
            $every_count = StudentAttendance::select('attendance_type', DB::raw('count(*) as total'))
                 ->groupBy('attendance_type')
                 ->whereYear('attendance_date', '=', $year)
              	 ->whereMonth('attendance_date', '=', $month)->where(["user_id"=>$id,"user_type"=>1])
                 ->get();

            return response()->json(["success"=>["student_details"=>$getStudent,"attendance_details"=>$details_fetch,"total_month_count"=>count($details_fetch),"total_count"=>$every_count]]);
		}

		if($user_type=="staff"){
			$getStaff = StaffInfo::select('id','empid','designation')->findorFail($id);
			$carbon_date = Carbon::parse($request->data);
			$month = $carbon_date->month;
			$year = $carbon_date->year;
			$details_fetch = StudentAttendance::whereYear('created_at', '=', $year)
              ->whereMonth('created_at', '=', $month)->where(["user_id"=>$id,"user_type"=>2])->orderBy('created_at')->get();
            $every_count = StudentAttendance::select('attendance_type', DB::raw('count(*) as total'))
                 ->groupBy('attendance_type')
                 ->whereYear('created_at', '=', $year)
              	 ->whereMonth('created_at', '=', $month)->where(["user_id"=>$id,"user_type"=>2])
                 ->get();
            return response()->json(["success"=>["staff_details"=>$getStaff,"attendance_details"=>$details_fetch,"total_month_count"=>count($details_fetch),"total_count"=>$every_count]]);
		}

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
		$all_students = StudentInfo::select('id','roll_no','father_name','student_name')->where(["class"=>$request->classes,"section"=>$request->section])->get();
		
		$class_id = Classes::where(["class_title"=>$request->classes,"section"=>$request->section])->first()->id;
		$send_array = [];
		foreach ($all_students as $key => $value) {
			$check_if_avaible = StudentAttendance::where(["user_type"=>1,"user_id"=>$value["id"],"attendance_date"=>$request->date])->first();
			if($check_if_avaible == []){
				$new_student_attendance = new StudentAttendance;
				$new_student_attendance->user_type = 1;
				$new_student_attendance->user_id = $value["id"];
				$new_student_attendance->attendance_date = $request->date;
				$new_student_attendance->class_id = $class_id;
				$new_student_attendance->attendance_type = 4;
				$new_student_attendance->save();
				$check_if_avaible = $new_student_attendance;
			}
			$check_if_avaible["student"] = $value;
			array_push($send_array,$check_if_avaible);
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
