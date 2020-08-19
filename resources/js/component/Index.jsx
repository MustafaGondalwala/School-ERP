import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./authentication/LoginPage"

import GuestRoute from "./routes/GuestRoute"
import AdminDashboardRoutes from "./routes/AdminDashboardRoutes"
import TeacherDashboardRoutes from "./routes/TeacherDashboardRoutes"
import ParentDashboardRoutes from "./routes/ParentDashboardRoutes"
import ClerkDashboardRoutes from "./routes/ClerkDashboardRoutes"
import StudentDashboardRoutes from "./routes/StudentDashboardRoutes"
import ClerkStudentRoutes from "./routes/clerk/ClerkStudentRoutes"
import StudentRoutes from "./routes/student/StudentRoutes"




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
import TimeTableClassPeriods from "./timetable/pages/TimeTableClassPeriods"

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
import TeacherClassCurrentHomeWork from "./homework/pages/TeacherClassCurrentHomeWork"
import TeacherClassHomeWorkHomePage from "./homework/pages/TeacherClassHomeWorkHomePage"
import TeacherManageHomeWork from "./homework/pages/TeacherManageHomeWork"
import TeacherPastManageHomeWork from "./homework/pages/TeacherPastManageHomeWork"
import TeacherCheckStudentHomeWork from "./homework/pages/TeacherCheckStudentHomeWork"
import TeacherOnlineTestClassView from "./onlineexam/pages/TeacherOnlineTestClassView"
import TeacherOnlineTestPastClassView from "./onlineexam/pages/TeacherOnlineTestPastClassView"

import TeacherHomeWorkAdd from "./homework/pages/TeacherHomeWorkAdd"

import ViewHomeWork from "./homework/pages/ViewHomeWork"
import ViewHomeWorkParent from "./homework/pages/ViewHomeWorkParent"
import TeacherAllHomeWorkHome from "./homework/pages/TeacherAllHomeWorkHome"
import TeacherQuestionPaperAdd from "./question/pages/TeacherQuestionPaperAdd"
import TeacherQuestionPaperManage from "./question/pages/TeacherQuestionPaperManage"

import TeacherQuestionPaperHome from "./question/pages/TeacherQuestionPaperHome"
import TeacherAttendanceHome from "./attendance/pages/teacher/TeacherAttendanceHome"
import TeacherAttendanceEditView from "./attendance/pages/teacher/TeacherAttendanceEditView"
import TeacherAttendanceClassWiseEdit from "./attendance/pages/teacher/TeacherAttendanceClassWiseEdit"
import TeacherAttendancIndividualStudent from "./attendance/pages/teacher/TeacherAttendancIndividualStudent"
import TeacherLeaveHomePage from "./leave/pages/teacher/TeacherLeaveHomePage"
import TeacherLeaveCurrentRequest from "./leave/pages/TeacherLeaveCurrentRequest"
import TeacherLeaveViewPastRequest from "./leave/pages/TeacherLeaveViewPastRequest"
import TeacherLeaveClasswiseReport from "./leave/pages/TeacherLeaveClasswiseReport"
import TeacherExamHomePage from "./exam/pages/teacher/TeacherExamHomePage"


import AdminExamHomePage from "./exam/pages/AdminExamHomePage"
import AdminClassHallTicket from "./exam/pages/AdminClassHallTicket"
import AdminIndividualClassHallTicket from "./exam/pages/AdminIndividualClassHallTicket"
import AdminExamFillMarksheet from "./exam/pages/AdminExamFillMarksheet"
import AdminGradeType from "./exam/pages/AdminGradeType"

import TeacherFillMonthlyTestMarksheet from "./exam/pages/TeacherFillMonthlyTestMarksheet"

import AdminMonthlyTestFillMarksheet from "./exam/pages/AdminMonthlyTestFillMarksheet"
import AdminAllocateSubject from "./exam/pages/AdminAllocateSubject"
import AdminExamType from "./exam/pages/AdminExamType"
import AdminMonthlyType from "./exam/pages/AdminMonthlyType"

import {ParentDashboardHome} from "./dashboard/Parent"
import {StudentDashboardHome} from "./dashboard/Student"
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

import ParentFeeHomePage from "./fees/pages/ParentFeeHomePage"
import ParentFeeTotalFees from "./fees/pages/ParentFeeTotalFees"
import ParentFeeViewReceipt from "./fees/pages/ParentFeeViewReceipt"

import ParentLeaveHomePage from "./leave/pages/ParentLeaveHomePage"
import ParentLeaveApplyLeave from "./leave/pages/ParentLeaveApplyLeave"
import ParentLeaveViewAll from "./leave/pages/ParentLeaveViewAll"

if (localStorage.token) {
  var payload = JSON.parse(localStorage.getItem('userAccount'));
  if(localStorage.user_type == 4){
    store.dispatch(setAssignedClass(JSON.parse(localStorage.classes)))
  }else if(localStorage.user_type == 3){
    store.dispatch(setParentChild(payload.info))
  }
  setAuthorizationHeader(localStorage.token,payload.user_type,payload.school_id,localStorage.year_id);
  store.dispatch(userLoggedIn(payload));
}

import LogRocket from "logrocket"
import AdminStudentRoutes from "./routes/admin/AdminStudentRoutes"
import AdminFeeRoutes from "./routes/admin/AdminFeeRoutes"


import StudyMaterialGroup from "./studymaterial/pages/StudyMaterialGroup"
import StudyMaterialAdd from "./studymaterial/pages/StudyMaterialAdd"
import ChangePasswordClerk from "./clerk/pages/ChangePasswordClerk";

// Online Exam
import TeacherOnlineExamHome from "./onlineexam/pages/TeacherOnlineExamHome"
import TeacherOnlineTestAdd from "./onlineexam/pages/TeacherOnlineTestAdd"
import TeacherOnlineTestManage from "./onlineexam/pages/TeacherOnlineTestManage"
// Student Report
import StudentClassWiseReport from "./student/pages/StudentClassWiseReport"
import StudentReligionCasteReport from "./student/pages/StudentReligionCasteReport"

import StudyMaterialTeacherGroup from "./studymaterial/pages/StudyMaterialTeacherGroup"
import StudyMaterialTeacherMaterial from "./studymaterial/pages/StudyMaterialTeacherMaterial"

import TeacherStudyMaterialHomePage from "./studymaterial/pages/TeacherStudyMaterialHomePage"
import StudentViewResults from "./exam/pages/StudentViewResults"
import StudentViewExamResult from "./exam/pages/StudentViewExamResult"
import StudentViewMonthlytestResult from "./exam/pages/StudentViewMonthlytestResult"
import StudentParentHomeWorkHome from "./homework/pages/StudentParentHomeWorkHome"
import StudentParentCurrentHomeWork from "./homework/pages/StudentParentCurrentHomeWork"
import StudentParentPastHomeWork from "./homework/pages/StudentParentPastHomeWork"

import NoticeboardTeacherwise from "./noticeboard/pages/NoticeboardTeacherwise"
import NoticeboardStudentwise from "./noticeboard/pages/NoticeboardStudentwise"
import TeacherOnlineExamHomePage from "./onlineexam/pages/TeacherOnlineExamHomePage"
// import TeacherOnlineTestManage from "./onlineexam/pages/TeacherOnlineTestAdd"
import StudentOnlinTestHomePage from "./onlineexam/pages/StudentOnlinTestHomePage"
import StudentOnlineTestCurrent from "./onlineexam/pages/StudentOnlineTestCurrent"
import StudentOnlineTestAttend from "./onlineexam/pages/StudentOnlineTestAttend"
import TeacherOnlineTestFillMarksheet from "./onlineexam/pages/TeacherOnlineTestFillMarksheet"
import TeacherClassMonthyTestReport from "./exam/pages/TeacherClassMonthyTestReport"

import TeacherExamMarksheetFill from "./exam/pages/TeacherExamMarksheetFill"

class Index extends Component {
    render() {
      return (
        <BrowserRouter>
        <React.StrictMode>
          <Provider store={store}>
            <GuestRoute path="/login" exact component={LoginPage} />
            <GuestRoute path="/" exact component={LoginPage} />
            <AdminStudentRoutes />
            <AdminFeeRoutes />
            <ClerkStudentRoutes />
            <StudentRoutes />



            <ClerkDashboardRoutes exact path="/clerk/dashboard" component={ClerkDashboardHome}/>
            <AdminDashboardRoutes exact path="/admin/clerk/changepassword" component={ChangePasswordClerk}/>
            <AdminDashboardRoutes exact path="/admin/student/report/class-section" component={StudentClassWiseReport}/>
            <AdminDashboardRoutes exact path="/admin/student/report/religion-caste" component={StudentReligionCasteReport}/>
            
            <TeacherDashboardRoutes exact path="/teacher/online-exam/class/:class_id" component={TeacherOnlineExamHome} />
            <TeacherDashboardRoutes exact path="/teacher/online-exam/test-add/:class_id" component={TeacherOnlineTestAdd} />
            <TeacherDashboardRoutes exact path="/teacher/online-exam/classwise/view-current/:class_id" component={TeacherOnlineTestClassView} />
            <TeacherDashboardRoutes exact path="/teacher/online-exam/classwise/test-past/:class_id" component={TeacherOnlineTestPastClassView} />

            <TeacherDashboardRoutes exact path="/teacher/online-exam" component={TeacherOnlineExamHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/online-exam/add" component={TeacherOnlineTestAdd} />
            <TeacherDashboardRoutes exact path="/teacher/online-exam/manage" component={TeacherOnlineTestManage} />
            <TeacherDashboardRoutes exact path="/teacher/online-exam/fill-marksheet" component={TeacherOnlineTestFillMarksheet} />

            <TeacherDashboardRoutes exact path="/teacher/dashboard" component={TeacherDashboardHome} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/class/:class_id" component={TeacherAttendanceHome} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/edit-view/:class_id" component={TeacherAttendanceEditView} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/view-particular-student-attendance/:class_id" component={TeacherAttendancIndividualStudent} />
            <TeacherDashboardRoutes exact path="/teacher/attendance/view-class-wise-student-attendance/:class_id" component={TeacherAttendanceClassWiseEdit} />
            <TeacherDashboardRoutes exact path="/teacher/leave/:class_id" component={TeacherLeaveHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/leave/request/:class_id" component={TeacherLeaveCurrentRequest} />
            <TeacherDashboardRoutes exact path="/teacher/leave/past/:class_id" component={TeacherLeaveViewPastRequest} />
            <TeacherDashboardRoutes exact path="/teacher/leave/report/:class_id" component={TeacherLeaveClasswiseReport} />


            {/* teacher/leave/past/1 */}
            <TeacherDashboardRoutes exact path="/teacher/homework/view/:class_id" component={ViewHomeWork} />
            <TeacherDashboardRoutes exact path="/teacher/homework/class/:class_id" component={TeacherClassHomeWorkHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/homework/view-current-homework/:class_id" component={TeacherClassCurrentHomeWork} />
            <TeacherDashboardRoutes exact path="/teacher/homework" component={TeacherHomeWorkHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/homework/current/manage" component={TeacherManageHomeWork} />
            <TeacherDashboardRoutes exact path="/teacher/homework/past/manage" component={TeacherPastManageHomeWork} />
            <TeacherDashboardRoutes exact path="/teacher/homework/check" component={TeacherCheckStudentHomeWork} />


            

            <TeacherDashboardRoutes exact path="/teacher/homework/add" component={TeacherHomeWorkAdd} />

            <TeacherDashboardRoutes exact path="/teacher/timetable/:class_id" component={TeacherClassWiseTimeTable} />
            <TeacherDashboardRoutes exact path="/teacher/homework/all" component={TeacherAllHomeWorkHome} />
            <TeacherDashboardRoutes exact path="/teacher/questionpaper" component={TeacherQuestionPaperHome} />
            <TeacherDashboardRoutes exact path="/teacher/questionpaper/add" component={TeacherQuestionPaperAdd} />
            <TeacherDashboardRoutes exact path="/teacher/questionpaper/manage" component={TeacherQuestionPaperManage} />
            <TeacherDashboardRoutes exact path="/teacher/exam/class/:class_id" component={TeacherExamHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/exam/fill/:class_id" component={TeacherExamMarksheetFill} />
            
            <TeacherDashboardRoutes exact path="/teacher/monthlytest/fill/:class_id" component={TeacherFillMonthlyTestMarksheet} />
            <TeacherDashboardRoutes exact path="/teacher/exam/monthlytest/report/:class_id" component={TeacherClassMonthyTestReport} />


            <ParentDashboardRoutes exact path="/parent/dashboard" component={ParentDashboardHome} />
            <StudentDashboardRoutes exact path="/student/dashboard" component={StudentDashboardHome} />
            <StudentDashboardRoutes exact path="/student/homework/:student_id" component={StudentParentHomeWorkHome} />
            <StudentDashboardRoutes exact path="/student/homework/current/:student_id" component={StudentParentCurrentHomeWork} />
            <ParentDashboardRoutes exact path="/parent/homework/current/:student_id" component={StudentParentCurrentHomeWork} />


            <StudentDashboardRoutes exact path="/student/homework/past/:student_id" component={StudentParentPastHomeWork} />
            <ParentDashboardRoutes exact path="/parent/homework/past/:student_id" component={StudentParentPastHomeWork} />

            <StudentDashboardRoutes exact path="/student/noticeboard" component={NoticeboardStudentwise} />
            <StudentDashboardRoutes exact path="/student/online-test" component={StudentOnlinTestHomePage} />
            <StudentDashboardRoutes exact path="/student/online-test/view" component={StudentOnlineTestCurrent} />
            <StudentDashboardRoutes exact path="/student/attendtest/:onlinetest_id" component={StudentOnlineTestAttend} />
            
            <StudentDashboardRoutes exact path="/student/view-result" component={StudentViewResults} />
            <StudentDashboardRoutes exact path="/student/view-result/monthlytest/:student_id" component={StudentViewMonthlytestResult} />
            <StudentDashboardRoutes exact path="/student/view-result/exam/:student_id" component={StudentViewExamResult} />




            <ParentDashboardRoutes exact path="/parent/homework/view/:student_id" component={ViewHomeWorkParent} />
            <ParentDashboardRoutes exact path="/parent/homework/:student_id" component={StudentParentHomeWorkHome} />
            <ParentDashboardRoutes exact path="/parent/attendance/:student_id" component={ParentAttendanceHomePage} />
            <ParentDashboardRoutes exact path="/parent/timetable/:student_id" component={ParentTimeTable} />
            <ParentDashboardRoutes exact path="/parent/exam/:student_id" component={ParentExamHomePage} />
            <ParentDashboardRoutes exact path="/parent/student_info/:student_id" component={ParentStudentInfoPage} />
            <ParentDashboardRoutes exact path="/parent/virtual_class/:student_id" component={ParentVirtualClassHomePage} />
            <ParentDashboardRoutes exact path="/parent/events" component={ParentEventHomePage} />
            <ParentDashboardRoutes exact path="/parent/meetings" component={ParentMeetingsHomePage} />
            <ParentDashboardRoutes exact path="/parent/noticeboard" component={ParentNoticeBoardHomePage} />
            <ParentDashboardRoutes exact path="/parent/fees/:student_id" component={ParentFeeHomePage} />
            <ParentDashboardRoutes exact path="/parent/fees/total-fees/:student_id" component={ParentFeeTotalFees} />
            <ParentDashboardRoutes exact path="/parent/fees/view-receipt/:student_id" component={ParentFeeViewReceipt} />
            <ParentDashboardRoutes exact path="/parent/leave/apply/:student_id" component={ParentLeaveApplyLeave} />
            <ParentDashboardRoutes exact path="/parent/leave/:student_id" component={ParentLeaveHomePage} />
            <ParentDashboardRoutes exact path="/parent/leave/manage/:student_id" component={ParentLeaveViewAll} />



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
            <AdminDashboardRoutes exact path="/admin/timetable/classperiod" component={TimeTableClassPeriods} />
            <AdminDashboardRoutes exact path="/admin/timetable/publish-student-timetable" component={TimeTablePublishStudentTimeTable} />
            <AdminDashboardRoutes exact path="/admin/timetable/publish-staff-timetable" component={TimeTablePublishStaffTimeTable} />



            <AdminDashboardRoutes exact path="/admin/attendance" component={AdminAttendanceHomePage} />
            <AdminDashboardRoutes exact path="/admin/attendance/edit-student" component={AdminAttendanceStudentEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/edit-staff" component={AdminAttendanceStaffEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-class-wise-student-attendance" component={AdminAttendanceClassWiseEdit} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-particular-student-attendance" component={AdminAttendanceIndividualStudent} />
            <AdminDashboardRoutes exact path="/admin/attendance/view-particular-staff-attendance" component={AdminAttendanceIndividualStaff} />
            


            
            <AdminDashboardRoutes exact path="/admin/hallticket/class" component={AdminClassHallTicket} />
            <AdminDashboardRoutes exact path="/admin/hallticket/individual" component={AdminIndividualClassHallTicket} />
            <AdminDashboardRoutes exact path="/admin/fillmarksheet/exam" component={AdminExamFillMarksheet} />
            <AdminDashboardRoutes exact path="/admin/fillmarksheet/test" component={AdminMonthlyTestFillMarksheet} />
            <AdminDashboardRoutes exact path="/admin/exam" component={AdminExamHomePage} />
            <AdminDashboardRoutes exact path="/admin/exam/grade-type" component={AdminGradeType} />


            <AdminDashboardRoutes exact path="/admin/exam/allocate-subject" component={AdminAllocateSubject} />
            <AdminDashboardRoutes exact path="/admin/exam/exam-type" component={AdminExamType} />

            <TeacherDashboardRoutes exact path="/teacher/monthlytest/add/:class_id" component={AdminMonthlyType} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/class/:class_id" component={StudyMaterialHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/group/:class_id" component={StudyMaterialGroup} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/group" component={StudyMaterialGroup} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/material/:class_id" component={StudyMaterialAdd} />
            <TeacherDashboardRoutes exact path="/teacher/noticeboard" component={NoticeboardTeacherwise} />
 
        
 
            <TeacherDashboardRoutes exact path="/teacher/study-material/teacher" component={TeacherStudyMaterialHomePage} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/teacher/group" component={StudyMaterialTeacherGroup} />
            <TeacherDashboardRoutes exact path="/teacher/study-material/teacher/material" component={StudyMaterialTeacherMaterial} />

            <AdminDashboardRoutes exact path="/admin/leave" component={AdminLeaveHome} />
            <AdminDashboardRoutes exact path="/admin/setting" component={AdminSettingHomePage} />

          </Provider>
          </React.StrictMode>
        </BrowserRouter>
      )
    }
}

ReactDOM.render(<Index />, document.getElementById("app"));
