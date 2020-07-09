<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeeClassWise extends Model
{
    public function feeType(){
        return $this->belongsTo('App\FeeType','fee_type_id');
    }
    public function feeInstallment(){
        return $this->belongsTo('App\FeeInstallments','fee_installment_id');
    }
}
