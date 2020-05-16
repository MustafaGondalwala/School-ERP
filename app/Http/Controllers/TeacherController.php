<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Teacher;
use App\User;
use App\Classes;
use App\StudentInfo;
use App\StaffInfo;
use App\Leave;
use App\StudentAttendance;
use \DB;
use \Carbon\Carbon;
class TeacherController extends Controller
{

  public function getTeacherHeader($header_type){
    $empid = Auth()->user()->empid;
    $teacher_info_id = Teacher::where("empid",$empid)->first()->id;    
    $class = Classes::select('id')->where("assign_teacher_id",$teacher_info_id)->get();
    switch($header_type){
      case "attendance":
        $send_array = [];
        foreach ($class as $key => $value) {
          $total_present = 0;
          $total_leave = 0;
          $total_absent = 0;
          $total = StudentAttendance::select('attendance_type', DB::raw('count(*) as total'))
                     ->groupBy('attendance_type')->whereDate('created_at', Carbon::today())->where(["user_type"=>1,"class_id"=>$value['id']])->get();
          foreach ($total as $key => $item) {
            switch ($item->attendance_type) {
              case '1':
                $total_present = $item->total;
                break;
              case '2':
                $total_absent = $item->total;
                break;
              case '3':
                $total_leave = $item->total;
                break;
            }
          }
          $send_array[$value['id']] = array('total_present' => $total_present,'total_leave'=>$total_leave,'total_absent'=>$total_absent);
          return response()->json(["success"=>["attendance_header"=>$send_array]]);
        }
        break;
        case "leave":
              $send_array = [];
              $leave_request = Leave::all();
              $classes = Classes::findOrFail($class_id);
              $send_array = [];
              foreach ($leave_request as $key => $value) {
                  if($value["user_type"] == 1){
                      $student_info = StudentInfo::select(['id','class','section','student_name',"father_name"])->find($value["user_id"]);
                      if($student_info->class == $classes->class_title && $student_info->section == $classes->section){
                          $value["student_info"] = $student_info;
                          array_push($send_array, $value);
                      }
                  }
              }



        break;
    }
  }
  public function getAssignedClass($teacher_login_id){
    $empid = User::findorFail($teacher_login_id)->empid;
    $teacher_id = Teacher::where("empid",$empid)->first()->id;
    return response()->json(["success"=>["assigned_class"=>Classes::where("assign_teacher_id",$teacher_id)->get()]]);
  }
  public function updateAssignTeachertoClass(Request $request){
    $request->validate([
      "class_id"=>"required|integer",
      "teacher_id"=>"required|integer"
    ]);

    $class = Classes::findorFail($request->class_id);
    $class->assign_teacher_id = $request->teacher_id;
    $class->update();

    $teacher = Teacher::findorFail($request->teacher_id);
    $teacher->assigned_class_id = $request->class_id;
    $teacher->update();

    $classes = Classes::select('id','class_title','section','assign_teacher_id')->get();
    $teacher = Teacher::select('id','teacher_name','teach_subject','teach_class')->get();
    return response()->json(["success"=>["teacher"=>$teacher,"classes"=>$classes]]);
  }
	public function getAllTeacherSearchable(){
	  $all_teacher = Teacher::limit(600)->get();
    $label_teacher = array();
      foreach ($all_teacher as $key => $value) {
        $label = $value->teacher_name;
        array_push($label_teacher,array("value"=>$value->id,"label"=>$label));
      }
      return response()->json(["success"=>["teacher"=>$label_teacher]]);
	}
  public function getTeacherDetails($teacher_id){
    return response()->json(["success"=>["teacher_details"=>Teacher::findorFail($teacher_id)]]);
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
        $login_teacher->password = bcrypt($teacher->empid);
        $login_teacher->login_text = $teacher->empid;
        $login_teacher->save();
        return $login_teacher->id;
      }
    }
}
