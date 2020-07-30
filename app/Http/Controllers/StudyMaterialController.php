<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudyMaterialGroups;
use App\StudyMaterial;
use App\File;
class StudyMaterialController extends Controller
{
    public function getClasswiseGroups(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $groups = StudyMaterialGroups::with('class','subject','material')->where([
            'class_id'=>$class_id,
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();
        return $this->ReS(["groups"=>$groups]);
    }
    public function deleteMaterialTeacher(Request $request,$lession_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        StudyMaterial::find($lession_id)->delete();
        return $this->ReS(["message"=>"Study Material Removed!","groups" => $this->getAllGroups($school_id,$year_id)]);
    }
    public function updateMaterialTeacher(Request $request){
        $request->validate([
            'title'=>'required',
            'group_id'=>'required',
            'id'=>'required'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        
        $new_studyMaterial = StudyMaterial::find($request->id);
        $new_studyMaterial->title = $request->title;
        $new_studyMaterial->subtitle = $request->subtitle;
        $new_studyMaterial->group_id = $request->group_id;
        $new_studyMaterial->description = $request->description;
        $new_studyMaterial->update();

        $past_attachmentsStore = [];
        foreach($request->attachments as $attachments){
            if(gettype($attachments) == "string"){
                $attachment_id = json_decode($attachments)->id;
                File::find($attachment_id)->delete();
            }
        }
        
        if($request->attachments != null)
            $this->bulkFileUpdate($request->attachments,$new_studyMaterial,$school_id);
        return $this->ReS(["message"=>"Study Material Updated!","groups" => $this->getAllGroups($school_id,$year_id)]);
    }
    public function addMaterialTeacher(Request $request){
        $request->validate([
            'title'=>'required',
            'group_id'=>'required'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $new_studyMaterial = new StudyMaterial;
        $new_studyMaterial->title = $request->title;
        $new_studyMaterial->subtitle = $request->subtitle;
        $new_studyMaterial->group_id = $request->group_id;
        $new_studyMaterial->description = $request->description;
        $new_studyMaterial->school_id = $school_id;
        $new_studyMaterial->year_id = $year_id;
        $new_studyMaterial->save();
        if($request->attachments != null)
            $this->bulkFileUpdate($request->attachments,$new_studyMaterial,$school_id);
        
        return $this->ReS(["message"=>"New Study Material Added!","groups" => $this->getAllGroups($school_id,$year_id)]);
    }
    public function removeGroupTeacher(Request $request,$chapter_id){
        StudyMaterialGroups::find($chapter_id)->delete();
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);   
        return $this->ReS(["groups" => $this->getAllGroups($school_id,$year_id)]);
    }
    public function getGroupTeacher(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);   
        return $this->ReS(["groups" => $this->getAllGroups($school_id,$year_id)]);
    }
    public function addGroupTeacher(Request $request){
        $request->validate([
            "group_name" => 'required|string',
            "class_id" => 'required|integer',
            "subject_id" => "required|integer",
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);   
        if($request->method('post')){
            Auth()->user()->studyMaterialGroups()->create([
                'class_id'=>$request->class_id,
                'school_id'=>$school_id,
                'year_id'=>$year_id,
                'group_name'=>$request->group_name,
                'subject_id'=>$request->subject_id
            ]);
        }else{
            Auth()->user()->studyMaterialGroups()->update([
                'class_id'=>$request->class_id,
                'school_id'=>$school_id,
                'year_id'=>$year_id,
                'group_name'=>$request->group_name,
                'subject_id'=>$request->subject_id
            ]);
        }
        return $this->ReS(["groups" => $this->getAllGroups($school_id,$year_id)]);
    }   
    public function deleteMaterial(Request $request,$class_id,$lession_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);   
        $lession = StudyMaterial::find($lession_id);
        foreach($lession->attachments as $attachment){
            try{
                unlink(public_path($attachment->file_url));
            }catch(\Exception $e){
                continue;
            }
        }
        $lession->attachments()->delete();
        $lession->delete();
        return $this->ReS(["message"=>"Study Material Deleted!","groups" => $this->getAllGroups($class_id,$school_id,$year_id)]);
    }
    public function updateMaterial(Request $request,$class_id){
        $request->validate([
            'title'=>'required',
            'group_id'=>'required',
            'id'=>'required'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        
        $new_studyMaterial = StudyMaterial::find($request->id);
        $new_studyMaterial->title = $request->title;
        $new_studyMaterial->subtitle = $request->subtitle;
        $new_studyMaterial->group_id = $request->group_id;
        $new_studyMaterial->description = $request->description;
        $new_studyMaterial->update();

        $past_attachmentsStore = [];
        foreach($request->attachments as $attachments){
            if(gettype($attachments) == "string"){
                $attachment_id = json_decode($attachments)->id;
                File::find($attachment_id)->delete();
            }
        }
        
        if($request->attachments != null)
            $this->bulkFileUpdate($request->attachments,$new_studyMaterial,$school_id);
        return $this->ReS(["message"=>"New Study Material Added!","groups" => $this->getAllGroups($class_id,$school_id,$year_id)]);
    }
    // public function getAllMaterial(Request $request,$class_id,$group_id){
    //     $school_id = $this->getSchoolId($request);
    //     $year_id = $this->getSchoolYearId($request);
        
    //     return $this->ReS(StudyMaterial::with('user')->where([
    //         'school_id'=>$school_id,
    //         'year_id'=>$year_id,
    //         'group_id'=>$group_id,
    //         'class_id'=>$class_id
    //     ])->get());
    // }
    public function addMaterial(Request $request,$class_id){
        $request->validate([
            'title'=>'required',
            'group_id'=>'required'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $new_studyMaterial = new StudyMaterial;
        $new_studyMaterial->title = $request->title;
        $new_studyMaterial->subtitle = $request->subtitle;
        $new_studyMaterial->group_id = $request->group_id;
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
            $this->bulkFileUpdate($request->attachments,$new_studyMaterial,$school_id);
        
        return $this->ReS(["message"=>"New Study Material Added!","groups" => $this->getAllGroups($class_id,$school_id,$year_id)]);
    }
    private function getAllGroups($school_id,$year_id){
        return Auth()->user()->studyMaterialGroups()->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->get();
        // return StudyMaterialGroups::with('materials')->where([
        //     'class_id'=>$class_id,
        //     'school_id'=>$school_id,
        //     'year_id'=>$year_id,
        // ])->get();
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
