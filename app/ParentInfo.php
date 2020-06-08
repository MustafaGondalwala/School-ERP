<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParentInfo extends Model
{
    protected $fillable = [
        'name', 'mobile_no', 'student_id'
    ];

    public function childs(){
        // return $this->mor
        // $t
        return StudentInfo::where('parent_info',$this->id)->get();
    }
    public function user() 
    { 
        return $this->morphOne('App\User', 'profile');
    }
}
