import React, { Component,Suspense } from "react"
import { connect } from "react-redux";
import { getExamTypeDispatch } from "../../actions/exam";
const ViewStudentDetailsExamMarksheet = React.lazy(() => import("../form/ViewStudentDetailsExamMarksheet"))
import { Col, FormGroup, FormLabel, Select, SelectOption, Button, Input, getKey } from "../../utils/Components";
import CardComponent from "../../utils/CardComponent";
import BodyComponent from "../../utils/BodyComponent";
import EmptyHeader from "../../utils/EmptyHeader";
import Row from "../../utils/Row"
import Swal from "sweetalert2";
import api from "../../api";

class TeacherExamMarksheetFill extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: {
            class_id: "",
            exam_type: "",
          },
          button_text: "Fetch Students",
          students: "",
          errors: {},
        };
        this.setStateData = this.setStateData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    async setStateData(name, value) {
        this.setState({
          data: { ...this.state.data, [name]: value },
        });
    }
    validate(data) {
        const errors = {};
        if (!data.exam_type) errors.exam_type = "Can't be blank";
        return errors;
      }
    sendClassId(class_id) {
        this.setStateData("class_id", class_id);
    }
    onChange(e) {
        this.setStateData(e.target.name, e.target.value);
    }

    async componentDidMount() {
        const { examType } = this.props;
        if (Object.keys(examType).length == 0) this.props.getExamTypeDispatch();
    }
    submit() {
        const errors = this.validate(this.state.data);
        const {class_id} = this.props.match.params
        const { data } = this.state;
        data.class_id = class_id
        this.setState({ errors });
        if (Object.keys(errors).length == 0) {
          this.setState({
            button_text: "Fetching Students ...",
            students:"",
          });
    
          api.adminteacher.exam.marksheet
            .get_students(data)
            .then((data) => {
              const { studentDetails,max_marks } = data;
              this.setState({
                students:studentDetails,
                button_text: "Fetch Students",
                max_marks
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

    render(){
        const {class_id} = this.props.match.params
        const { examType } = this.props;
        const { data, button_text, errors, students,fill_marksheet_view,max_marks } = this.state;
        const {student_info,class_info,exam_marksheet} = this.state
        return(
            <div>
            <EmptyHeader 
                mainHeader="Exam"
                header="Marksheet"
                sub_header="Exam Marksheet"
                />
             <BodyComponent>
                <CardComponent title="Fill Marksheet" back_link={"/teacher/exam/class/"+class_id}>
                    <Row>
                    <Col md={4}>
                        <FormGroup>
                        <FormLabel>Exam Type</FormLabel>
                        <Select errors={errors} value={data.exam_type} onChange={this.onChange} name="exam_type">
                            <SelectOption value=""> -- Select -- </SelectOption>
                            {Object.keys(examType).length > 0 &&
                                examType.map((item, id) => {
                                return <SelectOption key={getKey()} value={item.id}>{item.exam_type}</SelectOption>
                                })
                            }
                        </Select>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={4}>
                        <Button primary sm onClick={e => this.submit()}>{button_text}</Button>
                    </Col>
                    </Row>
                </CardComponent>
                {students && 
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <ViewStudentDetailsExamMarksheet max_marks={max_marks} exam_type={data.exam_type} sendStudentId={this.fetchMarksheet} studentDetails={students} />
                </Suspense>
                }
            
            </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      examType: state.examType,
    };
  }
  
  export default connect(mapStateToProps, { getExamTypeDispatch })(
    TeacherExamMarksheetFill
  );