import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import api from "../../api"

class TeacherLeaveClasswiseReport extends Component{
    componentDidMount(){
        const {class_id} = this.props.match.params
        api.adminteacher.leave.classReport(class_id)
    }
    render(){
        return(
            <div>
            <EmptyHeader mainHeader="Leave" header="Class Report"/>
            <BodyComponent>
            </BodyComponent>
            </div>
        )
    }
}

export default TeacherLeaveClasswiseReport