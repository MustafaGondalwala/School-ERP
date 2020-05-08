<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Laravel\Passport\HasApiTokens;
use App\Traits\UploadTrait;
use App\TokenStore;
use Carbon\Carbon;
use App\StudentInfo;
use App\Teacher;
use App\Classes;
use App\Subject;
use App\AdmissionStudent;
use Illuminate\Support\Facades\Hash;

class UserApiController extends Controller
{
    public $successStatus = 200;

    protected function attemptLogin(Request $request)
    {
        if (Auth::attempt([
        'email' => $request['email_mobile_no'],
        'password' => $request['password']
        ],$request->has('remember'))
            ||   Auth::attempt([
                  'phone' => $request['phone'],
                  'password' => $request['password']
                  ],$request->has('remember'))
          ){
                return true;
        }
        return false;
    }


    
    public function LoginCheckByMobile($mobile_no,$password){
      return Auth::attempt(['mobile_no' => $mobile_no, 'password' => $password]);
    }
    public function LoginCheckByRollNo($roll_no,$password){
      return Auth::attempt(['roll_no' => $roll_no, 'password' => $password]);
    }
    public function LoginCheckByEmail($email,$password){
        return Auth::attempt(['email' => $email, 'password' => $password]);
    }

    public function login(Request $request){
      $request->validate([
        'email_mobile_no'=>"required",
        'password'=>"required|min:2"
      ]);

      $user_input = $request->email_mobile_no;
      $check_with_email = User::where(["email"=>$request->email_mobile_no])->count();
      $check_with_mobile_no = User::where(["mobile_no"=>$request->email_mobile_no])->count();
      $check_with_rollno = User::where(["roll_no"=>$request->email_mobile_no])->count();
      $password = $request->password;
      if($check_with_rollno == 0 && $check_with_email == 0 && $check_with_mobile_no == 0){
        return response()->json(["errors"=>["message"=>"Cannot Found User"]],422);
      }
      $login_by_email = false;
      $login_by_mobile_no = false;
      $login_by_rollno = false;
      if($check_with_email)
        $login_by_email = $this->LoginCheckByEmail($user_input,$password);
      else if($check_with_mobile_no)
        $login_by_mobile_no = $this->LoginCheckByMobile($user_input,$password);
      else
        $login_by_rollno = $this->LoginCheckByRollNo($user_input,$password);
      if($login_by_email || $login_by_mobile_no || $login_by_rollno){
        
        $user = Auth::user();
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['user'] = $user;
        $success["user_type"] = $user["user_type"];

        $mobile_no = Auth()->user()->mobile_no;
        $success["students"] = StudentInfo::where('father_contact_no1',$mobile_no)->get();
        return response()->json(['success' => $success], 200);
      }else{
        return response()->json(["errors"=>["message"=>"Cannot Found User"]],422);
      }
    }

    public function addStudent(Request $request){
      // |unique:student_infos
      $request->validate([
        'student_type' => 'required|string',
        'class' => 'required|string',
        'student_name' => 'required|string|max:100',
        'father_name' => 'required|string|max:100',
        'mother_name' => 'required|string|max:100',
        'father_contact_no1' => 'required|string|max:10|min:10',
        'dob' => 'required|string',
        'gender' => 'required|string',
        'student_address' => 'required|string|max:50|min:5',
        'student_email' => 'required|email|unique:student_infos',
        'father_email'=> 'required|email|unique:student_infos',
        'place' => 'required|string|max:50',
        'pincode' => 'required|string|max:50',
        'student_photo' => 'required',
      ]);

      $student_info = new StudentInfo;
      $except = array('student_photo','father_photo','mother_photo','create_account');
      foreach ($request->all() as $key => $value) {
        if(!in_array($key,$except))
          $student_info->$key = $value;
      }

      if($request->has('student_photo') and $request->student_photo != NULL){
            $image = $request->file('student_photo');
            $name = Str::random(25);
            $folder = '/uploads/images';
            $filepath = $image->storeAs($folder, $name.'.'.$image->getClientOriginalExtension(),'public');
            $student_info->student_img_path = $filepath;
      }
      if($request->has('mother_photo') and $request->mother_photo != NULL){
            $image = $request->file('mother_photo');
            $name = Str::random(25);
            $folder = '/uploads/images';
            $filepath = $image->storeAs($folder, $name.'.'.$image->getClientOriginalExtension(),'public');
            $student_info->father_img_path = $filepath;
      }
      if($request->has('father_photo') and $request->father_photo != NULL){
        try{
            $image = $request->file('father_photo');
            $name = Str::random(25);
            $folder = '/uploads/images';
            $filepath = $image->storeAs($folder, $name.'.'.$image->getClientOriginalExtension(),'public');
            $student_info->mother_img_path = $filepath;
        }catch (\Exception $e) {

            return $e->getMessage();
        }
      }

      $student_info_id = $student_info->save();
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


    public function viewAllStudent(Request $request){
        return StudentInfo::select(['roll_no','class','section','student_name','father_name','father_contact_no1','father_email','gender','place'])->get();
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

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'user_type'=>"required",
        ]);
        if ($validator->fails()) {
                    return response()->json(['error'=>$validator->errors()], 401);
                }
        $input = $request->all();
                $input['password'] = bcrypt($input['password']);
                $user = User::create($input);
                $success['token'] =  $user->createToken('MyApp')-> accessToken;
                $success['name'] =  $user->name;
        return response()->json(['success'=>$success], $this-> successStatus);
    }


    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details(Request $request)
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this-> successStatus);
    }

    public function logout(){
      $user = Auth::user()->token();
      $user->revoke();
      return response(array("messsage"=>"Succesfully Logout"),200);
    }

    public function checkToken(Request $request){
      $tokenData = TokenStore::where('token',$request->token)->where('user_email',$request->email)->first();

      if($tokenData == NULL){
        return "Token is Not Validate";
      }
      if($tokenData->expiry_date > Carbon::now()){
        switch($request->token_for){
          case 1:
            return view('student.create_student_account')->with(["email"=>$request->email,"token"=>$request->token]);
            break;
          case 2:
          return view('father.create_father_account')->with(["email"=>$request->email,"token"=>$request->token]);

            break;
        }
      }
    }

    public function registerFather(Request $request){
      $request->validate([
          'password' => 'min:6|required_with:repassword|same:repassword|max:50',
          'repassword' => 'min:6'
      ]);
      $tokenData = TokenStore::where('token',$request->token)->where('user_email',$request->user_email_hidden)->where('token_for',2)->count();
      if($tokenData == 0)
        return "Invalid Token";
        $student_info = StudentInfo::where('father_email',$request->user_email_hidden)->first();
        $user_new = new User;
        $user_new->name=$student_info->father_name;
        $user_new->email=$student_info->father_email;
        $user_new->password = Hash::make($request->password);
        $user_new->user_type = "father";
        $user_new->save();
        $student_info->father_login_id = $user_new->id;
        $student_info->save();
        $token = TokenStore::where('token',$request->token)->delete();
        if($token == 1){
          return redirect('/login');
      }
    }

    public function viewAllStudentLoginInfo(Request $request){
      return User::select(['id','name','email'])->where('user_type',"student")->get();
    }
    public function registerStudent(Request $request){
          $request->validate([
              'password' => 'min:6|required_with:repassword|same:repassword|max:50',
              'repassword' => 'min:6'
          ]);
          $tokenData = TokenStore::where('token',$request->token)->where('user_email',$request->user_email_hidden)->where('token_for',1)->count();
          if($tokenData == 0)
            return "Invalid Token";
          $student_info = StudentInfo::where('student_email',$request->user_email_hidden)->first();
          $user_new = new User;
          $user_new->name=$student_info->student_name;
          $user_new->email=$student_info->student_email;
          $user_new->password = Hash::make($request->password);
          $user_new->user_type = "student";
          $user_new->save();
          $student_info->user_login_id = $user_new->id;
          $student_info->save();
          $token = TokenStore::where('token',$request->token)->delete();
          if($token == 1)
            return redirect('/login');
        }


    


    public function getAllClasses(Request $request){
      $classes = Classes::select('id','class_title','section','assign_teacher_id')->get();
      return response()->json(["success"=>["classes"=>$classes]]);
    }
    public function ViewAllTeacher(Request $request){
      $teacher = Teacher::select(['id','empid','teacher_name','email','contact_no','salary'])->get();
      return $teacher;
    }

    public function getPreferendData(Request $request){

      $teacher = Teacher::select('id','teacher_name','teach_subject','teach_class')->get();
      return response()->json(["success"=>["teacher"=>$teacher]]);
      

    //   $subjects = Subject::get()->pluck('subject_name','id');
    //   $classes = Classes::get()->pluck('class_title','id');
    //   $main_array = [];
    //   foreach ($teacher as $key => $value) {
    //       $subject_array_with_value = array();
    //       $classes_array_with_value = array();
    //       $subject_array = explode(",", $value['teach_subject']);
    //       $classes_array = explode(",", $value['teach_class']);
          

    //       foreach ($classes_array as $key => $teach_class_value) {
    //         foreach ($classes as $key => $classes_value) {
    //           if($teach_class_value == $key){
    //             array_push($classes_array_with_value, ["classes"=>$classes_value,"id"=>$key]);
    //           }
    //         }
    //       }          



    //       foreach ($subject_array as $key => $teach_class_value) {
    //         foreach ($subjects as $key => $subjects_value) {
    //           if($teach_class_value == $key){
    //             array_push($subject_array_with_value, ["subject_name"=>$subjects_value,"id"=>$key]);
    //           }
    //         }
    //       }
    //       array_push($main_array,["id"=>$value['id'],"teacher_name"=>$value['teacher_name'],"teach_subject"=>$subject_array_with_value,"teach_class"=>$classes_array_with_value]);
    // }

    //   return response()->json(["success"=>["teacher"=>$main_array]]);
    }
    


    public function getDistinctClasses(Request $request){
      $distinct_classes = Classes::distinct('class_title')->select(['id','class_title','section'])->orderBy('class_title')->get();
        return response()->json(["success"=>["classes"=>$distinct_classes]]);
    }

    public function addClass(Request $request){
      $request->validate([
        'class_title'=>'required|unique:classes'
      ]);
      $add_new_class = new Classes;
      $add_new_class->class_title = $request->class_title;
      $add_new_class->save();
      $distinct_classes = Classes::distinct()->select(['class_title','section'])->orderBy('class_title')->get();
      return response()->json(["success"=>["classes"=>$distinct_classes]]);
    }


    public function getAllSubject(Request $request){
      $subject_all = Subject::all();
      return response()->json(["success"=>["subjects"=>$subject_all]]);
    }

    public function addSubject(Request $request){
        $request->validate([
          'subject_name'=>'required|unique:subjects'
        ]);

        $add_new_subject = new Subject;
        $add_new_subject->subject_name = $request->subject_name;
        $add_new_subject->save();
        $subject_all = Subject::all();
        return response()->json(["success"=>["subjects"=>$subject_all]]);
    }

    public function addSection(Request $request){
      $request->validate([
        'class_id'=>'required',
        'section_name'=>"required"
      ]);
      $class = Classes::findOrFail($request->class_id);
      if($class->section == $request->section_name){
        return response()->json(["message"=>"The given data was invalid.","errors"=>["section_name"=>"The section name has already been taken."]],422);
      }
      if($class->section == NULL){
          $class->section = $request->section_name;
          $class->save();
      }else{
        $new_class = new Classes;
        $new_class->class_title = $class->class_title;
        $new_class->section = $request->section_name;
        $new_class->save();
      }
      $distinct_classes = Classes::distinct()->select(['id','class_title','section'])->orderBy('class_title')->get();
      return response()->json(["success"=>["classes"=>$distinct_classes]]);
    }

    public function addAdmissionStudent(Request $request){
      $request->validate([
        'class'=>"required",
        "student_name"=>"required|min:3|max:50",
        "father_name"=>"required|min:3|max:50",
        "father_contact_no"=>"required|min:3|max:50|unique:admission_students",
        "dob"=>"required|min:3|max:50",
        "gender"=>"required",
        "student_address"=>"required",
        "religion"=>"required",
        "caste"=>"required",
        "age"=>"required|integer"
      ]);
      $new_admission = new AdmissionStudent;
      $images = array('student_photo');
      $except = array('class','section');
      foreach ($request->all() as $key => $value) {
        if(in_array($key,$except))
            continue;
        if(!in_array($key,$images))
          $new_admission->$key = $value;

        if(in_array($key,$images)){
          if($request->$key == NULL)
            continue;
          $name = $key."_photo_img_path";
          $image = $request->$key;
          $image_name = Str::random(25);
          $folder = '/uploads/images';
          $filepath = $image->storeAs($folder, $image_name.'.'.$image->getClientOriginalExtension(),'public');
          $new_admission->$name = $filepath;
        }
      }
      $class_id = Classes::where(['class_title'=>$request->class,"section"=>$request->section])->first();
      $new_admission->class_id = $class_id->id;
      $new_admission->save();
      return response()->json(['success'=>["new_admission"=>$new_admission,"message"=>"New Admission Added"]]);
    }

    public function viewAdmissionList(Request $request){
      $list = AdmissionStudent::select(['admission_id','class','section','student_name','father_name','father_contact_no','dob','student_address','religion','caste'])->get();
      return response()->json(["success"=>["admission_list"=>$list]]);
    }
}
