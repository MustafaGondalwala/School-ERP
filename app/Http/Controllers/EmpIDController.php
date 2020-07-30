<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EmpID;
class EmpIDController extends Controller
{
    public function getCurrentEmpid(Request $request){
        $school_id = $this->getSchoolId($request);
        $empid = EmpID::where(['school_id'=>$school_id])->first()->empid;
        $schoolCode = $this->getSchoolUniqueCode($school_id);
        return $this->ReS(["empid"=>$empid,'schoolCode'=>$schoolCode,'next_empid'=>$schoolCode.'-'.$empid]);
    }
    public function updateCurrentEmpid(Request $request){
        $request->validate([
            'tempEmpID'=>'required|string'
        ]);
        $new_empid = $request->tempEmpID;
        $school_id = $this->getSchoolId($request);
        EmpID::where(['school_id'=>$school_id])->first()->update([
            'empid'=>$new_empid
        ]);
        return $this->ReS(["empid"=>$new_empid,'schoolCode'=>$this->getSchoolUniqueCode($school_id)]);
    }
}
