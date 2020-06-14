import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import ExamHeader from "../../header/parent/ExamHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import Row from "../../utils/Row"

const ParentExamHomePage = () => (
    <div>
        <TopBreadCrumb mainHeader="Exam" header="Home">
            <ExamHeader />
        </TopBreadCrumb>
        <BodyComponent>
            <Row>
                <ColComponent
                    title="View Result"
                    description="View Student Result"
                    link="/parent/exam/view-current-result"
                    button_text="View"
                />
                <ColComponent
                    title="View/Print Marksheet"
                    description="View/Print Past Year/Exam Marksheet"
                    link="/parent/exam/view-past-marksheet"
                    button_text="View"
                />
                <ColComponent
                    title="View/Print Monthly Test"
                    description="View/Print Past Test"
                    link="/parent/exam/view-past-marksheet"
                    button_text="View"
                />
                <ColComponent
                    title="Student Performance Report"
                    description="View Performance Report Throughout Term"
                    link="/parent/exam/view-current-result"
                    button_text="View"
                />
            </Row>
        </BodyComponent>
    </div>
)

export default ParentExamHomePage