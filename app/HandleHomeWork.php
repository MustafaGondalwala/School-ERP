<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HandleHomeWork extends Model
{
    public function homework(){
        return $this->belongsTo(StudentHomeWork::class,'homework_id');
    }
}
