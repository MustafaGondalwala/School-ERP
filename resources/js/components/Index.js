import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DashboardHomePage from "./dashboard/HomePage"
import ParentHomePage from "./dashboard/ParentHomePage"
import AdminDashboardRoutes from "./AdminDashboardRoutes"
import ParentDashboardRoutes from "./ParentDashboardRoutes"

import { ParentLeaveHome } from "./leave/parent/ParentLeaveComponent"
import  RequestLeave  from "./leave/parent/RequestLeave"

import StudentHomePage from "./student/StudentHomePage"
import RegisterStudentPage from "./student/pages/RegisterStudentPage"
import AdmissionStudentPage from "./student/pages/AdmissionStudentPage"
import ViewAllStudentPage from "./student/pages/ViewAllStudentPage"
import ViewStudentLoginPage from "./student/pages/ViewStudentLoginPage"
import ProfileUpdateTeacher from "./teacher/pages/ProfileUpdateTeacher"
import TeacherHomePage from "./teacher/TeacherHomePage";
import AddTeacherPage from "./teacher/pages/AddTeacherPage";
import AssignTeacher from "./teacher/pages/AssignTeacher";
import ViewAllTeacher from "./teacher/pages/ViewAllTeacher";
import SettingHomePage from "./setting/SettingHomePage"
import AdmissionList from "./student/pages/AdmissionList";
import LoginPage from "./authentication/pages/LoginPage";

import PayFeesHomePage,{ FeesHomePage,SetFeesInstallments, SetFeesDueDate, ViewFeeReceipt, SetIndividualFees, ManageClerkLogin } from "./fees/AdminFeesComponent";
import SetClassWiseFees from "./fees/pages/SetClassWiseFees";

import TimeTableHomePage from "./time_table/TimeTableHomePage";
import SetTeacherSubjectClassWise from "./time_table/pages/SetTeacherSubjectClassWise";
import GenerateTimeTable from "./time_table/pages/GenerateTimeTable"
import ViewTimeTable from "./time_table/pages/ViewTimeTable"
import ViewTimeTableTeacher from "./time_table/pages/ViewTimeTableTeacher"

import ExamHomePage from "./exam/ExamHomePage";
import AddAdmitCard from "./exam/pages/AddAdmitCard";
import FillExamMarksheet from "./exam/pages/FillExamMarksheet";
import UploadStudentInfo from "./student/pages/UploadStudentInfo";

import {AdminLeaveHome,AttendLeaveRequest} from "./leave/AdminLeaveComponent"

import { AttendanceHomePage,EditAttendanceStudent,EditAttendanceTeacher } from "./attendence/AdminAttendanceComponents"


import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


if (localStorage.SMS) {
  var payload = JSON.parse(localStorage.userAccount);
  store.dispatch(userLoggedIn(payload));
}



class Index extends Component {

     render () {
       return (
         <BrowserRouter>
            <Provider store={store}>

                <AdminDashboardRoutes path="/admin/dashboard"  exact main_header="Dashboard"  header="Dashboard" subheader="Home" component={DashboardHomePage} />
                <AdminDashboardRoutes path="/admin/student" exact main_header="Student"  header="Student" subheader="Home" component={StudentHomePage} />
                <AdminDashboardRoutes path="/admin/student/add-new-student" exact main_header="Student"  header="Student" subheader="Register Student" component={RegisterStudentPage} />
                <AdminDashboardRoutes path="/admin/student/add-new-admission-student" exact main_header="Student"  header="Student" subheader="Admission Student" component={AdmissionStudentPage} />
                <AdminDashboardRoutes path="/admin/student/view-student" exact main_header="Student"  header="Student" subheader="View All Student" component={ViewAllStudentPage} />
                <AdminDashboardRoutes path="/admin/student/view-student-login" exact main_header="Student"  header="Student" subheader="View Student Login" component={ViewStudentLoginPage} />
                <AdminDashboardRoutes path="/admin/student/update-student-info" exact main_header="Student"  header="Student" subheader="Profile Update" component={UploadStudentInfo} />
                <AdminDashboardRoutes path="/admin/teacher" exact main_header="Teacher"  header="Teacher" subheader="Home" component={TeacherHomePage} />
                <AdminDashboardRoutes path="/admin/teacher/add-teacher" exact main_header="Teacher"  header="Teacher" subheader="Add Teacher" component={AddTeacherPage} />
                <AdminDashboardRoutes path="/admin/teacher/assign-teacher" exact main_header="Teacher"  header="Teacher" subheader="Assign Teacher to Class" component={AssignTeacher} />
                <AdminDashboardRoutes path="/admin/teacher/view-all-teacher" exact main_header="Teacher"  header="Teacher" subheader="View Teacher" component={ViewAllTeacher} />
                <AdminDashboardRoutes path="/admin/teacher/update-profile" exact main_header="Student"  header="Student" subheader="Profile Update" component={ProfileUpdateTeacher} />
                <AdminDashboardRoutes path="/admin/setting" exact main_header="Settings"  header="Settings" subheader="View Settings" component={SettingHomePage} />
                <AdminDashboardRoutes path="/admin/student/admission-list" exact main_header="Student"  header="Student" subheader="View Admission List" component={AdmissionList} />
                
                <AdminDashboardRoutes path="/admin/fees" exact main_header="Fees"  header="Fees" subheader="Fees HomePage" component={FeesHomePage} />
                <AdminDashboardRoutes path="/admin/fees/set-installments" exact main_header="Fees"  header="Fees" subheader="Set Installments" component={SetFeesInstallments} />
                <AdminDashboardRoutes path="/admin/fees/set-due-dates" exact main_header="Fees"  header="Fees" subheader="Set Due Date" component={SetFeesDueDate} />
                <AdminDashboardRoutes path="/admin/fees/set-fees-individual" exact main_header="Fees"  header="Fees" subheader="Set Individual Fees" component={SetIndividualFees} />
                <AdminDashboardRoutes path="/admin/fees/set-fees-class-wise" exact main_header="Fees"  header="Fees" subheader="Set Class Wise Fees" component={SetClassWiseFees} />
                <AdminDashboardRoutes path="/admin/fees/pay-fees" exact main_header="Fees"  header="Fees" subheader="Pay Fee" component={PayFeesHomePage} />
                <AdminDashboardRoutes path="/admin/fees/view-receipt" exact main_header="Fees"  header="Fees" subheader="View Fee Receipt" component={ViewFeeReceipt} />
                <AdminDashboardRoutes path="/admin/fees/manage-clerk-login" exact component={ManageClerkLogin} />


                <AdminDashboardRoutes path="/admin/time-table" exact main_header="Time Table"  header="Time Table" subheader="Home" component={TimeTableHomePage} />
                <AdminDashboardRoutes path="/admin/time-table/set-teacher-subject-classes-wise" exact main_header="Time Table" header="Time Table" subheader="Set Teacher Subject/Class Wise" component={SetTeacherSubjectClassWise} />
                <AdminDashboardRoutes path="/admin/time-table/generate-time-table" exact main_header="Time Table"  header="Time Table" subheader="Generate Time Table" component={GenerateTimeTable} />
                <AdminDashboardRoutes path="/admin/time-table/view-time-table" exact main_header="Time Table"  header="Time Table" subheader="View Time Table" component={ViewTimeTable} />
                <AdminDashboardRoutes path="/admin/time-table/view-time-table-for-teacher" exact main_header="Time Table"  header="Time Table" subheader="View Time Table for Teacher" component={ViewTimeTableTeacher} />
                
                <AdminDashboardRoutes path="/admin/attendance" exact component={AttendanceHomePage} />
                <AdminDashboardRoutes path="/admin/attendance/edit-student-attendance" exact component={EditAttendanceStudent} />
                <AdminDashboardRoutes path="/admin/attendance/edit-staff-attendance" exact component={EditAttendanceTeacher} />
                


                <AdminDashboardRoutes path="/admin/exam" exact main_header="Exam"  header="Exam" subheader="Home" component={ExamHomePage} />
                <AdminDashboardRoutes path="/admin/exam/add-admit-card" exact main_header="Exam"  header="Add Admin Card" subheader="Add" component={AddAdmitCard} />
                <AdminDashboardRoutes path="/admin/exam/fill-exam-marksheet" exact main_header="Exam"  header="Fill Exam Marksheet" subheader="Fill Marksheet" component={FillExamMarksheet} />
                <AdminDashboardRoutes path="/admin/exam/fill-exam-marksheet" exact main_header="Exam"  header="Fill Exam Marksheet" subheader="Fill Marksheet" component={FillExamMarksheet} />
                
                <AdminDashboardRoutes path="/admin/leave" exact main_header="Leave"  header="Home" component={AdminLeaveHome} />
                <AdminDashboardRoutes path="/admin/leave/attend-request" exact component={AttendLeaveRequest} />

                <ParentDashboardRoutes path="/parent/dashboard" exact main_header="Parent" header="Home" component={ParentHomePage} />
                <ParentDashboardRoutes path="/parent/leave/:student_id"  exact  component={ParentLeaveHome} />
                <ParentDashboardRoutes path="/leave/:student_id/request-leave" exact  component={RequestLeave} />        


                <Route path="/login" component={LoginPage}/>
            </Provider>
         </BrowserRouter>

       )
     }
}


ReactDOM.render(<Index />, document.getElementById('app'))
