import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import ExamHeader from "../../header/parent/ExamHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import Row from "../../utils/Row"
import EmptyHeader from "../../utils/EmptyHeader"

const ParentExamHomePage = (props) => {
    const {student_id} = props.match.params
    return(
    <div>
        <EmptyHeader mainHeader="Exam" header="Home" />
        <BodyComponent>
            <Row>
                <ColComponent
                    title="View Monthly Test Result"
                    description="View Student Result"
                    link={"/parent/exam/monthly-test-result/"+student_id}
                    button_text="View"
                />
                <ColComponent
                    title="View Exam Result"
                    description="View Student Result"
                    link={"/parent/exam/exam-result/"+student_id}
                    button_text="View"
                />
                <ColComponent
                    title="Upcoming Monthly Test Result"
                    description="View Monthy Test Result"
                    link={"/parent/exam/monthlytest/"+student_id}
                    button_text="View"
                />
                <ColComponent
                    title="Upcoming Exam Result"
                    description="View Exam Result"
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
}

export default ParentExamHomePage