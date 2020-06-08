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
import StudentNewRegisterStudent from "./student/pages/NewRegisterStudent"
import StudentViewStudent from "./student/pages/StudentViewStudent"
import StudentProfileUpdate from "./student/pages/StudentProfileUpdate"


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


import AdminSettingHomePage from "./setting/pages/AdminHomePage"

import {TeacherDashboardHome} from "./dashboard/Teacher"
import TeacherHomeWorkHomePage from "./homework/pages/TeacherHomeWorkHomePage"
import ViewHomeWork from "./homework/pages/ViewHomeWork"
import ViewHomeWorkParent from "./homework/pages/ViewHomeWorkParent"


import {ParentDashboardHome} from "./dashboard/Parent"
import ParentHomeWorkHomePage from "./homework/pages/ParentHomeWorkHomePage"

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
            <TeacherDashboardRoutes extact path="/teacher/homework/view/:class_id" component={ViewHomeWork} />
            <TeacherDashboardRoutes extact path="/teacher/homework/class/:class_id" component={TeacherHomeWorkHomePage} />
            <TeacherDashboardRoutes extact path="/teacher/timetable/:class_id" component={TeacherClassWiseTimeTable} />



            <ParentDashboardRoutes extact path="/parent/dashboard" component={ParentDashboardHome} />
            <ParentDashboardRoutes extact path="/parent/homework/view/:student_id" component={ViewHomeWorkParent} />
            <ParentDashboardRoutes extact path="/parent/homework/student/:student_id" component={ParentHomeWorkHomePage} />



            <AdminDashboardRoutes exact path="/admin/dashboard" component={AdminDashboardHome} />
            <AdminDashboardRoutes exact path="/admin/student" component={StudentAdminHomePage} />
            <AdminDashboardRoutes exact path="/admin/student/add-new-student" component={StudentNewRegisterStudent} />
            <AdminDashboardRoutes exact path="/admin/student/view-student" component={StudentViewStudent} />
            <AdminDashboardRoutes exact path="/admin/student/update-student-info" component={StudentProfileUpdate}/>


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
            <AdminDashboardRoutes exact path="/admin/setting" component={AdminSettingHomePage} />
          </Provider>
        </BrowserRouter>
      )
    }
}

ReactDOM.render(<Index />, document.getElementById("app"));
