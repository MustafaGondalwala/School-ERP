import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./authentication/LoginPage"

import GuestRoute from "./routes/GuestRoute"
import AdminDashboardRoutes from "./routes/AdminDashboardRoutes"
import TeacherDashboardRoutes from "./routes/TeacherDashboardRoutes"
import ParentDashboardRoutes from "./routes/ParentDashboardRoutes"



import Admin, {AdminDashboardHome} from "./dashboard/Admin"

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

import { userLoggedIn,setAssignedClass,setParentChild } from "./actions/login";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


import StudentAdminHomePage from "./student/pages/StudentAdminHomePage"


import TeacherAdminHomePage from "./teacher/pages/TeacherAdminHomePage"
import TeacherAddTeacher from "./teacher/pages/TeacherAddTeacher"
import TeacherViewTeacher from "./teacher/pages/TeacherViewTeacher"


import TeacherClassWiseTimeTable from "./timetable/pages/TeacherClassWiseTimeTable"

import TimeTableAdminHomePage from "./timetable/pages/TimeTableAdminHomePage"
import TimeTableViewStudent from "./timetable/pages/TimeTableViewStudent"
import TimeTablePublishStudentTimeTable from "./timetable/pages/TimeTablePublishStudentTimeTable"

import FeesAdminHomePage from "./fees/pages/FeesAdminHomePage"
import FeeInstallments from "./fees/pages/FeeInstallments"
import FeeSetDueDate from "./fees/pages/FeeSetDueDate"
import FeeSetClassWise from "./fees/pages/FeeSetClassWise"
import FeeSetIndividual from "./fees/pages/FeeSetIndividual"
import FeePayFees from "./fees/pages/FeePayFees"

import AdminAttendanceHomePage from "./attendance/pages/AdminAttendanceHomePage"
import AdminAttendanceStudentEdit from "./attendance/pages/AdminAttendanceStudentEdit"
import AdminAttendanceStaffEdit from "./attendance/pages/AdminAttendanceStaffEdit"
import AdminAttendanceClassWiseEdit from "./attendance/pages/AdminAttendanceClassWiseEdit"
import AdminAttendanceIndividualStudent from "./attendance/pages/AdminAttendanceIndividualStudent"


import AdminSettingHomePage from "./setting/pages/AdminHomePage"

import {TeacherDashboardHome} from "./dashboard/Teacher"
import TeacherHomeWorkHomePage from "./homework/pages/TeacherHomeWorkHomePage"
import ViewHomeWork from "./homework/pages/ViewHomeWork"
import ViewHomeWorkParent from "./homework/pages/ViewHomeWorkParent"
import TeacherAllHomeWorkHome from "./homework/pages/TeacherAllHomeWorkHome"
import TeacherQuestionPaperHome from "./question/pages/TeacherQuestionPaperHome"
import TeacherAttendanceHome from "./attendance/pages/teacher/TeacherAttendanceHome"
import TeacherAttendanceEditView from "./attendance/pages/teacher/TeacherAttendanceEditView"
import TeacherAttendancIndividualStudent from "./attendance/pages/teacher/TeacherAttendancIndividualStudent"
import TeacherLeaveHomePage from "./leave/pages/teacher/TeacherLeaveHomePage"
import TeacherExamHomePage from "./exam/pages/teacher/TeacherExamHomePage"


import AdminExamHome from "./exam/pages/AdminHomePage"
import AdminClassHallTicket from "./exam/pages/AdminClassHallTicket"
import AdminExamFillMarksheet from "./exam/pages/AdminExamFillMarksheet"





import {ParentDashboardHome} from "./dashboard/Parent"
import ParentHomeWorkHomePage from "./homework/pages/ParentHomeWorkHomePage"


/**
 * Student Import
 */
import RegisterPage from "./student/pages/RegisterPage"
import RegisterListPage from "./student/pages/RegisterListPage"
import BulkStudentRegister from "./student/pages/BulkStudentRegister" 
import AdmissionStudent from "./student/pages/AdmissionStudent"
import AdmissionStudentList from "./student/pages/AdmissionStudentList"
import BulkStudentAdmission from "./student/pages/BulkStudentAdmission"
import BulkStudentProfile from "./student/pages/BulkStudentProfile"
import StudentProfileImages from "./student/pages/StudentProfileImages"
import StudentProfileUpdate from "./student/pages/StudentProfileUpdate"
import BulkStudentProfileImages from "./student/pages/BulkStudentProfileImages"
import StudentList from "./student/pages/StudentList"
import StudentAdvancedSearch from "./student/pages/StudentAdvancedSearch"
import StudentOneClickInfo from "./student/pages/StudentOneClickInfo"
import StudentMedicalInfo from "./student/pages/StudentMedicalInfo"
import StudentPhysicalFitness from "./student/pages/StudentPhysicalFitness"
import StudentGenerateIdCard from "./student/pages/StudentGenerateIdCard"
import PromoteStudent from "./student/pages/PromoteStudent"
import { Button } from "./utils/Components";


/**
 * Leave Import for Admin
 */
import AdminLeaveHome from "./leave/pages/AdminHomePage"


import ParentAttendanceHomePage from "./attendance/pages/ParentAttendanceHomePage"

import ParentExamHomePage from "./exam/pages/ParentExamHomePage"

import ParentTimeTable from "./timetable/pages/ParentTimeTable"

import ParentEventHomePage from "./event/pages/ParentEventHomePage"
import ParentMeetingsHomePage from "./meetings/pages/ParentMeetingsHomePage"
import ParentNoticeBoardHomePage from "./noticeboard/pages/ParentNoticeBoardHomePage"
import ParentStudentInfoPage from "./student_info/pages/ParentStudentInfoPage"
import ParentVirtualClassHomePage from "./virtual_class/pages/ParentVirtualClassHomePage"

if (localStorage.token) {
  var payload = JSON.parse(localStorage.userAccount);
  if(localStorage.user_type == 4){
    store.dispatch(setAssignedClass(JSON.parse(localStorage.assigned_class)))
  }else if(localStorage.user_type == 3){
    store.dispatch(setParentChild(JSON.parse(localStorage.parent_childs)))
  }
  setAuthorizationHeader(localStorage.token,payload.user_type,payload.school_id);
  store.dispatch(userLoggedIn(payload));
}

class Index extends Component {
    render() {
      return (
        <BrowserRouter>
          <Provider store={store}>
            <GuestRoute path="/login" exact component={LoginPage} />
            <GuestRoute path="/" exact component={LoginPage} />

            <TeacherDashboardRoutes extact path="/teacher/dashboard" component={TeacherDashboardHome} />
            <TeacherDashboardRoutes extact path="/teacher/attendance/class/:class_id" component={TeacherAttendanceHome} />
            <TeacherDashboardRoutes extact path="/teacher/attendance/edit-view/:class_id" component={TeacherAttendanceEditView} />
            <TeacherDashboardRoutes extact path="/teacher/attendance/view-particular-student-attendance/:class_id" component={TeacherAttendancIndividualStudent} />

            <TeacherDashboardRoutes extact path="/teacher/leave/:class_id" component={TeacherLeaveHomePage} />


            
            <TeacherDashboardRoutes extact path="/teacher/homework/view/:class_id" component={ViewHomeWork} />
            <TeacherDashboardRoutes extact path="/teacher/homework/class/:class_id" component={TeacherHomeWorkHomePage} />
            <TeacherDashboardRoutes extact path="/teacher/timetable/:class_id" component={TeacherClassWiseTimeTable} />
            <TeacherDashboardRoutes extact path="/teacher/homework/all" component={TeacherAllHomeWorkHome} />
            <TeacherDashboardRoutes extact path="/teacher/questionpaper" component={TeacherQuestionPaperHome} />

            <TeacherDashboardRoutes extact path="/teacher/exam/class/:class_id" component={TeacherExamHomePage} />
            

            <ParentDashboardRoutes extact path="/parent/dashboard" component={ParentDashboardHome} />
            <ParentDashboardRoutes extact path="/parent/homework/view/:student_id" component={ViewHomeWorkParent} />
            <ParentDashboardRoutes extact path="/parent/homework/student/:student_id" component={ParentHomeWorkHomePage} />
            <ParentDashboardRoutes extact path="/parent/attendance/:student_id" component={ParentAttendanceHomePage} />
            <ParentDashboardRoutes extact path="/parent/timetable/:student_id" component={ParentTimeTable} />
            <ParentDashboardRoutes extact path="/parent/exam/:student_id" component={ParentExamHomePage} />
            <ParentDashboardRoutes extact path="/parent/student_info/:student_id" component={ParentStudentInfoPage} />
            <ParentDashboardRoutes extact path="/parent/virtual_class/:student_id" component={ParentVirtualClassHomePage} />
            <ParentDashboardRoutes extact path="/parent/events" component={ParentEventHomePage} />
            <ParentDashboardRoutes extact path="/parent/meetings" component={ParentMeetingsHomePage} />
            <ParentDashboardRoutes extact path="/parent/noticeboard" component={ParentNoticeBoardHomePage} />



            <AdminDashboardRoutes exact path="/admin/dashboard" component={AdminDashboardHome} />
            <AdminDashboardRoutes exact path="/admin/student" component={StudentAdminHomePage} />
            
            <AdminDashboardRoutes exact path="/admin/student/register-student" component={RegisterPage} />
            <AdminDashboardRoutes exact path="/admin/student/register-student-list" component={RegisterListPage} />
            <AdminDashboardRoutes exact path="/admin/student/register-student-bulk" component={BulkStudentRegister} />
            <AdminDashboardRoutes exact path="/admin/student/admission-student" component={AdmissionStudent} />
            <AdminDashboardRoutes exact path="/admin/student/student-admission-list" component={AdmissionStudentList} />
            <AdminDashboardRoutes exact path="/admin/student/student-admission-bulk" component={BulkStudentAdmission} />
            <AdminDashboardRoutes exact path="/admin/student/student-profile-update" component={StudentProfileUpdate} />
            <AdminDashboardRoutes exact path="/admin/student/student-profile-update-bulk" component={BulkStudentProfile} />
            <AdminDashboardRoutes exact path="/admin/student/student-profile-image" component={StudentProfileImages} />
            <AdminDashboardRoutes exact path="/admin/student/student-profile-update-images-bulk" component={BulkStudentProfileImages} />
            <AdminDashboardRoutes exact path="/admin/student/student-list" component={StudentList} />
            <AdminDashboardRoutes exact path="/admin/student/student-advanced-search" component={StudentAdvancedSearch} />
            <AdminDashboardRoutes exact path="/admin/student/student-oneclick-info" component={StudentOneClickInfo} />
            <AdminDashboardRoutes exact path="/admin/student/medical-info" component={StudentMedicalInfo} />
            <AdminDashboardRoutes exact path="/admin/student/student-physical-fitness" component={StudentPhysicalFitness} />
            <AdminDashboardRoutes exact path="/admin/student/student-generate-id-card" component={StudentGenerateIdCard} />
            <AdminDashboardRoutes exact path="/admin/student/promote-student" component={PromoteStudent} />




            <AdminDashboardRoutes exact path="/admin/teacher" component={TeacherAdminHomePage} />
            <AdminDashboardRoutes exact path="/admin/teacher/add-new-teacher" component={TeacherAddTeacher} />
            <AdminDashboardRoutes exact path="/admin/teacher/view-teacher" component={TeacherViewTeacher} />

            <AdminDashboardRoutes exact path="/admin/fees/" component={FeesAdminHomePage} />
            <AdminDashboardRoutes exact path="/admin/fees/set-installments" component={FeeInstallments} />
            <AdminDashboardRoutes exact path="/admin/fees/set-due-dates" component={FeeSetDueDate} />
            <AdminDashboardRoutes exact path="/admin/fees/set-fees-class-wise" component={FeeSetClassWise} />
            <AdminDashboardRoutes exact path="/admin/fees/set-fees-individual" component={FeeSetIndividual} />
            <AdminDashboardRoutes exact path="/admin/fees/pay-fees" component={FeePayFees} />

            <AdminDashboardRoutes exact path="/admin/timetable" component={TimeTableAdminHomePage} />
            <AdminDashboardRoutes exact path="/admin/timetable/view-student" component={TimeTableViewStudent} />
            <AdminDashboardRoutes exact path="/admin/timetable/publish-student-timetable" component={TimeTablePublishStudentTimeTable} />

            <AdminDashboardRoutes exact path="/admin/attendance" component={AdminAttendanceHomePage} />
            <AdminDashboardRoutes exact path="/admin/attendance/edit-student" component={AdminAttendanceStudentEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/edit-staff" component={AdminAttendanceStaffEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-class-wise-student-attendance" component={AdminAttendanceClassWiseEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-particular-student-attendance" component={AdminAttendanceIndividualStudent} />
            
            <AdminDashboardRoutes exact path="/admin/exam" component={AdminExamHome} />
            <AdminDashboardRoutes exact path="/admin/hallticket/class" component={AdminClassHallTicket} />
            <AdminDashboardRoutes exact path="/admin/fillmarksheet/exam" component={AdminExamFillMarksheet} />
            <AdminDashboardRoutes exact path="/admin/leave" component={AdminLeaveHome} />
            
            <AdminDashboardRoutes exact path="/admin/setting" component={AdminSettingHomePage} />
          </Provider>
        </BrowserRouter>
      )
    }
}

ReactDOM.render(<Index />, document.getElementById("app"));
