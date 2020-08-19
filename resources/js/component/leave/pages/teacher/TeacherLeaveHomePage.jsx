import React from "react"
import TopBreadCrumb from "../../../utils/TopBreadcrumb"
import BodyComponent from "../../../utils/BodyComponent"
import ColComponent from "../../../utils/ColComponent"
import Row from "../../../utils/Row"

import LeaveHeader from "../../../header/teacher/LeaveHeader"

const TeacherLeaveHomePage = (props) => {
    console.log(props.match.params)
    const {class_id} = props.match.params
    return (
    <div>
        <TopBreadCrumb mainHeader="Leave" header="Home">
        </TopBreadCrumb>
        <BodyComponent>
            <Row>
                <ColComponent
                    title="View Leave Request"
                    description="View Leave Request from Parent"
                    link={"/teacher/leave/request/"+class_id}
                    button_text="View"
              />
              <ColComponent
                    title="View Past Leave Request"
                    description="View Past Leave Request from Parent"
                    link={"/teacher/leave/past/"+class_id}
                    button_text="View"
              />
              <ColComponent
                    title="Class Leave Report"
                    description="View Class Leave Report"
                    link={"/teacher/leave/report/"+class_id}
                    button_text="View"
              />
              <ColComponent
                    title="Student Leave Report"
                    description="View Student Leave Report"
                    link="/teacher/leave/student/report"
                    button_text="View"
              />
            </Row>
        </BodyComponent>
       </div>
    )  
}

export default TeacherLeaveHomePage