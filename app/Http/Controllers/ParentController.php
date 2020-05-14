<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentInfo;
class ParentController extends Controller
{
    //

    public function getParentChilds(Request $request){
    	$id = Auth()->user()->id;
    	$geStudents = StudentInfo::where('father_login_id',$id)->get();
    	return response()->json(["success"=>["students"=>$geStudents]]);
    }	
}
