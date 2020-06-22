<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentAddress extends Model
{
    //
    protected $fillable = [
      'student_address',
      'place',
      'block',
      'district',
      'state',
      'landmark',
      'pincode',
      'student_info_id'
    ];
}
