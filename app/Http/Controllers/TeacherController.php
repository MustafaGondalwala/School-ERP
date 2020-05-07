<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Teacher;
use App\User;
use App\StaffInfo;

class TeacherController extends Controller
{
	public function getAllTeacherSearchable(){
	  $all_teacher = Teacher::limit(600)->get();
      $label_teacher = array();
      foreach ($all_teacher as $key => $value) {
        $label = $value->teacher_name;
        array_push($label_teacher,array("value"=>$value->id,"label"=>$label));
      }
      return response()->json(["success"=>["teacher"=>$label_teacher]]);
	}



  public function addTeacher(Request $request){
      $request->validate([
        'empid'=>'unique:teachers|unique:users',
        'teacher_name'=>'required|min:3|max:50',
        'gender'=>'required',
        'relative_name'=>'required|min:3|max:50',
        'email'=>'required|email|unique:teachers',
        'contact_no'=>'required|min:10|max:10|unique:teachers',
        'qualification'=>'required|max:50',
        'address'=>'required|min:5|max:100',
        'dob'=>'required|date',
        'teach_subject'=>'required',
        'teach_class'=>'required',
        'date_of_join'=>'required|date',
        'salary'=>'required|integer'
      ]);

      $new_teacher = new Teacher;
      $images = array('teacher_photo','id_proof','experience_letter','other_document1','other_document2');
      $except = array('create_login','send_sms');
      foreach ($request->all() as $key => $value) {
        if(in_array($key,$except))
            continue;

        if(!in_array($key,$images))
          $new_teacher->$key = $value;

        if(in_array($key,$images)){
          if($request->$key == NULL)
            continue;
          $name = $key."_photo_img_path";
          $image = $request->$key;
          $image_name = Str::random(25);
          $folder = '/uploads/images';
          $filepath = $image->storeAs($folder, $image_name.'.'.$image->getClientOriginalExtension(),'public');
          $new_teacher->$name = $filepath;
        }
      }
      $new_teacher->save();
      if($request->create_login){
        $teacher_login_id = $this->create_teacher_account($new_teacher);
        if($teacher_login_id == null){
          return response()->json(["errors"=>array("empid"=>["Emp Login Login Already Exists"])],422);
        }
      }

      $new_staff = new StaffInfo;
      $new_staff->empid = $request->empid;
      $new_staff->name = $request->teacher_name;
      $new_staff->gender = $request->gender;
      $new_staff->relative_name = $request->relative_name;
      $new_staff->email = $request->email;
      $new_staff->contact_no = $request->contact_no;
      $new_staff->qualification = $request->qualification;
      $new_staff->address = $request->address;
      $new_staff->dob = $request->dob;
      $new_staff->salary = $request->salary;
      $new_staff->designation = "teacher";
      $new_staff->save();
      return response()->json(["success"=>["teacher"=>$new_teacher]]);
    }

    public function create_teacher_account($teacher){
      $check_if_already = User::where(["name"=>$teacher->teacher_name,"empid"=>$teacher->empid])->first();
      if($check_if_already != NULL){
        return NULL;
      }else{
        $login_teacher = new User;
        $login_teacher->name = $teacher->teacher_name;
        $login_teacher->empid = $teacher->empid;
        $login_teacher->user_type = "teacher";
        $login_teacher->password = bcrypt($teacher->emp_id);
        $login_teacher->save();
        return $login_teacher->id;
      }
    }
}
