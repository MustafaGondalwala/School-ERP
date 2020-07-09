import React, { Component } from "react";
import TopBreadCrumb from "../../utils/TopBreadcrumb";
import AdminStudentHeader from "../../header/admin/AdminStudentHeader";
import CardComponent from "../../utils/CardComponent";
import BodyComponent from "../../utils/BodyComponent";
import Row from "../../utils/Row";
import {
  Col,
  FormLabel,
  FormGroup,
  Input,
  UploadFile,
  Select,
  SelectOption,
  Button,
} from "../../utils/Components";
import SelectStudent from "../../utils/SelectStudent";
import InlineError from "../../utils/InlineError";
import api from "../../api";
import MedicalInfoForm from "../form/MedicalInfoForm";
import Swal from "sweetalert2"
class StudentMedicalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: "",
      checkup_type: "",
      errors: {},
      button_text: "Fetch",
      data: "",
    };
    this.submit = this.submit.bind(this);
    this.updateMedicalInfo = this.updateMedicalInfo.bind(this)
  }
  validate(data) {
    const errors = {};
    if (!data.student_id) errors.student_id = "Can't be blank";
    if (!data.checkup_type) errors.checkup_type = "Can't be blank";
    return errors;
  }
  // componentDidMount(){
  //     this.setState({
  //       student_id:"1",
  //       checkup_type:"1"
  //     },() => {
  //         this.submit()
  //     })
  // }
  updateMedicalInfo(data){
    let formData = new FormData();    //formdata object
    Object.keys(data).map(item => {
      formData.append(item,data[item])
    })
    const {student_id,checkup_type} = this.state
    formData.append("student_id",student_id)
    formData.append("checkup_type",checkup_type)

    return api.adminclerk.student.medical_info.update(formData).then(data => {
        const {message} = data
        Swal.fire('Success',message,"success")
        this.setState({
            data:""
        })
    })
    
  }
  submit() {
    const data = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      this.setState({
        button_text: "Fetching ...",
        data:""
      });
      api.adminclerk.student
        .medical_info.get(data.student_id, data.checkup_type)
        .then((data) => {
          this.setState({
            data,
            button_text:"Fetch"
          });
        });
    }
  }
  render() {
    const { checkup_type, errors, button_text,data } = this.state;
    return (
      <div>
        <TopBreadCrumb mainHeader="Student" header="Medical Info">
          <AdminStudentHeader />
        </TopBreadCrumb>
        <BodyComponent>
          <CardComponent
            title="Student Medical Info"
            back_link="/admin/student"
          >
            <Row>
              <Col md="4" sm="6" lg="4">
                <FormLabel>Select Student</FormLabel>
                <SelectStudent
                  sendStudentId={(student_id) =>
                    this.setState({
                      student_id,
                    })
                  }
                />
                {errors.student_id && <InlineError text={errors.student_id} />}
              </Col>
              <Col md="4" sm="6" lg="4">
                <FormLabel>Checkup Type</FormLabel>
                <Select
                  errors={errors}
                  name="checkup_type"
                  value={checkup_type}
                  onChange={(e) => {
                    const { value } = e.target;
                    this.setState({
                      checkup_type: value,
                    });
                  }}
                >
                  <SelectOption>-- Select --</SelectOption>
                  <SelectOption value="1">Checkup 1</SelectOption>
                  <SelectOption value="2">Checkup 2</SelectOption>
                  <SelectOption value="3">Checkup 3</SelectOption>
                  <SelectOption value="4">Checkup 4</SelectOption>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col md="4" sm="6" lg="4">
                <Button primary sm onClick={this.submit}>
                  {button_text}
                </Button>
              </Col>
            </Row>
          </CardComponent>
          {data && <MedicalInfoForm  updateMedicalInfo={this.updateMedicalInfo} data={data}/>}
        </BodyComponent>
      </div>
    );
  }
}

export default StudentMedicalInfo;
