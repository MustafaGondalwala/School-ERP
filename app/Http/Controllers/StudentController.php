<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\StudentInfo;
use \DB;
use Illuminate\Support\Facades\Validator;
use App\User;
use Artisaninweb\SoapWrapper\Facades\SoapWrapper;
use App\Classes;
use App\ParentInfo;
use App\StudentRollNo;
use App\RegisterStudent;
use App\SchoolInfo;
use App\StudentPhoto;
use App\StudentMedicalInfo;
class StudentController extends Controller
{  
    public function studentAdvancedSearch(Request $request){
        
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        
        $query  = StudentInfo::with('class')->where(['year_id'=>$year_id,"school_id"=>$school_id]);
        if($request->student_name){
            $query->where('student_name', 'like', "$request->student_name%");
        }
        if($request->father_name){
            $query->where('father_name', 'like', "$request->father_name%");
        }
        if($request->mother_name){
            $query->where('mother_name', 'like', "$request->mother_name%");
        }
        if($request->mother_name){
            $query->where('mother_name', 'like', "$request->mother_name%");
        }
        if($request->student_roll_no){
            $query->where('roll_no', 'like', $request->student_roll_no);
        }
        if($request->class_id){
            $query->where('class_id',$request->class_id);
        }
        if($request->father_contact_no){
            $query->orWhere('father_contact_no1',$request->father_contact_no)->orWhere('father_contact_no1',$request->father_contact_no);
        }
        if($request->gender){
            switch($request->gender){
                case "1":
                    $query->where('gender',"male");
                break;
                case "2":
                    $query->where('gender',"female");
                break;
                case "3":
                    $query->where('gender',"other");
                break;
            }
        }
        if($request->religion){
            $query->where('religion',$request->religion);
        }
        if($request->caste){
            $query->where('caste',$request->caste);
        }
        if($request->age){
            switch($request->age){
                case "1":
                    $query->whereBetween('age', ["1", "5"]);
                break;
                case "2":
                    $query->whereBetween('age', ["5", "10"]);
                break;
                case "3":
                    $query->whereBetween('age', ["10", "15"]);
                break;
                case "3":
                    $query->whereBetween('age', ["10", "15"]);
                break;
                case "4":
                    $query->whereBetween('age', ["15","20"]);
                break;
                case "5":
                    $query->whereBetween('age', ["20", "25"]);
                break;
                case "6":
                    $query->whereBetween('age', ["25", "30"]);
                break;
            }
        }
        return $this->ReS(['students'=>$query->get()]);
    } 
    public function updateStudentPhoto(Request $request){
        $request->validate([
            'name'=>'required|string',
            'photo_id'=>'required|integer',
            'file'=>'required|file'
        ]);
        $class_id = $request->class_id;
        $data = StudentPhoto::find($request->photo_id);
        $old_photo = $data[$request->name];
        $this->deletePhoto($old_photo);
        $new_photo = $this->uploadFile($request->file)['url'];
        $data[$request->name] = $new_photo;
        $data->update();
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $photos = StudentInfo::with(['photos'])->where(["class_id"=>$class_id,"school_id"=>$school_id,"year_id"=>$year_id])->get();
        return $this->ReS(["class_wise"=>$photos]);
    }
    public function getClassWisePhotos(Request $request,$class_id){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $photos = StudentInfo::with(['photos'])->where(["class_id"=>$class_id,"school_id"=>$school_id,"year_id"=>$year_id])->get();
        return $this->ReS(["class_wise"=>$photos]);
    }
    public function updateMedicalInfo(Request $request){
        $request->validate([
            'checkup_date'=>'required|date',
            'doctor_name'=>'required|string',
            'student_height'=>'required|integer',
            'student_weight'=>'required|integer',
            'hiv'=>'required|integer',
            'tb_infection'=>'required|integer',
            'heath_marks'=>'required|integer',
            'student_id'=>'required|integer',
            'checkup_type'=>'required|integer'
        ]);
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        // dd($request->all());
        if($request->id)
            $medical_info = StudentMedicalInfo::find($request->id);
        else
            $medical_info = new StudentMedicalInfo;
        $medical_info->year_id = $year_id;
        $medical_info->school_id = $school_id;
        $medical_info->checkup_type = $request->checkup_type;
        $medical_info->school_id = $school_id;
        $medical_info->student_id = $request->student_id;
        $medical_info->checkup_date = $request->checkup_date;
        $medical_info->doctor_name = $request->doctor_name;
        $medical_info->student_height = $request->student_height;
        $medical_info->student_weight = $request->student_weight;
        $medical_info->blood_group = $request->blood_group;
        if($request->blood_pressure != "null")
            $medical_info->blood_pressure = $request->blood_pressure;
        $medical_info->hemoglobin_level = $request->hemoglobin_level;
        $medical_info->diabetes_level = $request->diabetes_level;
        $medical_info->hiv = $request->hiv;
        $medical_info->tb_infection = $request->tb_infection;
        $medical_info->description = $request->description;
        $medical_info->remark = $request->remark;
        if($request->report == NULL)
            $medical_info->report = NULL;
        else if(is_string($request->report))
            $medical_info->report = $request->report;
        else
            $medical_info->report = $this->uploadFile($request->report)['url'];
        $medical_info->heath_marks = $request->heath_marks;
        if($request->id)
            $medical_info->update();
        else
            $medical_info->save();
        return $this->ReS(["message"=>"Data Updated !!",]);
    }
    public function getMedicalInfo(Request $request){
        $request->validate([
            'student_id'=>'required|integer',
            'checkup_type'=>'required|integer'
        ]);
        
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        
        $checkExist = StudentMedicalInfo::where([
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'student_id'=>$request->student_id,
            'checkup_type'=>$request->checkup_type
        ])->count();
        $student = StudentInfo::with('class')->where('id',$request->student_id)->first();
        if($checkExist == 0){
            return $this->ReS(["medical_info"=>NULL,"student"=>$student]);
        }
        $getData = StudentMedicalInfo::where([
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'student_id'=>$request->student_id,
            'checkup_type'=>$request->checkup_type
        ])->first();
        return $this->ReS(["medical_info"=>$getData,"student"=>$student]);
    }
    public function getAdminStudentHeader(Request $request){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $admission_student = StudentInfo::where([
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->count();

        $register_student = RegisterStudent::where([
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->count();
        return $this->ReS(["total"=>["total_admission_student"=>$admission_student,"total_register_student"=>$register_student]]);
    }
    public function getRollNobyClassID(Request $request,$class_id){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $data = StudentRollNo::select('roll_id','rollno_string')->where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id
        ])->first();
        return $this->ReS(["roll_no"=>$data]);
    }
    public function setRollNo(Request $request){
        $id = $request->id;
        $rollno_string = $request->rollno_string;
        $roll_id = $request->roll_id;
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);

        $checkExist = StudentRollNo::where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$id
        ])->count();

        try{
            if($checkExist == 0){
                $new_one = new StudentRollNo;
                $new_one->class_id = $id;
                $new_one->roll_id = $roll_id;
                $new_one->rollno_string = $rollno_string;
                $new_one->year_id = $year_id;
                $new_one->school_id = $school_id;
                $new_one->save();
            }else{
                StudentRollNo::where([
                    'year_id'=>$year_id,
                    'school_id'=>$school_id,
                    'class_id'=>$id
                ])->update([
                    'rollno_string'=>$rollno_string,
                    'roll_id'=>$roll_id
                ]);
            }
        }catch(\Exception $e){
            return $this->ReE(["message"=>"Error Occured"]);
        }finally{
            $school_id = $this->getSchoolId($request);
            $classes = Classes::with('teacher','roll_no')->where('school_id',$school_id)->get();
            return $this->ReS(["classes"=>$classes]);
        }
    }
    public function updateParticularCell(Request $request){
        $request->validate([
            'id'=>'required|integer',
            'oldValue'=>'required|string',
            'newValue'=>'required|string',
            'field'=>'required|string'
        ]);
        $id = $request->id;
        $field = $request->field;
        $oldValue = $request->oldValue;
        $newValue = $request->newValue;
        try{
            $updateData = StudentInfo::find($id);
            $updateData->$field = $newValue;
            $updateData->save();
            return $this->ReS(["message"=>"Data Updated!!"]);
        }catch(\Exception $e){
            return $this->ReE(["message"=>"Error Occurred"]);
        }
    }
    public function admissionBulkAdd(Request $request){
        ini_set('max_execution_time', -1 ) ; // time in seconds
        $notDone = [];
        $school_id = $this->getSchoolId($request);
        $uniqueCode = $this->getSchoolUniqueCode($school_id);
        $year_id = $this->getSchoolYearId($request);
        foreach($request->data as $data){
            try{
            $new_addmission = new StudentInfo;
            $class_id = Classes::where(["class_title"=>$data['Class'],"section"=>$data['Section']])->first()->id;
            dd($this->getRollNo($uniqueCode,$class_id,$school_id,$year_id),"ok");
                
            $new_addmission->school_id = $school_id;
            $new_addmission->roll_no = $data['Roll No'];
            $new_addmission->class_id = $class_id;
            $new_addmission->religion = $data['Religion'];
            $new_addmission->caste = $data['Caste'];
            $new_addmission->student_name = $data['Student Name'];
            $new_addmission->father_name = $data['Father Name'];
            $new_addmission->mother_name = $data['Mother Name'];
            $new_addmission->father_contact_no1 = $data['Father C.No 1'];
            $new_addmission->father_contact_no2 = $data['Father C.No 2'];
            $new_addmission->father_email = $data['Father Email'];
            $new_addmission->dob = $data['DOB'];
            $new_addmission->age = $data['Age'];
            $new_addmission->gender = $data['Gender'];
            $new_addmission->father_occupation = $data['Father Occupation'];
            $new_addmission->mother_occupation = $data['Mother Occupation'];
            $new_addmission->guardian_name = $data['Guardian Name'];
            $new_addmission->guardian_occupation = $data['Guardian Occupation'];
            $new_addmission->year_id = $this->getSchoolYearId($request);
            $new_addmission->save();

            $new_addmission->address()->create([
                'student_address'=>$data['Student Address'],
                'place'=>$data['Place'],
                'block'=>$data['Block'],
                'district'=>$data['District'],
                'state'=>$data['State'],
                'landmark'=>$data['Landmark'],
                'pincode'=>$data['Pincode'],
                'student_info_id'=> $new_addmission->id
            ]);
            $new_addmission->documents()->create([
                'student_aadhar_card'=>$data['Student AadharCard'],
                'father_aadhar_card'=>$data['Father AadharCard'],
                'father_bank_name'=>$data['Father Bank Name'],
                'father_bank_number'=>$data['Father Bank Number'],
                'student_bank_name'=>$data['Student Bank Name'],
                'student_bank_number'=>$data['Student Bank Number'],
                'student_info_id'=>$new_addmission->id
            ]);
            
            $new_addmission->photos()->create([
                'student_info_id'=>$new_addmission->id
            ]);
            
            $checkExist = ParentInfo::where(['mobile_no'=>$new_addmission->father_contact_no1,'school_id'=>$school_id,'year_id'=>$year_id])->count();
            if($checkExist == 0){
                $parentInfo = new ParentInfo;
                $parentInfo->name = $new_addmission->father_name;
                $parentInfo->mobile_no = $new_addmission->father_contact_no1;
                $parentInfo->school_id = $school_id;
                $parentInfo->year_id = $year_id;
                $parentInfo->save();

                $new_student = new User;
                $new_student->name = $new_addmission->father_name;
                $new_student->login_text = $new_addmission->father_contact_no1;
                $new_student->school_id = $school_id;
                $new_student->year_id = $year_id;
                $new_student->profile_pic = "";
                $new_student->password = bcrypt($new_addmission->father_contact_no1);
                $new_student->user_type = 3;
                $new_student->save();
                
                $new_addmission->parent_id = $parentInfo->id;
                $new_addmission->update();
            }else{
                $parent_id = ParentInfo::where(['mobile_no'=>$new_addmission->father_contact_no1])->first()->id;
                $new_addmission->parent_id = $parent_id;
                $new_addmission->update();
            }




            }catch(\Exception $e){
                array_push($notDone,$data);
            }
        }
        // DB::commit();
        return $this->ReS(["message"=>"Data Inserted",'notDone'=>$notDone]);
    }
    public function addStudentAdmission(Request $request){
        $request->validate([
            'roll_no'=>"required|string|unique:student_infos",
            'class_id'=>"required|integer",
            'student_name'=>'required|string',
            'father_name'=>'required|string',
            'handicapped'=>'required|string',
            'father_contact_no1'=>'required|string',
        ]);
        DB::beginTransaction();
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);

        $new_addmission = new StudentInfo;
        $new_addmission->school_id = $school_id;
        $new_addmission->roll_no = $request->roll_no;
        $new_addmission->class_id = $request->class_id;
        $new_addmission->religion = $request->religion;
        $new_addmission->caste = $request->caste;
        $new_addmission->student_name = $request->student_name;
        $new_addmission->father_name = $request->father_name;
        $new_addmission->mother_name = $request->mother_name;
        $new_addmission->father_contact_no1 = $request->father_contact_no1;
        $new_addmission->father_contact_no2 = $request->father_contact_no2;
        $new_addmission->father_email = $request->father_email;
        $new_addmission->student_email = $request->student_email;
        $new_addmission->dob = $request->dob;
        $new_addmission->age = $request->age;
        $new_addmission->gender = $request->gender;
        $new_addmission->father_occupation = $request->father_occupation;
        $new_addmission->mother_occupation = $request->mother_occupation;
        $new_addmission->guardian_name = $request->guardian_name;
        $new_addmission->guardian_occupation = $request->guardian_occupation;
        $new_addmission->dob = $request->dob;
        $new_addmission->year_id = $year_id;
        $new_addmission->save();

        $new_addmission->address()->create([
            'student_address'=>$request->student_address,
            'place'=>$request->place,
            'block'=>$request->block,
            'district'=>$request->district,
            'state'=>$request->state,
            'landmark'=>$request->landmark,
            'pincode'=>$request->pincode,
            'student_info_id'=>$new_addmission->id
        ]);
        $new_addmission->documents()->create([
            'student_aadhar_card'=>$request->student_aadhar_card,
            'father_aadhar_card'=>$request->father_aadhar_card,
            'father_bank_name'=>$request->father_bank_name,
            'father_bank_number'=>$request->father_bank_number,
            'student_bank_name'=>$request->student_bank_name,
            'student_bank_number'=>$request->student_bank_number,
            'student_info_id'=>$new_addmission->id
        ]);
        
        $student_photo = null;
        $father_photo = null;
        $mother_photo = null;
        $last_marksheet = null;
        $income_certificate = null;
        $transfer_certificate = null;
        $caste_certificate = null;
        $transfer_certificate = null;
        $dob_certificate = null;
        $student_aadhar_card_photo = null;
        $father_aadhar_card_photo = null;

        if($request->hasFile('student_photo'))
            $student_photo = $this->uploadFile($request->student_photo)['url'];
        if($request->hasFile('father_photo'))
            $father_photo = $this->uploadFile($request->father_photo)['url'];
        if($request->hasFile('mother_photo'))
            $mother_photo = $this->uploadFile($request->mother_photo)['url'];
        if($request->hasFile('income_certificate'))
            $income_certificate = $this->uploadFile($request->income_certificate)['url'];
        if($request->hasFile('transfer_certificate'))
            $transfer_certificate = $this->uploadFile($request->transfer_certificate)['url'];
        if($request->hasFile('caste_certificate'))
            $caste_certificate = $this->uploadFile($request->caste_certificate)['url'];
        if($request->hasFile('dob_certificate'))
            $dob_certificate = $this->uploadFile($request->dob_certificate)['url'];
        if($request->hasFile('student_aadhar_card_photo'))
            $student_aadhar_card_photo = $this->uploadFile($request->student_aadhar_card_photo)['url'];
        if($request->hasFile('father_aadhar_card_photo'))
            $father_aadhar_card_photo = $this->uploadFile($request->father_aadhar_card_photo)['url'];

        $new_addmission->photos()->create([
            'student_photo'=>$student_photo,
            'father_photo'=>$father_photo,
            'mother_photo'=>$mother_photo,
            'last_marksheet'=>$last_marksheet,
            'income_certificate'=>$income_certificate,
            'transfer_certificate'=>$transfer_certificate,
            'caste_certificate'=>$caste_certificate,
            'transfer_certificate'=>$transfer_certificate,
            'dob_certificate'=>$dob_certificate,
            'student_aadhar_card_photo'=>$student_aadhar_card_photo,
            'father_aadhar_card_photo'=>$father_aadhar_card_photo,
            'student_info_id'=>$new_addmission->id
        ]);

        $checkExist = ParentInfo::where(['mobile_no'=>$request->father_contact_no1,'school_id'=>$school_id,'year_id'=>$year_id])->count();
        if($checkExist == 0){
            $parentInfo = new ParentInfo;
            $parentInfo->name = $new_addmission->father_name;
            $parentInfo->mobile_no = $new_addmission->father_contact_no1;
            $parentInfo->school_id = $school_id;
            $parentInfo->year_id = $year_id;
            $parentInfo->save();

            $new_student = new User;
            $new_student->name = $request->father_name;
            $new_student->login_text = $request->father_contact_no1;
            $new_student->school_id = $school_id;
            $new_student->year_id = $year_id;
            $new_student->profile_pic = $father_photo;
            $new_student->password = bcrypt($request->father_contact_no1);
            $new_student->user_type = 3;
            $new_student->save();
            
            $new_addmission->parent_id = $parentInfo->id;
            $new_addmission->update();
        }else{
            $parent_id = ParentInfo::where(['mobile_no'=>$request->father_contact_no1])->first()->id;
            $new_addmission->parent_id = $parent_id;
            $new_addmission->update();
        }


        
        $new_parent = new User;
        $new_parent->name = $request->student_name;
        $new_parent->login_text = $request->roll_no;
        $new_parent->school_id = $school_id;
        $new_parent->year_id = $year_id;
        $new_parent->profile_pic = $student_photo;
        $new_parent->password = bcrypt($request->father_contact);
        $new_parent->user_type = 2;
        $new_parent->save();


        $updateRollNo = StudentRollNo::where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$request->class_id
        ])->first();
        $updateRollNo->increment('roll_id');
        $updateRollNo->update();
        DB::commit();
        return $this->ReS(["message"=>"Student Inserted into System."]);
    }
    public function updateStudentAdmission(Request $request){
        $request->validate([
            'roll_no'=>"required|string",
            'class_id'=>"required|integer",
            'student_name'=>'required|string',
            'father_name'=>'required|string',
            'handicapped'=>'required|string',
            'father_contact_no1'=>'required|string',
        ]);
        if($request->id){
        $new_addmission = StudentInfo::find($request->id);
        $school_id = $this->getSchoolId($request);
        $new_addmission->school_id = $school_id;
        $new_addmission->roll_no = $request->roll_no;
        $new_addmission->class_id = $request->class_id;
        $new_addmission->religion = $request->religion;
        $new_addmission->caste = $request->caste;
        $new_addmission->student_name = $request->student_name;
        $new_addmission->father_name = $request->father_name;
        $new_addmission->mother_name = $request->mother_name;
        $new_addmission->father_contact_no1 = $request->father_contact_no1;
        $new_addmission->father_contact_no2 = $request->father_contact_no2;
        $new_addmission->father_email = $request->father_email;
        $new_addmission->student_email = $request->student_email;
        $new_addmission->dob = $request->dob;
        $new_addmission->age = $request->age;
        $new_addmission->gender = $request->gender;
        $new_addmission->father_occupation = $request->father_occupation;
        $new_addmission->mother_occupation = $request->mother_occupation;
        $new_addmission->guardian_name = $request->guardian_name;
        $new_addmission->guardian_occupation = $request->guardian_occupation;
        $new_addmission->dob = $request->dob;
        $new_addmission->year_id = $this->getSchoolYearId($request);
        $new_addmission->save();

        $new_addmission->address()->update([
            'student_address'=>$request->student_address,
            'place'=>$request->place,
            'block'=>$request->block,
            'district'=>$request->district,
            'state'=>$request->state,
            'landmark'=>$request->landmark,
            'pincode'=>$request->pincode,
            'student_info_id'=>$new_addmission->id
        ]);
        $new_addmission->documents()->update([
            'student_aadhar_card'=>$request->student_aadhar_card,
            'father_aadhar_card'=>$request->father_aadhar_card,
            'father_bank_name'=>$request->father_bank_name,
            'father_bank_number'=>$request->father_bank_number,
            'student_bank_name'=>$request->student_bank_name,
            'student_bank_number'=>$request->student_bank_number,
            'student_info_id'=>$new_addmission->id
        ]);
        
        $student_photo = $request->student_photo;
        $father_photo = $request->father_photo;
        $mother_photo = $request->mother_photo;
        $last_marksheet = $request->last_marksheet;
        $income_certificate = $request->income_certificate;
        $transfer_certificate = $request->transfer_certificate;
        $caste_certificate = $request->caste_certificate;
        $dob_certificate = $request->dob_certificate;
        $student_aadhar_card_photo = $request->student_aadhar_card_photo;
        $father_aadhar_card_photo = $request->father_aadhar_card_photo;

        if($request->hasFile('student_photo'))
            $student_photo = $this->uploadFile($request->student_photo)['url'];
        if($request->hasFile('father_photo'))
            $father_photo = $this->uploadFile($request->father_photo)['url'];
        if($request->hasFile('mother_photo'))
            $mother_photo = $this->uploadFile($request->mother_photo)['url'];
        if($request->hasFile('income_certificate'))
            $income_certificate = $this->uploadFile($request->income_certificate)['url'];
        if($request->hasFile('transfer_certificate'))
            $transfer_certificate = $this->uploadFile($request->transfer_certificate)['url'];
        if($request->hasFile('caste_certificate'))
            $caste_certificate = $this->uploadFile($request->caste_certificate)['url'];
        if($request->hasFile('dob_certificate'))
            $dob_certificate = $this->uploadFile($request->dob_certificate)['url'];
        if($request->hasFile('student_aadhar_card_photo'))
            $student_aadhar_card_photo = $this->uploadFile($request->student_aadhar_card_photo)['url'];
        if($request->hasFile('father_aadhar_card_photo'))
            $father_aadhar_card_photo = $this->uploadFile($request->father_aadhar_card_photo)['url'];

            $new_addmission->photos()->update([
                'student_photo'=>$student_photo,
                'father_photo'=>$father_photo,
                'mother_photo'=>$mother_photo,
                'last_marksheet'=>$last_marksheet,
                'income_certificate'=>$income_certificate,
                'transfer_certificate'=>$transfer_certificate,
                'caste_certificate'=>$caste_certificate,
                'transfer_certificate'=>$transfer_certificate,
                'dob_certificate'=>$dob_certificate,
                'student_aadhar_card_photo'=>$student_aadhar_card_photo,
                'father_aadhar_card_photo'=>$father_aadhar_card_photo,
                'student_info_id'=>$new_addmission->id
            ]);
            return $this->ReS(["message"=>"Data Updated !!"]);
        }
    }
    public function getStudentById(Request $request,$student_id){
        $year_id = $this->getSchoolYearId($request);  
        $school_id = $this->getSchoolId($request);
        $studentInfo = StudentInfo::with('class','photos','documents','address')->where("id",$student_id)->first();
        return $this->ReS(['studentInfo'=>$studentInfo]);
    }
    public function listStudentByClass(Request $request,$class_id){
        $year_id = $this->getSchoolYearId($request);   
        $students = StudentInfo::with(['class','address','documents'])->where(['year_id'=>$year_id,"class_id"=>$class_id])->orderBy('roll_no')->get();
        return $this->ReS(["students"=>$students]);
    }
    public function listAllCurrentStudent(Request $request){
        $year_id = $this->getSchoolYearId($request);   
        $students = StudentInfo::with(['class','address','documents'])->where('year_id',$year_id)->get();
        return $this->ReS(["students"=>$students]);
    }
    public function studentsSearchableLimitByClassID(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);   

        $all_student = StudentInfo::where(['school_id'=>$school_id,"year_id"=>$year_id])->where('class_id',$class_id)->select('class_id','student_name','roll_no','id')->limit(50)->get();
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
        $year_id = $this->getSchoolYearId($request);
        $all_student = StudentInfo::where(['school_id'=>$school_id,"year_id"=>$year_id])->select('class_id','student_name','roll_no','id')->limit(600)->get();
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
    public function demo(Request $request){

dd(SoapWrapper::add());
    //     dd(SoapWrapper::add(function ($service) {
    //         $service
    //         ->name('OpInstruments')
    //         ->wsdl('https://www.qe.com.qa/Process/WSInterfaces/intf-ExchangeStats.serviceagent?wsdl')
    //         ->trace(true);
    //       }));
    //     $data = [
    //           'USERID' => 'widam',
    //           'PASSWORD'   => 'wid@2019#',
    //           'MARKETTYPE'   => '510',
    //           'INSTRUMENTTYPE'   => 'A',
    //          ];
    //     SoapWrapper::service('currency', function ($service) use ($data) {

    //             var_dump($service->call('Login', [$data]));
    //             var_dump($service->call('Otherfunction'));
    // });
    }
}
