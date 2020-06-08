<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/v1/login',"UserApiController@login");
Route::group(["prefix"=>"v1","middleware" => "auth:api"],function(){
    Route::post('logout',"UserApiController@logout");
    Route::get('year',"YearController@getSystemYears");
    Route::get("/subject","SubjectController@getAllSubjects");
    Route::get("/classwise_timetable/{class_id}","TimeTableController@getClassWiseTimeTable");
    Route::get("/teacher","TeacherController@viewAllTeacher");
    Route::group(["prefix"=>"parent","middleware"=>"parentCheck"],function(){
        Route::group(["prefix"=>"homework"],function(){
            Route::post("","HomeWorkController@getChildHomeWork");
        });
    });
    Route::group(["prefix"=>"teacher","middleware"=>"teacherCheck"],function(){
        Route::group(["prefix"=>"homework"],function(){
            Route::post("","HomeWorkController@addHomeWork");
            Route::get("{class_id}","HomeWorkController@getClassHomeWork");
        });
    });
    Route::group(["prefix"=>"admin","middleware"=>"adminCheck"],function(){
        Route::group(["prefix"=>"student"],function(){
            Route::get("","StudentController@getAllStudents");
            Route::post("","StudentController@addNewStudent");
            Route::get("/searchable/{searchText}","StudentController@studentsSearchable");
            Route::get("/searchable","StudentController@studentsSearchableLimit");

        });
        Route::group(["prefix"=>"teacher"],function(){
            Route::get("{teacher_id}","TeacherController@viewParticularTeacher");
            Route::post("","TeacherController@addNewTeacher");
            
        });
       Route::group(["prefix"=>"class"],function(){
            Route::get("","ClassController@getAllClassSection");
            Route::get("distinct","ClassController@getDistinctClass");
            Route::post("","ClassController@addClass");
            Route::put("","ClassController@updateClass");
            Route::delete("{class_title}","ClassController@deleteClass");
            Route::post("section","ClassController@addSection");
            Route::put("/publish_timetable","ClassController@publishTimeTable");
            
            
            Route::put("class_period","ClassController@addUpdateClassPeriod");
            Route::get("class_period","ClassController@getClassPeriod");
            Route::delete("class_period/{class_id}","ClassController@deleteClassPeriod");
        });

       Route::group(["prefix"=>"fee"],function(){
        Route::group(["prefix"=>"installments"],function(){
            Route::get("","FeeController@getFeeInstallments");
            Route::put("","FeeController@updateFeeInstallments");
        });
        Route::post("/due_date","FeeController@getDueDate");
        Route::put("/due_date","FeeController@UpdateDueDate");
        Route::post("/classwise","FeeController@getClassWiseFees");
        Route::put("/classwise","FeeController@updateClassWiseFees");


        Route::post("/individual/{only_read}","FeeController@getIndividualFees");
        Route::put("/individual","FeeController@updateIndividualFees");

        Route::post("/pay","FeeController@payIndividualFees");
        Route::post('/receipts',"FeeController@getReceipts");
        Route::get('/receipts/{receipt_id}',"FeeController@getReceiptDetails");

        Route::post("/fee_type","FeeController@addFeeType");
        Route::get("/fee_type","FeeController@getFeeType");
        Route::delete("/fee_type/{fee_type_id}","FeeController@deleteFeeType");

       });

       Route::group(["prefix"=>"timetable"],function(){
            Route::post("","TimeTableController@addTimeTable");
            Route::put("","TimeTableController@updateTimeTable");
            Route::get("","TimeTableController@getTimeTableName");
            Route::post("/get","TimeTableController@getTimeTableMain");
        });
        Route::group(["prefix"=>"attendance"],function(){
            Route::post("student","AttendanceController@getStudent");
            Route::put("student","AttendanceController@updateAttendanceStudent");
            Route::post("staff","AttendanceController@getAttendanceStaff");
            Route::put("staff","AttendanceController@updateAttendanceStaff");
        });
        });






    });