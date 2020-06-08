<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    //

    public function user() 
    { 
        return $this->morphOne('App\Staff', 'user');
    }
    public function profile() 
    { 
        return $this->morphOne('App\User', 'profile');
    }
    public function class(){
        return $this->belongsTo(Classes::class,"assign_class_id");
    }
}
