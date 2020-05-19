<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Teacher;
use App\HomeWork;
use App\StudentInfo;
use App\Classes;
use App\RaiseIssue;
use App\RaiseIssueChat;
use App\StudentHomeWork;
use \DB;

class HomeWorkController extends Controller
{   
    public function getStudentPendingHomeWork($student_id){
        $student = StudentInfo::select('id','class','section')->find($student_id);
        $class_id = Classes::where(["class_title"=>$student->class,"section"=>$student->section])->first()->id;
        $getPendingHomeWork = StudentHomeWork::select('homework_id','id','created_at','submition_date')->where(["student_id"=>$student->id,"class_id"=>$class_id,"status"=>1])->get();
        foreach ($getPendingHomeWork as $key => $homewrok) {
            $homewrok["homework"] = HomeWork::select('class_id','submition_date','teacher_id','title','subtitle','description','file_id','subject_id')->find($homewrok["homework_id"]);
            $homewrok["teacher"] = Teacher::select('id','empid','teacher_name','qualification','teacher_photo_img_path','email','contact_no','address')->find($homewrok['homework']->teacher_id);
        }
       return response()->json(["success"=>["homework"=>$getPendingHomeWork]]);
    }
    private function getHomeWorkStatus($homework_id){
        $studentHomeWork = StudentHomeWork::select('status', DB::raw('count(*) as total'))->groupBy('status')->where(["homework_id"=>$homework_id])->get();
        $total_pending = 0;
        $total_completed = 0;
        $total_raise_issue = 0;
        foreach ($studentHomeWork as $key => $value) {
            switch($value["status"]){
                case 1:
                    $total_pending = $value["total"];
                    break;
                case 2:
                    $total_completed = $value["total"];
                    break;
                case 3:
                    $total_raise_issue = $value["total"];
            }
        }
        $total = array("total_completed"=>$total_completed,"total_pending"=>$total_pending,"total_raise_issue"=>$total_raise_issue);
        return $total;
    }
    private function createEditAdmin(Request $request){
    	dd($request->all());
    }


    public function deleteHomeWork($homework_id){
        $teacher_id = Teacher::where("empid",Auth()->user()->empid)->first()->id;
        HomeWork::where(["teacher_id"=>$teacher_id,"id"=>$homework_id])->delete();
        StudentHomeWork::where(["homework_id"=>$homework_id])->delete();
        return $this->getCurrentHomeWork($class_id);
    }
    public function getCurrentHomeWork($class_id){
        if(Auth()->user()->user_type == "teacher"){
            $teacher_id = Teacher::where("empid",Auth()->user()->empid)->first()->id;
            $currentHomeWork = HomeWork::where('teacher_id',$teacher_id)->where("class_id",$class_id)->get();
            foreach ($currentHomeWork as $key => $homework) {
                 $total = $this->getHomeWorkStatus($homework["id"]);
                 $homework["subject"] = $homework["subject_id"];
                 $homework["total"] = $total;
            }
            return response()->json(["success"=>["homework"=>$currentHomeWork]]);
        }
    }
    private function createEditTeacher($request_array,$method){
        ini_set('error_reporting', E_STRICT);
    	if($method == "POST")
    		$homewrok = new HomeWork;
    	else
    		$homewrok = HomeWork::findOrFail($request_array['id']);

    	$teacher_id = Teacher::where("empid",Auth()->user()->empid)->first()->id;
    	$class_id = $request_array["class_id"];
    	$homewrok->title = $request_array["title"];
    	$homewrok->subtitle = $request_array["subtitle"];
    	$homewrok->description = $request_array["description"];
    	$homewrok->submition_date = $request_array["submition_date"];
    	$homewrok->teacher_id = $teacher_id;
    	$homewrok->class_id = $class_id;
        $homewrok->subject_id = (int)($request_array["subject"]);
        if($method == "POST")
    	   $homewrok->save();
    	else
            $homewrok->update();

    	$class = Classes::find($class_id);
    	$allClassStudent = StudentInfo::where(["class"=>$class->class_title,"section"=>$class->section])->get();
    	foreach ($allClassStudent as $key => $value) {
    		$check = StudentHomeWork::where(["student_id"=>$value["id"],"homework_id"=>$homewrok->id])->count();
    		if(!$check){
    			$new_studentHomeWrok = new StudentHomeWork;
    			$new_studentHomeWrok->homework_id = $homewrok->id;
    			$new_studentHomeWrok->student_id = $value["id"];
    			$new_studentHomeWrok->submition_date = $homewrok->submition_date;
    			$new_studentHomeWrok->class_id = $class_id;
    			$new_studentHomeWrok->save();
    		}
    	}

       return $this->getCurrentHomeWork($class_id);
    }
    public function createEditHomeWork(Request $request){
    	$request->validate([
    		"class_id"=>"required|integer",
    		"title"=>"required|string|min:3",
    		"subtitle"=>"required",
    		"description"=>"required|min:4",
    		"submition_date"=>"required|date",
    	]);
    	if(Auth()->user()->user_type == "admin")
    		$this->createEditAdmin();
    	else
    		return $this->createEditTeacher($request->all(),$request->method());
    }

    public function createEditIssue(Request $request){
        if(Auth()->user()->user_type == "parent"){
            $request->validate([
                "new_issue"=>"required|array",
                "homework_id"=>"required|integer"
            ]);
            $homework_id = $request->homework_id;
            $student_id = $request->student_id;
            $teacher_id = $request->teacher_id;
            $class_id = $request->class_id;
            $new_raise_issue = new RaiseIssue;
            $new_raise_issue->parent_id = Auth()->user()->id;
            $new_raise_issue->homework_id = $homework_id;
            $new_raise_issue->student_id = $student_id;
            $new_raise_issue->teacher_id = $teacher_id;
            $new_raise_issue->class_id = $class_id;
            $new_raise_issue->title = $request->new_issue["title"];
            $new_raise_issue->description = $request->new_issue["description"];
            $new_raise_issue->created_by = 1;
            $new_raise_issue->status = 1;
            $new_raise_issue->save();

            $new_raise_chat = new RaiseIssueChat;
            $new_raise_chat->raise_issue_id = $new_raise_issue->id;
            $new_raise_chat->user_type = 2;
            $new_raise_chat->user_id = Auth()->user()->id;
            $new_raise_chat->chat_text = $request->new_issue["title"];
            $new_raise_chat->save();
            return response()->json(["success"=>["raise_issue"=>$new_raise_issue]]);
        }
    }

    public function getOpenRaiseIssue(Request $request){
        $request->validate([
             "homework_id" => "required|integer",
              "student_id" => "required|integer",
              "teacher_id" => "required|integer",
        ]);
        $currentRaise = RaiseIssue::where(["homework_id"=>$request->homework_id,"student_id"=>$request->student_id,"teacher_id"=>$request->teacher_id,"status"=>1])->get();
        dd($currentRaise);
    }
}
