import React,{Component} from "react"

import AdminHeader from "../header/AdminHeader"
import ColComponent from "../../utils/ColComponent"

const AdminAttendanceHomePage = ()  => (
    <div>
        <AdminHeader mainHeader="Attendance" header="Home"/>
        <div className="container-fluid mt--6">
          <div className="row card-wrapper">
                <ColComponent title={"Student Attendance"} description={"Edit/View Student Attendance in System"} button_text="Enter" link={"/admin/attendance/edit-student"} />
                <ColComponent title={"Staff Attendance"} description={"Edit/View Staff Attendance in System"} button_text="Enter" link={"/admin/attendance/edit-staff"} />
                <ColComponent title={"View Particular Student Attendance"} description={"View Particular Student Attendance in System"} button_text="Enter" link={"/admin/attendance/view-particular-student-attendance"} />
                <ColComponent title={"View Particular Staff Attendance"} description={"View Particular Staff Attendance in System"} button_text="Enter" link={"/admin/attendance/view-particular-staff-attendance"} />
           </div>
        </div>
    </div>
)

export default AdminAttendanceHomePage