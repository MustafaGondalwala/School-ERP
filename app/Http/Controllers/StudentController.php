<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentInfo;
use App\TokenStore;
use Carbon\Carbon;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    //


    public function getAllStudentsSearchable(){
      $all_student = StudentInfo::limit(600)->get();
      $label_student = array();
      foreach ($all_student as $key => $value) {
        $label = $value->student_name." [".$value->roll_no."] [".$value->class."-".$value->section."] [".$value->father_name."]";
        array_push($label_student,array("value"=>$value->id,"label"=>$label));
      }
      return response()->json(["success"=>["student"=>$label_student]]);
    }
    public function addRegisterStudent(Request $request){
        $request->validate([
          'class' => 'required|string',
          'roll_no'=>"required",
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
        $student_info = new StudentInfo;
        $except = array('create_account');
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
            $student_info->$key = $value;
        }


        $student_info->save();
        switch($request->create_account){
          case 0:
            return response()->json(array(["success"=> ["another_type"=>0,"student_info"=>$student_info]]));
            break;
          case 2:
          return response()->json(array(["success"=> ["another_type"=>2,"student_info"=>$student_info]]));
          break;
          case 1:
            $student_link = $this->tokenLink($student_info->student_email,"1");
            $father_link = $this->tokenLink($student_info->father_email,"2");
            return response()->json(array(["success"=> ["another_type"=>1,"student_info"=>$student_info,"student_link"=>$student_link,"father_link"=>$father_link]]));
            break;
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
