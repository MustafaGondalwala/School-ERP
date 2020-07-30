import React, { Component, Suspense } from "react"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import StudyMatrialTeacherHeader from "../header/StudyMatrialTeacherHeader"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import ColComponent from "../../utils/ColComponent";
import Row from "../../utils/Row"

const TeacherStudyMaterialHome = (props) => {
    const {class_id} = props.match.params
        return(
            <div>
                <TopBreadCrumb  mainHeader="Student Matrial" header="Teacher">
                </TopBreadCrumb>
                <BodyComponent>
                    <Row>
                    <ColComponent
                        title="Add Chapter"
                        description="Add/View/Edit Chapter for Study Matrial"
                        link={"/teacher/study-material/teacher/group"}
                        button_text="View"
                    />
                    <ColComponent
                        title="Add Lession"
                        description="Add/View/Edit Study Matrial"
                        link={"/teacher/study-material/teacher/material"}
                        button_text="View"
                    />
                    </Row>
                </BodyComponent>
            </div>
        )
}

export default TeacherStudyMaterialHome