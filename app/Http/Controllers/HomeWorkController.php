<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentHomeWork;
use \DB;
use App\StudentInfo;
use App\HandleHomeWork;
class HomeWorkController extends Controller
{
    public function getChildHomeWork(Request $request){
        $request->validate([
            'student_ids'=>"required|array"
        ]); 
        $student_ids = $request->student_ids;
        $send_array = [];
        foreach($student_ids as $ids){
            $student = HandleHomeWork::with('homework','homework.teacher','homework.classes','homework.subject')->where("student_id",$ids)->get();
            $send_array[$ids] = $student;
        }
        return $this->ReS(["student_homework"=>$send_array]);
    }
    public function getHomeWorks($school_id,$class_id){
        return StudentHomeWork::with('classes','teacher','subject')->where([
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
