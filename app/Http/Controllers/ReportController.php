<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentInfo;

class ReportController extends Controller
{
    public function getClassWiseReport(Request $request){
        return $this->ReS(["students"=> StudentInfo::with('class')->select('class_id', \DB::raw('count(*) as total'))
        ->groupBy('class_id')->orderBy('total')
        ->get()]);
    }

    public function getReligionCasteReport(Request $request){
        $religion_report = StudentInfo::select('religion as label', \DB::raw('count(*) as y'))
        ->groupBy('label')->orderBy('y')
        ->get();
        $only_caste_wise_report = StudentInfo::select('caste as label', \DB::raw('count(*) as y'))
        ->groupBy('label')->orderBy('y')
        ->get();

        $caste_report = [];
        foreach($religion_report as $item){
            $religion = $item['label'];
            $caste_report[$religion] = StudentInfo::where('religion',$religion)->select('caste', \DB::raw('count(*) as total'))
            ->groupBy('caste')->orderBy('caste')
            ->get();
        }

        return $this->ReS(['religion_report'=>$religion_report,"caste_report"=>$caste_report,'only_caste_wise_report'=>$only_caste_wise_report]);
    }
}
