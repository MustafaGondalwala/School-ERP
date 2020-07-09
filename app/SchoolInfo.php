<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SchoolInfo extends Model
{
    public function installments(){
        return $this->hasMany('App\FeeInstallments');
    }
    public function fee_type(){
        return $this->hasMany('App\FeeType');
    }
    public function year(){
        return $this->hasMany('App\SystemYear');
    }
    public function photos(){
        return $this->hasMany('App\SchoolPhoto','school_info_id');
    }
}
