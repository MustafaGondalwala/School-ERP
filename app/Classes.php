<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $table = "classes";
    protected $fillable = [
        'assigned_teacher_id'
    ];


    public function teacher(){
        return $this->belongsTo(Teacher::class,'assigned_teacher_id');
    }
    public function timetable(){
        return $this->belongsTo(StudentTimeTable::class,'timetable_name','timetable_id');
    }
    public function studentinfo()
    {
        return $this->hasMany('App\StudentInfo','class_id');
    }    
}
