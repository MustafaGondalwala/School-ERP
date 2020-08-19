<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthlyTestType extends Model
{
    protected $fillable = [
        'publish','publish_at'
    ];
    public function student_marks(){
        return $this->hasMany(MonthlyTestStudent::class,'monthly_test_type')->with('student')->orderBy('total_marks','DESC');
    }
    public function subjects(){
        return $this->hasMany('App\MonthlyTestSubjects','monthlytest_id','id')->with('subject');
    }
}
