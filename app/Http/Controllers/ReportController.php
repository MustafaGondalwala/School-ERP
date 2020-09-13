<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentInfo;
use App\FeeReceipt;
use App\HandleReceipt;
use App\MonthlyTestStudent;
use App\MonthlyTestType;
use \DB;
class ReportController extends Controller
{
    public function getClasswiseMonthlyTestReport(Request $request){
        $request->validate([
            'class_id'=>'required|integer',
            'monthlytest_id'=>'required|integer'
        ]);
        $monthlytest_id = $request->monthlytest_id;
        $max_marks = MonthlyTestType::find($monthlytest_id)->max_marks;
        $count_monthlyTest = MonthlyTestStudent::where([
            'monthly_test_type'=>$monthlytest_id
        ])->count();
        $class_marks = $count_monthlyTest * $max_marks;
        $class_sum_total_marks = (int) MonthlyTestStudent::select("total_marks")->where([
            'monthly_test_type'=>$monthlytest_id
        ])->sum('total_marks');
        $total_marks =  MonthlyTestStudent::select("total_marks")->where([
            'monthly_test_type'=>$monthlytest_id
        ])->pluck('total_marks');
        return $this->ReS(['max_marks'=>$max_marks,'count_monthlyTest'=>$count_monthlyTest,'class_marks'=>$class_marks,'class_sum_total_marks'=>$class_sum_total_marks,'total_marks'=>$total_marks]);
    }
    public function getInstallmentClassWiseReport(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $receipt_ids =  FeeReceipt::select('id')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->pluck('id');
        $send_array = [];
        foreach($this->getInstallment($school_id) as $installment)
        {
            $data = HandleReceipt::select(DB::raw('sum(current_paid) as total_paid'))->whereIn('receipt_id',$receipt_ids)->where([
                'fee_installment'=>$installment->id
            ])->pluck('total_paid')[0];


            $temp_array = array("label"=>$installment->installment,"y"=>(int)$data);
            array_push($send_array,$temp_array);
        }
        return $this->ReS(["installmentwise"=>$send_array]);
    }
    public function getFeeClassWiseReport(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $class_ids =  FeeReceipt::with('class')->select('class_id','id')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->distinct('class_id')->get();
        $send_array = array();
        foreach($class_ids as $class_id){
            $receipt_ids = FeeReceipt::select('id')->where([
                'school_id'=>$school_id,
                'year_id'=>$year_id,
                'class_id'=>$class_id->id
            ])->pluck('id');
            $title = $class_id->class->class_title."  ".$class_id->class->section;
            $total_paid = HandleReceipt::select(DB::raw('sum(current_paid) AS total_paid'))->whereIn('receipt_id',$receipt_ids)->pluck('total_paid')[0];
            $temp_array = array("label"=>$title,"y"=>$total_paid);
            array_push($send_array,$temp_array);
        }
        return $this->ReS(["classwise"=>$send_array]);
    }
    public function getFeeMonthWiseReport(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $receipt_ids =  FeeReceipt::select('id')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->pluck('id');
        $data = HandleReceipt::select(DB::raw('current_paid AS y'),"created_at_date as label")->whereIn('receipt_id',$receipt_ids)->orderBy('label')->get()
        ->groupBy(function($data) {
            return \Carbon\Carbon::parse($data->label)->format('Y-m');
            })
        ->
        map(function ($row) {
            return $row->sum('y');
        })
        ;
        return $this->ReS(["monthwise"=>$data]);
    }
    public function getFeeWeekWiseReport(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $receipt_ids =  FeeReceipt::select('id')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->pluck('id');
        $data = HandleReceipt::select(DB::raw('current_paid AS y'),"created_at_date as label")->whereIn('receipt_id',$receipt_ids)->orderBy('label','desc')->get()
        ->groupBy(function($data) {
            return \Carbon\Carbon::parse($data->label)->format('W');
            })->
        map(function ($row) {
            return $row->sum('y');
        });
        return $this->ReS(["weekwise"=>$data]);
    }
    public function getFeeDayWiseReport(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $receipt_ids =  FeeReceipt::select('id')->where([
            'school_id'=>$school_id,
            'year_id'=>$year_id
        ])->pluck('id');
        $data = HandleReceipt::select(DB::raw('sum(current_paid) AS y'),"created_at_date as label")->whereIn('receipt_id',$receipt_ids)->groupBy('label')->orderBy('label')->get();
        return $this->ReS(["daywise"=>$data]);
    }
    public function getClassWiseReport(Request $request){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        return $this->ReS(["students"=> StudentInfo::with('class')->select('class_id', \DB::raw('count(*) as total'))->where(["school_id"=>$school_id,"year_id"=>$year_id])
        ->groupBy('class_id')->orderBy('total')
        ->get()]);
    }

    public function getReligionCasteReport(Request $request){
        $year_id = $this->getSchoolYearId($request);
        $school_id = $this->getSchoolId($request);
        $religion_report = StudentInfo::select('religion as label', \DB::raw('count(*) as y'))->where(["school_id"=>$school_id,"year_id"=>$year_id])
        ->groupBy('label')->orderBy('y')
        ->get();
        $only_caste_wise_report = StudentInfo::select('caste as label', \DB::raw('count(*) as y'))->where(["school_id"=>$school_id,"year_id"=>$year_id])
        ->groupBy('label')->orderBy('y')
        ->get();

        $caste_report = [];
        foreach($religion_report as $item){
            $religion = $item['label'];
            $caste_report[$religion] = StudentInfo::where('religion',$religion)->select('caste', \DB::raw('count(*) as total'))->where(["school_id"=>$school_id,"year_id"=>$year_id])
            ->groupBy('caste')->orderBy('caste')
            ->get();
        }

        return $this->ReS(['religion_report'=>$religion_report,"caste_report"=>$caste_report,'only_caste_wise_report'=>$only_caste_wise_report]);
    }
}
