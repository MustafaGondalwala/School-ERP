<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudyMaterial extends Model
{
    public function files() 
    { 
        return $this->morphMany(File::class, 'type');
    }
    public function user()
    {
        return $this->belongsTo('App\Teacher');
    }
}
