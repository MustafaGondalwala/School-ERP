<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminInfo extends Model
{
    //
    public function user() 
    { 
        return $this->morphOne('App\User', 'profile');
    }

    public function school(){
        return $this->belongsTo('App\SchoolInfo');
    }
}
