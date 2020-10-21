<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Auth;
use \DB;
use App\Teacher;
use App\StudentInfo;
use App\SchoolInfo;
use App\AdminInfo;
use App\Classes;
use App\ParentInfo;
use App\RegisterStudent;
use App\Clerk;
use App\MonthlyTestType;
use App\Subjects;
class UserApiController extends Controller
{
    public function updateSchoolInfo(Request $request){
        $school_id = $this->getSchoolId($request);
        $request->front_pic = $this->uploadFile($request->front_pic)['url'];
        SchoolInfo::find($school_id)->update($request->all());
        $schoolInfo = SchoolInfo::find($school_id)->update(["front_pic"=>$request->front_pic]);
        return $this->ReS(["message"=>"Data Updated !!"]);
    }
    public function getSchoolInfo(Request $request){
        $school_id = $this->getSchoolId($request);
        $schoolInfo = SchoolInfo::find($school_id);
        return $this->ReS(["schoolInfo"=>$schoolInfo]);
    }
    public function getDashboard(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $classes = Classes::where(["school_id"=>$school_id,"year_id"=>$year_id])->get();
        $registered_students = RegisterStudent::where(["school_id"=>$school_id,"year_id"=>$year_id])->count();
        $admission_students = StudentInfo::where(["school_id"=>$school_id,"year_id"=>$year_id])->count();
        $teacher = Teacher::where(["school_id"=>$school_id,"year_id"=>$year_id])->get();
        $subjects = Subjects::select('subject_name')->where(["school_id"=>$school_id,"year_id"=>$year_id])->get();
        $monthly_test = MonthlyTestType::where(["school_id"=>$school_id,"year_id"=>$year_id])->count();
        return $this->ReS(["classes"=>$classes,"registered_students"=>$registered_students,"admission_students"=>$admission_students,"teacher"=>$teacher,"subjects"=>$subjects,"monthly_test"=>$monthly_test]);
    }
    public function login(Request $request){
        $request->validate([
            'credential'=>'required|array'
           ]);        
           $loginText = $request->credential['email_mobile_no'];
           $password = $request->credential['password'];
           $check =  Auth::attempt(['login_text' => $loginText, 'password' => $password]);
           if($check){
            $user = Auth::user();
            $sendData['token'] =  $user->createToken('School ERP')->accessToken;
            $sendData['user'] = $user;
            $sendData["user_type"] = $user["user_type"];
            $sendData['school_id'] = $user['school_id'];
            $sendData['year_id'] = $user->year_id; 
            
            if($user['user_type'] == 1){
                $user['info'] = AdminInfo::with('school')->where('id',$user->id)->first();
            }else if($user['user_type'] == 4){
                $teacher = Teacher::where('empid',$user->login_text)->first();
                $sendData['classes'] = Classes::select('class_title','section','id','time_table_id')->where('assigned_teacher_id',$teacher->id)->get();
                $sendData['teacher'] = $teacher;
            }else if($user['user_type'] == 5){
                $user['info'] = Clerk::with('school')->where('empid',$user->login_text)->first();
            }
            else if($user['user_type'] == 3){
                $parent_id = ParentInfo::select('id')->where('mobile_no',Auth()->user()->login_text)->first()->id;
                $user['info'] = StudentInfo::where('parent_id',$parent_id)->get();
            }else if($user['user_type'] == 2){
                $user['info'] = StudentInfo::with('class')->where([
                    'roll_no'=>$user->login_text,
                    'school_id'=>$user->school_id,
                    'year_id'=>$user->year_id
                ])->first();
            }
            // else if($user['user_type'] == 4){
            //     $user['info'] = Teacher::with('class')->where(["empid"=>$user['login_text'],'school_info_id'=>$user['school_id']])->first();
            // }
            return $this->ReS($sendData);
           }else{
            return  $this->ReE(["message"=>"Cannot Find User"]);
           }
    }
    public function logout(Request $request){
            $accessToken = $request->user()->token();
            DB::table('oauth_refresh_tokens')
                ->where('access_token_id', $accessToken->id)
                ->update([
                    'revoked' => true
                ]);
            $accessToken->revoke();
            return $this->ReS(["message"=>"User Logout"]);
    }
}
