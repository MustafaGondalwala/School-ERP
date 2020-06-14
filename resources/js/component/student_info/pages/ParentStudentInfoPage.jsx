import React from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import Row from "../../utils/Row"
import ColComponent from "../../utils/ColComponent"

const ParentStudentInfoPage = () => (
    <div>
        <EmptyHeader mainHeader="Student Info" header="Home"/>
        <BodyComponent>
            <Row>
                <ColComponent
                    title="Student Profile"
                    description="View Student Profile in System"
                    link="/parent/student_info/student_profile"
                    button_text="View"
                />
                <ColComponent
                    title="Medical Report"
                    description="View Medical Report in System"
                    link="/parent/student_info/medical_report"
                    button_text="View"
                />
                 <ColComponent
                    title="Physical Report"
                    description="View Physical Report in System"
                    link="/parent/student_info/physical_report"
                    button_text="View"
                />
                <ColComponent
                    title="Teacher Info"
                    description="Information about Teacher in School"
                    link="/parent/student_info/teacher_info"
                    button_text="View"
                />
            </Row>
        </BodyComponent>
    </div>
)

export default ParentStudentInfoPage