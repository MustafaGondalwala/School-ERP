<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExamMarksheet extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'min_marks', 'max_marks', 'total_marks','grade'
    ];
    public function subject(){
        return $this->belongsTo(Subjects::class,'subject_id');
    } 
    public function student(){
        return $this->belongsTo(StudentInfo::class,'student_id');
    }   
}
