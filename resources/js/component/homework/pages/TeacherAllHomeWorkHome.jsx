import React from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import Row from "../../utils/Row"
import ColComponent from "../../utils/ColComponent"
import CardComponent from "../../utils/CardComponent"


const TeacherAllHomeWorkHome = () => (
    <div>
        <EmptyHeader mainHeader="HomeWork" header="Home"/>
        <BodyComponent>
            <div className="card-deck flex-column flex-xl-row">
                <CardComponent title="HomeWork">
                    <div className="row card-wrapper">
                    <ColComponent
                        title="Add HomeWork"
                        description="Add HomeWork to Student"
                        link="/teacher/homework/add"
                        button_text="Add"
                    />
                    <ColComponent
                        title="View OnGoing HomeWork"
                        description="View ongoing HomeWork of Students"
                        link="/teacher/homework/ongoing"
                        button_text="Add"
                    />
                    <ColComponent
                        title="Manage HomeWork"
                        description="Manage HomeWork"
                        link="/teacher/homework/manage"
                        button_text="Manage"
                    />
                    <ColComponent
                        title="HomeWork Report"
                        description="View HomeWork Reports"
                        link="/teacher/homework/report"
                        button_text="Manage"
                    />
                    </div>
                </CardComponent>
            </div>

            <div className="card-deck flex-column flex-xl-row">
                <CardComponent title="Assignments">
                    <div className="row card-wrapper">
                    <ColComponent
                        title="Add Assignments"
                        description="Add Assignments to Student"
                        link="/teacher/assignments/add"
                        button_text="Add"
                    />
                    <ColComponent
                        title="View OnGoing Assignments"
                        description="View ongoing Assignments of Students"
                        link="/teacher/assignments/ongoing"
                        button_text="Add"
                    />
                    <ColComponent
                        title="Manage Assignments"
                        description="Manage Assignments"
                        link="/teacher/assignments/manage"
                        button_text="Manage"
                    />
                    <ColComponent
                        title="Assignments Report"
                        description="View Assignments Reports"
                        link="/teacher/assignment/report"
                        button_text="Manage"
                    />
                    </div>
                </CardComponent>
            </div>
            <div className="card-deck flex-column flex-xl-row">
                <CardComponent title="Project">
                    <div className="row card-wrapper">
                    <ColComponent
                        title="Add Project"
                        description="Add Project to Student"
                        link="/teacher/project/add"
                        button_text="Add"
                    />
                    <ColComponent
                        title="View OnGoing Project"
                        description="View ongoing Project of Students"
                        link="/teacher/project/ongoing"
                        button_text="Add"
                    />
                    <ColComponent
                        title="Manage Project"
                        description="Manage Project"
                        link="/teacher/project/manage"
                        button_text="Manage"
                    />
                    <ColComponent
                        title="Project Report"
                        description="View Project Reports"
                        link="/teacher/project/report"
                        button_text="Manage"
                    />
                    </div>
                </CardComponent>
            </div>
        
        </BodyComponent>
    </div>
)

export default TeacherAllHomeWorkHome