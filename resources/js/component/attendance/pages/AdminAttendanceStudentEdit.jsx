import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import StudentAttendanceEditAdmin from "../utils/StudentAttendanceEditAdmin"

 const AdminAttendanceStudentEdit = () =>  {
    return(
        <div>
            <AdminHeader mainHeader="Attendance" header="Edit/View"/>
            <div className="container-fluid mt--6">
                <StudentAttendanceEditAdmin />
            </div>
        </div>
    )
 }

 export default AdminAttendanceStudentEdit