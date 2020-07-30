<?php

namespace App\Http\Controllers;

use App\Teacher;
use Illuminate\Http\Request;
use \DB;
use App\User;
use App\Classes;

class TeacherController extends Controller
{
    public function publishTimeTable(Request $request){
        dd($request->all());
        foreach($request->publish_timetable as $key => $value){
            if($value != null){
                Classes::find($value)->update(['assigned_teacher_id'=>$key]);
            }
        }
        return $this->ReS(["message"=>"Data Updated!!"]);
    }
    public function assignedTeacher(Request $request){
        $request->validate([
            'class_id'=>'required|integer',
            'teacher_id'=>'required|integer'
        ]);
        $class_id = $request->class_id;
        $teacher_id = $request->teacher_id;
        $school_id = $this->getSchoolId($request);

        $data = Classes::find($class_id)->update(['assigned_teacher_id'=>$teacher_id]);
        $teacher_data = Teacher::find($teacher_id)->update(['assign_class_id'=>$class_id]);
        if($data == true && $teacher_data == true){
            $classes = Classes::with('teacher')->where('school_id',$school_id)->get();
            return $this->ReS(["message"=>"Teacher Assigned to Class","classes"=>$classes]);
        }
    }
    public function getTeacherNames(Request $request){
        $schoolId = $this->getSchoolId($request);
        $teachers = Teacher::select('id','teacher_name')->where('school_id',$schoolId)->get();
        return $this->ReS(["teachers_name"=>$teachers]);
    }
    public function viewParticularTeacher(Request $request,$teacher_id){
        try{
            $data = Teacher::with('user')->find($teacher_id);
            return $this->ReS(["teacher_info" => $data]);

        }catch(\Exception $e){
            return $this->ReE(["message" => $e->getMessage()]);
        }
       
    }
    public function viewAllTeacher(Request $request){
        $schoolId = $this->getSchoolId($request);
        $teachers = Teacher::with('user')->where('school_id',$schoolId)->get();
        return $this->ReS(["teachers"=>$teachers]);
    }
    public function addNewTeacher(Request $request){
        if($request->id){
            $request->validate([
                'empid'=>'required|string',
                'teacher_name'=>'required|string',
                'gender'=>"required|string",
                "email"=>"required|email",
                "contact_no"=>"required|string",
                "address"=>"required|string",
                "dob"=>"required|date",
                "date_of_joining"=>"required|date",
                'salary'=>"required|integer",
                'relative_name'=>"required|string"
            ]);
        }else{
            $request->validate([
                'empid'=>'required|string|unique:teachers',
                'teacher_name'=>'required|string',
                'gender'=>"required|string",
                "email"=>"required|email|unique:staff",
                "contact_no"=>"required|string|unique:staff",
                "address"=>"required|string",
                "dob"=>"required|date",
                "date_of_joining"=>"required|date",
                'salary'=>"required|integer",
                'relative_name'=>"required|string"
            ]);
        }
        
        $schoolId = $this->getSchoolId($request);
        $schoolCode = $this->getSchool()->unique_id_code;
        $year_id = $this->getSchoolYearId($request);
        DB::beginTransaction();
        try{
            if($request->id)
                $teacher = Teacher::find($request->id);
            else
                $teacher = new Teacher;
            $teacher->empid = $request->empid;
            $teacher->teacher_name = $request->teacher_name;
            $teacher->school_id = $schoolId;
            $teacher->year_id = $year_id;
            if($request->id)
                $teacher->update();
            else
                $teacher->save();
                $emp_photo = NULL;
                $id_proof = NULL;
                $experience_letter = NULL;
                $other_documents1 = NULL;
                $other_documents2 = NULL;    
                $emp_photo = NULL;
            

                //     if($request->emp_photo != NULL && !$request->hasFile('emp_photo'))
                //     $emp_photo = $request->emp_photo;
                //     if($request->id_proof != NULL && !$request->hasFile('id_proof'))
                //     $id_proof = $request->id_proof;
                //     if($request->experience_letter != NULL && !$request->hasFile('experience_letter'))
                //     $experience_letter = $request->experience_letter;
                //     if($request->other_documents1 != NULL && !$request->hasFile('other_documents1'))
                //     $other_documents1 = $request->other_documents1;
                //     if($request->other_documents2 != NULL && !$request->hasFile('other_documents2'))
                //     $other_documents2 = $request->other_documents2;

            
            
            // if($request->hasFile('emp_photo')){}
            //     $emp_photo = $this->uploadFile($request->emp_photo)['url'];
            // if($request->hasFile('id_proof'))
            //     $id_proof = $this->uploadFile($request->id_proof)['url'];
            // if($request->hasFile('experience_letter'))
            //     $experience_letter = $this->uploadFile($request->experience_letter)['url'];
            // if($request->hasFile('other_documents1'))
            //     $other_documents1 = $this->uploadFile($request->other_documents1)['url'];
            // if($request->hasFile('other_documents2'))
            //     $other_documents2 = $this->uploadFile($request->other_documents2)['url'];
            
            if($request->id){
                $teacher->user()->update([
                    "designation"=>1,
                    "empid"=>$teacher->empid,
                    "email"=>$request->email,
                    "salary"=>$request->salary,
                    'date_of_joining'=>$request->date_of_joining,
                    "relative_name"=>$request->relative_name,
                    "staff_name"=>$teacher->teacher_name,
                    "gender"=>$request->gender,
                    "address"=>$request->address,
                    "dob"=>$request->dob,
                    "contact_no"=>$request->contact_no,
                    "school_id"=>$schoolId,
                    "blood_group"=>$request->blood_group,
                    "qualification"=>$request->qualification,
                    "aadhar_card"=>$request->aadhar_card,
                    "bank_name"=>$request->bank_name,
                    "bank_number"=>$request->bank_number,
                    "pan_card_number"=>$request->pan_card_number,
                    "pf_no"=>$request->pf_no,
                    "pf_amount"=>$request->pf_amount,
                    'tds_amount'=>$request->tds_amount,
                    "professional_tax"=>$request->professional_tax,
                    "da_amount"=>$request->da_amount,
                    "hra_amount"=>$request->hra_amount,
                    "salary_remark"=>$request->salary_remark,
                    "casual_leave"=>$request->casual_leave,
                    "pay_earn_leave"=>$request->pay_earn_leave,
                    "sick_leave"=>$request->sick_leave,
                    "other_leave"=>$request->other_leave,
                    "emp_photo"=>$emp_photo,
                    "experience_letter"=>$experience_letter,
                    "id_proof"=>$id_proof,
                    "other_documents1"=>$other_documents1,
                    "other_documents2"=>$other_documents2,
                ]);
            }else{
                $teacher->user()->create([
                    "designation"=>1,
                    "empid"=>$teacher->empid,
                    "email"=>$request->email,
                    "salary"=>$request->salary,
                    'date_of_joining'=>$request->date_of_joining,
                    "relative_name"=>$request->relative_name,
                    "staff_name"=>$teacher->teacher_name,
                    "gender"=>$request->gender,
                    "address"=>$request->address,
                    "dob"=>$request->dob,
                    'year_id'=>$year_id,
                    "contact_no"=>$request->contact_no,
                    "school_id"=>$schoolId,
                    "blood_group"=>$request->blood_group,
                    "qualification"=>$request->qualification,
                    "aadhar_card"=>$request->aadhar_card,
                    "bank_name"=>$request->bank_name,
                    "bank_number"=>$request->bank_number,
                    "pan_card_number"=>$request->pan_card_number,
                    "pf_no"=>$request->pf_no,
                    "pf_amount"=>$request->pf_amount,
                    'tds_amount'=>$request->tds_amount,
                    "professional_tax"=>$request->professional_tax,
                    "da_amount"=>$request->da_amount,
                    "hra_amount"=>$request->hra_amount,
                    "salary_remark"=>$request->salary_remark,
                    "casual_leave"=>$request->casual_leave,
                    "pay_earn_leave"=>$request->pay_earn_leave,
                    "sick_leave"=>$request->sick_leave,
                    "other_leave"=>$request->other_leave,
                    "emp_photo"=>$emp_photo,
                    "experience_letter"=>$experience_letter,
                    "id_proof"=>$id_proof,
                    "other_documents1"=>$other_documents1,
                    "other_documents2"=>$other_documents2,
                ]);
            }
           
            if($request->id){
                $teacher_login = User::where('empid',$teacher->empid)->where('school_id',$schoolId)->first();
            }else{
            $teacher_login = new User;
            }
            $teacher_login->name = $teacher->teacher_name;
            $teacher_login->login_text = $teacher->empid;
            $teacher_login->password = bcrypt($teacher->empid);
            $teacher_login->user_type = 4;
            $teacher_login->school_id = $schoolId;
            $teacher_login->year_id = $year_id;
            $teacher_login->save();
            $this->EmpIDIncrement($school_id);
            DB::commit();
            $message = "Teacher Added!";
            if($request->id){
                $message = "Teacher Updated!";
            }
            return $this->ReS(["message"=>$message,"teacher"=>$teacher]);
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()]);
        }
        
    }
}
