<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StaffAttendance extends Model
{
    protected $fillable = [
        'status'
    ];

    public function staff(){
        return $this->belongsTo(Staff::class,"staff_id");
    }
}