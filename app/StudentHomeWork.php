<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentHomeWork extends Model
{
    //
    public function classes(){
        return $this->belongsTo(Classes::class,'class_id');
    }
    public function teacher(){
        return $this->belongsTo(Teacher::class,'teacher_id');
    }
    public function subject(){
        return $this->belongsTo(Subjects::class,'subject');
    }
}
