import React, { Component } from "react";
import TopBreadCrumb from "../../utils/TopBreadcrumb";
import AdminStudentHeader from "../../header/admin/AdminStudentHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import GetClassId from "../../utils/GetClassId";
import Row from "../../utils/Row";
import {
  RedLabel,
  Col,
  FormGroup,
  FormLabel,
  Input,
  Select,
  SelectOption,
  UploadImage,
  Button,
  PreviewSingleImage,
} from "../../utils/Components";
import api from "../../api";
import Swal from "sweetalert2";
class AdmissionStudent extends Component {
  constructor(props) {
    super(props);
    const data = {
      roll_no: "",
      class_id: "",
      student_name: "",
      father_name: "",
      mother_name: "",
      father_qualification: "",
      mother_qualification: "",
      handicapped: "no",
      dob: "",
      student_aadhar_card: "",
      father_aadhar_card: "",
      father_bank_name: "",
      student_bank_name: "",
      father_bank_number: "",
      mother_bank_number: "",
      father_contact_no1: "",
      father_contact_no2: "",
      gender: "male",
      sms_number: "",
      father_email: "",
      mother_email: "",
      father_occupation: "",
      mother_occupation: "",
      guardian_name: "",
      guardian_occupation: "",
      student_photo: "",
      father_photo: "",
      mother_photo: "",
      last_marksheet: "",
      transfer_certificate: "",
      income_certificate: "",
      caste_certificate: "",
      dob_certificate: "",
      student_aadhar_card_photo: "",
      father_aadhar_card_photo: "",
      remark1: "",
      remark2: "",
      remark3: "",
      age: "",
      student_address: "",
      block: "",
      state: "",
      district: "",
      landmark: "",
      pincode: "",
      caste: "",
      religion: "",
    };
    this.state = {
      data: data,
      button_text: "Add Admission",
      title: "Admission Student",
      errors: {},
      update_student: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.sendClassId = this.sendClassId.bind(this);
  }

  calculate_age(dob) {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);
    return Math.abs(age.getUTCFullYear() - 1970);
  }
  onChange(e) {
    const { name, value } = e.target;
    this.setState(
      {
        data: { ...this.state.data, [name]: value },
      },
      () => {
        if (name == "dob") {
          this.setState({
            data: { ...this.state.data, age: this.calculate_age(value) },
          });
        }
      }
    );
  }
  onFileChange(e) {
    const { name, files } = e.target;
    var value = files[0];
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  validate(data) {
    const errors = {};
    if (!data.roll_no) errors.roll_no = "Can't be blank";
    if (!data.father_name) errors.father_name = "Can't be blank";
    if (!data.mother_name) errors.mother_name = "Can't be blank";
    if (!data.student_name) errors.student_name = "Can't be blank";
    if (!data.father_contact_no1) errors.father_contact_no1 = "Can't be blank";
    if (!data.sms_number) errors.sms_number = "Can't be blank";
    if (!data.class_id) errors.class_id = "Can't be blank";
    if (!data.religion) errors.religion = "Can't be blank";
    if (!data.caste) errors.caste = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.student_address) errors.student_address = "Can't be blank";
    if (!data.pincode) errors.pincode = "Can't be blank";
    if (!data.place) errors.place = "Can't be blank";
    return errors;
  }
  sendClassId(class_id) {
    this.setState({
      data: { ...this.state.data, ["class_id"]: class_id },
    });
  }
  async componentWillMount() {
    const params = this.props.match.params;
    if (params.hasOwnProperty("register_id")) {
    }
    if (params.hasOwnProperty("edit_student_id")) {
      const { edit_student_id } = params;
      await api.adminclerk.student.getstudent(edit_student_id).then((data) => {
        const { studentInfo } = data;
        const temp_id = studentInfo.id;
        Object.keys(studentInfo["photos"]).map((item) => {
          studentInfo[item] = studentInfo["photos"][item];
        });
        Object.keys(studentInfo["documents"]).map((item) => {
          studentInfo[item] = studentInfo["documents"][item];
        });
        Object.keys(studentInfo["address"]).map((item) => {
          studentInfo[item] = studentInfo["address"][item];
        });
        studentInfo['id'] = temp_id
        delete studentInfo.address;
        delete studentInfo.documents;
        delete studentInfo.photos;
        delete studentInfo.class;


        this.setState({
          data: studentInfo,
          update_student: true,
          title: "Update Student",
          button_text: "Update Student",
        });
      });
    }
  }
  submit() {
    const { data,update_student } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    console.log(errors);
    if (Object.keys(errors).length == 0) {
      let formData = new FormData(); //formdata object
      Object.keys(data).map((item) => {
        formData.append(item, data[item]);
      });
      if (update_student) {
        this.setState({
          button_text: "Updating ...",
        });
        api.adminclerk.student.update_student(formData)
      } else {
        this.setState({
          button_text: "Adding ...",
        });
        api.admin.student
          .admission(formData)
          .then((data) => {
            this.setState({ data, button_text: " Add Admission" });
            Swal.fire(
              "Data Inserted",
              "Student Successfully Added.",
              "success"
            );
          })
          .catch((error) => {
            this.setState({ button_text: " Add Admission" });
            Swal.fire("Error Occured", "Please check you Data.", "error");
          });
      }
    }
  }
  render() {
    const { data, errors, button_text, title, update_student } = this.state;
    return (
      <div>
        <TopBreadCrumb mainHeader="Student" header="Admission" sub_header="Add">
          <AdminStudentHeader />
        </TopBreadCrumb>
        <BodyComponent>
          <CardComponent title={title} back_link="/admin/student">
            <Row>
              <RedLabel>Personal Details:</RedLabel>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>RollNo*:</FormLabel>
                  <Input
                    errors={errors}
                    name="roll_no"
                    onChange={this.onChange}
                    value={data.roll_no}
                  />
                </FormGroup>
              </Col>

              <GetClassId
                disabled={update_student}
                class_id={data.class_id}
                sendClassId={this.sendClassId}
                errors={errors}
              />
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Name*:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Student Name"
                    name="student_name"
                    onChange={this.onChange}
                    value={data.student_name}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Name*:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Father Name"
                    name="father_name"
                    onChange={this.onChange}
                    value={data.father_name}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Mother Name*:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Mother Name"
                    name="mother_name"
                    onChange={this.onChange}
                    value={data.mother_name}
                  />
                </FormGroup>
              </Col>

              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Qualification:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Father Qualification"
                    name="father_qualification"
                    onChange={this.onChange}
                    value={data.father_qualification}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Mother Qualification:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Mother Qualification"
                    name="mother_qualification"
                    onChange={this.onChange}
                    value={data.mother_qualification}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Handicapped:</FormLabel>
                  <Select
                    name="handicapped"
                    onChange={this.onChange}
                    value={data.handicapped}
                  >
                    <SelectOption value="yes">Yes</SelectOption>
                    <SelectOption value="no">No</SelectOption>
                  </Select>
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>DOB:</FormLabel>
                  <Input
                    type="date"
                    name="dob"
                    errors={errors}
                    onChange={this.onChange}
                    value={data.dob}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Gender:</FormLabel>
                  <Select
                    value={data.gender}
                    name="gender"
                    errors={errors}
                    onChange={this.onChange}
                  >
                    <SelectOption value="male">Male</SelectOption>
                    <SelectOption value="female">Female</SelectOption>
                  </Select>
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Age:</FormLabel>
                  <Input
                    type="number"
                    name="age"
                    placeholder="Age"
                    disabled
                    value={data.age}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Email:</FormLabel>
                  <Input
                    type="email"
                    name="student_email"
                    onChange={this.onChange}
                    placeholder="Student Email"
                    value={data.student_email}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Address:</FormLabel>
                  <Input
                    name="student_address"
                    errors={errors}
                    onChange={this.onChange}
                    placeholder="Student Address"
                    value={data.student_address}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Place:</FormLabel>
                  <Input
                    name="place"
                    onChange={this.onChange}
                    placeholder="Place"
                    value={data.place}
                  />
                </FormGroup>
              </Col>
              {/* block */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Block:</FormLabel>
                  <Input
                    name="block"
                    onChange={this.onChange}
                    placeholder="Block"
                    value={data.block}
                  />
                </FormGroup>
              </Col>
              {/* district */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>District:</FormLabel>
                  <Input
                    name="district"
                    onChange={this.onChange}
                    placeholder="District"
                    value={data.district}
                  />
                </FormGroup>
              </Col>
              {/* state */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>State:</FormLabel>
                  <Input
                    name="state"
                    onChange={this.onChange}
                    placeholder="State"
                    value={data.state}
                  />
                </FormGroup>
              </Col>
              {/* landmark */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Landmark:</FormLabel>
                  <Input
                    name="landmark"
                    onChange={this.onChange}
                    placeholder="Landmark"
                    value={data.landmark}
                  />
                </FormGroup>
              </Col>
              {/* pincode */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Pincode:</FormLabel>
                  <Input
                    name="pincode"
                    onChange={this.onChange}
                    placeholder="Pincode"
                    value={data.pincode}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Religion:</FormLabel>
                  <Select
                    errors={errors}
                    name="religion"
                    onChange={this.onChange}
                  >
                    <SelectOption>-- Select --</SelectOption>
                    <SelectOption value="hindu">Hindu</SelectOption>
                    <SelectOption value="muslim">Muslim</SelectOption>
                    <SelectOption value="jain">Jain</SelectOption>
                    <SelectOption value="sikh">Sikh</SelectOption>
                    <SelectOption value="buddhism">Buddhism</SelectOption>
                  </Select>
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Caste:</FormLabel>
                  <Select errors={errors} name="caste" onChange={this.onChange}>
                    <SelectOption>-- Select --</SelectOption>
                    <SelectOption value="general">General</SelectOption>
                    <SelectOption value="obc">OBC</SelectOption>
                    <SelectOption value="st">ST</SelectOption>
                    <SelectOption value="sc">SC</SelectOption>
                  </Select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <RedLabel>Document Details:</RedLabel>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Aadhar Card:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Student Aadhar Card"
                    name="student_aadhar_card"
                    onChange={this.onChange}
                    value={data.student_aadhar_card}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Aadhar Card:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Father Aadhar Card"
                    name="father_aadhar_card"
                    onChange={this.onChange}
                    value={data.father_aadhar_card}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Bank Name:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Father Bank Name"
                    name="father_bank_name"
                    onChange={this.onChange}
                    value={data.father_bank_name}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Bank Name:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Student Bank Name"
                    name="student_bank_name"
                    onChange={this.onChange}
                    value={data.student_bank_name}
                  />
                </FormGroup>
              </Col>

              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Bank Number:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Father Bank Number"
                    name="father_bank_number"
                    onChange={this.onChange}
                    value={data.father_bank_number}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Bank Number:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Student Bank Number"
                    name="student_bank_number"
                    onChange={this.onChange}
                    value={data.student_bank_number}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <RedLabel>Parent Info:</RedLabel>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father ContactNo 1*:</FormLabel>
                  <Input
                    errors={errors}
                    type="number"
                    placeholder="Father ContactNo 1"
                    name="father_contact_no1"
                    onChange={this.onChange}
                    value={data.father_contact_no1}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father ContactNo 2:</FormLabel>
                  <Input
                    errors={errors}
                    type="number"
                    placeholder="Father ContactNo 2"
                    name="father_contact_no2"
                    onChange={this.onChange}
                    value={data.father_contact_no2}
                  />
                </FormGroup>
              </Col>

              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>SMS Number*:</FormLabel>
                  <Input
                    errors={errors}
                    type="number"
                    placeholder="SMS Number 2"
                    name="sms_number"
                    onChange={this.onChange}
                    value={data.sms_number}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Email:</FormLabel>
                  <Input
                    errors={errors}
                    type="email"
                    placeholder="Father Email"
                    name="father_email"
                    onChange={this.onChange}
                    value={data.father_email}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Mother Email:</FormLabel>
                  <Input
                    errors={errors}
                    type="email"
                    placeholder="Mother Email"
                    name="mother_email"
                    onChange={this.onChange}
                    value={data.mother_email}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Occupation:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Father Occupation"
                    name="father_occupation"
                    onChange={this.onChange}
                    value={data.father_occupation}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Mother Occupation:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Mother Occupation"
                    name="mother_occupation"
                    onChange={this.onChange}
                    value={data.mother_occupation}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Guardian Name:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Guardian Name"
                    name="guardian_name"
                    onChange={this.onChange}
                    value={data.guardian_name}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Guardian Occupation:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Guardian Occupation"
                    name="guardian_occupation"
                    onChange={this.onChange}
                    value={data.guardian_occupation}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <RedLabel>Manage Login:</RedLabel>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Login:</FormLabel>
                  <Input
                    errors={errors}
                    name="student_login"
                    disabled
                    value={data.roll_no}
                    placeholder="Student Login"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father/Mother Login:</FormLabel>
                  <Input
                    errors={errors}
                    name="parent_login"
                    disabled
                    value={data.father_contactno1}
                    placeholder="Parent Login"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <RedLabel>Remarks:</RedLabel>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Remark 1:</FormLabel>
                  <Input
                    errors={errors}
                    name="remark1"
                    onChange={this.onChange}
                    value={data.remark1}
                    placeholder="Remark 1"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Remark 2:</FormLabel>
                  <Input
                    errors={errors}
                    name="remark2"
                    onChange={this.onChange}
                    value={data.remark2}
                    placeholder="Remark 2"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Remark 3:</FormLabel>
                  <Input
                    errors={errors}
                    name="remark3"
                    onChange={this.onChange}
                    value={data.remark3}
                    placeholder="Remark 3"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <RedLabel>Student Photos:</RedLabel>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Photo:</FormLabel>
                  <UploadImage
                    name="student_photo"
                    value={data.student_photo}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.student_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Photo:</FormLabel>
                  <UploadImage
                    name="father_photo"
                    value={data.father_photo}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.father_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Mother Photo:</FormLabel>
                  <UploadImage
                    name="mother_photo"
                    value={data.mother_photo}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.mother_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Last Marksheet:</FormLabel>
                  <UploadImage
                    name="last_marksheet"
                    value={data.last_marksheet}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.last_marksheet} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Transfer Certificate:</FormLabel>
                  <UploadImage
                    name="transfer_certificate"
                    value={data.transfer_certificate}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.transfer_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Income Certificate:</FormLabel>
                  <UploadImage
                    name="income_certificate"
                    value={data.income_certificate}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.income_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Cast Certificate:</FormLabel>
                  <UploadImage
                    name="caste_certificate"
                    value={data.caste_certificate}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.caste_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>DOB Certificate:</FormLabel>
                  <UploadImage
                    name="dob_certificate"
                    value={data.income_certificate}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.income_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Aadhar Card:</FormLabel>
                  <UploadImage
                    name="student_aadhar_card_photo"
                    value={data.student_aadhar_card_photo}
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={data.student_aadhar_card_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Aadhar Card:</FormLabel>
                  <UploadImage
                    name="father_aadhar_card_photo"
                    value={data.father_aadhar_card_photo}
                    onChange={this.onFileChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Button primary onClick={(e) => this.submit()}>
                {button_text}
              </Button>
              <Button warning>Reset</Button>
            </Row>
          </CardComponent>
        </BodyComponent>
      </div>
    );
  }
}

export default AdmissionStudent;
