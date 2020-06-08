import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import StaffAttendanceEditAdmin from "../utils/StaffAttendanceEditAdmin"

 const AdminAttendanceStaffEdit = () =>  {
    return(
        <div>
            <AdminHeader mainHeader="Attendance" header="Staff" subheader="Edit/View"/>
            <div className="container-fluid mt--6">
            <StaffAttendanceEditAdmin />
            </div>
        </div>
    )
 }

 export default AdminAttendanceStaffEdit