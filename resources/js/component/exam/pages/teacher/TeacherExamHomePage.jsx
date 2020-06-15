import React from "react"
import TopBreadCrumb from "../../../utils/TopBreadcrumb"
import BodyComponent from "../../../utils/BodyComponent"
import Row from "../../../utils/Row"
import ColComponent from "../../../utils/ColComponent"

import ExamHeader from "../../../header/teacher/ExamHeader"

const TeacherExamHomePage = () => (
    <div>
        <TopBreadCrumb mainHeader="Exam" header="Home">
            <ExamHeader />
        </TopBreadCrumb>
        <BodyComponent>
            <Row>
                <ColComponent
                    title="Fill Exam Marksheet"
                    description="Fill Exam Marksheet in System"
                    link="/teacher/exam/fillexammarksheet"
                    button_text="Fill"
                />
                <ColComponent
                    title="View Class Exam Report"
                    description="View Class Exam Report in System"
                    link="/teacher/exam/exammarksheet/report"
                    button_text="View"
                />
                
                <ColComponent
                    title="Fill Monthly Marks"
                    description="Fill Monthly Marksheet in System"
                    link="/teacher/exam/fillmonthlymarks"
                    button_text="Fill"
                />
                <ColComponent
                    title="View Class Monthly Test Report"
                    description="View Class Monthly Test Report in System"
                    link="/teacher/exam/monthlymarks/report"
                    button_text="View"
                />
            </Row>
        </BodyComponent>
    </div>
)

export default TeacherExamHomePage