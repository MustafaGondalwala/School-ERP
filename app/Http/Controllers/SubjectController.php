<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subjects;
class SubjectController extends Controller
{
    public function getAllSubjects(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $subjects = Subjects::where(["school_id"=>$school_id,"year_id"=>$year_id])->get();
        return $this->ReS(["subjects"=>$subjects]);
    }
   
}
