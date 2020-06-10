<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentInfo extends Model
{
    protected $table = 'student_infos';
    protected $fillable = [
        'login_text','school_id','roll_no','user_type'
    ];
    public function user() 
    { 
        return $this->morphOne('App\User', 'profile');
    }

    public function school(){
        return $this->belongsTo('App\SchoolInfo');
    }
    public function parent(){
        return $this->belongsTo('App\ParentInfo');
    }
    public function class()
    {
        return $this->belongsTo(Classes::class,'class_id');
    }
    
}
