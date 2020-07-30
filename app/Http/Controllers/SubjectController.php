<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subjects;
class SubjectController extends Controller
{
    public function addNewSubject(Request $request){
        $request->validate([
            'new_subject'=>'required|string'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $checkIfExist = Subjects::where([
            "school_id"=>$school_id,
            'year_id'=>$year_id,
            'subject_name'=>$request->new_subject
        ])->count();
        if($checkIfExist == 1){
            return $this->ReE(["message"=>"Subject Already Exists"],400);
        }
        $new_subject = new Subjects;
        $new_subject->school_id = $school_id;
        $new_subject->year_id = $year_id;
        $new_subject->subject_name = $request->new_subject;
        $new_subject->save();
        $subjects = Subjects::where(["school_id"=>$school_id,"year_id"=>$year_id])->get();
        return $this->ReS(["subjects"=>$subjects]);
    }

    public function deleteSubject(Request $request,$subject_id){
        if(Subjects::find($subject_id)->delete()){
            $school_id = $this->getSchoolId($request);
            $year_id = $this->getSchoolYearId($request);
            $subjects = Subjects::where(["school_id"=>$school_id,"year_id"=>$year_id])->get();
            return $this->ReS(["subjects"=>$subjects]);
        }else{
            return $this->ReS(["message"=>"Errror Occurred"]);
        }
    }
    public function getAllSubjects(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $subjects = Subjects::where(["school_id"=>$school_id,"year_id"=>$year_id])->get();
        return $this->ReS(["subjects"=>$subjects]);
    }
   
}
