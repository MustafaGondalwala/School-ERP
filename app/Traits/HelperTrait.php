<?php 
namespace App\Traits;
use App\ParentInfo;
use Illuminate\Support\Str;
use App\SystemYear;
use App\FeeInstallments;
use App\ClassPeriod;
use \Cloudder;
use App\SchoolInfo;
use App\File;
use App\StudentRollNo;
use Illuminate\Support\Facades\Storage;
use App\SubjectClasswise;
use App\MonthlyTestType;
use App\MonthlyTestMarksheet;
use App\MonthlyTestStudent;
use App\ExamMarksheet;

trait HelperTrait{
    public function ReS($data){
        return response()->json(["success"=>$data]);
    }
    public function ReE($data,$status=400){
        return response()->json(["error"=>$data],$status);
    }

    public function getSchoolUniqueCode($school_id){
        return SchoolInfo::find($school_id)->unique_id_code;
    }
    public function getRollNo($class_id,$school_id,$year_id){
        $data = StudentRollNo::where([
            'year_id'=>$year_id,
            'school_id'=>$school_id,
            'class_id'=>$request->class_id
        ])->first();
        return $data;
    }

    public function bulkFileUpdate($files,$instance)
    {
        foreach($files as $file){
                $upload_data = $this->uploadFile($file);
                $new_file = new File;
                $new_file->file_url = $upload_data['url'];
                $new_file->extension = $file->getClientOriginalExtension();
                $new_file->type_type = get_class($instance);
                $new_file->type_id = $instance->id;
                $new_file->save();
        }
        return true;
    }  
    public function deletePhoto($old_photo){
        if($old_photo == NULL || $old_photo == "")
            return false;
        else{
            return true;
        }
    }
    public function fetchCorrectPhoto($fileOrString){
        $send_photo = "";
        if($fileOrString == NULL || $fileOrString == "")
            $send_photo = "";
        else if(is_string($fileOrString))
            $send_photo = $fileOrString;
        else
            $send_photo = $this->uploadFile($fileOrString)['url'];
        return $send_photo;
    }

    public function getMonthlyTestStudents($school_id,$student_id,$class_id,$monthy_test_type,$year_id,$subjects){
        return MonthlyTestStudent::with('student')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'monthly_test_type'=>$monthy_test_type
        ])->get();
    }


    public function getExamMarksheet($school_id,$student_id,$class_id,$exam_type,$year_id,$subjects){
        return ExamMarksheet::with(['subject'])->whereIn('subject_id',$subjects)->where([
            'school_id'=>$school_id,
            'student_id'=>$student_id,
            'class_id'=>$class_id,
            'exam_type'=>$exam_type,
            'year_id'=> $year_id
        ])->orderBy('subject_id')->get();
    }

    public function getMonthlyTestMarksheet($school_id,$student_id,$class_id,$monthy_test_type,$year_id,$subjects){
        return MonthlyTestMarksheet::with(['subject'])->whereIn('subject_id',$subjects)->where([
            'school_id'=>$school_id,
            'student_id'=>$student_id,
            'class_id'=>$class_id,
            'monthy_test_type'=>$monthy_test_type,
            'year_id'=> $year_id
        ])->orderBy('subject_id')->get();
    }
    public function getClassWiseOnlySubjectId($school_id,$year_id,$class_id){
        $data = SubjectClasswise::select('subject_id')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->get()->pluck('subject_id');
        return $data;
    }
    public function getClassWiseSubject($school_id,$year_id,$class_id){
        $data = SubjectClasswise::with('subject')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->get();
        return $data;
    }
    public function getSchoolId($request){
        return $request->header('Auth-School-Id');
    }
    public function getSchoolYearId($request){
        return $request->header('Auth-School-Year');
    }

    public function getMonthlyTest($school_id,$year_id){
        $data = MonthlyTestType::where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->get();
        return $data;
    }

    public function getTeacherId(){
      return Auth()->user()->profile()->first()->id; 
    }
    public function getClassPeriods($school_id){
        return ClassPeriod::select('id','period_id','start_time','end_time')->where("school_id",$school_id)->orderBy('period_id')->get();
    }
    public function getCurrentYear($request){
        $school_id = $request->header('Auth-School-Id');
        return SystemYear::where([
            'school_info_id'=>$school_id,
            'selected'=>1
        ])->first()->id;
    }

    public function getInstallment($school_id){
        $installments = FeeInstallments::select('installment','id')->where('school_info_id',$school_id)->get();
        return $installments;
    }
    public function getSchool(){
        return Auth()->user()->school()->first();
    }
    public function createStudentLogin($student_info){
        $roll_no = $student_info->roll_no;
        $student_info->user()->create([
            "name"=>$student_info->student_name,
            "password"=>bcrypt($roll_no),
            "user_type"=>2,
            "login_text"=>$roll_no,
            "school_id"=>$student_info->school_info_id,
            "profile_pic"=>$student_info->student_photo
            ]);
        return true;
    }
    public function createParentLogin($student_info){
        $new_parent = new ParentInfo;
        $new_parent->name = $student_info->student_name;
        $new_parent->mobile_no = $student_info->father_contact_no1;
        $new_parent->student_info_id = $student_info->id;
        $new_parent->save();
        $new_parent->user()->create([
            "name"=>$student_info->father_name,
            "password"=>bcrypt($student_info->father_contact_no1),
            "user_type"=>3,
            "login_text"=>$student_info->father_contact_no1,
            "school_id"=>$student_info->school_id,
            "profile_pic"=>$student_info->father_photo,
            "school_id"=>$student_info->school_info_id,
        ]);
        return $new_parent->id;
    }
    public function uploadFile($file){
        $image_name = Str::random(45);
        $folder = '/uploads/images';
        $sendData = [];
        $filepath = $file->storeAs($folder, $image_name . '.' . $file->getClientOriginalExtension() , 'public');
        $sendData['url'] = "/storage/".$filepath;
        $sendData['public_id'] = $image_name;
        return $sendData;
    }
}

    

