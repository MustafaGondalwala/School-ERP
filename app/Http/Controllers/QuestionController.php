<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\QuestionPaper;
use App\Questions;
class QuestionController extends Controller
{
    public function removeQuestion(Request $request,$question_id){
        Questions::find($question_id)->delete();
        $year_id = $this->getSchoolYearId($request);
        return $this->ReS(['questionpaper'=>$this->userAllQuestionPaper($year_id)]);
    }
    public function removeQuestionPaper(Request $request,$questionpaper_id){
        $questionPaper = QuestionPaper::find($questionpaper_id);
        $questionPaper->question()->delete();
        $questionPaper->delete();
        $year_id = $this->getSchoolYearId($request);
        return $this->ReS(['questionpaper'=>$this->userAllQuestionPaper($year_id)]);
    }
    public function addQuestionPaper(Request $request){
        $request->validate([
            'class_id'=>'required|integer',
            'subject_id'=>'required|integer',
            'title'=>'required',
            'marks'=>'required|integer'
        ]);
        $year_id = $this->getSchoolYearId($request);
        $teacher = $request->user()->teacher()->first();
        $questionpaper = new QuestionPaper;
        $questionpaper->title = $request->title;
        $questionpaper->class_id = $request->class_id;
        $questionpaper->subject_id = $request->subject_id;
        $questionpaper->year_id = $year_id;
        $questionpaper->school_id = $this->getSchoolId($request);
        $questionpaper->created_by_id = $teacher->id;
        $questionpaper->created_by_type = "App\Teacher";
        $questionpaper->marks = $request->marks;

        $questionpaper->save();

        // $request->user()->questionpapers()->create([
        //     'title'=>$request->title,
        //     'class_id'=>$request->class_id,
        //     'subject_id'=>$request->subject_id,
        //     'school_id'=>$this->getSchoolId($request),
        //     'year_id'=>$year_id,
        //     'marks'=>$request->marks
        // ]);
        return $this->ReS(['questionpaper'=>$this->userAllQuestionPaper($year_id)]);
    }
    public function userAllQuestionPaper($year_id){
        $teacher = Auth()->user()->teacher()->first();
        return QuestionPaper::with('class','subject','question')->where(['year_id'=>$year_id,"created_by_id"=>$teacher->id])->get();
    }
    public function getQuestionPaper(Request $request){
        $year_id = $this->getSchoolYearId($request);
        return $this->ReS(['questionpaper'=>$this->userAllQuestionPaper($year_id)]);
    }

    public function addQuestion(Request $request,$question_id,$question_type){
        $findOne = QuestionPaper::find($request->question_id);
        $year_id = $this->getSchoolYearId($request);
        switch($question_type){
            case 1:
                $request->validate([
                    'question'=>'required|string',
                    'question_1'=>'required|string',
                    'question_2'=>'required|string',
                    'question_3'=>'required|string',
                    'question_4'=>'required|string',
                    'correct'=>'required|integer',
                ]);
                $findOne->question()->create([
                    'question'=>$request->question,
                    'option_1'=>$request->question_1,
                    'option_2'=>$request->question_2,
                    'option_3'=>$request->question_3,
                    'option_4'=>$request->question_4,
                    'question_type'=>$question_type,
                    'correct'=>$request->correct,
                    'marks'=>$request->marks
                ]);
            break;
            case 2:
            case 3:
                $request->validate([
                    'question'=>'required|string',
                    'correct'=>'required|string',
                ]);
                $findOne->question()->create([
                    'question'=>$request->question,
                    'question_type'=>$question_type,
                    'correct'=>$request->correct,
                    'marks'=>$request->marks
                ]);
            break;
            case 4:
            case 5:
                $request->validate([
                    'question'=>'required|string',
                ]);
                $findOne->question()->create([
                    'question'=>$request->question,
                    'question_type'=>$question_type,
                    'marks'=>$request->marks
                ]);
                break;
        }
        return $this->ReS(['questionpaper'=>$this->userAllQuestionPaper($year_id)]);
    }
}
