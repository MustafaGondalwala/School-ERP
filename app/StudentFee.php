<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentFee extends Model
{
    protected $fillable = [
        'total_pending', 'current_paid', 'temp_paid'
    ];
    public function feeType(){
        return $this->belongsTo('App\FeeType','fee_type_id');
    }
    public function feeInstallment(){
        return $this->belongsTo('App\FeeInstallments','fee_installment_id');
    }
    public function student(){
        return $this->belongsTo('App\StudentInfo','student_id');
    }
}
