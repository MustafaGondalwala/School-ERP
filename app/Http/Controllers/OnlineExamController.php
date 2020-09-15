<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OnlineExam;
use App\StudentInfo;
use App\OnlineTestAnswers;
use App\OnlineTestMarksheet;

use \DB;


class OnlineExamController extends Controller
{
    public function getOnlineExamMonthlyTestRemove(Request $request,$onlinetest_id){
        $onlinetest = OnlineExam::find($onlinetest_id);
        if($onlinetest != null){
            $onlinetest->delete();
        }
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $onlineExams = $this->getOnlineMonthlyTestTeacher($school_id,$year_id);
        return $this->ReS(["onlineExam"=>$onlineExams]);
    }
    public function update_marksheet(Request $request){
        $request->validate([
            'answers'=>'required|array',
            'onlinetest_id'=>'required|integer'
        ]);
        foreach($request->answers as $answers){
            OnlineTestAnswers::find($answers['id'])->update([
                'final_marks'=>$answers['final_marks']
            ]);
        }
        OnlineTestMarksheet::find($request->onlinetest_id)->update([
            'status'=>2
        ]);
        return $this->ReS(["message"=>'Marksheet Updated!!','monthlytest_withstudentanswers'=>Auth()->user()->onlineexamWithStudentAnswers()->get()]);
    }

    function monthlyTestWithStudentAnswers(Request $request){
        return $this->ReS(["monthlytest_withstudentanswers"=>Auth()->user()->onlineexamWithStudentAnswers()->get()]);
    }
    function submitAnswers(Request $request){
        $request->validate([
            'answers'=>'required|array',
            'onlinetest_id'=>'required|integer'
        ]);
        $onlineExam = OnlineExam::find($request->onlinetest_id);
        if(!$this->checkForExamDateTime($onlineExam->exam_date,$onlineExam->start_time,$onlineExam->end_time) == true){
            return $this->ReE(["message"=>"Exam Submittion is Expired!!"]);
        }
        $student_id = $this->getStudentInfoId();
        $questionpaper_id = $onlineExam->questionpaper_id;
        $teacher_id = $onlineExam->teacher_id;
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        DB::beginTransaction();
        $onlinemarksheet = new OnlineTestMarksheet;
        $onlinemarksheet->student_id = $student_id;
        $onlinemarksheet->questionpaper_id = $questionpaper_id;
        $onlinemarksheet->teacher_id = $teacher_id;
        $onlinemarksheet->onlinetest_id = $request->onlinetest_id;
        $onlinemarksheet->status = 1;
        $onlinemarksheet->school_id = $school_id;
        $onlinemarksheet->year_id = $year_id;
        $onlinemarksheet->save();
        foreach($request->answers as $key => $answer){
            $onlinemarksheet->answers()->create([
                'question_id'=>$key,
                'questionpaper_id'=>$questionpaper_id,
                'correct'=>$answer,
            ]);
        }
        DB::commit();
        return $this->ReS(["message"=>"Answer Submitted"]);
    }
    function getOnlineTestDetails(Request $request){
        $request->validate([
            'onlinetest_id'=>'required|integer'
        ]);
        $onlinetest_id = $request->onlinetest_id;
        $data = OnlineExam::with('questionpaper','monthyTestType','teacher')->find($onlinetest_id);
        if(!$this->checkForExamDateTime($data->exam_date,$data->start_time,$data->end_time) == true){
            return $this->ReE(["message"=>"Exam Attendation is Expired!!"]);
        }
        return $this->ReS(["onlinetestDetails"=>$data]);
    }
    function getCurrentMonthTestStudent(Request $request,$student_id){
        
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = StudentInfo::find($student_id)->class_id;
        $data = $this->getOnlineExamMonthlyTestStudent($school_id,$year_id,$class_id);
        return $this->ReS(['monthy_test'=>$data]);
    }
    function getOnlineExamMonthlyTestStudent($school_id,$year_id,$class_id){
        return OnlineExam::with('monthyTestType','examType','teacher')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'class_id'=>$class_id,
            'exam_type'=>1
        ])->where("exam_date","<=",\Carbon\Carbon::now())->get();
    }
    function getOnlineMonthlyTestTeacher($school_id,$year_id){
        return Auth()->user()->onlineexam()->where([
                "school_id"=>$school_id,
                'year_id'=>$year_id,
                'exam_type'=> 1
                ])->get();
    }
    function getOnlineExamMonthlyTest(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        
        $onlineExams = $this->getOnlineMonthlyTestTeacher($school_id,$year_id);
        return $this->ReS(["onlineExam"=>$onlineExams]);
    }
    function getOnlineExamMonthlyTestPast(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $data = OnlineExam::with('monthyTestType','examType','teacher','withStudentAnswers')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'class_id'=>$class_id,
            'exam_type'=>1
        ])->where("exam_date",">=",\Carbon\Carbon::now())->get();
        return $this->ReS(["onlineTest"=>$data]);
    }
    function addOnlineExamMonthlyTest(Request $request){
        $request->validate([
            "monthly_test" => "required|integer",
            "exam_date" => "required|date",
            "start_time" => "required",
            "end_time" => "required",
            "questionpaper" => "required|integer"
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $teacher_id = $this->getTeacherId();
        $onlineExam = new OnlineExam;
        Auth()->user()->onlineexam()->create([
            'exam_type'=>1,
            'exam_type_id'=>$request->monthly_test,
            'exam_date'=>$request->exam_date,
            'start_time'=>$request->start_time,
            'end_time'=>$request->end_time,
            'questionpaper_id'=>$request->questionpaper,
            'class_id'=>$request->class_id,
            'remark'=>$request->remark,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'teacher_id'=>$teacher_id
        ]);
        $onlineExams = $this->getOnlineMonthlyTestTeacher($school_id,$year_id);
        return $this->ReS(["onlineExam"=>$onlineExams]);
    }
}
