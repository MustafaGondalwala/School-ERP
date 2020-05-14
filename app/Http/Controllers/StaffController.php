<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StaffInfo;

class StaffController extends Controller
{
    //
    public function getStaffSearchable(Request $request){
    $all_staff = StaffInfo::select('id','name','empid','designation')->limit(600)->get();

      $label_staff = array();
      foreach ($all_staff as $key => $value) {
        $label = $value->name." [".$value->empid."] [".$value->designation."]";
        array_push($label_staff,array("value"=>$value->id,"label"=>$label));
      }
      return response()->json(["success"=>["staff"=>$label_staff]]); 
    }
}
