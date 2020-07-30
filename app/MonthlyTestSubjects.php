<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthlyTestSubjects extends Model
{
    protected $fillable = [
        'subject_id'
    ];
    public function subject(){
        return $this->belongsTo('App\Subjects','subject_id');
    }
}
