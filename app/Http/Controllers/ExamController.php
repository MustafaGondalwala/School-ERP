<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExamType;
use App\ExamHallTicketClass;
use App\ExamMarksheet;
use \DB;
use App\StudentInfo;
use App\Classes;

class ExamController extends Controller
{
    public function getExamMarksheet($subjects,$school_id,$student_id,$class_id,$exam_type,$year){
        return ExamMarksheet::with(['subject'])->whereIn('subject_id',$subjects)->where([
            'school_id'=>$school_id,
            'student_id'=>$student_id,
            'class_id'=>$class_id,
            'exam_type'=>$exam_type,
            'year_id'=> $year
        ])->orderBy('subject_id')->get();
    }

    public function fetchMarksheetIndividual(Request $request){
        if($request->isMethod('post')){
            $request->validate([
                "class_id"=>"required|integer",
                "exam_type"=>"required|integer",
                "subjects"=>"required|array",
            ]);
            $school_id = $this->getSchoolId($request);
            $class_id = $request->class_id;
            $exam_type = $request->exam_type;
            $student_id = $request->student_id;
            if($request->year == null)
                $year = $this->getCurrentYear($request);
            else
                $year = $request->year;
                try{
                    DB::beginTransaction();
                    foreach($request->subjects as $subject_id){
                        $checkIfExist = ExamMarksheet::where('subject_id',$subject_id)->where([
                            'school_id'=>$school_id,
                            'student_id'=>$student_id,
                            'class_id'=>$class_id,
                            'exam_type'=>$exam_type,
                            'year_id'=> $year
                        ])->count();
                        if($checkIfExist == 0){
                                $new_exammarksheet = new ExamMarksheet;
                                $new_exammarksheet->school_id = $school_id;
                                $new_exammarksheet->student_id = $student_id;
                                $new_exammarksheet->class_id = $class_id;
                                $new_exammarksheet->subject_id = $subject_id;
                                $new_exammarksheet->year_id = $year;
                                $new_exammarksheet->exam_type = $exam_type;
                                $new_exammarksheet->user_id = Auth()->id();
                                $new_exammarksheet->user_type = "App\Admin";
                                $new_exammarksheet->save();
                        }
                    }
                    DB::commit();
                }catch(\Exception $e){
                    DB::rollback();
                    return $this->ReE(["message"=>$e->getMessage()]);
                }
            $student_info = StudentInfo::find($student_id);
            $class_info = Classes::find($class_id);
            $exam_marksheet = $this->getExamMarksheet($request->subjects,$school_id,$student_id,$class_id,$exam_type,$year);
            return $this->ReS(["exam_marksheet"=>$exam_marksheet,"class_info"=>$class_info,"student_info"=>$student_info]);
        }else if($request->isMethod('put')){
            $request->validate([
                'exam_marksheet'=>'required|array'
            ]);
            $exam_marksheet = $request->exam_marksheet;
            foreach($exam_marksheet as $item){
                ExamMarksheet::find($item['id'])->update([
                    'min_marks'=>$item['min_marks'],
                    'max_marks'=>$item['max_marks'],
                    'total_marks'=>$item['total_marks'],
                    'grade'=>$item['grade'],
                ]);
            }
            return $this->ReS(["exam_marksheet"=>$exam_marksheet]);
        }
    }
        
    public function fetchExamMarksheet(Request $request){
        if($request->isMethod('post')){
            $request->validate([
                "class_id"=>"required|integer",
                "exam_type"=>"required|integer",
                "subjects"=>"required|array",
            ]);
            $school_id = $this->getSchoolId($request);
            $class_id = $request->class_id;
            $exam_type = $request->exam_type;
            if($request->year == null)
                $year = $this->getCurrentYear($request);
            else
                $year = $request->year;
            $students = StudentInfo::select('id','student_name','father_name')->where("class_id",$class_id)->get();
            return $this->ReS(["students"=>$students]);
            // foreach($request->subjects as $subject_id){
            //     $checkIfExist = ExamMarksheet::whereIn('student_id',$student_ids)->where('subject_id',$subject_id)->count();
            //     if($checkIfExist == 0){
            //         try{
            //             DB::beginTransaction();
            //             foreach($student_ids as $ids){
            //                 $new_exammarksheet = new ExamMarksheet;
            //                 $new_exammarksheet->school_id = $school_id;
            //                 $new_exammarksheet->student_id = $ids;
            //                 $new_exammarksheet->class_id = $class_id;
            //                 $new_exammarksheet->subject_id = $subject_id;
            //                 $new_exammarksheet->user_id = Auth()->id();
            //                 $new_exammarksheet->user_type = "App\Admin";
            //                 $new_exammarksheet->save();
            //             }
            //             DB::commit();
            //         }catch(\Exception $e){
            //             DB::rollback();
            //             return $this->ReE(["message"=>$e->getMessage()]);
            //         }
            //     }
            // }
        }
    }
    private function getHallTicket($school_id,$subjects,$class_id,$year_id,$exam_type){
        return ExamHallTicketClass::with('subject')->whereIn('subject_id',$subjects)->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'exam_type'=>$exam_type
        ])->orderBy('subject_id')->get();
    }
    public function fetchExamHallTicket(Request $request){
        if($request->isMethod('post')){
            $request->validate([
                "class_id"=>"required|integer",
                "exam_type"=>"required|integer",
                "subjects"=>"required|array",
            ]);
            $school_id = $this->getSchoolId($request);
            $class_id = $request->class_id;
            $exam_type = $request->exam_type;
            if($request->year == null)
                $year = $this->getCurrentYear($request);
            else
                $year = $request->year;
            try{
                DB::beginTransaction();
                foreach($request->subjects as $subject){
                    $hallticket = ExamHallTicketClass::where([
                        'school_id'=>$school_id,
                        'class_id'=>$class_id,
                        'exam_type'=>$exam_type,
                        'year_id'=>$year,
                        'subject_id'=>$subject,
                    ])->count();
                    if($hallticket == 0){
                        $hallticket = new ExamHallTicketClass;
                        $hallticket->school_id = $school_id;
                        $hallticket->class_id = $class_id;
                        $hallticket->exam_type = $exam_type;
                        $hallticket->subject_id = $subject;
                        $hallticket->year_id = $year;
                        $hallticket->save();
                    }
                }
                DB::commit();
            }catch(\Exception $e){
                DB::rollback();
                return $this->ReE(["message"=>$e->getMessage()]);
            }
            $data = $this->getHallTicket($school_id,$request->subjects,$class_id,$year,$exam_type);
            return $this->ReS(["class_hallticket"=>$data]); 
        }else if($request->isMethod('put')){
            $request->validate([
                'class_hallticket'=>"required|array"
            ]);
            try{
                DB::beginTransaction();
                foreach($request->class_hallticket as $class_hallticket){
                    $update = ExamHallTicketClass::find($class_hallticket['id'])->update([
                        'start_time'=>$class_hallticket['start_time'],
                        'end_time'=>$class_hallticket['end_time'],
                        'exam_date'=>$class_hallticket['exam_date'],
                    ]);
                }
                DB::commit();
            }catch(\Exception $e){
                DB::rollback();
                return $this->ReE(["message"=>$e->getMessage()]);
            }
            return $this->ReS(["message"=>"Hall Ticket Updated "]);
        }
    }
    public function removeExamType(Request $request,$exam_type_id){
        $school_id = $this->getSchoolId($request);
        $delete = ExamType::find($exam_type_id)->delete();
        if($delete == 0){
            return $this->ReE(["message"=>"Cannot Find the Exam Type in System."]);
        }else{
            return $this->ReS(["exam_types"=>$this->getExamTypeP($school_id),"message"=>"Exam Type Removed from System."]);
        }
    }
    public function getExamType(Request $request){
        $school_id = $this->getSchoolId($request);
        return $this->ReS(["exam_types"=>$this->getExamTypeP($school_id)]);
    }
    private function getExamTypeP($school_id){
        return ExamType::select('id','exam_type')->where('school_id',$school_id)->get();
    }
    public function addExamType(Request $request){
        $request->validate([
            'exam_type'=>'required|string'
        ]);
        $exam_type = $request->exam_type;
        $school_id = $this->getSchoolId($request);
        $checkIfExist = ExamType::where(['school_id'=>$school_id,"exam_type"=>$exam_type])->count();
        if($checkIfExist == 0){
            $new_type = new ExamType;
            $new_type->exam_type = $exam_type;
            $new_type->school_id = $school_id;
            $new_type->save();
            return $this->ReS(["exam_types"=>$this->getExamTypeP($school_id),"message"=>"New Exam Type Added!"]);
        }else{
            return $this->ReE(["message"=>"Exam Type Already Exists"],422);
        }
    }

}
