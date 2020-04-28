<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Teacher;
class TeacherController extends Controller
{
    //

	public function getAllTeacherSearchable(){
	  $all_teacher = Teacher::limit(600)->get();
      $label_teacher = array();
      foreach ($all_teacher as $key => $value) {
        $label = $value->teacher_name;
        array_push($label_teacher,array("value"=>$value->id,"label"=>$label));
      }
      return response()->json(["success"=>["teacher"=>$label_teacher]]);
	}
}
