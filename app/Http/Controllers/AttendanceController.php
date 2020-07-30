<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes;
use App\StudentInfo;
use App\StudentAttendance;
use App\StaffAttendance;
use App\Staff;
use \DB;
use Carbon\Carbon;


class AttendanceController extends Controller
{
    public function getStaffIndividualReport(Request $request){
        // dd($request->all());
        $request->validate([
            'staff_id'=>"required|integer",
            'select_month'=>'required|date'
        ]);

        $carbon_date = Carbon::parse($request->select_month);
        $month = $carbon_date->month;
        $school_id = $this->getSchoolId($request);
        $year = $carbon_date->year;
        $staff_id = $request->staff_id;
        $every_count = StaffAttendance::select('status', DB::raw('count(*) as total'))
                 ->groupBy('status')
                 ->whereYear('attendance_date', '=', $year)
              	 ->whereMonth('attendance_date', '=', $month)->where(["staff_id"=>$staff_id,"school_id"=>$school_id])
                 ->get();

        $details_fetch = StaffAttendance::select('attendance_date','status')->whereYear('attendance_date', '=', $year)
              ->whereMonth('attendance_date', '=', $month)->where(["staff_id"=>$staff_id,"school_id"=>$school_id])->orderBy('attendance_date')->
              get();
        $school_details = Staff::find($staff_id);     

        return $this->ReS(["attendance_details"=>$every_count,"details_fetch"=>$details_fetch,"staff_details"=>$school_details]);
    }
    public function getStudentIndividualReport(Request $request){
        $request->validate([
            'student_id'=>"required|integer",
            'select_month'=>'required|date'
        ]);

        $carbon_date = Carbon::parse($request->select_month);
        $month = $carbon_date->month;
        $school_id = $this->getSchoolId($request);
        $year = $carbon_date->year;
        $student_id = $request->student_id;
        $every_count = StudentAttendance::select('status', DB::raw('count(*) as total'))
                 ->groupBy('status')
                 ->whereYear('attendance_date', '=', $year)
              	 ->whereMonth('attendance_date', '=', $month)->where(["student_id"=>$student_id,"school_id"=>$school_id])
                 ->get();

        $details_fetch = StudentAttendance::select('attendance_date','status')->whereYear('attendance_date', '=', $year)
              ->whereMonth('attendance_date', '=', $month)->where(["student_id"=>$student_id,"school_id"=>$school_id])->orderBy('attendance_date')->
              get();
        $school_details = StudentInfo::with('class')->find($student_id);     

        return $this->ReS(["attendance_details"=>$every_count,"details_fetch"=>$details_fetch,"student_details"=>$school_details]);
    }
    public function getClasswiseReport(Request $request){
        $carbon_date = Carbon::parse($request->select_month);
        $month = $carbon_date->month;
        $school_id = $this->getSchoolId($request);
		$year = $carbon_date->year;
        $every_count = StudentAttendance::select('status', DB::raw('count(*) as total'))
                 ->groupBy('status')
                 ->whereYear('attendance_date', '=', $year)
              	 ->whereMonth('attendance_date', '=', $month)->where(["class_id"=>$request->class_id,"school_id"=>$school_id])
                 ->get();
        return $this->ReS(["attendance_details"=>$every_count]);
    }
    public function updateAttendanceStaff(Request $request){
        $request->validate([
            'staff_attendance'=>'required|array'
        ]);
        $staff_attendance = $request->staff_attendance;
        try{
            DB::beginTransaction();
            foreach($staff_attendance as $type){
                if($type != null){
                    $id = $type[0];
                    $new_status = $type[1];
                    StaffAttendance::find($id)->update([
                        'status'=>$new_status
                    ]);
                }
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }finally{
            DB::commit();
        }
        return $this->ReS(['message'=>"Staff Attendance Updated"]);
    }
    public function getAttendanceStaff(Request $request){
        $request->validate([
            'select_date'=>'required|date'
        ]);
        $school_id = $this->getSchoolId($request);
        $select_date = $request->select_date;
        $checkIfExist = StaffAttendance::select('staff_id','status')->where(['school_id'=>$school_id,"attendance_date"=>$select_date])->count();
        if(!$checkIfExist){
            $student_ids = Staff::select('id')->where(['school_id'=>$school_id])->pluck('id');
            $staffAttendances = [];
            try{
                DB::beginTransaction();
                foreach($student_ids as $ids){
                    $new_attendance = new StaffAttendance;
                    $new_attendance->staff_id = $ids;
                    $new_attendance->school_id = $school_id;
                    $new_attendance->attendance_date = $select_date;
                    $new_attendance->save();
                }
            }catch(\Exception $e){
                DB::rollback();
                return $this->ReE(["message"=>$e->getMessage()],400);
            }
            DB::commit();
        }
        
        $staffAttendances = $this->getAttendanceStaffP($school_id,$select_date);
        return $this->ReS(["staff_attendance"=>$staffAttendances]);
    }
    private function getAttendance($school_id,$class_id,$select_date){
        return StudentAttendance::with('studentInfo','class')->select('id','student_id','class_id','status')->where(['school_id'=>$school_id,"class_id"=>$class_id,"attendance_date"=>$select_date])->get();
    }
    public function getAttendanceStaffP($school_id,$select_date){
        return StaffAttendance::with('staff')->where(['school_id'=>$school_id,"attendance_date"=>$select_date])->get();
    }
    public function updateAttendanceStudent(Request $request){
        $request->validate([
            'student_attendance'=>'required|array'
        ]);
        $student_attendance = $request->student_attendance;
        $class_id = "";
        $school_id = $this->getSchoolId($request);
        $attendance_date = "";
        try{
            DB::beginTransaction();
            foreach($student_attendance as $type){
                if($type != null){
                    $id = $type[0];
                    $new_status = $type[1];
                    $data = StudentAttendance::find($id);
                    $class_id = $data->class_id;
                    $attendance_date = $data->attendance_date;

                    $data->update([
                        'status'=>$new_status
                    ]);
                }
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }finally{
            DB::commit();
        }
        $studentAttendances = $this->getAttendance($school_id,$class_id,$attendance_date);
        return $this->ReS(['message'=>"Student Attendance Updated","studentAttendances"=>$studentAttendances]);
    }
    public function getStudent(Request $request){
        $request->validate([
            'class_id'=>'required|integer',
            'select_date'=>'required|date'
        ]);
        $school_id = $this->getSchoolId($request);
        $class_id = $request->class_id;
        $select_date = $request->select_date;
        $checkIfExist = StudentAttendance::select('student_id','class_id','status')->where(['school_id'=>$school_id,"class_id"=>$class_id,"attendance_date"=>$select_date])->count();
        if(!$checkIfExist){
            $student_ids = StudentInfo::select('id')->where(['school_id'=>$school_id,"class_id"=>$request->class_id])->pluck('id');
            $studentAttendances = [];
            try{
                DB::beginTransaction();
                foreach($student_ids as $ids){
                    $new_attendance = new StudentAttendance;
                    $new_attendance->student_id = $ids;
                    $new_attendance->school_id = $school_id;
                    $new_attendance->class_id = $class_id;
                    $new_attendance->attendance_date = $select_date;
                    $new_attendance->save();
                }
            }catch(\Exception $e){
                DB::rollback();
                return $this->ReE(["message"=>$e->getMessage()],400);
            }
        }
        DB::commit();
        $studentAttendances = $this->getAttendance($school_id,$class_id,$select_date);
        //  StudentAttendance::with('studentInfo','class')->select('id','student_id','class_id','status')->where(['school_id'=>$school_id,"class_id"=>$class_id,"attendance_date"=>$select_date])->get();
        return $this->ReS(["student_attendance"=>$studentAttendances]);
    }
}
