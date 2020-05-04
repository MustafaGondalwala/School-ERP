<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentInfo;
use App\TokenStore;
use App\ParentInfo;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    public function getAllStudentsSearchable(){
      $all_student = StudentInfo::limit(600)->get();
      $label_student = array();
      foreach ($all_student as $key => $value) {
        $label = $value->student_name." [".$value->roll_no."] [".$value->class."-".$value->section."] [".$value->father_name."]";
        array_push($label_student,array("value"=>$value->id,"label"=>$label));
      }
      return response()->json(["success"=>["student"=>$label_student]]);
    }


    

    public function getIndividualStudent(Request $request,$student_id){
      return response()->json(["success" => StudentInfo::findOrFail($student_id)]);
    }
    public function create_student_account($student_info){
       $check_if_already = User::where(["name"=>$student_info->student_name,"roll_no"=>$student_info->roll_no])->first();

      if($check_if_already != NULL){
        return $check_if_already->id;
      }else{
        $login_student = new User;
        $login_student->name = $student_info->student_name;
        $login_student->roll_no = $student_info->roll_no;
        $login_student->password = bcrypt($student_info->roll_no);
        $login_student->user_type = "student";
        $login_student->save();
        return $login_student->id;
      } 
    }

    public function create_parent_account($student_info){
      $new_parent_info = new ParentInfo;
      $new_parent_info->name = $student_info->father_name;
      $new_parent_info->mobile_no = $student_info->father_contact_no1;
      $new_parent_info->save();

      $check_if_already = User::where(["name"=>$student_info->father_name,"mobile_no"=>$student_info->father_contact_no1])->first();

      if($check_if_already != NULL){
        return $check_if_already->id;
      }else{
        $login_parent = new User;
        $login_parent->name = $student_info->father_name;
        $login_parent->mobile_no = $student_info->father_contact_no1;
        $login_parent->password = bcrypt($student_info->father_contact_no1);
        $login_parent->user_type = "parent";
        $login_parent->save();
        return $login_parent->id;
      }
    }
    public function addRegisterStudent(Request $request){
        $update_id = $request->id;

        if(!$update_id){
        $request->validate([
          'class' => 'required|string',
          'roll_no'=>"required|unique:student_infos|unique:users",
          'student_name' => 'required|string|max:100',
          'father_name' => 'required|string|max:100',
          'mother_name' => 'required|string|max:100',
          'father_contact_no1' => 'required|string|max:10|min:10',
          'dob' => 'required|string',
          'gender' => 'required|string',
          'student_address' => 'required|string|max:50|min:5',
          'place' => 'required|string|max:50',
          'pincode' => 'required|string|max:50',
        ]);
        }

        if($update_id)
          $student_info = StudentInfo::find($update_id);
        else
          $student_info = new StudentInfo;
        $except = array('create_account','send_sms','user_login_id','father_login_id','date_of_admission');
        $images = array('student_photo','father_photo','mother_photo');
        foreach ($request->all() as $key => $value) {
              if(in_array($key,$images)){
                  if($request->$key == NULL)
                    continue;
                  $name = $key."_img_path";
                  $image = $request->$key;
                  $image_name = Str::random(25);
                  $folder = '/uploads/images';
                  $filepath = $image->storeAs($folder, $image_name.'.'.$image->getClientOriginalExtension(),'public');
                  $student_info->$name = $filepath;
              }
          if(in_array($key,$images))
            continue;
          if(!in_array($key,$except))
            if($value == "null")
              $student_info->$key = "";
            else
              $student_info->$key = $value;
        }

        if($request->create_account == 1){
          $father_id = $this->create_parent_account($student_info);
          $student_id = $this->create_student_account($student_info);
          $student_info->father_login_id = $father_id;
          $student_info->user_login_id = $student_id;
        }
          if($update_id)
            $student_info->update();
          else{
            $student_info->save();
          }
        return response()->json(array(["success"=>$student_info]));
    }


    public function tokenLink($email,$token_for){
        $token = $this->randomStrgenerator();
        $startDateTime = date("Y-m-d H:i:s");
        $expiry_date = date('Y-m-d H:i:s',strtotime('+24 hour',strtotime($startDateTime)));
        $tokenStore = new TokenStore;
        $tokenStore->user_email = $email;
        $tokenStore->token_for = $token_for;
        $tokenStore->token = $token;
        $tokenStore->expiry_date = $expiry_date;
        $tokenStore->save();
        $link = "/verifytoken?token=".$token."&token_for=".$token_for."&email=".$email;
        return $link;
    }
    public function randomStrgenerator($length = 25){
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, $charactersLength - 1)];
      }
      return $randomString;
    }
}
