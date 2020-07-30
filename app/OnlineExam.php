<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OnlineExam extends Model
{
    protected $fillable = [
        'exam_type','exam_type_id', 'exam_date', 'start_time','end_time','questionpaper_id','class_id','remark','school_id','year_id','teacher_id'
    ];
    public function class(){
        return $this->belongsTo(Classes::class,'class_id');
    }
    public function teacher(){
        return $this->belongsTo(Teacher::class,'teacher_id');
    }
    public function questionpaper(){
        return $this->belongsTo(QuestionPaper::class,'questionpaper_id')->with('question');
    }
    public function withStudentAnswers(){
        return $this->hasMany(OnlineTestMarksheet::class,'onlinetest_id')->with('answers','student');
    }
    public function monthyTestType(){
        return $this->belongsTo(MonthlyTesTType::class,'exam_type_id');
    }
    public function examType(){
        return $this->belongsTo(ExamType::class,'exam_type_id');
    }
}
