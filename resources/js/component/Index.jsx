import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./authentication/LoginPage"

import GuestRoute from "./routes/GuestRoute"
import AdminDashboardRoutes from "./routes/AdminDashboardRoutes"
import TeacherDashboardRoutes from "./routes/TeacherDashboardRoutes"
import ParentDashboardRoutes from "./routes/ParentDashboardRoutes"
import ClerkDashboardRoutes from "./routes/ClerkDashboardRoutes"

import ClerkStudentRoutes from "./routes/clerk/ClerkStudentRoutes"



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




import TeacherAdminHomePage from "./teacher/pages/TeacherAdminHomePage"
import TeacherAddTeacher from "./teacher/pages/TeacherAddTeacher"
import TeacherViewTeacher from "./teacher/pages/TeacherViewTeacher"
import TeacherAssignedClass from "./teacher/pages/TeacherAssignedClass"
import TeacherProfileUpdate from "./teacher/pages/TeacherProfileUpdate"

import TeacherClassWiseTimeTable from "./timetable/pages/TeacherClassWiseTimeTable"

import TimeTableAdminHomePage from "./timetable/pages/TimeTableAdminHomePage"
import TimeTableViewStudent from "./timetable/pages/TimeTableViewStudent"
import TimeTableViewStaff from "./timetable/pages/TimeTableViewStaff"

import TimeTablePublishStudentTimeTable from "./timetable/pages/TimeTablePublishStudentTimeTable"

import TimeTablePublishStaffTimeTable from "./timetable/pages/TimeTablePublishStaffTimeTable"


import AdminAttendanceHomePage from "./attendance/pages/AdminAttendanceHomePage"
import AdminAttendanceStudentEdit from "./attendance/pages/AdminAttendanceStudentEdit"
import AdminAttendanceStaffEdit from "./attendance/pages/AdminAttendanceStaffEdit"
import AdminAttendanceClassWiseEdit from "./attendance/pages/AdminAttendanceClassWiseEdit"
import AdminAttendanceIndividualStudent from "./attendance/pages/AdminAttendanceIndividualStudent"
import AdminAttendanceIndividualStaff from "./attendance/pages/AdminAttendanceIndividualStaff"


import AdminSettingHomePage from "./setting/pages/AdminHomePage"

import {TeacherDashboardHome} from "./dashboard/Teacher"
import TeacherHomeWorkHomePage from "./homework/pages/TeacherHomeWorkHomePage"
import ViewHomeWork from "./homework/pages/ViewHomeWork"
import ViewHomeWorkParent from "./homework/pages/ViewHomeWorkParent"
import TeacherAllHomeWorkHome from "./homework/pages/TeacherAllHomeWorkHome"
import TeacherQuestionPaperHome from "./question/pages/TeacherQuestionPaperHome"
import TeacherAttendanceHome from "./attendance/pages/teacher/TeacherAttendanceHome"
import TeacherAttendanceEditView from "./attendance/pages/teacher/TeacherAttendanceEditView"
import TeacherAttendanceClassWiseEdit from "./attendance/pages/teacher/TeacherAttendanceClassWiseEdit"
import TeacherAttendancIndividualStudent from "./attendance/pages/teacher/TeacherAttendancIndividualStudent"
import TeacherLeaveHomePage from "./leave/pages/teacher/TeacherLeaveHomePage"
import TeacherExamHomePage from "./exam/pages/teacher/TeacherExamHomePage"

import AdminExamHomePage from "./exam/pages/AdminExamHomePage"
import AdminClassHallTicket from "./exam/pages/AdminClassHallTicket"
import AdminIndividualClassHallTicket from "./exam/pages/AdminIndividualClassHallTicket"
import AdminExamFillMarksheet from "./exam/pages/AdminExamFillMarksheet"
import AdminMonthlyTestFillMarksheet from "./exam/pages/AdminMonthlyTestFillMarksheet"
import AdminAllocateSubject from "./exam/pages/AdminAllocateSubject"
import AdminExamType from "./exam/pages/AdminExamType"
import AdminMonthlyType from "./exam/pages/AdminMonthlyType"

import {ParentDashboardHome} from "./dashboard/Parent"
import ParentHomeWorkHomePage from "./homework/pages/ParentHomeWorkHomePage"

import {ClerkDashboardHome} from "./dashboard/Clerk"

import StudyMaterialHomePage from "./studymaterial/pages/StudyMaterialHomePage"

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

import AdminNoticeBoard from "./noticeboard/pages/AdminNoticeBoard"
import AdminAddNoticeBoard from "./noticeboard/pages/AdminAddNoticeBoard"
import AdminViewNoticeBoard from "./noticeboard/pages/AdminViewNoticeBoard"

if (localStorage.token) {
  var payload = JSON.parse(localStorage.userAccount);
  if(localStorage.user_type == 4){
    store.dispatch(setAssignedClass(JSON.parse(localStorage.classes)))
  }else if(localStorage.user_type == 3){
    store.dispatch(setParentChild(JSON.parse(localStorage.parent_childs)))
  }
  setAuthorizationHeader(localStorage.token,payload.user_type,payload.school_id,localStorage.year_id);
  store.dispatch(userLoggedIn(payload));
}


import './i18n';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";


import LogRocket from "logrocket"
import AdminStudentRoutes from "./routes/admin/AdminStudentRoutes"
import AdminFeeRoutes from "./routes/admin/AdminFeeRoutes"


import StudyMaterialGroup from "./studymaterial/pages/StudyMaterialGroup"
import StudyMaterialAdd from "./studymaterial/pages/StudyMaterialAdd"
import ChangePasswordClerk from "./clerk/pages/ChangePasswordClerk";


// Student Report
import StudentClassWiseReport from "./student/pages/StudentClassWiseReport"
import StudentReligionCasteReport from "./student/pages/StudentReligionCasteReport"
class Index extends Component {
    render() {
      return (
        <BrowserRouter>
        <I18nextProvider>
        <React.StrictMode>
          <Provider store={store}>
            <GuestRoute path="/login" exact component={LoginPage} />
            <GuestRoute path="/" exact component={LoginPage} />
            <AdminStudentRoutes />
            <AdminFeeRoutes />
            <ClerkStudentRoutes />
            <ClerkDashboardRoutes exact path="/clerk/dashboard" component={ClerkDashboardHome}/>
            <AdminDashboardRoutes exact path="/admin/clerk/changepassword" component={ChangePasswordClerk}/>
            <AdminDashboardRoutes exact path="/admin/student/report/class-section" component={StudentClassWiseReport}/>
            <AdminDashboardRoutes exact path="/admin/student/report/religion-caste" component={StudentReligionCasteReport}/>
            

            <TeacherDashboardRoutes exact path="/teacher/dashboard" component={TeacherDashboardHome} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/class/:class_id" component={TeacherAttendanceHome} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/edit-view/:class_id" component={TeacherAttendanceEditView} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/view-particular-student-attendance/:class_id" component={TeacherAttendancIndividualStudent} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/view-class-wise-student-attendance/:class_id" component={TeacherAttendanceClassWiseEdit} />
            <TeacherDashboardRoutes exact path="/teacher/leave/:class_id" component={TeacherLeaveHomePage} />

            <TeacherDashboardRoutes exact path="/teacher/homework/view/:class_id" component={ViewHomeWork} />
            <TeacherDashboardRoutes exact path="/teacher/homework/class/:class_id" component={TeacherHomeWorkHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/timetable/:class_id" component={TeacherClassWiseTimeTable} />
            <TeacherDashboardRoutes exact path="/teacher/homework/all" component={TeacherAllHomeWorkHome} />
            <TeacherDashboardRoutes exact path="/teacher/questionpaper" component={TeacherQuestionPaperHome} />
            <TeacherDashboardRoutes exact path="/teacher/exam/class/:class_id" component={TeacherExamHomePage} />
            

          <ParentDashboardRoutes exact path="/parent/dashboard" component={ParentDashboardHome} />

            <ParentDashboardRoutes exact path="/parent/dashboard" component={ParentDashboardHome} />
            <ParentDashboardRoutes exact path="/parent/homework/view/:student_id" component={ViewHomeWorkParent} />
            <ParentDashboardRoutes exact path="/parent/homework/student/:student_id" component={ParentHomeWorkHomePage} />
            <ParentDashboardRoutes exact path="/parent/attendance/:student_id" component={ParentAttendanceHomePage} />
            <ParentDashboardRoutes exact path="/parent/timetable/:student_id" component={ParentTimeTable} />
            <ParentDashboardRoutes exact path="/parent/exam/:student_id" component={ParentExamHomePage} />
            <ParentDashboardRoutes exact path="/parent/student_info/:student_id" component={ParentStudentInfoPage} />
            <ParentDashboardRoutes exact path="/parent/virtual_class/:student_id" component={ParentVirtualClassHomePage} />
            <ParentDashboardRoutes exact path="/parent/events" component={ParentEventHomePage} />
            <ParentDashboardRoutes exact path="/parent/meetings" component={ParentMeetingsHomePage} />
            <ParentDashboardRoutes exact path="/parent/noticeboard" component={ParentNoticeBoardHomePage} />



            <AdminDashboardRoutes exact path="/admin/dashboard" component={AdminDashboardHome} />

            <AdminDashboardRoutes exact path="/admin/noticeboard" component={AdminNoticeBoard} />
            <AdminDashboardRoutes exact path="/admin/noticeboard/add" component={AdminAddNoticeBoard} />
            <AdminDashboardRoutes exact path="/admin/noticeboard/view" component={AdminViewNoticeBoard} />



            <AdminDashboardRoutes exact path="/admin/teacher" component={TeacherAdminHomePage} />
            <AdminDashboardRoutes exact path="/admin/teacher/add-new-teacher" component={TeacherAddTeacher} />
            <AdminDashboardRoutes exact path="/admin/teacher/view-teacher" component={TeacherViewTeacher} />
            <AdminDashboardRoutes exact path="/admin/teacher/assign-teacher" component={TeacherAssignedClass} />
            <AdminDashboardRoutes exact path="/admin/teacher/update" component={TeacherProfileUpdate} />

            
            <AdminDashboardRoutes exact path="/admin/timetable" component={TimeTableAdminHomePage} />
            <AdminDashboardRoutes exact path="/admin/timetable/view-student" component={TimeTableViewStudent} />
            <AdminDashboardRoutes exact path="/admin/timetable/view-teacher" component={TimeTableViewStaff} />


            <AdminDashboardRoutes exact path="/admin/timetable/publish-student-timetable" component={TimeTablePublishStudentTimeTable} />
            <AdminDashboardRoutes exact path="/admin/timetable/publish-staff-timetable" component={TimeTablePublishStaffTimeTable} />



            <AdminDashboardRoutes exact path="/admin/attendance" component={AdminAttendanceHomePage} />
            <AdminDashboardRoutes exact path="/admin/attendance/edit-student" component={AdminAttendanceStudentEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/edit-staff" component={AdminAttendanceStaffEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-class-wise-student-attendance" component={AdminAttendanceClassWiseEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-particular-student-attendance" component={AdminAttendanceIndividualStudent} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-particular-staff-attendance" component={AdminAttendanceIndividualStaff} />
            
            <AdminDashboardRoutes exact path="/admin/exam" component={AdminExamHomePage} />
            <AdminDashboardRoutes exact path="/admin/hallticket/class" component={AdminClassHallTicket} />
            <AdminDashboardRoutes exact path="/admin/hallticket/individual" component={AdminIndividualClassHallTicket} />

            <AdminDashboardRoutes exact path="/admin/fillmarksheet/exam" component={AdminExamFillMarksheet} />
            <AdminDashboardRoutes exact path="/admin/fillmarksheet/test" component={AdminMonthlyTestFillMarksheet} />
           
            
            <AdminDashboardRoutes exact path="/admin/exam/allocate-subject" component={AdminAllocateSubject} />
            <AdminDashboardRoutes exact path="/admin/exam/exam-type" component={AdminExamType} />

            <TeacherDashboardRoutes exact path="/teacher/monthlytest/add/:class_id" component={AdminMonthlyType} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/class/:class_id" component={StudyMaterialHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/group/:class_id" component={StudyMaterialGroup} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/group" component={StudyMaterialGroup} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/material/:class_id" component={StudyMaterialAdd} />
            
            {/* 1 */}
          
            
            
            <AdminDashboardRoutes exact path="/admin/leave" component={AdminLeaveHome} />
            <AdminDashboardRoutes exact path="/admin/setting" component={AdminSettingHomePage} />

          </Provider>
          </React.StrictMode>
        </I18nextProvider>
        </BrowserRouter>
      )
    }
}

ReactDOM.render(<Index />, document.getElementById("app"));
