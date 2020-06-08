<?php

namespace App\Http\Controllers;

use App\Teacher;
use Illuminate\Http\Request;
use \DB;

class TeacherController extends Controller
{
    public function viewParticularTeacher(Request $request,$teacher_id){
        try{
            $data = Teacher::with('user')->find($teacher_id);
            return $this->ReS(["teacher_info" => $data]);

        }catch(\Exception $e){
            return $this->ReE(["message" => $e->getMessage()]);
        }
       
    }
    public function viewAllTeacher(Request $request){
        $schoolId = $this->getSchoolId($request);
        $teachers = Teacher::select('id','assign_class_id','empid','teacher_class','teacher_subject','teacher_name')->where('school_info_id',$schoolId)->get();
        return $this->ReS(["teachers"=>$teachers]);
    }
    public function addNewTeacher(Request $request){
        $request->validate([
            'empid'=>'required|string|unique:teachers',
            'teacher_name'=>'required|string',
            'gender'=>"required|string",
            "email"=>"required|email|unique:staff",
            "contact_no"=>"required|string|unique:staff",
            "address"=>"required|string",
            "dob"=>"required|date",
            'teach_subject'=>"required|string",
            'teach_class'=>"required|string",
            'salary'=>"required|integer",
            'date_of_join'=>'required|date',
            'relative_name'=>"required|string"
        ]);
        $schoolId = $this->getSchoolId($request);
        $schoolCode = $this->getSchool()->unique_id_code;
        DB::beginTransaction();
        try{
            $teacher = new Teacher;
            $teacher->empid = $schoolCode.'-'.$request->empid;
            $teacher->teacher_name = $request->teacher_name;
            $teacher->teacher_subject = $request->teach_subject;
            $teacher->teacher_class = $request->teach_class;
            $teacher->school_id = $schoolId;
            $teacher->save();
            $teacher->user()->create([
                "empid"=>$teacher->empid,
                "email"=>$request->email,
                "salary"=>$request->salary,
                "relative_name"=>$request->relative_name,
                "staff_name"=>$teacher->teacher_name,
                "gender"=>$request->gender,
                "address"=>$request->address,
                "dob"=>$request->dob,
                "contact_no"=>$request->contact_no,
                "school_id"=>$schoolId
            ]);
            $teacher->profile()->create([
                'name'=>$teacher->teacher_name,
                'login_text'=>$teacher->empid,
                'password'=>bcrypt($teacher->empid),
                'user_type'=>4,
                'school_id'=>$schoolId
            ]);
            DB::commit();
            return $this->ReS(["message"=>"Teacher Added!"]);
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()]);
        }
        
    }
}
