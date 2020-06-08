<?php 
namespace App\Traits;
use App\ParentInfo;
use Illuminate\Support\Str;
use App\SystemYear;
use App\FeeInstallments;
use App\ClassPeriod;
trait HelperTrait{
    public function ReS($data){
        return response()->json(["success"=>$data]);
    }
    public function ReE($data,$status=400){
        return response()->json(["error"=>$data],$status);
    }
    public function getSchoolId($request){
        return $request->header('Auth-School-Id');
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
        $image_name = Str::random(25);
        $folder = '/uploads/images';
        $filepath = $file->storeAs($folder, $image_name . '.' . $file->getClientOriginalExtension() , 'public');
        return $filepath;
    }
}

    

