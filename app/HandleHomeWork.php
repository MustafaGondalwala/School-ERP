<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HandleHomeWork extends Model
{
    // description
    protected $fillable = [
        'description'
    ];
    public function homework(){
        return $this->belongsTo(StudentHomeWork::class,'homework_id');
    }
    public function student(){
        return $this->belongsTo(StudentInfo::class,'student_id');
    }
    public function attachments() 
    { 
        return $this->morphMany(File::class, 'type');
    }
}
