import React, { Component, Suspense } from "react"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import StudyMatrialTeacherHeader from "../header/StudyMatrialTeacherHeader"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import ColComponent from "../../utils/ColComponent";

const StudyMaterialHome = (props) => {
    const {class_id} = props.match.params
        return(
            <div>
                <TopBreadCrumb  mainHeader="Student Matrial" header="Home">
                    <StudyMatrialTeacherHeader/>
                </TopBreadCrumb>
                <BodyComponent>
                    <ColComponent
                        title="Add Group"
                        description="Add/View/Edit Group for Study Matrial"
                        link={"/teacher/study-material/group/"+class_id}
                        button_text="View"
                    />
                    <ColComponent
                        title="Add Study Material"
                        description="Add/View/Edit Study Matrial"
                        link={"/teacher/study-material/material/"+class_id}
                        button_text="View"
                    />
                </BodyComponent>
            </div>
        )
}

export default StudyMaterialHome