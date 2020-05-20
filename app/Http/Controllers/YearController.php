<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SystemYear;

class YearController extends Controller
{
    public function getAllYear(){
    	return response()->json(["success"=>["year"=>SystemYear::select('string_year',"selected_year")->get()]]);
    }
}
