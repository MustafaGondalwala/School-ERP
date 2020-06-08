import React,{Component} from "react"
import TeacherHeader from "../header/TeacherHeader"
import ColComponent from "../../utils/ColComponent"

const TeacherHomeWorkHomePage = (props) => {
    const class_id = props.match.params.class_id
    return(
        <div>
            <TeacherHeader mainHeader="HomeWork" header="HomePage"/>
            <div className="container-fluid mt--6">
                <div className="row">
                    <ColComponent
                        title="View Home"
                        description="View Current/Past HomeWork"
                        link={`/teacher/homework/view/${class_id}`}
                        button_text="Set"
                        />
                    <ColComponent
                        title="View Assignment"
                        description="View Current/Past Assigment"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                    <ColComponent
                        title="View Project"
                        description="Set the Total Numbe of Fee Installments"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                    <ColComponent
                        title="View Issue"
                        description="Set the Total Numbe of Fee Installments"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                    <ColComponent
                        title="View Student Request"
                        description="Set the Total Numbe of Fee Installments"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                </div>
            </div>
        </div>
    )
}
export default TeacherHomeWorkHomePage