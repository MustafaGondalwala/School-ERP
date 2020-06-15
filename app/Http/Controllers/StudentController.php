<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\StudentInfo;
use \DB;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function addStudentAdmission(Request $request){
        if($request->hasFile('student_photo')){  
            \Cloudder::upload($request->file('student_photo'));
            $c=\Cloudder::getResult();         
            dd($c);    
            if($c){
               return back()
                    ->with('success','You have successfully upload images.')
                    ->with('image',$c['url']);
            }
            
        }
    }
    public function studentsSearchableLimit(Request $request){
        $school_id = $this->getSchoolId($request);
        $all_student = StudentInfo::where('school_info_id',$school_id)->
                        orWhere('student_name', 'like', '%' . $searchText . '%')->
                        orWhere('father_name', 'like', '%' . $searchText . '%')->
                        orWhere('roll_no', 'like', '%' . $searchText . '%')->
                        select('class_id','student_name','roll_no','id')->limit(50)->get();
        $label_student = array();
        foreach ($all_student as $key => $value)
        {
            $label = $value->student_name . " [" . $value->roll_no . "] [" . $value->class_id . "-" . $value->class_id . "] [" . $value->father_name . "]";
            array_push($label_student, array(
                "value" => $value->id,
                "label" => $label
            ));
        }
        return $this->ReS(["student" => $label_student]);
    }
    public function studentsSearchable(Request $request,$searchText){
        $school_id = $this->getSchoolId($request);
        $all_student = StudentInfo::where('school_info_id',$school_id)->select('class_id','student_name','roll_no','id')->limit(600)->get();
        $label_student = array();
        foreach ($all_student as $key => $value)
        {
            $label = $value->student_name . " [" . $value->roll_no . "] [" . $value->class_id . "-" . $value->class_id . "] [" . $value->father_name . "]";
            array_push($label_student, array(
                "value" => $value->id,
                "label" => $label
            ));
        }
        return $this->ReS(["student" => $label_student]);
    }
    public function getAllStudents(Request $request){
        $school_id = $this->getSchoolId($request);
        $students = StudentInfo::select('id','roll_no','student_name','father_name','father_contact_no1')->where('school_id',$school_id)->get();
        return $this->ReS(['students'=>$students]);
    }
    public function addNewStudent(Request $request){
        $validator = Validator::make($request->all(), [
            'roll_no' => 'required|string|max:50|unique:student_infos',
            'student_name'=>"required|string",
            "father_name"=>"required|string",
            "mother_name"=>"required|string",
            "age"=>"required|integer",
            "class_id"=>"required|integer",
            "father_contact_no1"=>"required|string|unique:student_infos",
            "gender"=>"required|string",
            "pincode"=>"required|string",
            "student_address"=>"required|string",
            "state"=>"required|string",
            "dob"=>"required|date"
        ]);
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()],422);
        }

        $school_id = $this->getSchoolId($request);
        DB::beginTransaction();
        try{
            if(isset($data["id"])){
                $student_info = StudentInfo::find($request->id);
            }else{
                $student_info = new StudentInfo;
            }
            $schoolCode = $this->getSchool()->unique_id_code;
            $student_info->school_info_id = $school_id;
            $student_info->roll_no = $schoolCode.'-'.$request->roll_no;
            $student_info->student_name = $request->student_name;
            $student_info->father_name = $request->father_name;
            $student_info->mother_name = $request->mother_name;
            $student_info->age = $request->age;
            $student_info->block = $request->block;
            $student_info->caste = $request->caste;
            $student_info->district = $request->district;
            $student_info->class_id = $request->class_id;
            $student_info->dob = $request->dob;
            $student_info->father_contact_no1 = $request->father_contact_no1;
            $student_info->father_contact_no2 = $request->father_contact_no2;
            $student_info->father_name = $request->father_name;
            $student_info->gender = $request->gender;
            $student_info->landmark = $request->landmark;
            $student_info->mother_name = $request->mother_name;
            $student_info->pincode = $request->pincode;
            $student_info->state = $request->state;
            $student_info->religion = $request->religion;
            $student_info->place = $request->place;
            $student_info->student_address = $request->student_address;
            if($request->student_photo != "null"){
                $student_info->student_photo = $this->uploadFile($request->student_photo);
            }
            if($request->father_photo != "null"){
                $student_info->father_photo = $this->uploadFile($request->father_photo);
            }
            if($request->mother_photo != "null"){
                $student_info->mother_photo = $this->uploadFile($request->mother_photo);
            }

            if(isset($data['id'])){
                $student_info->update();
                return $this->Res(["message"=>"Student Info Updated!"]);
            }
            else{
                $student_info->save();
                $student_info->parent_id = $this->createParentLogin($student_info);
                $this->createStudentLogin($student_info);
                $student_info->update();
                return $this->ReS(["message"=>"Student Info Added!"]);
            }
            DB::commit();            
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()]);
        }
    }
}
