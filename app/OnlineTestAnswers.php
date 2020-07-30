<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OnlineTestAnswers extends Model
{
    protected $fillable = [
        'question_id', 'questionpaper_id','correct','final_marks'
    ];
}
