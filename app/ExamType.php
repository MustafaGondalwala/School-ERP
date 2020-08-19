<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExamType extends Model
{
    public function student_marksheet(){
        return $this->hasMany(ExamMarksheet::class,'exam_type')->with('student','subject')->orderBy('total_marks','DESC');
    }
}
