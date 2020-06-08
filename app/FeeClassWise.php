<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeeClassWise extends Model
{
    public function feeType(){
        return $this->hasOne('App\FeeType','fee_type','id');
    }
}
