<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Admin;
use \DB;

class AdminController extends Controller
{
    //
    public function getDetails(Request $request){
    	return response()->json(["success"=>["user_login"=>$request->user(),"user_details"=>Admin::where("login_id",$request->user()->id)->first()]]);
    }


    public function updateAdminLogin(Request $request){
        $request->validate([
            'old_password'=>"required|min:8",
            'new_password'=>'required|min:8|same:re_new_password',
            're_new_password'=>'required|min:8'
        ]);

        $adminUserInstance = $request->user();
        if(\Hash::check($request->old_password,$request->old_password)){
            $adminUserInstance->password = bcrypt($request->new_password);
            $adminUserInstance->update();
            return response()->json(["success"=>["user_details"=>$adminUserInstance]]);
        }else{
            return response()->json(["error"=>["message"=>"Old Password is Incorrect"]],400);
        }
     }
    public function updateDetails(Request $request){

        DB::beginTransaction();
        try{

        	$adminInstance = Admin::find($request->id);
        	$adminInstance->name = $request->name;
        	$adminInstance->email = $request->email;
        	$adminInstance->profile_pic = $request->profile_pic_path;
        	$adminInstance->update();

        	$adminUserInstance = $request->user()->first();
    		$adminUserInstance->name = $request->name;
    		$adminUserInstance->login_text = $request->email;
    		$adminUserInstance->profile_pic = $request->profile_pic_path;
            $adminUserInstance->email = $request->email;
    		$adminUserInstance->update();
            DB::commit();
            return response()->json(["success"=>["user_details"=>$adminUserInstance,"admin_details"=>$adminInstance]]);
        }
        catch(\Exception $e){
            DB::rollBack();
            return response()->json(["errror"=>["Email already Exist in Database"]],400);
        }

		
    }
}
