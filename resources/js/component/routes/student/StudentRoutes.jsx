import React from "react"
import StudentDashboardRoutes from "../StudentDashboardRoutes"
import TimeTableStudent from "../../timetable/pages/StudentParentTimeTable"
const StudentRoutes = () => (
    <span>
        <StudentDashboardRoutes  exact path="/student/timetable" component={TimeTableStudent}/>
    </span>
)

export default StudentRoutes