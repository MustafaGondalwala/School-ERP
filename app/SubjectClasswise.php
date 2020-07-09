<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubjectClasswise extends Model
{
    //
    public function subject(){
        return $this->belongsTo(Subjects::class,'subject_id');
    }
}
