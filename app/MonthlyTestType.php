<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthlyTestType extends Model
{
    
    public function subjects(){
        return $this->hasMany('App\MonthlyTestSubjects','monthlytest_id','id')->with('subject');
    }
}
