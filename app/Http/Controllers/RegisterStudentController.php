<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RegisterStudent;
use \Carbon\Carbon;
class RegisterStudentController extends Controller
{
    public function registerBulkAdd(Request $request){
        $request->validate([
            'data'=>"required|array"
        ]);
        $year_id = $this->getSchoolYearId($request);
        $row_inserted = 0;
        \DB::beginTransaction();
        $notDone = [];
        foreach($request->data as $data){
            try{
                $data['dob'] = Carbon::createFromFormat('m-d-Y', $data['dob'])->format('Y-m-d');
                $data['doA'] = Carbon::createFromFormat('m-d-Y', $data['doA'])->format('Y-m-d');
                $data['year_id'] = $year_id;
                RegisterStudent::insert($data);
                $row_inserted++;
            }catch(\Exception $e){
                array_push($notDone,$data);
            }
        }
        $message = "Inserted Data, Rows: ".$row_inserted." Inserted. Other Error Occured";
        \DB::commit();
        return $this->ReS(["message"=>$message,"not_done"=>$notDone,"total_rows"=>$row_inserted]);
    }
    public function registerStudentList(Request $request){
        $year_id = $this->getSchoolYearId($request);
        if($request->class_string == "")
            $sendData = RegisterStudent::where('year_id',$year_id)->orderBy('created_at')->get();
        else
            $sendData = RegisterStudent::where('year_id',$year_id)->where('class',$request->class_string)->orderBy('created_at')->get();
        return $this->ReS(["register_students"=>$sendData]);    
    }
    public function newRegisterStudent(Request $request){
        $request->validate([
            'register_no'=>"required|string",
            'classes'=>'required|string',
            'student_name'=>'required|string',
            'father_name'=>'required|string',
            'father_contact_no1'=>'required|string',
            'dob'=>'required|date',
            'gender'=>'required|string',
            'student_address'=>'required|string'
        ]);
        $register_no = $request->register_no;
        $checkIfexists = RegisterStudent::where('register_no',$register_no)->count();
        if($checkIfexists > 0){
            return $this->ReE(["message"=>"Register No Already Exists"]);
        }
        $new_register = new RegisterStudent;
        \DB::beginTransaction();
        $new_register->register_no = $register_no;
        $new_register->class = $request->classes;
        $new_register->student_name =  $request->student_name;
        $new_register->father_name =  $request->father_name;
        $new_register->mother_name =  $request->mother_name;
        $new_register->father_contact_no1 =  $request->father_contact_no1;
        $new_register->father_contact_no2 =  $request->father_contact_no2;
        $new_register->dob = $request->dob;
        $new_register->student_address = $request->student_address;
        $new_register->gender = $request->gender;
        $new_register->doA = $request->doA;
        $new_register->block = $request->block;
        $new_register->district = $request->district;
        $new_register->year_id = $this->getSchoolYearId($request);
        if($request->hasFile('student_name')){
            $new_register->student_photo = $this->uploadFile($request->student_photo)['url'];
        }if($request->hasFile('mother_photo')){
            $new_register->mother_photo = $this->uploadFile($request->mother_photo)['url'];
        }if($request->hasFile('father_photo')){
            $new_register->father_photo = $this->uploadFile($request->father_photo)['url'];
        }
        $new_register->save();
        return $this->ReS(["message"=>'Student Registered']);
    }   
}
