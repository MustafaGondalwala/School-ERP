<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentDocuments extends Model
{
    protected $fillable = [
        'student_aadhar_card',
        'father_aadhar_card',
        'father_bank_name',
        'father_bank_number',
        'student_bank_name',
        'student_bank_number',
      ];
}
