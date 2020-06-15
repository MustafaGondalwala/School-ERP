import React from "react"

import AttendanceHeader from "../../../header/teacher/AttendanceHeader"
import TopBreadCrumb from "../../../utils/TopBreadcrumb"
import BodyComponent from "../../../utils/BodyComponent"
import Row from "../../../utils/Row"
import ColComponent from "../../../utils/ColComponent"
const TeacherAttendanceHome = () => (
    <div>
        <TopBreadCrumb mainHeader="Attendance" header="Home">
            <AttendanceHeader />
        </TopBreadCrumb>
        <BodyComponent>
            <Row>
                <ColComponent title={"Student Attendance"} description={"Edit/View Student Attendance in System"} button_text="Enter" link={"/teacher/attendance/edit-view/1"} />
                <ColComponent title={"View Particular Student Attendance"} description={"View Particular Student Attendance in System"} button_text="Enter" link={"/teacher/attendance/view-particular-student-attendance/1"} />
                <ColComponent title={"View Class Attendance Report"} description={"View Particular Student Attendance in System"} button_text="Enter" link={"/admin/attendance/view-particular-student-attendance"} />
            </Row>
        </BodyComponent>
    </div>
)

export default TeacherAttendanceHome