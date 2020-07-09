<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthlyTestMarksheet extends Model
{
    protected $fillable = [
        'grade', 'min_marks','max_marks','total_marks'
    ];
    public function subject(){
        return $this->belongsTo(Subjects::class,'subject_id');
    }   
}
