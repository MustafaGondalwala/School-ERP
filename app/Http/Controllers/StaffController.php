<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Staff;
class StaffController extends Controller
{
    public function staffSearchableLimit(Request $request){
        dd($data);
    }
    public function staffSearchable(Request $request,$searchText){
        $school_id = $this->getSchoolId($request);
        $all_staff = Staff::select('id','empid','staff_name')->where('school_id',$school_id)->
                        orWhere('empid', 'like', '%' . $searchText . '%')->
                        orWhere('relative_name', 'like', '%' . $searchText . '%')->
                        orWhere('staff_name', 'like', '%' . $searchText . '%')->limit(50)->get();
        $label_staff = array();
        foreach ($all_staff as $key => $value)
        {
            $label = $value->staff_name . " [" . $value->empid . "]";
            array_push($label_staff, array(
                "value" => $value->id,
                "label" => $label
            ));
        }
        return $this->ReS(["staff"=>$label_staff]);
    }
}
