import React from "react"

import AttendanceHeader from "../../../header/teacher/AttendanceHeader"
import TopBreadCrumb from "../../../utils/TopBreadcrumb"
import BodyComponent from "../../../utils/BodyComponent"
import Row from "../../../utils/Row"
import ColComponent from "../../../utils/ColComponent"
const TeacherAttendanceHome = ({match}) => {
    const {class_id} = match.params
    return(
        <div>
            <TopBreadCrumb mainHeader="Attendance" header="Home">
                <AttendanceHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <Row>
                    <ColComponent title={"Student Attendance"} description={"Edit/View Student Attendance in System"} button_text="Enter" link={`/teacher/attendance/edit-view/${class_id}`} />
                    <ColComponent title={"View Particular Student Attendance"} description={"View Particular Student Attendance in System"} button_text="Enter" link={`/teacher/attendance/view-particular-student-attendance/${class_id}`} />
                    <ColComponent title={"View Class Attendance Report"} description={"View Particular Student Attendance in System"} button_text="Enter" link={`/teacher/attendance/view-class-wise-student-attendance/${class_id}`} />
                </Row>
            </BodyComponent>
        </div>
    )
}


export default TeacherAttendanceHome