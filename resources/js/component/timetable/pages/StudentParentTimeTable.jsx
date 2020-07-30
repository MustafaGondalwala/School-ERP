import React,{Component} from "react"

import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import {setTimeTableStudentParentDispatch} from "../../actions/timetable"
import { connect } from "react-redux";
import ViewEditStudentTimeTable from "../form/ViewEditStudentTimeTable"

class StudentTimeTable extends Component{
    componentDidMount(){
        const user_type = localStorage.getItem('user_type')
        const class_id = this.props.user.info.class.id
        if(user_type == 2){
            const {setTimeTableStudentParentDispatch,classwise_timetable} = this.props
            if(classwise_timetable[class_id] == undefined)
                setTimeTableStudentParentDispatch(class_id)
        }
    }
    render(){
        const class_id = this.props.user.info.class.id
        const {setTimeTableStudentParentDispatch,classwise_timetable} = this.props
        return(
            <div>
            <EmptyHeader mainHeader="TimeTable" header="View Current TimeTable" /> 
            <BodyComponent>
                {classwise_timetable[class_id] ?
                    <ViewEditStudentTimeTable type="view" timetable={classwise_timetable[class_id]}/>
                :   <CardComponent>Loading TimeTable ....</CardComponent>
                }
            </BodyComponent>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        classwise_timetable:state.classwise_timetable,
        user:state.user
    };
}

export default connect(mapStateToProps,{setTimeTableStudentParentDispatch})(StudentTimeTable);