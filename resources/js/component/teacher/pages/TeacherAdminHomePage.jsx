import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import ColComponent from "../../utils/ColComponent"

const TeacherHomePage = () => {
    return(
        <div>
            <AdminHeader mainHeader="Teacher" header="Home" />
            <div className="container-fluid mt--6">
                <div className="row card-wrapper">
                        <ColComponent title="Teacher Add" description="Add New Teacher in System" link="/admin/teacher/add-new-teacher" button_text="Add"/>
                        <ColComponent title="Teacher List" description="View Teacher in System" link="/admin/teacher/view-teacher" button_text="View"/>
                        <ColComponent title="Profile Update" description="Update the Profile of Student" link="/admin/teacher/update-student-info" button_text="Update"/>
                        <ColComponent title="Assign Teacher" description="Assign Particular Teacher to Class" link="/admin/teacher/assign-teacher" button_text="Assign"/>
                        <ColComponent title="Manage Teacher Login" description="Mantain Student Login" link="/admin/teacher/view-student-login" button_text="Check"/>
                    </div>
                </div> 
        </div>
    )
}

export default TeacherHomePage