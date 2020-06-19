<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SystemYear;
class YearController extends Controller
{
    public function getSystemYears(Request $request){
        $school_id = $this->getSchoolId($request);
        $years = SystemYear::select('id','year')->get();
        return $this->ReS(["years"=>$years]);
    }
}
