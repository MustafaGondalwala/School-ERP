import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import TeacherHeader from "../header/TeacherHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import AddEditOnlineTest from "../form/AddEditOnlineTest"
class TeacherOnlineTestAdd extends Component{
    render(){
        const {class_id} = this.props.match.params
        return(
            <div>
                <TopBreadCrumb mainHeader="Online Exam" header="Test" sub_header="Add">
                    <TeacherHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <AddEditOnlineTest type={1} title="Add Online Test"/>
                </BodyComponent>
            </div>
        )
    }
}


export default TeacherOnlineTestAdd