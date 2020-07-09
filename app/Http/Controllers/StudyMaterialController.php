<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudyMaterialGroups;
use App\StudyMaterial;
class StudyMaterialController extends Controller
{
    public function getAllMaterial(Request $request,$class_id,$group_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        
        return $this->ReS(StudyMaterial::with('files','user')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'group_id'=>$group_id,
            'class_id'=>$class_id
        ])->get());

    }
    public function addMaterial(Request $request,$class_id){
        $request->validate([
            'title'=>'required',
            'group'=>'required'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $new_studyMaterial = new StudyMaterial;
        $new_studyMaterial->title = $request->title;
        $new_studyMaterial->subtitle = $request->subtitle;
        $new_studyMaterial->group_id = $request->group;
        $new_studyMaterial->description = $request->description;
        $new_studyMaterial->user_id = Auth()->user()->id;

        if(Auth()->user()->user_type == 4){
            $teacher = Auth()->user()->teacher;
            $new_studyMaterial->user_id = $teacher->id;
            $new_studyMaterial->user_type = get_class($teacher);
        }


        $new_studyMaterial->school_id = $school_id;
        $new_studyMaterial->year_id = $year_id;
        $new_studyMaterial->class_id = $class_id;

        $new_studyMaterial->save();
        if($request->attachments != null)
            $this->bulkFileUpdate($request->attachments,$new_studyMaterial);
        
        return $this->ReS(["message"=>"New Study Material Added!","groups" => $this->getAllGroups($class_id,$school_id,$year_id)]);
    }
    private function getAllGroups($class_id,$school_id,$year_id){
        return StudyMaterialGroups::with('materials')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
        ])->get();
    }
    public function updateGroup(Request $request,$class_id,$group_id){
        $request->validate([
            'study_group'=>'required|string|min:4|max:100'
        ]);
        StudyMaterialGroups::find($group_id)->update([
            'group_name'=>$request->study_group
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $allGroups = $this->getAllGroups($class_id,$school_id,$year_id);
        return $this->ReS(["groups"=>$allGroups]);
    }
    public function getGroups(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $allGroups = $this->getAllGroups($class_id,$school_id,$year_id);
        return $this->ReS(["groups"=>$allGroups]);
    }
    public function addGroup(Request $request,$class_id){
        $request->validate([
            'study_group'=>'required|string|min:4|max:100'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $checkExists = StudyMaterialGroups::where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'group_name'=>$request->study_group
        ])->count();
        if($checkExists > 0){
            return $this->ReE(["message"=>"Group Already Exist. Please Different Name"]);
        }

        $new_group = new StudyMaterialGroups;
        $new_group->school_id = $school_id;
        $new_group->year_id = $year_id;
        $new_group->class_id = $class_id;
        $new_group->group_name = $request->study_group;
        $new_group->save();

        $allGroups = $this->getAllGroups($class_id,$school_id,$year_id);
        return $this->ReS(["groups"=>$allGroups]);
    }   
}
