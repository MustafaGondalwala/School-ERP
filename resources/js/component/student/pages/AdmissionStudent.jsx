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
    this.initialImages = {
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
    }
    this.initialData = {
      roll_no: "",
      class_id: "",
      student_name: "",
      father_name: "",
      last_name:"",
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
      age: "",
      student_address: "",
      block: "",
      state: "",
      district: "",
      landmark: "",
      pincode: "",
      caste: "",
      religion: "",
    }
    this.state = {
      data: this.initialData,
      images:this.initialImages,
      roll_no_placeholder:"Please Select Class",
      button_text: "Add Admission",
      title: "Admission Student",
      errors: {},
      update_student: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.sendClassId = this.sendClassId.bind(this);
    this.getRollNoSequence = this.getRollNoSequence.bind(this);
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
  async onFileChange(e) {
    const { name, files } = e.target;
    var value = files[0];
    await this.setState({
      data: { ...this.state.data, [name]: value },
    });
    await this.setState({
      images: {...this.state.images,[name]: URL.createObjectURL(value)},
    })
  }
  validate(data) {
    const errors = {};
    if (!data.roll_no) errors.roll_no = "Can't be blank";
    if (!data.father_name) errors.father_name = "Can't be blank";
    if (!data.mother_name) errors.mother_name = "Can't be blank";
    if (!data.last_name) errors.last_name = "Can't be blank";
    if (!data.student_name) errors.student_name = "Can't be blank";
    if (!data.father_contact_no1) errors.father_contact_no1 = "Can't be blank";
    if (!data.class_id) errors.class_id = "Can't be blank";
    if (!data.religion) errors.religion = "Can't be blank";
    if (!data.district) errors.district = "Can't be blank";
    if (!data.block) errors.block = "Can't be blank";
    if (!data.landmark) errors.landmark = "Can't be blank";
    if (!data.state) errors.state = "Can't be blank";

    if (!data.caste) errors.caste = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.student_address) errors.student_address = "Can't be blank";
    if (!data.pincode) errors.pincode = "Can't be blank";
    return errors;
  }
  async getRollNoSequence(class_id){
    this.setState({
      roll_no_placeholder:"Loading ..."
    })
    await api.adminclerk.student.get_roll_no(class_id).then(data => {
      const {roll_no} = data
      if(roll_no == null){
        Swal.fire("Roll No not Set","Roll No Sequence not Set. Please Set","warning");
        this.setState({
          roll_no_placeholder:"Please Select Class"
        })
      }else{
        const userAccount = JSON.parse(localStorage.getItem('userAccount'))
        const {unique_id_code} = userAccount.info.school
        const {roll_id,rollno_string} = roll_no
        const new_roll_no = unique_id_code+"-"+rollno_string+roll_id
        this.setState({
          data: { ...this.state.data, ["roll_no"]: new_roll_no },
        });
        this.setState({
          data: { ...this.state.data, ["class_id"]: class_id },
        });
      }
        
    })
  }
  sendClassId(class_id) {
    this.getRollNoSequence(class_id)
  }
  async componentWillMount() {
    const params = this.props.match.params;
    if (params.hasOwnProperty("register_id")) {
    }
    if (params.hasOwnProperty("edit_student_id")) {
      const { edit_student_id } = params;
      await api.adminclerk.student.getstudent(edit_student_id).then((data) => {
        const { studentInfo } = data;
        var images = {};
        const temp_id = studentInfo.id;
        Object.keys(studentInfo["photos"]).map((item) => {
          images[item] = studentInfo["photos"][item];
        });
        console.log(images)
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
          images:images,
          title: "Update Student",
          button_text: "Update Student",
        });
      });
    }
  }
  submit(){
    const { data,update_student } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      let formData = new FormData(); //formdata object
      Object.keys(data).map((item) => {
        formData.append(item, data[item]);
      });
      if (update_student) {
        this.setState({
          button_text: "Updating ...",
        });
        api.adminclerk.student.update_student(formData).then(data => {
          Swal.fire("Success",data.message,"success");
          this.setState({
            button_text:"Update"
          })
        })
      } else {
        this.setState({
          button_text: "Adding ...",
        });
        api.adminclerk.student.admission
          .add(formData)
          .then((data) => {
            this.setState({ data:this.initialData,images:this.initialImages,button_text: " Add Admission" });
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
    const { data, errors,images, button_text, title, update_student,roll_no_placeholder } = this.state;
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
                    disabled
                    placeholder={roll_no_placeholder}
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
                  <FormLabel>Last Name*:</FormLabel>
                  <Input
                    errors={errors}
                    placeholder="Last Name"
                    name="last_name"
                    onChange={this.onChange}
                    value={data.last_name}
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
                    errors={errors}
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
                    errors={errors}
                    placeholder="Student Email"
                    value={data.student_email}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Address*:</FormLabel>
                  <Input
                    name="student_address"
                    errors={errors}
                    onChange={this.onChange}
                    placeholder="Student Address"
                    value={data.student_address}
                  />
                </FormGroup>
              </Col>
              {/* block */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Block*:</FormLabel>
                  <Input
                    name="block"
                    errors={errors}
                    onChange={this.onChange}
                    placeholder="Block"
                    value={data.block}
                  />
                </FormGroup>
              </Col>
              {/* district */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>District*:</FormLabel>
                  <Input
                    name="district"
                    errors={errors}
                    onChange={this.onChange}
                    placeholder="District"
                    value={data.district}
                  />
                </FormGroup>
              </Col>
              {/* state */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>State*:</FormLabel>
                  <Select errors={errors} name="state" onChange={this.onChange} value={data.state}>
                    <option disabled={true} value="">-- Select --</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </Select>
                </FormGroup>
              </Col>
              {/* landmark */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Landmark*:</FormLabel>
                  <Input
                    name="landmark"
                    errors={errors}
                    onChange={this.onChange}
                    placeholder="Landmark"
                    value={data.landmark}
                  />
                </FormGroup>
              </Col>
              {/* pincode */}
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Pincode*:</FormLabel>
                  <Input
                    name="pincode"
                    errors={errors}
                    onChange={this.onChange}
                    placeholder="Pincode"
                    value={data.pincode}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Religion*:</FormLabel>
                  <Select
                    errors={errors}
                    name="religion"
                    value={data.religion}
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
                  <FormLabel>Caste*:</FormLabel>
                  <Select errors={errors} value={data.caste} name="caste" onChange={this.onChange}>
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
              {/* <Col md="4" sm="6">
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
              </Col> */}
            </Row>
           <Row>
              <RedLabel>Student Photos:</RedLabel>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Photo:</FormLabel>
                  <Input
                    type="file"
                    name="student_photo"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.student_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Photo:</FormLabel>
                  <Input
                    type="file"
                    name="father_photo"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.father_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Mother Photo:</FormLabel>
                  <Input
                    type="file"
                    name="mother_photo"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.mother_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Last Marksheet:</FormLabel>
                  <Input
                    type="file"
                    name="last_marksheet"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.last_marksheet} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Transfer Certificate:</FormLabel>
                  <Input
                    type="file"
                    name="transfer_certificate"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.transfer_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Income Certificate:</FormLabel>
                  <Input
                    type="file"
                    name="income_certificate"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.income_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Cast Certificate:</FormLabel>
                  <Input
                    type="file"
                    name="caste_certificate"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.caste_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>DOB Certificate:</FormLabel>
                  <Input
                    type="file"
                    name="dob_certificate"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.dob_certificate} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Student Aadhar Card:</FormLabel>
                  <Input
                    type="file"
                    name="student_aadhar_card_photo"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.student_aadhar_card_photo} />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <FormLabel>Father Aadhar Card:</FormLabel>
                  <Input
                    type="file"
                    name="father_aadhar_card_photo"
                    onChange={this.onFileChange}
                  />
                  <PreviewSingleImage url={images.father_aadhar_card_photo} />
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
