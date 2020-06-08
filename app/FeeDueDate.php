<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeeDueDate extends Model
{
    protected $fillable = [
        'last_due_date'
    ];
    public function year(){
        
    }
}
