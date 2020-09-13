<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentHomeWork;
use \DB;
use App\StudentInfo;
use App\HandleHomeWork;
use App\File;
class HomeWorkController extends Controller
{
    public function getStudentStatus(Request $request,$homework_id){
        $school_id = $this->getSchoolId($request);
        $submission = HandleHomeWork::with(['student','files'])->where(['school_id'=>$school_id,'homework_id'=>$homework_id])->get();
        return $this->ReS(["student_status"=>$submission]);
    }
    public function getPastHomeWorkStudent(Request $request,$student_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = StudentInfo::find($student_id)->class_id;
        return $this->ReS(["past_homework"=>$this->studentwise_PastHomework($class_id,$school_id,$year_id)]);
    }
    public function checkHomeWorkSubmission(Request $request){
        $request->validate([
            "type"=>"required|integer",
            'student_homework_id'=>'required|integer'
        ]);
        $status = $request->type;
        $studentHomeWork = HandleHomeWork::find($request->student_homework_id);
        $studentHomeWork->status = $request->type;
        if($status == 5){
            $rejectRemoved = HandleHomeWork::find($status);
            $rejectRemoved->update([
                'description'=>""
            ]);
            $rejectRemoved->attachments()->delete();
        }
        if($studentHomeWork->update())
            return $this->ReS(["message"=>"Student HomeWork Updated !!"]);
        else
            return $this->ReE(["message"=>"Error Occurred"]);

    }
    public function getHomeWorkSubmission(Request $request,$homework_id){
        $school_id = $this->getSchoolId($request);
        $submission = HandleHomeWork::with(['student','files'])->where(['school_id'=>$school_id,'homework_id'=>$homework_id,"status"=>4])->get();
        return $this->ReS(["homework_submission"=>$submission]);
    }   
    public function submitHomeWork(Request $request){
        $request->validate([
            'description'=>"required|string",
            'homework_id'=>'required|integer',
            'student_id'=>'required|integer',
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = $request->class_id;
        

        $homework_id = $request->homework_id;
        $student_id = $request->student_id;
        $getHomeWork  = StudentHomeWork::find($homework_id);
        if($getHomeWork->submition_date > \Carbon\Carbon::now()){
            return $this->ReE(["message"=>"Homework is Closed"],400);
        }
        $getStudentHomeWork = HandleHomeWork::where(["school_id"=>$school_id,"homework_id"=>$homework_id,"student_id"=>$student_id])->first();
        $getStudentHomeWork->description = $request->description;
        $getStudentHomeWork->status = 4;
        $getStudentHomeWork->save();
        if($request->attachments != null)
            $this->bulkFileUpdate($request->attachments,$getStudentHomeWork,$school_id);
        return $this->ReS(["message"=>"HomeWork Submitted.","current_homework"=>$this->studentwise_CurrentHomework($class_id,$school_id,$year_id)]);
    }
    public function getChildHomeWork(Request $request){
        $request->validate([
            'student_ids'=>"required|array"
        ]); 
        $student_ids = $request->student_ids;
        $send_array = [];
        foreach($student_ids as $ids){
            $student = HandleHomeWork::with('homework','homework.files','homework.teacher','homework.classes','homework.subject')->where("student_id",$ids)->get();
            $send_array[$ids] = $student;
        }
        return $this->ReS(["student_homework"=>$send_array]);
    }
    public function getHomeWorks($school_id,$class_id){
        return StudentHomeWork::with('classes','teacher','studenthomework','subject','files')->where([
            'school_id'=>$school_id,
            'class_id'=>$class_id,
        ])->orderBy('status')->get();
    }
    public function getClassHomeWork(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        return $this->ReS(['class_homeworks'=>$this->getHomeWorks($school_id,$class_id)]);
    }
    public function updateHomeWork(Request $request){
        $request->validate([
            'title'=>'required|string',
            'description'=>'required|string',
            'submission_date'=>"required|date",
            'subject_id'=>'required|string',
            'class_id'=>"required|integer"
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = $request->class_id;
        $teacher_id = $this->getTeacherId();

        $new_homeWork = StudentHomeWork::find($request->id);
        $new_homeWork->school_id = $school_id;
        $new_homeWork->class_id = $class_id;
        $new_homeWork->teacher_id = $teacher_id;
        $new_homeWork->homework_type = 1;
        $new_homeWork->title = $request->title;
        $new_homeWork->subtitle = $request->subtitle;
        $new_homeWork->description = $request->description;
        $new_homeWork->submission_date = $request->submission_date;
        $new_homeWork->subject_id = $request->subject_id;
        $new_homeWork->year_id = $year_id;
        $new_homeWork->save();

        // dd($request->attachments,);
        // Store json data
        $jsonArray = [];
        $newFile = [];
        foreach($request->attachments as $attachments){
            if(gettype($attachments) == "string")
                array_push($jsonArray,json_decode($attachments)->id);
            else
                array_push($newFile,$attachments);
        }

        $oldAttachments = $new_homeWork->attachments()->pluck('id');
        foreach($oldAttachments as $old){
            if(!in_array($old,$jsonArray))
                $this->removeFile($old);
        }
        if(count($newFile)){
            $this->bulkFileUpdate($newFile,$new_homeWork,$school_id);
        }
        return $this->ReS(["message"=>"HomeWork Updated!!",'teacher_homework'=>$this->getHomeWorksTeacher($school_id,$year_id,$teacher_id)]);
    }

    public function deleteHomeWork(Request $request,$homework_id){
        $homework = StudentHomeWork::find($homework_id);

        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = $homework->class_id;
        $teacher_id = $this->getTeacherId();
        
        foreach($homework->attachments()->pluck('id') as $old){
            $this->removeFile($old);
        }
        $homework->studenthomework()->delete();
        $homework->delete();
        return $this->ReS(["message"=>"HomeWork Deleted!!",'teacher_homework'=>$this->getHomeWorksTeacher($school_id,$year_id,$teacher_id)]);
    }


    public function addHomeWork(Request $request){
        $request->validate([
            'title'=>'required|string',
            'description'=>'required|string',
            'submission_date'=>"required|date",
            'subject_id'=>'required|string',
            'class_id'=>"required|integer"
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = $request->class_id;
        $teacher_id = $this->getTeacherId();

        $checkIfExists = StudentHomeWork::where([
            'school_id'=>$school_id,
            'class_id'=>$class_id,
            'year_id'=>$year_id,
            'teacher_id'=>$teacher_id,
            'homework_type'=>1,
            'subject_id'=>$request->subject_id,
            'title'=>$request->title
        ])->count();
        if($checkIfExists > 0){
            return $this->ReE(["message"=>"HomeWork Already Exists"]);
        }

        try {
            DB::beginTransaction();
            $new_homeWork = new StudentHomeWork;
            $new_homeWork->school_id = $school_id;
            $new_homeWork->class_id = $class_id;
            $new_homeWork->teacher_id = $teacher_id;
            $new_homeWork->homework_type = 1;
            $new_homeWork->title = $request->title;
            $new_homeWork->subtitle = $request->subtitle;
            $new_homeWork->description = $request->description;
            $new_homeWork->submission_date = $request->submission_date;
            $new_homeWork->subject_id = $request->subject_id;
            $new_homeWork->year_id = $year_id;
            $new_homeWork->save();
            if($request->attachments != null)
                $this->bulkFileUpdate($request->attachments,$new_homeWork,$school_id);

            $homework_id = $new_homeWork->id;
            $student_ids = StudentInfo::select('id')->where([
                'school_id'=>$school_id,
                'year_id'=>$year_id,
                'class_id'=>$class_id
            ])->pluck('id');


            $insert_array = array();
            foreach($student_ids as $id){
                $insert = array("school_id"=>$school_id,
                "student_id"=>$id,
                "homework_id"=>$homework_id);
                array_push($insert_array,$insert);
            }
            HandleHomeWork::insert($insert_array);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return $this->ReS(["message"=>"HomeWork Added",'teacher_homework'=>$this->getHomeWorksTeacher($school_id,$year_id,$teacher_id)]);
    }
    public function getClasswiseCurrentHomeWork(Request $request,$class_id){
        
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $data = StudentHomeWork::with('classes','teacher','studenthomework','subject','attachments')->where([
            'school_id'=>$school_id,
            'class_id'=>$class_id,
            'year_id'=>$year_id,
        ])->orderBy('created_at')->get();
        return $this->ReS(["homework_classwise"=>$data]);
    }
    public function teacherHomeWork(Request $request){
        
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $teacher_id = $this->getTeacherId();
        return $this->ReS(['teacherwise_homework'=>$this->getHomeWorksTeacher($school_id,$year_id,$teacher_id)]);
    }
    private function getHomeWorksTeacher($school_id,$year_id,$teacher_id){
        return StudentHomeWork::with('classes','teacher','studenthomework','subject','attachments')->where([
            'school_id'=>$school_id,
            'teacher_id'=>$teacher_id,
            'year_id'=>$year_id,
        ])->orderBy('created_at')->get();
    }
    private function getPastHomeWorksTeacher($school_id,$year_id,$teacher_id){
        return StudentHomeWork::with('classes','teacher','studenthomework','subject','attachments')->where([
            'school_id'=>$school_id,
            'teacher_id'=>$teacher_id,
            'year_id'=>$year_id,
        ])->where('submission_date','<',\Carbon\Carbon::now())->orderBy('created_at')->get();
    }



    public function getCurrentHomeWorkStudent(Request $request,$student_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_id = StudentInfo::find($student_id)->class_id;
        return $this->ReS(["current_homework"=>$this->studentwise_CurrentHomework($class_id,$school_id,$year_id)]);
    }
    public function getPastTeacherHomeWork(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $teacher_id = $this->getTeacherId();
        return $this->ReS(['teacherwise_past_homework'=>$this->getPastHomeWorksTeacher($school_id,$year_id,$teacher_id)]);
    }
    private function studentwise_CurrentHomework($class_id,$school_id,$year_id){
        return StudentHomeWork::with('classes','homeworkcheck','subject','attachments','teacherwithStaff')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            ])->where('submission_date','<=',\Carbon\Carbon::now())->get();
    }
    private function studentwise_PastHomework($class_id,$school_id,$year_id){
        return StudentHomeWork::with('classes','homeworkcheck','subject','attachments','teacherwithStaff')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            ])->where('submission_date','<=',\Carbon\Carbon::now())->get();
    }

}

