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
    public function checkHomeWorkSubmission(Request $request){
        $request->validate([
            "type"=>"required|integer",
            'student_homework_id'=>'required|integer'
        ]);
        $studentHomeWork = HandleHomeWork::find($request->student_homework_id);
        $new_status = 0;
        switch($request->type){
            case 1:
                $new_status = 2;
                break;
            case 2:
                $new_status = 5;
                break;
        }
        $studentHomeWork->status = $new_status;
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
        if($this->bulkFileUpdate($request->files,$getStudentHomeWork)){
            return $this->ReS(["message"=>"HomeWork Submitted."]);
        }

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
        return StudentHomeWork::with('classes','teacher','subject','files')->where([
            'school_id'=>$school_id,
            'class_id'=>$class_id,
        ])->orderBy('status')->get();
    }
    public function getClassHomeWork(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        return $this->ReS(['class_homeworks'=>$this->getHomeWorks($school_id,$class_id)]);
    }
    public function addHomeWork(Request $request){
        $request->validate([
            'title'=>'required|string',
            'description'=>'required|string',
            'submition_date'=>"required|date",
            'subject'=>'required|string',
            'class_id'=>"required|integer"
        ]);
        $school_id = $this->getSchoolId($request);
        $class_id = $request->class_id;
        $teacher_id = $this->getTeacherId();
        $checkIfExists = StudentHomeWork::where([
            'school_id'=>$school_id,
            'class_id'=>$class_id,
            'teacher_id'=>$teacher_id,
            'homework_type'=>1,
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
            $new_homeWork->submition_date = $request->submition_date;
            $new_homeWork->subject = $request->subject;
            $new_homeWork->save();
            if($request->has('files')){
                $files = $request->files;
                foreach($files as $file){
                    foreach($file as $each){
                        $upload_data = $this->uploadFile($each);
                        $new_file = new File;
                        $new_file->public_id = $upload_data['public_id'];
                        $new_file->file_url = $upload_data['url'];
                        $new_file->file_type = $each->getClientOriginalExtension();
                        $new_file->type_type = "App\StudentHomeWork";
                        $new_file->type_id = $new_homeWork->id;
                        $new_file->save();
                    }
                }
            }

            $homework_id = $new_homeWork->id;

            $student_ids = StudentInfo::select('id')->where([
                'school_info_id'=>$school_id,
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
        return $this->ReS(["message"=>"HomeWork Added",'class_homeworks'=>$this->getHomeWorks($school_id,$class_id)]);
    }
}
