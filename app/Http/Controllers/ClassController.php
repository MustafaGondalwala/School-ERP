<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes;
use App\ParentInfo;
use App\StudentInfo;
use \DB;
use App\FeeClassWise;
use App\StudentFee;
use App\ClassPeriod;
use App\StudentTimeTable;
use App\SubjectClasswise;
class ClassController extends Controller
{
    public function deleteSubjectClassWise(Request $request,$class_id,$subject_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $checkIfExist = SubjectClasswise::where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'subject_id'=>$subject_id
        ])->count();
        if($checkIfExist == 0){
            return $this->ReE(["message"=>"Error Occured"],422);
        }
        SubjectClasswise::where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'subject_id'=>$subject_id
        ])->delete();

        $data = $this->getClassWiseSubject($school_id,$year_id,$class_id);
        $message = "Subject Dis-Allocated form Class.";
        return $this->ReS(["subjectclasswise"=>$data,"message"=>$message]);
    }
    public function updateSubjectClassWise(Request $request,$class_id){
        $request->validate([
            'subject_id'=>'required|integer'
        ]);
        
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $subject_id = $request->subject_id;

        $checkIfExist = SubjectClasswise::where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'subject_id'=>$subject_id
        ])->count();
        if($checkIfExist > 0){
            return $this->ReE(["message" => "Subject Already Exists for Class. Try Another Class"],422);
        }
        $new_subject = new SubjectClasswise;
        $new_subject->year_id = $year_id;
        $new_subject->school_id = $school_id;
        $new_subject->subject_id = $subject_id;
        $new_subject->class_id = $class_id;
        $new_subject->save();
        $data = $this->getClassWiseSubject($school_id,$year_id,$class_id);
        $message = "Subject Allocated for Class.";
        return $this->ReS(["subjectclasswise"=>$data,"message"=>$message]);
    }
    public function getSubjectClassWise(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $data = $this->getClassWiseSubject($school_id,$year_id,$class_id);
        return $this->ReS(["subjectclasswise"=>$data]);
    }
    public function publishTimeTable(Request $request){
        $request->validate([
            'publish_timetable'=>'required|array'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        foreach($request->publish_timetable as $key => $value){
            if($value != null){
                Classes::where(['id'=>$key,'year_id'=>$year_id,'school_id'=>$school_id])->update(['time_table_id'=>$value]);
            }
        }
        $classes = Classes::select('id','class_title','section','time_table_id')->where(['school_id'=>$school_id,"year_id"=>$year_id])->get();
        return $this->ReS(["classes"=>$classes]);
    }
    public function deleteClassPeriod(Request $request,$period_id){
        $school_id = $this->getSchoolId($request);
        $deleteClassPeriod = ClassPeriod::where([
            'school_id'=>$school_id,
            'period_id'=>$period_id
        ])->delete();
        $class_periods = $this->getClassPeriodDB($school_id);
        if($deleteClassPeriod){
            return $this->ReS(["message"=>"Class Period Removed !!","class_periods"=>$class_periods]);
        }else{
            return $this->ReE(["message"=>"Error Occured in Proccess !!"],400);
        }
    }
    private function getClassPeriodDB($school_id){
        return ClassPeriod::select('id','period_id','start_time','end_time')->where(["school_id"=>$school_id])->orderBy('period_id')->get();
    }
    public function getClassPeriod(Request $request){
        $school_id = $this->getSchoolId($request);
        $class_periods = $this->getClassPeriodDB($school_id);
        return $this->ReS(["class_periods"=>$class_periods]);
    }
    public function addUpdateClassPeriod(Request $request){
        $request->validate([
            'period_id'=>"required|string",
            "start_time"=>"required|date_format:H:i",
            "end_time"=>"required|date_format:H:i|after:start_time"
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $start_time = $request->start_time;
        $end_time = $request->end_time;
        $period_id = $request->period_id;
        
        $checkIfExist = ClassPeriod::where([
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'period_id'=>$period_id
        ])->count();

        if($checkIfExist){
            $exist_class_period = ClassPeriod::where([
                'school_id'=>$school_id,
                'period_id'=>$period_id,
                'year_id'=>$year_id,
            ])->first();
            $exist_class_period->update([
                "start_time" => $start_time,
                "end_time"=> $end_time
            ]);
            $message = "Class Period Updated!!";
        }else{
            $new_class_period = new ClassPeriod;
            $new_class_period->school_id = $school_id;
            $new_class_period->period_id = $period_id;
            $new_class_period->start_time = $start_time;
            $new_class_period->end_time = $end_time;
            $new_class_period->year_id = $year_id;
            $new_class_period->save();
            $message = "Class Period Added!!";
        }
        $class_periods = $this->getClassPeriodDB($school_id);

        return $this->ReS(["class_periods"=>$class_periods,"message"=>$message]);
    }
    public function addSection(Request $request){
        $request->validate([
            'class'=>'required|string',
            'section'=>'required|string'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class = $request->class;
        $section = $request->section;
        $checkIfExist = Classes::where(['school_id'=>$school_id,"class_title"=>$class,"section"=>$section,"year_id"=>$year_id])->count();
        if($checkIfExist != 0){
            return $this->ReE(["message"=>"Section already Exist. Please Try other"],422);
        }
        $checkClass = Classes::where(["school_id"=>$school_id,"year_id"=>$year_id,"class_title"=>$class,"section"=>NULL])->count();
        if($checkClass == 1){  
            $update_section = Classes::where(["year_id"=>$year_id,"school_id"=>$school_id,"class_title"=>$class])->update([
                'section'=>$section
            ]);
        }else{
            
            $new_class = new Classes;
            $new_class->class_title = $class;
            $new_class->section = $section;
            $new_class->school_id = $school_id;
            $new_class->year_id = $year_id;
            $new_class->save();
        }
        

        $classes = Classes::select('id','class_title','section')->where(['school_id'=>$school_id,"year_id"=>$year_id])->get();
        return $this->ReS(["message"=>"Section Added!!","classes"=>$classes]);
    }
    public function deleteClass(Request $request,$class_title){
        $school_id = $this->getSchoolId($request);
        $classes = Classes::where([
            'school_info_id'=>$school_id,
            'class_title'=>$class_title
        ])->get();
        try {
            DB::beginTransaction();
            foreach($classes as $class){
                $class_id = $class->id;
                $student_infos_ids = StudentInfo::where('classes_id',$class_id)->pluck('id');
                $student_infos = StudentInfo::where('classes_id',$class_id)->delete();
                $check_parent = ParentInfo::whereIn('student_info_id',$student_infos_ids)->delete();
                $fee_classwise = FeeClassWise::where('classes_id',$class_id)->delete();
                $student_fees = StudentFee::where('classes_id',$class_id)->delete();
                $class->delete();
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit();
        $classes = Classes::select('id','class_title','section')->where('school_info_id',$school_id)->get();
        return $this->ReS(["message"=>"Class Deleted","classes"=>$classes]);
    }
    public function updateClass(Request $request){
        $request->validate([
            'new_class_name'=>'required|string',
            'old_classname'=>'required|string',
        ]);
        $old_classname = $request->old_classname;
        $new_class_name = $request->new_class_name;
        $school_id = $this->getSchoolId($request);

        $check_new_class_exist = Classes::where('school_info_id',$school_id)->where("class_title",$new_class_name)->count();
        if($check_new_class_exist != 0){
            return $this->ReE(["message"=>"New Rename Class Already Exist's"],400);
        }
        $checkupdate = Classes::where([
            'class_title'=>$old_classname,
            'school_info_id'=>$school_id
        ])->update([
            'class_title'=> $new_class_name
        ]);
        if($checkupdate > 0){
            $classes = Classes::select('id','class_title','section')->where('school_info_id',$school_id)->get();
            return $this->ReS(["message"=>"Class Rename Successfull !!","classes"=>$classes]);
        }else{
            return $this->ReE(["message"=>"Rename Process has no Affect. Please try Later"],400);
        }
    }

    public function addClass(Request $request){
        $request->validate([
            'new_class'=>'required|string'
        ]);
        $school_info_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $new_class = $request->new_class;
        $checkIfExist = Classes::where([
            'school_id'=>$school_info_id,
            'year_id'=>$year_id,
            'class_title'=>$new_class
        ])->count();
        if($checkIfExist!=0){
            return $this->ReE(["message"=>"Class Already Exist. Please try another"],422);
        }

        $class = new Classes;
        $class->school_id = $school_info_id;
        $class->year_id = $year_id;
        $class->class_title = $new_class;
        $class->save();


        $classes = Classes::select('id','class_title')->distinct()->where(['school_id'=>$school_info_id,"year_id"=>$year_id])->get()->unique('class_title');
        return $this->ReS(["classes"=>$classes]);
    }
    public function getAllClassSection(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $classes = Classes::with('teacher','roll_no')->where(['school_id'=>$school_id,'year_id'=>$year_id])->get();
        return $this->ReS(["classes"=>$classes]);
    }
    public function getDistinctClass(Request $request){
        $school_id = $this->getSchoolId($request);
        $classes = Classes::select('id','class_title')->distinct()->where('school_info_id',$school_id)->get()->unique('class_title');
        return $this->ReS(["classes"=>$classes]);
    }
}
