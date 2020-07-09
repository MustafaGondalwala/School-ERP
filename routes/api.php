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


Route::post('/v1/login',"UserApiController@login");

Route::group(["prefix"=>"v1","middleware" => "auth:api"],function(){
    Route::post('logout',"UserApiController@logout");
    Route::get('year',"YearController@getSystemYears");
    Route::get("/subject","SubjectController@getAllSubjects");
    Route::get("monthly_test","ExamController@getAllMonthlyTest");
    Route::get("/classwise_timetable/{class_id}","TimeTableController@getClassWiseTimeTable");
    Route::get("/student/searchable/{searchText}","StudentController@studentsSearchable");
    Route::get("/student/searchable","StudentController@studentsSearchableLimit");
    Route::get("/student/searchable/class/{class_id}","StudentController@studentsSearchableLimitByClassID");
    
    Route::get("/teacher/names","TeacherController@getTeacherNames");
    Route::get("class","ClassController@getAllClassSection");
    

    Route::group(["prefix"=>"parentstudent"],function(){
        Route::post("/homework/submit","HomeWorkController@submitHomeWork");
    });
    Route::group(["prefix"=>"adminteacher","middleware"=>"adminOrTeacherCheck"],function(){
        Route::group(["prefix"=>"studymaterial"],function(){
            Route::group(["prefix"=>"group"],function(){
                Route::post("{class_id}","StudyMaterialController@addGroup");
                Route::get("{class_id}","StudyMaterialController@getGroups");
                Route::put("{class_id}/{group_id}","StudyMaterialController@updateGroup");
            });
            Route::group(["prefix"=>"material"],function(){
                Route::post("{class_id}","StudyMaterialController@addMaterial");
                Route::get("{class_id}/{group_id}","StudyMaterialController@getAllMaterial");
            
            });

        });
        Route::group(["prefix"=>"attendance"],function(){
            Route::post("student","AttendanceController@getStudent");
            Route::put("student","AttendanceController@updateAttendanceStudent");
            Route::post("staff","AttendanceController@getAttendanceStaff");
            Route::put("staff","AttendanceController@updateAttendanceStaff");
            Route::post("student/getclasswise","AttendanceController@getClasswiseReport");
            Route::post("student/getindividual","AttendanceController@getStudentIndividualReport");
            Route::post("staff/getindividual","AttendanceController@getStaffIndividualReport");
        });
        Route::group(["prefix"=>"exam"],function(){
            Route::post("monthly_test/get_students","ExamController@getStudentsMonthlyTest");
            Route::get("monthly_test/individual/{student_marksheet_id}","ExamController@getIndividualMarksheet");
            Route::put("monthly_test","ExamController@updateMonthlyTestMarkhsheet");
            Route::get("monthly_test/individual-publish/{marksheet_id}","ExamController@publishMarksheet");
            Route::get("monthly_test/individual-unpublish/{marksheet_id}","ExamController@unpublishMarksheet");
        
            Route::post("marksheet/get_students","ExamController@getStudentsMarksheet");
            Route::get("marksheet/individual/{student_marksheet_id}","ExamController@getIndividualExamMarksheet");
            Route::put("marksheet","ExamController@updateExamMarksheet");
            Route::get("marksheet/individual-publish/{marksheet_id}","ExamController@publishExamMarksheet");
            Route::get("monthly_test/individual-unpublish/{marksheet_id}","ExamController@unpublishExamMarksheet");

            Route::get("monthly_test/get_all/{class_id}","ExamController@getAllMonthlyTestType");
            Route::post("monthly_test/add/{class_id}","ExamController@addMonthlyTestType");
            Route::delete("monthly_test/delete/{class_id}/{monthly_test_id}","ExamController@removeMonthlyTest");
        });
        Route::get("/student/searchable/{searchText}","StudentController@studentsSearchable");
        Route::get("/student/searchable","StudentController@studentsSearchableLimit");
    });
    Route::group(["prefix"=>"adminclerk","middleware"=>"clerkAdminCheck"],function(){
        Route::group(["prefix"=>"student"],function(){
            Route::get("header","StudentController@getAdminStudentHeader");
            Route::post("/update","StudentController@updateStudentAdmission");
            Route::post("/register","RegisterStudentController@newRegisterStudent");
            Route::post("/register/list","RegisterStudentController@registerStudentList");
            Route::post("/register/list","RegisterStudentController@registerStudentList");
            Route::post("/register/bulk_add","RegisterStudentController@registerBulkAdd");
            Route::get("/listAll","StudentController@listAllCurrentStudent");
            Route::get("/list/{class_id}","StudentController@listStudentByClass");
            Route::get("/list-individual/{student_id}","StudentController@getStudentById");
            Route::post("/admission/bulk_add","StudentController@admissionBulkAdd");
            Route::post("/admission/update-particular-cell","StudentController@updateParticularCell");
            Route::post("/admission","StudentController@addStudentAdmission");
            Route::get("/get-rollno-by-classid/{class_id}","StudentController@getRollNobyClassID");
            Route::post("medical_info","StudentController@getMedicalInfo");
            Route::post("medical_info/update","StudentController@updateMedicalInfo");
            Route::post("advanced_search","StudentController@studentAdvancedSearch");



            Route::get("/photos/{class_id}","StudentController@getClassWisePhotos");
            Route::post("/update_photo","StudentController@updateStudentPhoto");
        });
        Route::group(["prefix"=>"exam"],function(){
            Route::post("hallticket","ExamController@fetchExamHallTicket");
            Route::put("hallticket","ExamController@fetchExamHallTicket");
            Route::post("individual-hallticket","ExamController@fetchExamHallTicketIndividual");
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
            
            Route::get("/fee_type/class/{class_id}","FeeController@getClassWiseFeeType");
            Route::post("/fee_type/class/{class_id}","FeeController@addClassWiseFeeType");
            Route::put("/fee_type/class/{class_id}","FeeController@updateClassWiseFeeType");
            Route::delete("/fee_type/class/{class_id}/{row_id}","FeeController@deleteClassWiseFeeType");

            Route::post('/pending_fee_class','FeeController@getPendingFeesClassWise');
    
            Route::post("/individual","FeeController@getIndividualFees");
            Route::put("/individual","FeeController@updateIndividualFees");
    
            Route::post("/pay","FeeController@payIndividualFees");
            Route::post('/receipts',"FeeController@getReceipts");
            Route::get('/receipts/{receipt_id}',"FeeController@getReceiptDetails");
    
            Route::post("/fee_type","FeeController@addFeeType");
            Route::get("/fee_type","FeeController@getFeeType");
            Route::delete("/fee_type/{fee_type_id}","FeeController@deleteFeeType");
    
           });
    });
    Route::group(["prefix"=>"parent","middleware"=>"parentCheck"],function(){
        Route::group(["prefix"=>"homework"],function(){
            Route::post("","HomeWorkController@getChildHomeWork");
        });
    });
    Route::group(["prefix"=>"teacher","middleware"=>"teacherCheck"],function(){
        Route::group(["prefix"=>"homework"],function(){
            Route::post("","HomeWorkController@addHomeWork");
            Route::get("{class_id}","HomeWorkController@getClassHomeWork");
            Route::get("submission/{homework_id}","HomeWorkController@getHomeWorkSubmission");
            Route::put("submission","HomeWorkController@checkHomeWorkSubmission");
            Route::get("student_status/all/{homework_id}","HomeWorkController@getStudentStatus");
            
        });
    });
    Route::group(["prefix"=>"admin","middleware"=>"adminCheck"],function(){
        Route::group(["prefix"=>"noticeboard"],function(){
            Route::post("","NoticeBoardController@addNoticeBoard");
            Route::get("","NoticeBoardController@getAllNoticeBoard");
            Route::get("{notice_id}","NoticeBoardController@getIndividualNotice");
            Route::post("/update","NoticeBoardController@addNoticeBoard");
        });
        Route::group(["prefix"=>"fee"],function(){
            Route::group(["prefix"=>"installments"],function(){
                Route::get("","FeeController@getFeeInstallments");
                Route::put("","FeeController@updateFeeInstallments");
            });
            Route::post("/due_date","FeeController@getDueDate");
            Route::put("/due_date","FeeController@UpdateDueDate");
        });
        Route::group(["prefix"=>"student"],function(){
            Route::get("","StudentController@getAllStudents");
            Route::post("","StudentController@addNewStudent");
            Route::get("/searchable/{searchText}","StudentController@studentsSearchable");
            Route::get("/searchable","StudentController@studentsSearchableLimit");
            Route::post("/set_rollno","StudentController@setRollNo");
        });
        Route::group(["prefix"=>"staff"],function(){
            Route::get("/searchable/{searchText}","StaffController@staffSearchable");
            Route::get("/searchable","StaffController@staffSearchableLimit");
        });
        Route::group(["prefix"=>"clerk"],function(){
            Route::post("","ClerkController@addClerk");
            Route::get("","ClerkController@getAllClerk");
            Route::post("/update","ClerkController@addClerk");
            Route::post("/changePassword","ClerkController@changePassword");
        });
        Route::group(["prefix"=>"teacher"],function(){
            Route::get("/view/{teacher_id}","TeacherController@viewParticularTeacher");
            Route::post("","TeacherController@addNewTeacher");
            Route::post("/update","TeacherController@addNewTeacher");
            Route::get("","TeacherController@viewAllTeacher");
            Route::post("/assigned_teacher","TeacherController@assignedTeacher");
            Route::put("/publish_timetable","TeacherController@publishTimeTable");
        });

       Route::group(["prefix"=>"report"],function(){
            Route::group(["prefix"=>"student"],function(){
                Route::get("classwise-report","ReportController@getClassWiseReport");
                Route::get("religion-caste-report","ReportController@getReligionCasteReport");
            });

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

            Route::get("/subject-classwise/{class_id}","ClassController@getSubjectClassWise");
            Route::put("/subject-classwise/{class_id}","ClassController@updateSubjectClassWise");
            Route::delete("/subject-classwise/{class_id}/{subject_id}","ClassController@deleteSubjectClassWise");
        });

       
       Route::group(["prefix"=>"exam"],function(){
            Route::post("type","ExamController@addExamType");
            Route::get("type","ExamController@getExamType");
            Route::delete("type/{exam_type_id}","ExamController@removeExamType");
            Route::post("monthly_test","ExamController@addMonthlyTest");
            Route::delete("monthly_test/{month_test_id}","ExamController@deleteMonthlyTest");
        });
        Route::group(["prefix"=>"timetable"],function(){
                Route::post("","TimeTableController@addTimeTable");
                Route::put("","TimeTableController@updateTimeTable");
                Route::get("","TimeTableController@getTimeTableName");
                Route::post("/get","TimeTableController@getTimeTableMain");
        });
        Route::group(["prefix"=>"stafftimetable"],function(){
            Route::post("","TimeTableController@addTimeTableStaff");
            Route::put("","TimeTableController@updateTimeTableStaff");
            Route::get("","TimeTableController@getTimeTableNameStaff");
            Route::post("/get","TimeTableController@getTimeTableMainStaff");
        });
});


    });