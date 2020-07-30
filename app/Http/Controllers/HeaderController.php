<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Teacher;
use App\Classes;
use App\FeeReceipt;
use \DB;
use App\ClassPeriod;
use App\StudentTimeTable;
use App\StaffTimeTable;
use App\HandleReceipt;
class HeaderController extends Controller
{
    public function getAdminTimetableeHeader(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $total_classperiods = ClassPeriod::where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->count();

        $totalStudentTimeTable = StudentTimeTable::select('time_table_name')->where([
        'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->get()->unique('time_table_name')->count();


        $totalStaffTimeTable = StaffTimeTable::select('time_table_name')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
            ])->get()->unique('time_table_name')->count();
        return $this->ReS(["total" => ["total_classperiods"=>$total_classperiods,'totalStudentTimeTable'=>$totalStudentTimeTable,'totalStaffTimeTable'=>$totalStaffTimeTable]]);
    }
    public function getAdminFeeHeader(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $total_receipts = FeeReceipt::where([
            'school_id'=>$school_id,
            'year_id'=>$year_id,
        ])->where('created_at', '>=', \Carbon\Carbon::today()->toDateString())->count();
        
        $total_collection = HandleReceipt::select(DB::raw('sum(current_paid) as total_paid'))->where('created_at', '>=', \Carbon\Carbon::today()->toDateString())->first()->total_paid;
        return $this->ReS(["total" => ["total_receipts"=>$total_receipts,'total_collection'=>$total_collection]]);
    }
    public function getAdminTeacherHeader(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $teacher = Teacher::where(['school_id'=>$school_id])->count();
        $total_assignedTeacher = Classes::where(['school_id'=>$school_id,'year_id'=>$year_id])->distinct()->count('assigned_teacher_id');
        return $this->ReS(["total" => ["teacher_count"=>$teacher,'total_assignedTeacher'=>$total_assignedTeacher]]);
    }
}
