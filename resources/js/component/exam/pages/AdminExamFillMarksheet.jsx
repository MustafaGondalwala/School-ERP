import React, { Component,Suspense } from "react";
import AdminHeader from "../header/AdminHeader";
import BodyComponent from "../../utils/BodyComponent";
import EmptyHeader from "../../utils/EmptyHeader";
import CardComponent from "../../utils/CardComponent";
import GetClassId from "../../utils/GetClassId";
import { connect } from "react-redux";
import { getExamTypeDispatch } from "../../actions/exam";
import MutipleSelectSubject from "../../utils/MultipleSelectSubject";
import YearSelectComponent from "../../utils/YearSelectComponent";
import InlineError from "../../utils/InlineError";
import FillExamMarksheet from "../form/FillExamMarksheet"
const ViewStudentDetailsExamMarksheet = React.lazy(() => import("../form/ViewStudentDetailsExamMarksheet"))

import api from "../../api";
import Swal from "sweetalert2";
import Row from "../../utils/Row"
import { Col, FormGroup, FormLabel, Select, SelectOption, Button, Input } from "../../utils/Components";

class AdminExamFillMarksheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        class_id: "1",
        exam_type: "1",
      },
      button_text: "Fetch Students",
      students: "",
      errors: {},
    };
    this.setStateData = this.setStateData.bind(this);
    this.sendClassId = this.sendClassId.bind(this);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchMarksheet = this.fetchMarksheet.bind(this)
    this.updateStudentMarksheet = this.updateStudentMarksheet.bind(this)
  }
  async componentDidMount() {
    const { examType } = this.props;
    if (Object.keys(examType).length == 0) this.props.getExamTypeDispatch();
  }
  async setStateData(name, value) {
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  sendClassId(class_id) {
    this.setStateData("class_id", class_id);
  }
  onChange(e) {
    this.setStateData(e.target.name, e.target.value);
  }
  validate(data) {
    const errors = {};
    if (!data.class_id) errors.class_id = "Can't be blank";
    if (!data.exam_type) errors.exam_type = "Can't be blank";
    return errors;
  }
  componentWillMount(){
    // this.setState({
    //   class_id:"1",
    //   exam_type:"1"
    // },() => {
      this.submit()
    // })
  }
  submit() {
    const errors = this.validate(this.state.data);
    const { data } = this.state;
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      this.setState({
        button_text: "Fetching Students ...",
        students:"",
      });

      api.adminteacher.exam.marksheet
        .get_students(data)
        .then((data) => {
          const { studentDetails } = data;
          this.setState({
            students:studentDetails,
            button_text: "Fetch Students",
          });
        })
        .catch((error) => {
          this.setState({
            button_text: "Fetch Students",
          });
          Swal.fire(
            "Error Occured",
            "Error Occured in Process.Please Try Later ...",
            "error"
          );
        });
    }
  }
  fetchMarksheet(student_id){
    const { data } = this.state;
    data.student_id = student_id
    this.setState({
      exam_marksheet:"",
      fill_marksheet_view:false
    })
    api.admin.exam.marksheet.student(data,student_id).then((data) => {
        const {student_info,class_info,exam_marksheet} = data
        this.setState({
          student_info,class_info,exam_marksheet,fill_marksheet_view:true
        });
    })
    .catch((error) => {
      this.setState({
        button_text: "Fetch Students",
      });
      Swal.fire(
        "Error Occured",
        "Error Occured in Process.Please Try Later ...",
        "error"
      );
    });
  }
  updateStudentMarksheet(exam_marksheet){
    api.admin.exam.marksheet.update(exam_marksheet).then(data => {
      this.setState({
        exam_marksheet:"",
      })
      this.setState({
        exam_marksheet:data.exam_marksheet,
        fill_marksheet_view:true
      })
    }).catch(error => {
      Swal.fire("Error Ocurred","Error Occured in Process, Please try again Later","error")
    })
  }
  render() {
    const { examType } = this.props;
    const { data, button_text, errors, students,fill_marksheet_view } = this.state;
    const {student_info,class_info,exam_marksheet} = this.state

    return (
      <div>
      <EmptyHeader 
          mainHeader="Exam"
          header="Marksheet"
          sub_header="Exam Marksheet"
        />
        <BodyComponent>
          <CardComponent title="Select Class" back_link="/admin/exam">
            <GetClassId class_id={data.class_id} sendClassId={this.sendClassId} errors={errors} />
            <Row>
              <Col md={4}>
                 <FormGroup>
                   <FormLabel>Exam Type</FormLabel>
                   <Select errors={errors} value={data.exam_type} onChange={this.onChange} name="exam_type">
                     <SelectOption value=""> -- Select -- </SelectOption>
                     {Object.keys(examType).length > 0 &&
                        examType.map((item, id) => {
                          return <SelectOption value={item.id}>{item.exam_type}</SelectOption>
                        })
                      }
                   </Select>
                 </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Button primary sm onClick={this.submit}>{button_text}</Button>
              </Col>
            </Row>
          </CardComponent>
          {students && 
          <Suspense fallback={<h1>Loading ...</h1>}>
            <ViewStudentDetailsExamMarksheet exam_type={data.exam_type} sendStudentId={this.fetchMarksheet} studentDetails={students} />
          </Suspense>
          }
        </BodyComponent>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    examType: state.examType,
  };
}

export default connect(mapStateToProps, { getExamTypeDispatch })(
  AdminExamFillMarksheet
);
