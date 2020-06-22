import validator from "validator";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import InlineError from "../../utils/InlineError";
import Swal from "sweetalert2";
import Row from "../../utils/Row";
import {
  RedLabel,
  Col,
  FormGroup,
  FormLabel,
  Input,
  Select,
  SelectOption,
  PreviewSingleImage,
  UploadImage,
  Button,
  Table
} from "../../utils/Components";

export default class AddTeacherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {
      empid: "",
      teacher_name: "",
      gender: "male",
      relative_name: "",
      email: "",
      contact_no: "",
      qualification: "",
      address: "",
      dob: "",
      blood_group: "",
      aadhar_card: "",
      bank_name: "",
      bank_number: "",
      pf_no: "",
      pf_amount: "",
      da_amount: "",
      hra_amount: "",
      salary_remark: "",
      casual_leave: "",
      sick_leave: "",
      pay_earn_leave: "",
      other_leave: "",
      emp_photo: "",
      id_proof: "",
      experience_letter: "",
      other_documents1: "",
      other_documents2: "",
      salary: "",
      send_sms: true,
      },
      errors: {},
      button_text:"Add"
    };
    this.toggleSmsChange = this.toggleSmsChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.makeInputNull = this.makeInputNull.bind(this)
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
    if (!data.empid) errors.empid = "Can't be blank";
    if (!data.teacher_name) errors.teacher_name = "Can't be blank";
    if (!data.gender) errors.gender = "Can't be blank";
    if (!data.relative_name) errors.relative_name = "Can't be blank";
    if (!data.email) errors.email = "Can't be blank";
    if (!data.contact_no) errors.contact_no = "Can't be blank";
    if (!data.qualification) errors.qualification = "Can't be blank";
    if (!data.address) errors.address = "Can't be blank";
    if (!data.salary) errors.salary = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.date_of_joining) errors.date_of_joining = "Can't be blank";


    if (data.teacher_name.length < 3)
      errors.teacher_name = "Min. Length 3 char.";
    if (data.relative_name.length < 3)
      errors.relative_name = "Min. Length 3 char.";
    if (data.address.length < 3) errors.address = "Min. Length 5 char.";
    if (data.contact_no.length != 10) errors.contact_no = "Invalid Contact No.";
    if (!validator.isMobilePhone(data.contact_no))
      errors.contact_no = "Invalid Contact No.";

    return errors;
  }
  onSubmit(e) {
    e.preventDefault();
    const {data,edit} = this.state
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    const formData = new FormData();
    Object.keys(this.state.data).map((item) => {
      formData.append(item, this.state.data[item]);
    });
    if (Object.keys(errors).length === 0) {
      if(!edit){
        this.setState({
          button_text:"Adding .."
        })
      }else{
        this.setState({
          button_text:"Updating .."
        })
      }
      var text = 'Add Teacher in System'
      if(edit){
        text = 'Update Teacher in System'
      }
      Swal.fire({
        title: 'Are you sure?',
        text: "Add Teacher in System",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm: true,
        confirmButtonText: 'Yes, process it!',
        preConfirm: () => {
            return this.props
            .submit(formData)
            .then((data) => {
             return data
            })
            .catch((error) => {
              if (error.response.status == 400)
                Swal.fire("Error Occured", "Validation Error", "error");
              else if (error.response.status) {
                Swal.fire("Error Occured", "Validation Error", "warning");
                this.setState({
                  errors: error.response.data.errors,
                });
              }
            });
          }
      }).then((result) => {
        
        if(result.hasOwnProperty('value')){
          if(result.value.hasOwnProperty('error')){
            Swal.fire("Error","Error Occured in Process. Please check the Data","error")
          }
          if(result.value.hasOwnProperty('message')){
            if(!edit)
              this.makeInputNull();
            Swal.fire("Success",result.value.message,"success")
          }
          if(!edit){
            this.setState({
              button_text:"Add"
            })
          }else{
            this.setState({
              button_text:"Update"
            })
          }
          
        }
      })
    }
  }
  makeInputNull(){
    const data = {
      empid: "",
      teacher_name: "",
      gender: "male",
      relative_name: "",
      email: "",
      contact_no: "",
      qualification: "",
      address: "",
      dob: "",
      blood_group: "",
      aadhar_card: "",
      bank_name: "",
      bank_number: "",
      pf_no: "",
      pf_amount: "",
      da_amount: "",
      hra_amount: "",
      salary_remark: "",
      casual_leave: "",
      sick_leave: "",
      pay_earn_leave: "",
      other_leave: "",
      emp_photo: "",
      id_proof: "",
      experience_letter: "",
      other_documents1: "",
      other_documents2: "",
      salary: "",
      date_of_join:"",
      send_sms: true,
    }
    this.setState({
      data
    })
  }
  toggleSmsChange() {
    this.setState({
      data: { ...this.state.data, ["send_sms"]: !this.state.data.send_sms },
    });
  }
  componentDidMount(){
    const {data} = this.props
    if(data != undefined)
      this.setState({
        data,
        button_text:"Update",
        edit:true
      })
  }
  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }
  render() {
    const { data, errors,button_text } = this.state;
    const { title, back_link } = this.props;
    return (
        <CardComponent title={title} back_link={back_link}>
          <RedLabel>Personal Information:</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Empid: </FormLabel>
                <Input
                  errors={errors}
                  name="empid"
                  onChange={this.onChange}
                  value={data.empid || ''} 
                />
              </FormGroup>
            </Col>
            {/* teacher_name */}
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Teacher Name*</FormLabel>
                <Input
                  errors={errors}
                  name="teacher_name"
                  value={data.teacher_name || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Husband/Father Name*</FormLabel>
                <Input
                  errors={errors}
                  name="relative_name"
                  value={data.relative_name || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Email*</FormLabel>
                <Input
                  errors={errors}
                  name="email"
                  value={data.email || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Gender*</FormLabel>
                <Select
                  errors={errors}
                  name="gender"
                  value={data.gender}
                  onChange={this.onChange}
                >
                  <SelectOption>-- Select --</SelectOption>
                  <SelectOption value="male">Male</SelectOption>
                  <SelectOption value="female">Female</SelectOption>
                  <SelectOption value="other">Other</SelectOption>
                </Select>
              </FormGroup>
            </Col>
            {/* contact_no */}
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Contact No*</FormLabel>
                <Input
                  errors={errors}
                  name="contact_no"
                  value={data.contact_no || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Address*</FormLabel>
                <Input
                  errors={errors}
                  name="address"
                  value={data.address || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Qualification</FormLabel>
                <Input
                  errors={errors}
                  name="qualification"
                  value={data.qualification || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Dob*</FormLabel>
                <Input
                  type="date"
                  errors={errors}
                  name="dob"
                  value={data.dob  || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            {/* blood_group */}
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Blood Group*</FormLabel>
                <Input
                  errors={errors}
                  name="blood_group"
                  value={data.blood_group  || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Date of Joining*</FormLabel>
                <Input
                  errors={errors}
                  type="date"
                  name="date_of_joining"
                  value={data.date_of_joining ||''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <RedLabel>Documents</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Aadhar Card</FormLabel>
                <Input
                  errors={errors}
                  name="aadhar_card"
                  value={data.aadhar_card || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Bank Name</FormLabel>
                <Input
                  errors={errors}
                  name="bank_name"
                  value={data.bank_name || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Bank Number</FormLabel>
                <Input
                  errors={errors}
                  name="bank_number"
                  value={data.bank_number || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Pan Card Number</FormLabel>
                <Input
                  errors={errors}
                  name="pan_card_number"
                  value={data.pan_card_number || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Teacher Photo</FormLabel>
                <UploadImage
                  name="emp_photo"
                  value={data.emp_photo}
                  onChange={this.onFileChange}
                />
                <PreviewSingleImage url={data.emp_photo} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Experience Letter</FormLabel>
                <UploadImage
                  name="experience_letter"
                  value={data.experience_letter}
                  onChange={this.onFileChange}
                />
                <PreviewSingleImage url={data.experience_letter} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>ID Proof</FormLabel>
                <UploadImage
                  name="id_proof"
                  value={data.id_proof}
                  onChange={this.onFileChange}
                />
                <PreviewSingleImage url={data.id_proof} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Other Documents 1</FormLabel>
                <UploadImage
                  name="other_documents1"
                  value={data.other_documents1}
                  onChange={this.onFileChange}
                />
                <PreviewSingleImage url={data.other_documents1} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Other Documents 2</FormLabel>
                <UploadImage
                  name="other_documents2"
                  value={data.other_documents2}
                  onChange={this.onFileChange}
                />
                <PreviewSingleImage url={data.other_documents2} />
              </FormGroup>
            </Col>
          </Row>
          <RedLabel>Salary Details:</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Salary*</FormLabel>
                <Input
                  errors={errors}
                  name="salary"
                  value={data.salary || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>PF No.</FormLabel>
                <Input
                  errors={errors}
                  name="pf_no"
                  value={data.pf_no || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>PF Amount</FormLabel>
                <Input
                  errors={errors}
                  name="pf_amount"
                  value={data.pf_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>TDS Amount</FormLabel>
                <Input
                  errors={errors}
                  name="tds_amount"
                  value={data.tds_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Professional TAX Amount</FormLabel>
                <Input
                  errors={errors}
                  name="professional_tax"
                  value={data.professional_tax || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>DA Amount</FormLabel>
                <Input
                  errors={errors}
                  name="da_amount"
                  value={data.da_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>HRA Amount </FormLabel>
                <Input
                  errors={errors}
                  name="hra_amount"
                  value={data.hra_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Salary Remark </FormLabel>
                <Input
                  errors={errors}
                  name="salary_remark"
                  value={data.salary_remark || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <RedLabel>Leave Details</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Casual Leave </FormLabel>
                <Input
                  errors={errors}
                  name="casual_leave"
                  value={data.casual_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Pay/Earn Leave </FormLabel>
                <Input
                  errors={errors}
                  name="pay_earn_leave"
                  value={data.pay_earn_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Sick Leave </FormLabel>
                <Input
                  errors={errors}
                  name="sick_leave"
                  value={data.sick_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Other Leave </FormLabel>
                <Input
                  errors={errors}
                  name="other_leave"
                  value={data.other_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {!data.id && (
              <Row>
                <Table>
                <tbody>
                <tr>
                <td>
                  <FormLabel>Check for Sms Message</FormLabel>
                </td>
                <td>
                        <input
                          type="checkbox"
                          checked={data.send_sms}
                          onChange={(e) => this.toggleSmsChange()}
                        />
                </td>
                </tr>
                </tbody>
                </Table>
              </Row>
            )}
          </Row>
          <Row>
            <Button primary onClick={this.onSubmit}>{button_text}</Button>
          </Row>
        </CardComponent>
    );
  }
}
