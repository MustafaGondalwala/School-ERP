import React, { Component } from "react"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import AddClassPeriod from "../../setting/utils/AddClassPeriod"
import { Col } from "../../utils/Components"
class TimeTableClassPeriods extends Component{
    render(){
        return(
            <div>
                <AdminHeader mainHeader="TimeTable" header="Class Periods"/>
                <BodyComponent>
                        <AddClassPeriod back_link={"/admin/timetable"}/>
                </BodyComponent>
            </div>
        )
    }
}


export default TimeTableClassPeriods