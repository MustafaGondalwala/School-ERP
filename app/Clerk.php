<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clerk extends Model
{
    public function user() 
    { 
        return $this->morphOne('App\Staff', 'user');
    }
    public function school(){
        return $this->belongsTo('App\SchoolInfo','school_id');
    }
}
