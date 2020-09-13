import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminLeaveHeader from "../../header/admin/AdminLeaveHeader"
import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import EmptyHeader from "../../utils/EmptyHeader"
const AdminHomePage = () => (
    <div>
        <EmptyHeader mainHeader="Leave" header="Home"/>
        <BodyComponent>
        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Student">
            <div className="row card-wrapper">
                <ColComponent
                title="View Leave Request"
                description="View Student Pending Loan Request"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />
              <ColComponent
                title="Past Leave Request"
                description="View Past Student Pending Loan Request"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />


                <ColComponent
                title="Report ClassWise"
                description="View ClassWise Report"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />
              
              <ColComponent
                title="Report Individual"
                description="View Individual Report"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />
            </div>
            </CardComponent>
            </div>
            <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Staff">
            <div className="row card-wrapper">
                <ColComponent
                title="View Leave Request"
                description="View Student Pending Loan Request"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />
              <ColComponent
                title="Past Leave Request"
                description="View Past Student Pending Loan Request"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />


                <ColComponent
                title="Report ClassWise"
                description="View ClassWise Report"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />
              
              <ColComponent
                title="Report Individual"
                description="View Individual Report"
                link="/admin/leave/student-leave-request"
                button_text="View"
              />
            </div>
            </CardComponent>
            </div>
        </BodyComponent>
    </div>
)
export default AdminHomePage

