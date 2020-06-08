<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassPeriod extends Model
{
    protected $fillable = [
        'start_time', 'end_time'
    ];

}
