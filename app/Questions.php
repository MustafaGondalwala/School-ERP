<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $fillable = [
        'question_type', 'question', 'option_1','option_2','option_3','option_4','correct','marks'
    ];
}
