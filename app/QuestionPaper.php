<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionPaper extends Model
{
    protected $fillable = [
        'title', 'school_id', 'subject_id', 'class_id', 'school_id', 'year_id','marks'
    ];

    protected $hidden = [
        'correct'
    ];
    public function class(){
        return $this->belongsTo(Classes::class,'class_id');
    }
    public function question(){
        return $this->hasMany(Questions::class,'question_id');
    }
    public function subject(){
        return $this->belongsTo(Subjects::class,'subject_id');
    }
    
}
