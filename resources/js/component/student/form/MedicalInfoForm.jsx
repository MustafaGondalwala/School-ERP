import React, { Component } from "react"
import {
    Col,
    FormLabel,
    FormGroup,
    Input,
    UploadFile,
    Select,
    SelectOption,
    Button,
    UploadImage,
    PreviewSingleImage
  } from "../../utils/Components";
import CardComponent from "../../utils/CardComponent";
import Row from "../../utils/Row";

export default class MedicalInfoForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            medical_info:{
                checkup_date:"",
                doctor_name:"",
                report:"",
                student_height:"",
                student_weight:"",
                blood_group:"",
                blood_pressure:"",
                hemoglobin_level:"",
                diabetes_level:"",
                hiv:0,
                tb_infection:0,
                description:"",
                remark:"",
                heath_marks:""
            },
            button_text:"Submit"
        }
        this.onChange = this.onChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.submit = this.submit.bind(this)
        this.updateData = this.updateData.bind(this)
    }
    updateData(){
      const {data} = this.props
      const {medical_info} = data
      console.log(data)
      if(medical_info != null){
        this.setState({
          medical_info
        })
      }
    }
    componentDidMount(){
      this.updateData()
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            medical_info: {...this.state.medical_info,[name]: value}
        })
    }
    onFileChange(e){
        const {name,files} = e.target
        const file = files[0]
        this.setState({
            medical_info: {...this.state.medical_info,[name]: file}
        })
    }
    validate(data){
        const errors = {};
        if (!data.checkup_date) errors.checkup_date = "Can't be blank";
        if (!data.doctor_name) errors.doctor_name = "Can't be blank";
        if (!data.student_height) errors.student_height = "Can't be blank";
        if (!data.student_weight) errors.student_weight = "Can't be blank";
        if (!data.heath_marks) errors.heath_marks = "Can't be blank";
        return errors;
    }
    submit(){
        const data = this.state.medical_info
        const errors = this.validate(data)
        this.setState({ errors })
        if(Object.keys(errors).length == 0){
            this.props.updateMedicalInfo(data)
        }
    }
    render(){
        const {checkup_date,doctor_name,student_height,student_weight,hemoglobin_level,blood_group,diabetes_level,hiv,remark,tb_infection,description,heath_marks,report,blood_pressure} = this.state.medical_info
        const {button_text,errors} = this.state
        const {student} = this.props.data
        return(
            <CardComponent title="Medical Info">
            <Row>
              <Col md="4" sm="12" lg="4">
                <FormGroup>
                  <FormLabel>Student Name</FormLabel>
                  <Input value={student.student_name} disabled placeholder="Student Name" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Father Name</FormLabel>
                  <Input value={student.father_name} disabled placeholder="Father Name" />
                </FormGroup>
              </Col>
              <Col md="4" sm="12" lg="4">
                <FormGroup>
                  <FormLabel>Student RollNo</FormLabel>
                  <Input value={student.roll_no} disabled placeholder="Student RollNo" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Class:</FormLabel>
                  <Input value={student.class.class_title} disabled placeholder="Class" />
                </FormGroup>
              </Col>
              {student.class.section && 
                  <Col md="4" sm="12" lg="4">
                  <FormGroup>
                    <FormLabel>Section:</FormLabel>
                    <Input value={student.class.section} disabled placeholder="Section" />
                  </FormGroup>
                </Col>
              }
              
            </Row>
            <Row>
              <Col md="2" sm="6" lg="4">
                <FormGroup>
                  <FormLabel>Checkup Date</FormLabel>
                  <Input errors={errors} name="checkup_date" value={checkup_date} onChange={this.onChange} type="date" />
                </FormGroup>
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormGroup>
                  <FormLabel>Doctor Name</FormLabel>
                  <Input errors={errors} name="doctor_name" onChange={this.onChange} value={doctor_name} placeholder="Doctor Name" />
                </FormGroup>
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormGroup>
                  <FormLabel>Report</FormLabel>
                  <UploadImage name="report" onChange={this.onFileChange}/>
                  <PreviewSingleImage url={report}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Student Height</FormLabel>
                <Input errors={errors} type="number" onChange={this.onChange} name="student_height" value={student_height} placeholder="Student Height" />
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Student Weight</FormLabel>
                <Input errors={errors} type="number" value={student_weight} onChange={this.onChange} name="student_weight" placeholder="Student Weight" />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Blood Group</FormLabel>
                <Input onChange={this.onChange} value={blood_group} name="blood_group" placeholder="Blood Group" />
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Blood Pressure</FormLabel>
                <Input value={blood_pressure} name="blood_pressure" onChange={this.onChange} placeholder="Blood Pressure" />
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Hemoglobin Level</FormLabel>
                <Input value={hemoglobin_level} name="hemoglobin_level" onChange={this.onChange} placeholder="Hemoglobin Level" />
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Diabetes Level</FormLabel>
                <Input value={diabetes_level} name="diabetes_level" onChange={this.onChange} placeholder="Diabetes Level" />
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>HIV</FormLabel>
                <Select onChange={this.onChange}  value={hiv} name="hiv">
                  <SelectOption value="1">Yes</SelectOption>
                  <SelectOption value="0">No</SelectOption>
                </Select>
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>TB Infection</FormLabel>
                <Select onChange={this.onChange}  value={tb_infection} name="tb_infection">
                  <SelectOption value="1">Yes</SelectOption>
                  <SelectOption value="0">No</SelectOption>
                </Select>
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Description</FormLabel>
                <Input onChange={this.onChange} name="description" value={description} placeholder="Description" />
              </Col>

              <Col md="2" sm="6" lg="4">
                <FormLabel>Remark</FormLabel>
                <Input onChange={this.onChange} value={remark} name="remark" placeholder="Remark" />
              </Col>
              <Col md="2" sm="6" lg="4">
                <FormLabel>Heath Marks</FormLabel>
                <Input errors={errors} onChange={this.onChange} value={heath_marks} name="heath_marks" placeholder="Heath Marks" type="number" />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="6">
                <Button primary sm onClick={this.submit}>{button_text}</Button>
              </Col>
            </Row>
          </CardComponent>
        )
    }
}
