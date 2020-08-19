import React from "react";
import TopBreadCrumb from "../../../utils/TopBreadcrumb";
import BodyComponent from "../../../utils/BodyComponent";
import Row from "../../../utils/Row";
import ColComponent from "../../../utils/ColComponent";
import ExamHeader from "../../../header/teacher/ExamHeader";
import CardComponent from "../../../utils/CardComponent";
import EmptyHeader from "../../../utils/EmptyHeader";
import { Col } from "../../../utils/Components";

const TeacherExamHomePage = (props) => {
  const {class_id} = props.match.params
  return (
    <div>
    <EmptyHeader mainHeader="Exam" header="Home"/>
      <BodyComponent>
        <Row>
          <div className="card-deck flex-column flex-xl-row">
            <CardComponent title="Monthly Test">
              <div className="row card-wrapper">
                <ColComponent
                  title="Add Monthly Test"
                  description="Add Monthly Test in System"
                  link={"/teacher/monthlytest/add/"+class_id}
                  button_text="Add"
                />
                <ColComponent
                  title="Fill Monthly Test Marksheet"
                  description="Fill Exam Marksheet in System"
                  link={"/teacher/monthlytest/fill/"+class_id}
                  button_text="Fill"
                />
                <ColComponent
                  title="View Class Test Report"
                  description="View Class Test Report in System"
                  link={"/teacher/exam/monthlytest/report/"+class_id}
                  button_text="View"
                />
              </div>
            </CardComponent>
          </div>
          
          <div className="card-deck flex-column flex-xl-row">
            <CardComponent title="Exam">
              <div className="row card-wrapper">
                <ColComponent
                  title="Fill Exam Marksheet"
                  description="Fill Exam Marksheet in System"
                  link={"/teacher/exam/fill/"+class_id}
                  button_text="Fill"
                />
                <ColComponent
                  title="View Class Exam Marksheet Report"
                  description="View Class Test Report in System"
                  link={"/teacher/exam/report/"+class_id}
                  button_text="View"
                />
              </div>
            </CardComponent>
          </div>
        </Row>
      </BodyComponent>
    </div>
  );
};
export default TeacherExamHomePage;
