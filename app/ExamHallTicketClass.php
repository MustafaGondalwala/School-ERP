<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExamHallTicketClass extends Model
{
    protected $fillable = [
        'start_time', 'end_time', 'exam_date'
    ];
    public function subject(){
        return $this->belongsTo(Subjects::class,'subject_id');
    }
    public function class(){
        return $this->belongsTo(Classes::class,'class_id');
    }
    public function year(){
        return $this->belongsTo(SystemYear::class,'year_id');
    }
    public function exam_type(){
        return $this->belongsTo(ExamType::class,'exam_type');
    }
}
