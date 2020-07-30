import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import ColComponent from "../../utils/ColComponent"

class TeacherOnlineExamHomePage extends Component{
    render(){
        return(
            <div>
                <EmptyHeader mainHeader="Online Exam" header="Home"/>
                <BodyComponent>
                    <div className="card-deck flex-column flex-xl-row">
                        <CardComponent title="Online Test">
                            <div className="row card-wrapper">
                                <ColComponent
                                    title="Add Online Test"
                                    description="Add Online Test"
                                    link={"/teacher/online-exam/add"}
                                    button_text="Add"
                                />
                                <ColComponent
                                    title="Manage Online Test"
                                    description="Manage Online Test"
                                    link={"/teacher/online-exam/manage"}
                                    button_text="Manage"
                                />
                                <ColComponent
                                    title="Fill OnlineTest Marksheet"
                                    description="Manage Online Test"
                                    link={"/teacher/online-exam/fill-marksheet"}
                                    button_text="Manage"
                                />
                            </div>
                        </CardComponent>
                    </div>
                </BodyComponent>
            </div>
        )
    }
}

export default TeacherOnlineExamHomePage