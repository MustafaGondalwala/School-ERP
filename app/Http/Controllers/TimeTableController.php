<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentTimeTable;
use App\StaffTimeTable;
use \DB;
use App\Classes;

class TimeTableController extends Controller
{  
    public function getTimeTableMainStaff(Request $request){
        $request->validate([
            'timetable_name'=>'required|string'
        ]);
        $timetable_name = $request->timetable_name;
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $time_tables = $this->getTimetableStaff($timetable_name,$school_id,$year_id);
        return $this->ReS(["timetables"=>$time_tables]);
    }
    public function getTimeTableNameStaff(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $time_tables = StaffTimeTable::select('id','time_table_name')->where(['school_id'=>$school_id,"year_id"=>$year_id])->get()->unique('time_table_name');
        return $this->ReS(["time_tables"=>$time_tables]);
    }
    public function updateTimeTableStaff(Request $request){
        $request->validate([
            'timetable'=>'required|array'
        ]);
        try {
            DB::beginTransaction();
            foreach($request->timetable as $time_table){
                $studenttimetable = StaffTimeTable::where([
                    'school_id'=>$time_table['school_id'],
                    'class_period_id'=>$time_table['class_period_id'],
                    'time_table_name'=>$time_table['time_table_name']
                ])->update([
                   'monday_subject_name'=>$time_table['monday_subject_name'],
                   'monday_class_name'=>$time_table['monday_class_name'],
                   'tuesday_subject_name'=>$time_table['tuesday_subject_name'],
                   'tuesday_class_name'=>$time_table['tuesday_class_name'],
                   'wednesday_subject_name'=>$time_table['wednesday_subject_name'],
                   'wednesday_class_name'=>$time_table['wednesday_class_name'],
                   'thursday_subject_name'=>$time_table['thursday_subject_name'],
                   'thursday_class_name'=>$time_table['thursday_class_name'],
                   'friday_subject_name'=>$time_table['friday_subject_name'],
                   'friday_class_name'=>$time_table['friday_class_name'],
                   'saturday_subject_name'=>$time_table['saturday_subject_name'],
                   'saturday_class_name'=>$time_table['saturday_class_name'],
                ]);
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit(); 
        return $this->ReS(["message"=>"Updated TimeTable!!"]);  
    }
    public function addTimeTableStaff(Request $request){
        $request->validate([
            'timetable_name'=>"required|string",
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $time_table_name = $request->timetable_name;
        $checkIfExist = StaffTimeTable::where(['school_id'=>$school_id,"year_id"=>$year_id,"time_table_name"=>$time_table_name])->count();
        if($checkIfExist > 0){
            return $this->ReE(["message"=>"TimeTable is Already Exist.Please Try Another Name."],400);
        }
        try{
            DB::beginTransaction();
            foreach($this->getClassPeriods($school_id,$year_id) as $class_periods){
                $new_timetable = new StaffTimeTable;
                $new_timetable->time_table_name = $time_table_name;
                $new_timetable->class_period_id = $class_periods['id'];
                $new_timetable->school_id = $school_id;   
                $new_timetable->year_id = $year_id;   
                $new_timetable->save();
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit();
        $new_timetable_name = StaffTimeTable::select('id','time_table_name')->where(['school_id'=>$school_id,'year_id'=>$year_id])->get()->unique('time_table_name');
        $time_table = $this->getTimetableStaff($time_table_name,$school_id,$year_id);
        return $this->ReS(["timetable"=>$time_table,"new_timetable_names"=>$new_timetable_name]);
    }
    public function getClassWiseTimeTable(Request $request,$class_id){
        $school_id = $this->getSchoolId($request);
        if(Classes::find($class_id)->time_table_id == null){
            return $this->ReE(['message'=>'TimeTable is not Allocated']);
        }
        $timetable_name = Classes::with('timetable')->find($class_id)->first()['timetable']['time_table_name'];
        if($timetable_name == null){
            return $this->ReS(["message"=>"Not TimeTable is Assigned for Class"],400);
        }
        return $this->ReS(['classwise_timetable'=> $this->getTimetable($timetable_name,$school_id)]);
    }
    public function getTimeTableMain(Request $request){
        $request->validate([
            'timetable_name'=>'required|string'
        ]);
        $timetable_name = $request->timetable_name;
        $school_id = $this->getSchoolId($request);
        $time_tables = $this->getTimetable($timetable_name,$school_id,$request);
        return $this->ReS(["timetables"=>$time_tables]);
    }
    public function getTimeTableName(Request $request){
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $time_tables = StudentTimeTable::select('id','time_table_name')->where(['school_id'=>$school_id,"year_id"=>$year_id])->get()->unique('time_table_name');
        return $this->ReS(["time_tables"=>$time_tables]);
    }
    public function updateTimeTable(Request $request){
        $request->validate([
            'timetable'=>'required|array'
        ]);
        try {
            DB::beginTransaction();
            foreach($request->timetable as $time_table){
                $studenttimetable = StudentTimeTable::where([
                    'school_id'=>$time_table['school_id'],
                    'class_period_id'=>$time_table['class_period_id'],
                    'time_table_name'=>$time_table['time_table_name']
                ])->update([
                   'monday_subject_name'=>$time_table['monday_subject_name'],
                   'monday_teacher_name'=>$time_table['monday_teacher_name'],
                   'tuesday_subject_name'=>$time_table['tuesday_subject_name'],
                   'tuesday_teacher_name'=>$time_table['tuesday_teacher_name'],
                   'wednesday_subject_name'=>$time_table['wednesday_subject_name'],
                   'wednesday_teacher_name'=>$time_table['wednesday_teacher_name'],
                   'thursday_subject_name'=>$time_table['thursday_subject_name'],
                   'thursday_teacher_name'=>$time_table['thursday_teacher_name'],
                   'friday_subject_name'=>$time_table['friday_subject_name'],
                   'friday_teacher_name'=>$time_table['friday_teacher_name'],
                   'saturday_subject_name'=>$time_table['saturday_subject_name'],
                   'saturday_teacher_name'=>$time_table['saturday_teacher_name'],
                ]);
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit(); 
        return $this->ReS(["message"=>"Updated TimeTable!!"]);
    }
    public function addTimeTable(Request $request){ 
        $request->validate([
            'timetable_name'=>"required|string",
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $time_table_name = $request->timetable_name;
        $checkIfExist = StudentTimeTable::where(['school_id'=>$school_id,"year_id"=>$year_id,"time_table_name"=>$time_table_name])->count();
        if($checkIfExist > 0){
            return $this->ReE(["message"=>"TimeTable is Already Exist.Please Try Another Name."],400);
        }
        try{
            DB::beginTransaction();
            foreach($this->getClassPeriods($school_id,$year_id) as $class_periods){
                $new_timetable = new StudentTimeTable;
                $new_timetable->time_table_name = $time_table_name;
                $new_timetable->class_period_id = $class_periods['id'];
                $new_timetable->school_id = $school_id;   
                $new_timetable->year_id = $year_id;   
                $new_timetable->save();
            }
        }catch(\Exception $e){
            DB::rollback();
            return $this->ReE(["message"=>$e->getMessage()],400);
        }
        DB::commit();
        $new_timetable_name = StudentTimeTable::select('id','time_table_name')->where(['school_id'=>$school_id,"year_id"=>$year_id])->get()->unique('time_table_name');
        $time_table = $this->getTimetable($time_table_name,$school_id,$request);
        return $this->ReS(["timetable"=>$time_table,"new_timetable_names"=>$new_timetable_name]);
    }
    private function getTimetable($time_table,$school_id,$request){
        $send_array = array();
        $year_id = $this->getSchoolYearId($request);
        foreach($this->getClassPeriods($school_id,$year_id) as $ids){
            $time_table_row =  StudentTimeTable::where(['school_id'=>$school_id,"year_id"=>$year_id,"time_table_name"=>$time_table,"class_period_id"=>$ids['id']])->first();
            $time_table_row['start_time'] = $ids['start_time'];
            $time_table_row['end_time'] = $ids['end_time'];
            $send_array[$ids['period_id']] = $time_table_row;
        }
        return $send_array;
    }
    private function getTimetableStaff($time_table,$school_id,$year_id){
        $send_array = array();
        foreach($this->getClassPeriods($school_id,$year_id) as $ids){
            $time_table_row =  StaffTimeTable::where(['school_id'=>$school_id,"time_table_name"=>$time_table,"class_period_id"=>$ids['id']])->first();
            $time_table_row['start_time'] = $ids['start_time'];
            $time_table_row['end_time'] = $ids['end_time'];
            $send_array[$ids['period_id']] = $time_table_row;
        }
        return $send_array;
    }
}
