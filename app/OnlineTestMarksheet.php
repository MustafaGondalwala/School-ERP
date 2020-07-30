<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OnlineTestMarksheet extends Model
{
    protected $fillable = [
        'status'
    ];
    public function answers(){
        return $this->hasMany(OnlineTestAnswers::class,'online_marksheet_id');
    }   
    public function student(){
        return $this->belongsTo(StudentInfo::class,'student_id');
    }
}
