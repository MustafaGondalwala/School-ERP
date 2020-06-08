<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentAttendance extends Model
{
    protected $fillable = [
        'status'
    ];

    public function studentInfo(){
        return $this->belongsTo(StudentInfo::class,"student_id");
    }
    public function class(){
        return $this->belongsTo(Classes::class,"class_id");
    }
}
