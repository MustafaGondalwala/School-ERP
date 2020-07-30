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
    public function teacherwithStaff(){
        return $this->belongsTo(Teacher::class,'teacher_id')->with('user');
    }
    public function studenthomework(){
        return $this->hasMany(HandleHomeWork::class,'homework_id');
    }
    public function subject(){
        return $this->belongsTo(Subjects::class,'subject_id');
    }
    public function homeworkcheck(){
        return $this->hasOne(HandleHomeWork::class,'homework_id')->with('attachments');
    }
    public function attachments() 
    { 
        return $this->morphMany(File::class, 'type');
    }
}
