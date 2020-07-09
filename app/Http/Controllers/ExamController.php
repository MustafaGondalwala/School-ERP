<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExamType;
use App\ExamHallTicketClass;
use App\ExamMarksheet;
use \DB;
use App\StudentInfo;
use App\Classes;
use App\MonthlyTestType;
use App\MonthlyTestStudent;
use App\ExamMarkSheetStudents;

use App\MonthlyTestMarksheet;
use Carbon\Carbon;

class ExamController extends Controller
{
    // public function addMonthlyTest(Request $request){
    //     $request->validate([
    //         'monthly_test'=>'required|string'
    //     ]);
    //     $year_id = $this->getSchoolYearId($request);
    //     $school_id = $this->getSchoolId($request);
    //     $checkIfExist = MonthlyTestType::where([
    //         'year_id'=>$year_id,
    //         'school_id'=>$school_id,
    //         'monthly_test'=>$request->monthly_test
    //     ])->count();
    //     if($checkIfExist > 0){
    //         return $this->ReE(["message"=>"Monthly Test Already Exists"],422);
    //     }

    //     $new_monthly = new MonthlyTestType;
    //     $new_monthly->school_id = $school_id;
    //     $new_monthly->year_id = $year_id;
    //     $new_monthly->monthly_test = $request->monthly_test;
    //     $new_monthly->save();

    //     return $this->ReS(["monthly_test"=>$this->getMonthlyTest($school_id,$year_id)]);
    // }
    public function removeMonthlyTest(Request $request,$class_id,$month_test_id){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        MonthlyTestType::findOrFail($month_test_id)->delete();
        MonthlyTestMarksheet::where([
            'monthy_test_type'=>$month_test_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id,
            'year_id'=>$year_id
        ])->delete();
        MonthlyTestStudent::where([
            'monthly_test_type'=>$month_test_id,
            'school_id'=>$school_id,
            'class_id'=>$class_id,
            'year_id'=>$year_id
        ])->delete();
        $data = MonthlyTestType::where([
            'class_id'=>$class_id,
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();

        return $this->ReS(['monthlyTest'=>$data,"message"=>"Monthly Test Removed !!"]);

    }
    public function addMonthlyTestType(Request $request,$class_id){
                $request->validate([
                    'monthly_test'=>'required|string'
                ]);
                $year_id = $this->getSchoolYearId($request);
                $school_id = $this->getSchoolId($request);
                $checkIfExist = MonthlyTestType::where([
                    'year_id'=>$year_id,
                    'school_id'=>$school_id,
                    'class_id'=>$class_id,
                    'monthly_test'=>$request->monthly_test
                ])->count();
                if($checkIfExist > 0){
                    return $this->ReE(["message"=>"Monthly Test Already Exists"],422);
                }
        
                $new_monthly = new MonthlyTestType;
                $new_monthly->school_id = $school_id;
                $new_monthly->year_id = $year_id;
                $new_monthly->monthly_test = $request->monthly_test;
                $new_monthly->class_id = $class_id;
                $new_monthly->save();
                $data = MonthlyTestType::where([
                    'class_id'=>$class_id,
                    'year_id'=>$year_id,
                    'school_id'=>$school_id
                ])->get();
        
                return $this->ReS(['monthlyTest'=>$data,"message"=>"Monthly Test Added"]);
    }
    public function getAllMonthlyTestType(Request $request,$class_id){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $data = MonthlyTestType::where([
            'class_id'=>$class_id,
            'year_id'=>$year_id,
            'school_id'=>$school_id
        ])->get();

        return $this->ReS(['monthlyTest'=>$data]);
    }
    public function unpublishExamMarksheet(Request $request,$marksheet_id){
        $update = ExamMarkSheetStudents::find($marksheet_id)->update([
            'status'=>2,
            'publish_at'=>Carbon::now()
        ]);
        $studentMarksheet = ExamMarkSheetStudents::find($marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $exam_type = $studentMarksheet['exam_type'];

        $getAllData = ExamMarkSheetStudents::with('student')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'exam_type'=>$exam_type
        ])->get();
        if($update == true)
            return $this->ReS(["message"=>"Unpublish Marksheet","studentDetails"=>$getAllData]);
        else
            return $this->ReE(["message"=>"Error Occured"]);
    }
    public function publishExamMarksheet(Request $request,$marksheet_id){
        $update = ExamMarkSheetStudents::find($marksheet_id)->update([
            'status'=>3,
            'publish_at'=>Carbon::now()
        ]);
        $studentMarksheet = ExamMarkSheetStudents::find($marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $exam_type = $studentMarksheet['exam_type'];

        $getAllData = ExamMarkSheetStudents::with('student')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'exam_type'=>$exam_type
        ])->get();
        if($update == true)
            return $this->ReS(["message"=>"Publish Marksheet","studentDetails"=>$getAllData]);
        else
            return $this->ReE(["message"=>"Error Occured"]);
    }
    public function getStudentsMarksheet(Request $request){
        $request->validate([
            'class_id'=>'required|integer',
            'exam_type'=>'required|integer'
        ]);
        
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $class_id = $request->class_id;
        $exam_type = $request->exam_type;

        $all_students = StudentInfo::select('id')->where(["class_id"=>$class_id])->get()->pluck('id');
        foreach($all_students as $student){
            $checkIfExist = ExamMarkSheetStudents::where([
                    'class_id'=>$class_id,
                    'school_id'=>$school_id,
                    'year_id'=>$year_id,
                    'student_id'=>$student,
                    'exam_type'=>$exam_type
                ])->count();
            if($checkIfExist == 0){
                $new_student = new ExamMarkSheetStudents;
                $new_student->student_id = $student;
                $new_student->class_id = $class_id;
                $new_student->school_id = $school_id;
                $new_student->year_id = $year_id;
                $new_student->exam_type = $exam_type;
                $new_student->save();
            }
        }

        $getAllData = ExamMarkSheetStudents::with('student')->where([
                            'class_id'=>$class_id,
                            'school_id'=>$school_id,
                            'year_id'=>$year_id,
                            'exam_type'=>$exam_type
                        ])->get();
        return $this->ReS(['studentDetails'=>$getAllData]);
    }
    public function fetchExamHallTicketIndividual(Request $request){
        $request->validate([
            'student_id'=>'required|integer',
            'exam_type'=>'required|integer'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $class_id = StudentInfo::select('class_id')->find($request->student_id)['class_id'];
        $exam_type = $request->exam_type;
        $classWiseSubject = $this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id);
        try{
            DB::beginTransaction();
            foreach($classWiseSubject as $subject_id){
                $hallticket = ExamHallTicketClass::where([
                    'school_id'=>$school_id,
                    'class_id'=>$class_id,
                    'exam_type'=>$exam_type,
                    'year_id'=>$year_id,
                    'subject_id'=>$subject_id, 
                ])->count();

                if($hallticket == 0){
                    $hallticket = new ExamHallTicketClass;
                    $hallticket->school_id = $school_id;
                    $hallticket->class_id = $class_id;
                    $hallticket->exam_type = $exam_type;
                    $hallticket->subject_id = $subject_id;
                    $hallticket->year_id = $year_id;
                    $hallticket->save();
                }
            }
            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()]);
        }
        $data = $this->getHallTicket($school_id,$classWiseSubject,$class_id,$year_id,$exam_type);
        return $this->ReS(["class_hallticket"=>$data,"class_id"=>$class_id]); 
    }
    public function unpublishMarksheet(Request $request,$marksheet_id){
        $update = MonthlyTestStudent::find($marksheet_id)->update([
            'status'=>2,
            'publish_at'=>null
        ]);
        $studentMarksheet = MonthlyTestStudent::find($marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $monthy_test_type = $studentMarksheet['monthly_test_type'];
        $marksheet = $this->getMonthlyTestStudents($school_id,$student_id,$class_id,$monthy_test_type,$year_id,$this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id));
        if($update == true)
            return $this->ReS(["message"=>"UnPublish Marksheet","studentDetails"=>$marksheet]);
        else
            return $this->ReE(["message"=>"Error Occured"]);
    }
    public function publishMarksheet(Request $request,$marksheet_id){
        $update = MonthlyTestStudent::find($marksheet_id)->update([
            'status'=>3,
            'publish_at'=>Carbon::now()
        ]);
        $studentMarksheet = MonthlyTestStudent::find($marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $monthy_test_type = $studentMarksheet['monthly_test_type'];

        $marksheet = $this->getMonthlyTestStudents($school_id,$student_id,$class_id,$monthy_test_type,$year_id,$this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id));
        if($update == true)
            return $this->ReS(["message"=>"Publish Marksheet","studentDetails"=>$marksheet]);
        else
            return $this->ReE(["message"=>"Error Occured"]);
    }
    public function updateExamMarksheet(Request $request){
        $request->validate([
            'marksheet'=>'required|array',
            'marksheet_id'=>'required|integer',
            'exam_type'=>'required|integer'
        ]);
        $student_marksheet_id = $request->marksheet_id;
        $studentMarksheet = ExamMarkSheetStudents::find($student_marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $exam_type = $studentMarksheet['exam_type'];

        try{
            DB::beginTransaction();
            $studentMarksheet = ExamMarkSheetStudents::find($student_marksheet_id)->update([
                'grade'=>$request->grade,
                'remark'=>$request->remark,
                'status'=>2
            ]);

            foreach($request->marksheet as $marksheet){
                ExamMarkSheet::find($marksheet['id'])->update([
                    'grade'=>$marksheet['grade'],
                    'min_marks'=>$marksheet['min_marks'],
                    'max_marks'=>$marksheet['max_marks'],
                    'total_marks'=>$marksheet['total_marks'],
                ]);
            }
            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()]);
        }
        $getAllData = ExamMarkSheetStudents::with('student')->where([
            'class_id'=>$class_id,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
            'exam_type'=>$exam_type
        ])->get();

        // $marksheet = $this->getMonthlyTestStudents($school_id,$student_id,$class_id,$monthy_test_type,$year_id,$this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id));
        return $this->ReS(["message"=>"Student Marksheet Updated!!","marksheet"=>$getAllData]);
    
    }
    public function updateMonthlyTestMarkhsheet(Request $request){
        $request->validate([
            'marksheet'=>'required|array',
            'marksheet_id'=>'required|integer',
        ]);
        $student_marksheet_id = $request->marksheet_id;
        $studentMarksheet = MonthlyTestStudent::find($student_marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $monthy_test_type = $studentMarksheet['monthly_test_type'];
        $subjects = $this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id);
        try{
            DB::beginTransaction();
            $studentMarksheet = MonthlyTestStudent::find($student_marksheet_id)->update([
                'grade'=>$request->grade,
                'remark'=>$request->remark,
                'status'=>2
            ]);

            foreach($request->marksheet as $marksheet){
                MonthlyTestMarksheet::find($marksheet['id'])->update([
                    'grade'=>$marksheet['grade'],
                    'min_marks'=>$marksheet['min_marks'],
                    'max_marks'=>$marksheet['max_marks'],
                    'total_marks'=>$marksheet['total_marks'],
                ]);
            }
            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()]);
        }
        $marksheet = $this->getMonthlyTestStudents($school_id,$student_id,$class_id,$monthy_test_type,$year_id,$subjects);
        return $this->ReS(["message"=>"Student Marksheet Updated!!","marksheet"=>$marksheet]);
    }

    public function getIndividualExamMarksheet(Request $request,$student_marksheet_id){
        $studentMarksheet = ExamMarkSheetStudents::find($student_marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $exam_type = $studentMarksheet['exam_type'];

                $subjects = $this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id);
                try{
                    DB::beginTransaction();
                    foreach($subjects as $subject_id){
                        $checkIfExist = ExamMarksheet::where('subject_id',$subject_id)->where([
                            'school_id'=>$school_id,
                            'student_id'=>$student_id,
                            'class_id'=>$class_id,
                            'exam_type'=>$exam_type,
                            'year_id'=> $year_id
                        ])->count();
                        if($checkIfExist == 0){
                                $new_exammarksheet = new ExamMarksheet;
                                $new_exammarksheet->school_id = $school_id;
                                $new_exammarksheet->student_id = $student_id;
                                $new_exammarksheet->class_id = $class_id;
                                $new_exammarksheet->subject_id = $subject_id;
                                $new_exammarksheet->year_id = $year_id;
                                $new_exammarksheet->exam_type = $exam_type;
                                $new_exammarksheet->user_id = Auth()->id();
                                $new_exammarksheet->user_type = get_class(Auth()->user());
                                $new_exammarksheet->save();
                        }
                    }
                    DB::commit();
                }catch(\Exception $e){
                    DB::rollback();
                    return $this->ReE(["message"=>$e->getMessage()]);
                }
        // $marksheet = $this->getExamMarksheet($school_id,$student_id,$class_id,$exam_type,$year_id,$subjects);
        $marksheet = ExamMarksheet::with(['subject'])->whereIn('subject_id',$subjects)->where([
            'school_id'=>$school_id,
            'student_id'=>$student_id,
            'class_id'=>$class_id,
            'exam_type'=>$exam_type,
            'year_id'=> $year_id
        ])->orderBy('subject_id')->get();
        return $this->ReS(["marksheet"=>$marksheet]);
    }

    public function getIndividualMarksheet(Request $request,$student_marksheet_id){
        $studentMarksheet = MonthlyTestStudent::find($student_marksheet_id);
        $class_id = $studentMarksheet['class_id'];
        $year_id = $studentMarksheet['year_id'];
        $student_id  = $studentMarksheet['student_id'];
        $school_id = $studentMarksheet['school_id'];
        $monthy_test_type = $studentMarksheet['monthly_test_type'];

                $subjects = $this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id);

                try{
                    DB::beginTransaction();
                    foreach($subjects as $subject_id){
                        $checkIfExist = MonthlyTestMarksheet::where('subject_id',$subject_id)->where([
                            'school_id'=>$school_id,
                            'student_id'=>$student_id,
                            'class_id'=>$class_id,
                            'monthy_test_type'=>$monthy_test_type,
                            'year_id'=> $year_id
                        ])->count();
                        if($checkIfExist == 0){
                                $new_exammarksheet = new MonthlyTestMarksheet;
                                $new_exammarksheet->school_id = $school_id;
                                $new_exammarksheet->student_id = $student_id;
                                $new_exammarksheet->class_id = $class_id;
                                $new_exammarksheet->subject_id = $subject_id;
                                $new_exammarksheet->year_id = $year_id;
                                $new_exammarksheet->monthy_test_type = $monthy_test_type;
                                $new_exammarksheet->user_id = Auth()->id();
                                $new_exammarksheet->user_type = get_class(Auth()->user());
                                $new_exammarksheet->save();
                        }
                    }
                    DB::commit();
                }catch(\Exception $e){
                    DB::rollback();
                    return $this->ReE(["message"=>$e->getMessage()]);
                }
        $marksheet = $this->getMonthlyTestMarksheet($school_id,$student_id,$class_id,$monthy_test_type,$year_id,$subjects);
        return $this->ReS(["marksheet"=>$marksheet]);
    }
    public function getStudentsMonthlyTest(Request $request){
        $request->validate([
            "class_id" => "required|integer",
            "monthly_test" => "required|integer"
        ]);
        
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);

        $class_id = $request->class_id;
        $all_students = StudentInfo::select('id')->where(["class_id"=>$class_id])->get()->pluck('id');
        foreach($all_students as $student){
            $checkIfExist = MonthlyTestStudent::where([
                    'class_id'=>$class_id,
                    'school_id'=>$school_id,
                    'year_id'=>$year_id,
                    'student_id'=>$student,
                    'monthly_test_type'=>$request->monthly_test
                ])->count();
            if($checkIfExist == 0){
                $new_student = new MonthlyTestStudent;
                $new_student->student_id = $student;
                $new_student->class_id = $class_id;
                $new_student->school_id = $school_id;
                $new_student->year_id = $year_id;
                $new_student->monthly_test_type = $request->monthly_test;
                $new_student->save();
            }
        }

        $getAllData = MonthlyTestStudent::with('student')->where([
                            'class_id'=>$class_id,
                            'school_id'=>$school_id,
                            'year_id'=>$year_id,
                            'monthly_test_type'=>$request->monthly_test
                        ])->get();
        return $this->ReS(['studentDetails'=>$getAllData]);
    }
    public function deleteMonthlyTest(Request $request,$month_test_id){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        MonthlyTestType::find($month_test_id)->delete();
        return $this->ReS(["message"=>"Delete Monthly Test","monthly_test"=>$this->getMonthlyTest($school_id,$year_id)]);
    }
    public function getAllMonthlyTest(Request $request){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);

        return $this->ReS(["monthly_test"=>$this->getMonthlyTest($school_id,$year_id)]);
    }
    
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
            ]);
            $year_id = $this->getSchoolYearId($request);
            $school_id = $this->getSchoolId($request);
            $class_id = $request->class_id;
            $exam_type = $request->exam_type;
            $student_id = $request->student_id;
            $subjects = $this->getClassWiseOnlySubjectId($school_id,$year_id,$request->class_id);
                try{
                    DB::beginTransaction();
                    foreach($subjects as $subject_id){
                        $checkIfExist = ExamMarksheet::where('subject_id',$subject_id)->where([
                            'school_id'=>$school_id,
                            'student_id'=>$student_id,
                            'class_id'=>$class_id,
                            'exam_type'=>$exam_type,
                            'year_id'=> $year_id
                        ])->count();
                        if($checkIfExist == 0){
                                $new_exammarksheet = new ExamMarksheet;
                                $new_exammarksheet->school_id = $school_id;
                                $new_exammarksheet->student_id = $student_id;
                                $new_exammarksheet->class_id = $class_id;
                                $new_exammarksheet->subject_id = $subject_id;
                                $new_exammarksheet->year_id = $year_id;
                                $new_exammarksheet->exam_type = $exam_type;
                                $new_exammarksheet->user_id = Auth()->id();
                                $new_exammarksheet->user_type = get_class(Auth()->user());
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
            $exam_marksheet = $this->getExamMarksheet($subjects,$school_id,$student_id,$class_id,$exam_type,$year_id);
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
            ]);
            $school_id = $this->getSchoolId($request);
            $class_id = $request->class_id;
            $exam_type = $request->exam_type;
            $year_id = $this->getSchoolYearId($request);
            $students = StudentInfo::select('id','student_name','father_name')->where("class_id",$class_id)->get();
            return $this->ReS(["students"=>$students]);
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
            ]);
            $school_id = $this->getSchoolId($request);
            $year_id = $this->getSchoolYearId($request);

            $class_id = $request->class_id;
            $exam_type = $request->exam_type;
            $classWiseSubject = $this->getClassWiseOnlySubjectId($school_id,$year_id,$class_id);
            try{
                DB::beginTransaction();
                foreach($classWiseSubject as $subject_id){
                    $hallticket = ExamHallTicketClass::where([
                        'school_id'=>$school_id,
                        'class_id'=>$class_id,
                        'exam_type'=>$exam_type,
                        'year_id'=>$year_id,
                        'subject_id'=>$subject_id, 
                    ])->count();

                    if($hallticket == 0){
                        $hallticket = new ExamHallTicketClass;
                        $hallticket->school_id = $school_id;
                        $hallticket->class_id = $class_id;
                        $hallticket->exam_type = $exam_type;
                        $hallticket->subject_id = $subject_id;
                        $hallticket->year_id = $year_id;
                        $hallticket->save();
                    }
                }
                DB::commit();
            }catch(\Exception $e){
                DB::rollback();
                return $this->ReE(["message"=>$e->getMessage()]);
            }
            $data = $this->getHallTicket($school_id,$classWiseSubject,$class_id,$year_id,$exam_type);
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
