<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GradeType;
class GradeController extends Controller
{
    public function getCurrentGradesType(Request $request){
        $school_id = $this->getSchoolId($request);
        $data = GradeType::select('percentage','grade')->where([
            'school_id'=>$school_id
        ])->get();
        return $this->ReS(['grade_type'=>$data]);
    }
}
