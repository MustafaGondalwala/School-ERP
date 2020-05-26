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

Route::middleware(['auth:api', 'web', 'adminCheck'])->get('/user', function (Request $request)
{
    return $request->user();
});

Route::post('/v1/login', 'UserApiController@login');
Route::post('register', 'UserApiController@register');

Route::group(['middleware' => ['auth:api']], function ()
{
    Route::post('details', 'UserApiController@details');
    Route::post('logout', 'UserApiController@logout');
});

Route::group(["prefix" => "v1", "middleware" => ["auth:api", "api", "studentCheck"]], function ()
{
    Route::get('/student/time-table', "TimeTableController@getStudentsTimeTable");
    Route::post('/student/attendance', "AttendanceController@getStudentAttendanceStudentModule");
});

Route::group(["prefix" => 'v1', 'middleware' => ["auth:api", "api", "parentCheck"]], function ()
{
    Route::group(["prefix" => "parent"], function ()
    {
        Route::get('/get-childs', "ParentController@getParentChilds");
        Route::get("/subjects", "UserApiController@getAllSubject");
        Route::get("/time_table/{student_id}", "TimeTableController@getStudentTimeTable");
        Route::post("/get_particular/{type}/{id}", "AttendanceController@getParticularAttendance");
        Route::get('/fees/get-total-installments-only-installments', "FeesController@getOnlyTotalInstallment");
        Route::post('/view-pending-fees', "FeesController@getIndividualStudentFees");
        Route::post('/fee/receipt', "FeesController@getStudentReceipts");
        Route::get('/fee/receipt/{receipt_id}', "FeesController@getIndividualReceipDetails");
    });
    Route::group(["prefix" => "leave"], function ()
    {
        Route::post('', "LeaveController@newLeaveRequest");
    });
    Route::group(["prefix" => "homework"], function ()
    {
        Route::get("/student/{student_id}", "HomeWorkController@getStudentPendingHomeWork");
        Route::post("/raise-issue/parent", "HomeWorkController@createEditIssue");
        Route::post("raise-issue/parent/ongoing", "HomeWorkController@getOpenRaiseIssue");
    });
});

Route::group(["prefix" => "v1", "middleware" => ["auth:api", "teacherCheck"]], function ()
{
    Route::group(["prefix" => "teacher"], function ()
    {
        Route::get("/assign/{teacher_id}", "TeacherController@getAssignedClass");
        Route::post('/get-all-subjects', "UserApiController@getAllSubject");
        Route::get('/get-exam-type', "ExamController@getExamType");
        Route::get('/{get_type}/header', "TeacherController@getTeacherHeader");
        Route::get('/subject/get-all-subjects', "UserApiController@getAllSubject");
        Route::get("/year", "YearController@getAllYear");
        Route::post('/exam/exam_marksheet', "ExamController@getExamMarksheet");
        Route::put('/exam/exam_marksheet', "ExamController@updateExamMarksheet");
    });

    Route::group(["prefix" => "student"], function ()
    {
        Route::get('/searchable/{class_id}', "StudentController@getAllStudentsSearchableByClassId");
    });
    Route::group(["prefix" => "attendance"], function ()
    {
        Route::post("/teacher", "AttendanceController@getStudentAttendance");
        Route::patch("/teacher", "AttendanceController@updateStudentAttendance");
    });

    Route::group(["prefix" => "leave"], function ()
    {
        Route::get("/attend-leave-request/teacher/{class_id}", "LeaveController@getClassLeaveRequest");
        Route::patch("/update/teacher/{class_id}", "LeaveController@updateLeaveRequestTeacher");
        Route::get('/teacher/all/{class_id}', "LeaveController@getLeaveRequestTeacher");
    });

    Route::group(["prefix" => "homework"], function ()
    {
        Route::post("", "HomeWorkController@createEditHomeWork");
        Route::get("{class_id}", "HomeWorkController@getCurrentHomeWork");
        Route::patch("", "HomeWorkController@createEditHomeWork");
        Route::delete("{homework_id}/{class_id}", "HomeWorkController@deleteHomeWork");
    });
});


Route::get('/teacher/get/header',"TeacherController@getAdminHeader");

Route::group(['prefix' => 'v1', "middleware" => ["auth:api"]], function ()
{   
    Route::group(["prefix"=>"admin"],function(){
        Route::get("","AdminController@getDetails");
        Route::put("","AdminController@updateDetails");
        Route::put("/login","AdminController@updateAdminLogin");
    });
    Route::group(["prefix" => "year"], function ()
    {
        Route::get("", "YearController@getAllYear");
    });
    Route::group(["prefix" => "leave"], function ()
    {
        Route::get('', "LeaveController@getLeaveRequest");
        Route::patch('/update', "LeaveController@updateLeaveRequestAdmin");
    });
    Route::group(['prefix' => "exam"], function ()
    {
        Route::post('add-exam-type', "ExamController@addExamType");
        Route::get('get-exam-type', "ExamController@getExamType");
        Route::post('add-monthly-test-type', "ExamController@addMonthlyTestType");
        Route::get('get-monthly-test-type', "ExamController@getMonthlyTestType");
        Route::post('get-admit-cards', "ExamController@getAdmitCard");
        Route::post('update-admit-card', "ExamController@updateAdmitCard");
        Route::post('exam_marksheet', "ExamController@getExamMarksheet");
        Route::put('exam_marksheet', "ExamController@updateExamMarksheet");

    });
    Route::group(['prefix' => "time-table"], function ()
    {
        Route::get('/get-class-period', "TimeTableController@getClassPeriod");
        Route::post('/update-class-period', "TimeTableController@updateClassPeriod");
        Route::post('/get-time-table-class-wise', "TimeTableController@getClassWiseTimeTable");
        Route::post('/update-time-table', "TimeTableController@updateTimeTable");
        Route::post('/get-time-table-teacher-wise', "TimeTableController@getTeacherTimeTable");
    });

    Route::group(["prefix" => "staff"], function ()
    {
        Route::get("/searchable", "StaffController@getStaffSearchable");
    });
    Route::group(["prefix" => "attendance"], function ()
    {
        Route::post("", "AttendanceController@getStudentAttendance");
        Route::patch("", "AttendanceController@updateStudentAttendance");
        Route::post("/staff", "AttendanceController@getStaffAttendance");
        Route::patch("/staff", "AttendanceController@updateStaffAttendance");
        Route::post("/get_particular/{type}/{id}", "AttendanceController@getParticularAttendance");
        Route::get('/header', "AttendanceController@getAttendanceHeader");
    });

    Route::group(['prefix' => "student"], function ()
    {
        Route::post('/add-admission-student', "UserApiController@addAdmissionStudent");
        Route::post('/view-all-admission-list', "UserApiController@viewAdmissionList");
        Route::post('/add-register-student', 'StudentController@addRegisterStudent');
        Route::get('/get-all-searable-student', "StudentController@getAllStudentsSearchable");
        Route::get('/get-indivitual-student/{student_id}', "StudentController@getIndividualStudent");
        Route::put("/changepassword", "StudentController@changePassword");
        Route::get('/get/students/{class_id}', "StudentController@getAllStudentsSearchableByClassId");
        Route::post("/bycaste", "StudentController@studentByCaste");
        Route::get('/get/all', "StudentController@ViewAllStudents");
        Route::get('/get/logininfo', "StudentController@viewAllStudentLoginInfo");
        Route::get('/admin/header', "StudentController@studentAdminHeader");
        Route::post('/make_admission',"StudentController@makeStudentAdmission");
        Route::get('/get-total/{type}',"StudentController@getTotalReport");
    });

    Route::group(['prefix' => 'teacher'], function ()
    {   
        Route::delete("","TeacherController@removeTeacher");
        Route::post('/add-teacher', "TeacherController@addTeacher");
        Route::get('/view-all-teacher', "UserApiController@ViewAllTeacher");
        Route::get('/get-all-searable-teacher', "TeacherController@getAllTeacherSearchable");
        Route::post('/view-preferend-data', "UserApiController@getPreferendData");
        Route::get('/{teacher_id}', "TeacherController@getTeacherDetails");
        Route::patch('/assign', "TeacherController@updateAssignTeachertoClass");
    });
    Route::group(['prefix' => 'subject'], function ()
    {
        Route::post('get-all-subjects', "UserApiController@getAllSubject");
        Route::post('add-subject', "UserApiController@addSubject");
    });
    Route::group(['prefix' => 'class'], function ()
    {
        Route::post('/get-all-classes', "UserApiController@getAllClasses");
        Route::get('/get-all-distinct-classes', "UserApiController@getDistinctClasses");
        Route::post('/add-class', "UserApiController@addClass");
        Route::post('/add-section', "UserApiController@addSection");
    });
    Route::group(["prefix" => "fee"], function ()
    {
        Route::post('/update-fees-installement', "FeesController@updateFeesInstallment");
        Route::post('/get-total-installments', "FeesController@getAllInstallment");
        Route::post('/update-due-date', "FeesController@updateDueDate");
        Route::get('/get-total-installments-only-installments', "FeesController@getOnlyTotalInstallment");
        Route::post('add-fees-type', "FeesController@AddFeesType");
        Route::get('/get-all-fees-type', "FeesController@getAllFeesType");
        Route::post('/update-fee-individual', "FeesController@updateFeesIndividual");
        Route::post('/get-individual-student-fees', "FeesController@getIndividualStudentFees");
        Route::post('/get-class-wise-fees', "FeesController@getClassWiseFees");
        Route::post('/update-fees-class-wise', "FeesController@updateClassWiseFees");
        Route::post('/pay', "FeesController@payIndividualFees");
        Route::post('/receipt', "FeesController@getStudentReceipts");
        Route::get('/receipt/{receipt_id}', "FeesController@getIndividualReceipDetails");
        Route::group(["prefix"=>"manage_login"],function(){
            Route::post("","FeesController@addManageLoginUser");
            Route::get("","FeesController@getManageLoginUser");
            Route::put("","FeesController@addManageLoginUser");

            Route::get("/info/{clerk_id}","FeesController@getClerkInfo");
        });
    });
});

Route::group(['prefix' => 'v1'], function ()
{
    Route::get('/student/view-all-students', "UserApiController@viewAllStudent");
    Route::get('/student/view-all-students-login-info', "UserApiController@viewAllStudentLoginInfo");
});

