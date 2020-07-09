<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentPhoto extends Model
{
    protected $fillable = [
       'student_photo',
       'father_photo',
       'mother_photo',
       'last_marksheet',
       'income_certificate',
       'transfer_certificate',
       'caste_certificate',
       'dob_certificate',
       'student_aadhar_card_photo',
       'father_aadhar_card_photo',
    ];

    
}
