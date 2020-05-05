<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentInfo;
class ParentController extends Controller
{
    //

    public function getParentChilds(Request $request){
    	$mobile_no = Auth()->user()->mobile_no;
    	$geStudents = StudentInfo::where('father_contact_no1',$mobile_no)->get();
    	return response()->json(["success"=>["students"=>$geStudents]]);
    }	
}
