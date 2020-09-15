import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import QuestionPaperHeader from "../../header/teacher/QuestionPaperHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import Row from "../../utils/Row"
import EmptyHeader from "../../utils/EmptyHeader"

const TeacherQuestionPaperHome = () => (
    <div>
        <EmptyHeader mainHeader="Question Paper" header="Home" />
        <BodyComponent>
        <Row>
            <ColComponent
                title="Add Question Paper"
                description="Add New Question Paper in System"
                link="/teacher/questionpaper/add"
                button_text="Add"
            />
            <ColComponent
                title="Manage Question Paper"
                description="Manage Question Paper in System"
                link="/teacher/questionpaper/manage"
                button_text="Manage"
            />
        </Row>
        </BodyComponent>
    </div>
)

export default TeacherQuestionPaperHome