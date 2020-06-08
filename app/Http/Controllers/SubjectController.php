<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subjects;
class SubjectController extends Controller
{
    public function getAllSubjects(Request $request){
        $school_id = $this->getSchoolId($request);
        $subjects = Subjects::where("school_info_id",$school_id)->get();
        return $this->ReS(["subjects"=>$subjects]);
    }
   
}
