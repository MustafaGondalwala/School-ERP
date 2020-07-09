<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExamMarkSheetStudents extends Model
{
    protected $fillable = [
        'grade', 'remark','status','publish_at'
    ];
    public function student(){
        return $this->belongsTo('App\StudentInfo','student_id');
    }
}
