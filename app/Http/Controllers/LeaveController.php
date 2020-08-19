<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Leave;
use App\StudentInfo;
use \DB;
class LeaveController extends Controller
{
    public function classwiseReport(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $data = Leave::select('student_id')->with('student')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
        ])->get()->unique('student_id');
        $more = [];
        foreach($data as $each){
            $student_id = $each->student_id;
            return Leave::select('student_id','status')->where(['student_id'=>$student_id])->groupBy('student_id')->count();
        }
        return $data;
    }
    private function getStudentLeaves($student_id,$school_id,$year_id){
        return Leave::where([
            'student_id'=>$student_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
        ])->get();   
    }
    public function viewAllLeaveRequestClass(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $studentleaves = Leave::with('student')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
        ])->get();
        return $this->ReS(["studentleaves"=>$studentleaves]);
    }
    public function changeLeaveStatus(Request $request,$leave_id,$status){
        $leave = Leave::find($leave_id);
        $data = $leave->update([
            'status'=>$status
        ]);

        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $studentleaves = Leave::with('student')->where([
            'class_id'=>$leave->class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'status'=>1
        ])->get();
        return $this->ReS(["status"=>$status,"studentleaves"=>$studentleaves]);
    }
    public function viewAllCurrentRequest(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $studentleaves = Leave::with('student')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'status'=>1
        ])->get();
        return $this->ReS(["studentleaves"=>$studentleaves]);
    }
    public function viewAllStudentLeave(Request $request,$student_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $studentleaves = $this->getStudentLeaves($student_id,$school_id,$year_id);
        return $this->ReS(["studentleaves"=>$studentleaves]);
    }



    public function addStudentLeave(Request $request){
        $request->validate([
            'date'=>'required|date',
            'student_id'=>'required|integer',
            'reason'=>'required|string'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = StudentInfo::find($request->student_id)->class_id;

        $checkIFexists = Leave::where([
            'date'=>$request->date,
            'student_id'=>$request->student_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'status'=>1
        ])->count();
        if($checkIFexists > 0)
            return $this->ReE(["message"=>"Leave Already Applied"],400);

        $new_leave = new Leave;
        $new_leave->status = 1;
        $new_leave->student_id = $request->student_id;
        $new_leave->date = $request->date;
        $new_leave->reason = $request->reason;
        $new_leave->applied_date = \Carbon\Carbon::now();
        $new_leave->year_id = $year_id;
        $new_leave->class_id = $class_id;
        $new_leave->school_id = $school_id;

        if($request->attachment != null){
            $new_leave->attachment = $this->uploadFile($request->attachment)['url'];
        }
        $new_leave->save();
        $all_leaves = $this->getStudentLeaves($request->student_id,$school_id,$year_id);
        return $this->ReS(["message"=>"Student Leave Added","all_leaves"=>$all_leaves]);
    }
}
