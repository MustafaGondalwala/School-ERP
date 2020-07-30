import React,{Component} from "react"
import TeacherHeader from "../header/TeacherHeader"
import ColComponent from "../../utils/ColComponent"

const TeacherHomeWorkHomePage = (props) => {
    return(
        <div>
            <TeacherHeader mainHeader="HomeWork" header="HomePage"/>
            <div className="container-fluid mt--6">
                <div className="row">
                    <ColComponent
                        title="Add Home"
                        description="Add HomeWork given Students"
                        link={`/teacher/homework/add`}
                        button_text="Add"
                        />
                    <ColComponent
                        title="View Home"
                        description="Add/Edit/Delete Current HomeWork"
                        link={`/teacher/homework/current/manage`}
                        button_text="Manage"
                        />
                    <ColComponent
                        title="View Past Home"
                        description="Add/Edit/Delete Past HomeWork"
                        link={`/teacher/homework/past/manage`}
                        button_text="Manage"
                        />
                    <ColComponent
                        title="View Home"
                        description="Add/Edit/Delete Current HomeWork"
                        link={`/teacher/homework/manage`}
                        button_text="Manage"
                        />
                    <ColComponent
                        title="Check Home Work"
                        description="Check Current/Past HomeWork"
                        link={`/teacher/homework/check`}
                        button_text="Manage"
                        />
                    <ColComponent
                        title="View Assignment"
                        description="View Current/Past Assigment"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                </div>
            </div>
        </div>
    )
}
export default TeacherHomeWorkHomePage