
import React, {Component} from "react"
import AdminHeader from "../header/AdminHeader"
import ColComponent from "../../utils/ColComponent"

const StudentHomePage = () => {
        return(
            <div>
                <AdminHeader mainHeader="Student" header="Home" />
                <div className="container-fluid mt--6">
                <div className="row card-wrapper">
                        <ColComponent title="Registration" description="Add New Student in System" link="/admin/student/add-new-student" button_text="Add"/>
                        <ColComponent title="Student List" description="View Student in System" link="/admin/student/view-student" button_text="View"/>
                        <ColComponent title="Profile Update" description="Update the Profile of Student" link="/admin/student/update-student-info" button_text="Update"/>
                        <ColComponent title="Admission" description="New Student Admission in System" link="/admin/student/add-new-admission-student" button_text="Add"/>
                        <ColComponent title="Admission List" description="View Student Admission in System" link="/admin/student/admission-list" button_text="View"/>
                        <ColComponent title="One Click Info" description="View Particular Student" link="/admin/student/add-new-student" button_text="View"/>
                        <ColComponent title="Manage Student Login" description="Mantain Student Login" link="/admin/student/view-student-login" button_text="Check"/>
                        <ColComponent title="Student Prmotion" description="Promate the Student to Higer Class" link="" button_text="Check"/>
                    </div>
                 <div className="card-deck flex-column flex-xl-row">
          <div className="card">
            <div className="card-header">
              <h5 className="h3 mb-0">Report</h5>
            </div>
            <div className="card-body">
              <div className="row card-wrapper">
                <ColComponent title="Student Class and Section Wise" link="/admin/student/student-class-section-wise" button_text="View"/>
                <ColComponent title="Student Caste Wise" link="/admin/student/student-caste-wise" button_text="View"/>
                <ColComponent title="Total New Admission of Student" link="/admin/student/add-new-student" button_text="View"/>
                <ColComponent title="Total New Registration of Student" link="/admin/student/view-total-register" button_text="View"/>
              </div>
            </div>
          </div>
        </div>
                </div> 
            </div>
        )
}

export default StudentHomePage