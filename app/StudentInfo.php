<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentInfo extends Model
{
    protected $table = 'student_infos';
    protected $fillable = [
        'login_text','school_id','roll_no','user_type','father_contact_no1'
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
    public function address(){
        return $this->hasOne(StudentAddress::class,'student_info_id');
    }
    public function documents(){
        return $this->hasOne(StudentDocuments::class,'student_info_id');
    }
    public function photos(){
        return $this->hasOne(StudentPhoto::class,'student_info_id');
    }
}
