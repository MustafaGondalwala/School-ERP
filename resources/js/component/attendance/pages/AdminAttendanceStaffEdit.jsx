import React,{Component,Suspense} from "react"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
const StaffAttendanceEditAdmin = React.lazy(() => import("../utils/StaffAttendanceEditAdmin"))

 const AdminAttendanceStaffEdit = () =>  {
    return(
        <div>
            <AdminHeader mainHeader="Attendance" header="Staff" subheader="Edit/View"/>
            <BodyComponent>
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <StaffAttendanceEditAdmin />
                </Suspense>
            </BodyComponent>
        </div>
    )
 }

 export default AdminAttendanceStaffEdit