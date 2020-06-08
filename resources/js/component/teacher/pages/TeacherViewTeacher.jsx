import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import ViewTeacher from "../utils/ViewTeacher"

export default class TeacherViewTeacher extends Component{
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Teacher" header="View"/>
                <div className="container-fluid mt--6">
                    <ViewTeacher />
                </div>
            </div>
        )
    }
}