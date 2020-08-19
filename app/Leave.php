<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $fillable = [
        'status'
    ];
    public function student(){
        return $this->belongsTo(StudentInfo::class,'student_id');
    }
}
