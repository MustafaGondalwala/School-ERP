import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AttendanceHeader from "../../header/parent/AttendanceHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
const ParentAttendanceHomePage = () => (
    <div>
        <TopBreadCrumb mainHeader="Attendance" header="Home">
            <AttendanceHeader/>
        </TopBreadCrumb>
        <BodyComponent>
        <div className="row">
        <ColComponent
                title="View Attendance"
                description="View/Print Attendance of Children"
                link="/parent/attendance/view/"
                button_text="View"
              />
              <ColComponent
                title="View Attendance Report"
                description="View/Print Attendance Report of Children"
                link="/parent/attendance/report/"
                button_text="View"
              />
        </div>
              
        </BodyComponent>
    </div>
)

export default ParentAttendanceHomePage