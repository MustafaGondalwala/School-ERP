import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AttendanceHeader from "../../header/parent/AttendanceHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import EmptyHeader from "../../utils/EmptyHeader"
const ParentAttendanceHomePage = (props) => {
  const {student_id} = props.match.params
  return(
    <div>
        <EmptyHeader mainHeader="Attendance" header="Home" />
        <BodyComponent>
        <div className="row">
        <ColComponent
                title="View Attendance"
                description="View Attendance of Children"
                link={"/parent/attendance/view/"+student_id}
                button_text="View"
              />
              <ColComponent
                title="View Classwise Attendance Report"
                description="View Class/Section Attendance Report of Children Class"
                link={"/parent/attendance/claswise-report/"+student_id}
                button_text="View"
              />
        </div>
              
        </BodyComponent>
    </div>
  )
}

export default ParentAttendanceHomePage