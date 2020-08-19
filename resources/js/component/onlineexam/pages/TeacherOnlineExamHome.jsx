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
                    <CardComponent title="Online Test">
                        <div className="row card-wrapper">
                        <ColComponent
                            title="View Current Online Test"
                            description="View Current Online Test"
                            link={"/teacher/online-exam/classwise/view-current/"+class_id}
                            button_text="View"
                        />
                        <ColComponent
                            title="View Past Online Test"
                            description="View Past Online Test"
                            link={"/teacher/online-exam/classwise/test-past/"+class_id}
                            button_text="View"
                        />
                        <ColComponent
                            title="View/Print Marksheet"
                            description="View/Print Online Test Marksheet"
                            link={"/teacher/online-exam/classwise/test-view-print-marksheet/"+class_id}
                            button_text="View Marksheet"
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