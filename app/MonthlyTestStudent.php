<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthlyTestStudent extends Model
{
    protected $fillable = [
        'grade', 'remark','status','publish_at','total_marks'
    ];
    public function student(){
        return $this->belongsTo('App\StudentInfo','student_id');
    }
    public function monthlyTest(){
        return $this->belongsTo('App\MonthlyTestType','monthly_test_type');
    }
}
