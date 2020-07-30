import React,{Component} from "react"
import ViewClassWiseTimetable from "../utils/ViewClassWiseTimeTable"
import EmptyHeader from "../../utils/EmptyHeader"
import StudentParentTimeTable from "./StudentParentTimeTable"
const TeacherClassWiseTimeTable = (props) => {
    const {class_id} = props.match.params
    return(
        <div>
            <EmptyHeader mainHeader="TimeTable" header="View TimeTable"/>
            <div className="container-fluid mt--6">
                {class_id && 
                    <ViewClassWiseTimetable title="ClassWise TimeTable" class_id={class_id}/>
                }
            </div>
        </div>
    )
}

export default TeacherClassWiseTimeTable