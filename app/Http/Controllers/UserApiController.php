<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Auth;
use \DB;
use App\Teacher;
use App\StudentInfo;
use App\AdminInfo;
use App\Classes;
use App\Clerk;
class UserApiController extends Controller
{
    //
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
            // else if($user['user_type'] == 3){
            //     $user['info'] = StudentInfo::where('parent_id',Auth()->user()->profile_id)->get();
            // }
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
