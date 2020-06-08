import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import ColComponent from "../../utils/ColComponent"

export default class TimeTableAdminHomePage extends Component{
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Timetable" header="Home"/>
                <div className="container-fluid mt--6">
                    <div className="row card-wrapper">
                    <ColComponent title="View Student TimeTable" description="View/Edit/Delete/Print Student TimeTable" link="/admin/timetable/view-student" button_text="View"/>
                    <ColComponent title="Publish Student TimeTable" description="Public TimeTable for Each Class" link="/admin/timetable/publish-student-timetable" button_text="Publish TimeTable"/>
                    
                    <ColComponent title="View Teacher TimeTable" description="View/Edit/Delete/Print Student TimeTable" link="/admin/timetable/view-teacher" button_text="View"/>
                    <ColComponent title="Publish Teacher TimeTable" description="Public TimeTable for Each Teacher" link="/admin/timetable/public-teacher-timetable" button_text="Public TimeTable"/>
                    
                    </div>
                </div>
            </div>
        )
    }
}