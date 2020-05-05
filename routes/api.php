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

Route::middleware(['auth:api','web','adminCheck'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/v1/login', 'UserApiController@login');
Route::post('register', 'UserApiController@register');

Route::group(['middleware' => ['auth:api']],function(){
  Route::post('details', 'UserApiController@details');
  Route::post('logout','UserApiController@logout');
});




Route::group(["prefix"=>'v1/parent','middleware'=>["auth:api","api","parentCheck"]],function(){
  Route::get('/get-childs',"ParentController@getParentChilds");
});




Route::group(['prefix'=>'v1','middleware' => ['auth:api','api','adminCheck']],function(){
  Route::group(['prefix'=>"exam"],function(){
    Route::post('add-exam-type',"ExamController@addExamType");
    Route::get('get-exam-type',"ExamController@getExamType");
    Route::post('add-monthly-test-type',"ExamController@addMonthlyTestType");
    Route::get('get-monthly-test-type',"ExamController@getMonthlyTestType");
    Route::post('get-admit-cards',"ExamController@getAdmitCard");
    Route::post('update-admit-card',"ExamController@updateAdmitCard");
  Route::post('get-exam-marksheet',"ExamController@getExamMarksheet");
  });
  Route::group(['prefix'=>"time-table"],function(){
    Route::get('/get-class-period',"TimeTableController@getClassPeriod");
    Route::post('/update-class-period',"TimeTableController@updateClassPeriod");
    Route::post('/get-time-table-class-wise',"TimeTableController@getClassWiseTimeTable");
    Route::post('/update-time-table',"TimeTableController@updateTimeTable");
    Route::post('/get-time-table-teacher-wise',"TimeTableController@getTeacherTimeTable");
  });

  Route::group(["prefix"=>"attendance"],function(){
    Route::post("/get-student-attendance","AttendanceController@getStudentAttendance");
    Route::post("/update-attendance","AttendanceController@updateStudentAttendance");

  });

  Route::group(['prefix'=>"student"],function(){
      Route::post('/add-admission-student',"UserApiController@addAdmissionStudent");
      Route::post('/view-all-admission-list',"UserApiController@viewAdmissionList");
      Route::post('/add-register-student','StudentController@addRegisterStudent');
      Route::get('/get-all-searable-student',"StudentController@getAllStudentsSearchable");
      Route::get('/get-indivitual-student/{student_id}',"StudentController@getIndividualStudent");

  });

  Route::group(['prefix'=>'teacher'],function(){
    Route::post('/add-teacher',"TeacherController@addTeacher");
    Route::get('/view-all-teacher',"UserApiController@ViewAllTeacher");
    Route::get('/get-all-searable-teacher',"TeacherController@getAllTeacherSearchable");
    Route::post('/view-preferend-data',"UserApiController@getPreferendData");
  });
  Route::group(['prefix'=>'subject'],function(){
    Route::post('get-all-subjects',"UserApiController@getAllSubject");
    Route::post('add-subject',"UserApiController@addSubject");
  });
  Route::group(['prefix'=>'class'],function(){
    Route::post('/get-all-classes',"UserApiController@getAllClasses");
    Route::post('/assign-teacher-to-class',"UserApiController@assignTeacher");


    Route::get('/get-all-distinct-classes',"UserApiController@getDistinctClasses");
    Route::post('/add-class',"UserApiController@addClass");
    Route::post('/add-section',"UserApiController@addSection");
  });
  Route::group(["prefix"=>"fee"],function(){
    Route::post('/update-fees-installement',"FeesController@updateFeesInstallment");
    Route::post('/get-total-installments',"FeesController@getAllInstallment");
    Route::post('/update-due-date',"FeesController@updateDueDate");
    Route::get('/get-total-installments-only-installments',"FeesController@getOnlyTotalInstallment");
    Route::post('add-fees-type',"FeesController@AddFeesType");
    Route::get('/get-all-fees-type',"FeesController@getAllFeesType");
    Route::post('/update-fee-individual',"FeesController@updateFeesIndividual");
    Route::post('/get-individual-student-fees',"FeesController@getIndividualStudentFees");
    Route::post('/get-class-wise-fees',"FeesController@getClassWiseFees");
    Route::post('/update-fees-class-wise',"FeesController@updateClassWiseFees");
    Route::post('/pay-fees-individual',"FeesController@payIndividualFees");
    Route::post('/get-receipt',"FeesController@getStudentReceipts");


  });


});


Route::group(['prefix' => 'v1'],function(){
  Route::get('/student/view-all-students',"UserApiController@viewAllStudent");
  Route::get('/student/view-all-students-login-info',"UserApiController@viewAllStudentLoginInfo");
});
