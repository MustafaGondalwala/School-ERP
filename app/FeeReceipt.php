<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeeReceipt extends Model
{
    public function receipts(){
        return $this->hasMany(HandleReceipt::class,'receipt_id');
    }
    public function class(){
        return $this->belongsTo(Classes::class,'class_id');
    }
}
