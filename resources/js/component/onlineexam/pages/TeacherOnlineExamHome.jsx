import React, { Component } from "react"
import TeacherHeader from "../header/TeacherHeader"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import ColComponent from "../../utils/ColComponent"
class TeacherOnlineExamHome extends Component{
    render(){
        const {class_id} = this.props.match.params
        return(
            <div>
                <TopBreadCrumb mainHeader="Online Exam" header="Home">
                    <TeacherHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <div className="card-deck flex-column flex-xl-row">
                    <CardComponent title="Test">
                        <div className="row card-wrapper">
                        <ColComponent
                            title="Add Online Test"
                            description="Add Online Test"
                            link={"/teacher/online-exam/test-add/"+class_id}
                            button_text="Add"
                        />
                        <ColComponent
                            title="Manage Online Test"
                            description="View/Edit Online Test"
                            link={"/teacher/online-exam/test-manage/"+class_id}
                            button_text="Manage"
                        />
                        <ColComponent
                            title="Test Attendance Report"
                            description="View Test Attendance Report"
                            link={"/teacher/online-exam/test-attendance-report/"+class_id}
                            button_text="View"
                        />
                        <ColComponent
                            title="Edit Marksheet"
                            description="Edit Online Test Marksheet"
                            link={"/teacher/online-exam/test-edit-marksheet/"+class_id}
                            button_text="Edit Marksheet"
                        />
                        <ColComponent
                            title="View/Print Marksheet"
                            description="View/Print Online Test Marksheet"
                            link={"/teacher/online-exam/test-view-print-marksheet/"+class_id}
                            button_text="View Marksheet"
                        />
                        <ColComponent
                            title="Online Test Result"
                            description="View Online Test Result"
                            link={"/teacher/online-exam/test-result/"+class_id}
                            button_text="View"
                        />
                        </div>
                    </CardComponent>
                    </div>
                </BodyComponent>
            </div>
        )
    }
}

export default TeacherOnlineExamHome