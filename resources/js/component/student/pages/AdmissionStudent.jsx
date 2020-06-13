import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import Row from "../../utils/Row"
import { RedLabel, Col, FormGroup, FormLabel, Input, Select, SelectOption, UploadFile, Button } from "../../utils/Components"

class AdmissionStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                roll_no:'BS-102',
                student_name:'',
                handicapped:"no"
            }
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        const {name,value} = e.target
        console.log(name,value)
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    render(){
        const {data} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Admission" sub_header="Add">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Admission Student" back_link="/admin/student">
                        <Row>
                            <RedLabel>Personal Details:</RedLabel>
                        </Row>
                        <Row>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>RollNo:</FormLabel>
                                    <Input name="roll_no" onChange={this.onChange} value={data.roll_no}/>
                                </FormGroup>
                            </Col>
                            <GetClassId errors=""/>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Name:</FormLabel>
                                    <Input placeholder="Student Name" name="student_name" onChange={this.onChange} value={data.student_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Name:</FormLabel>
                                    <Input placeholder="Father Name" name="father_name" onChange={this.onChange} value={data.father_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Name:</FormLabel>
                                    <Input placeholder="Mother Name" name="mother_name" onChange={this.onChange} value={data.mother_name}/>
                                </FormGroup>
                            </Col>

                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Qualification:</FormLabel>
                                    <Input placeholder="Father Qualification" name="father_qualification" onChange={this.onChange} value={data.father_qualification}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Qualification:</FormLabel>
                                    <Input placeholder="Mother Qualification" name="mother_qualification" onChange={this.onChange} value={data.mother_qualification}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Handicapped:</FormLabel>
                                    <Select name="handicapped" onChange={this.onChange} value={data.handicapped}>
                                        <SelectOption value="yes">Yes</SelectOption>
                                        <SelectOption value="no">No</SelectOption>
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
                                    <Input placeholder="Student Aadhar Card" name="student_aadhar_card" onChange={this.onChange} value={data.student_aadhar_card}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Aadhar Card:</FormLabel>
                                    <Input placeholder="Father Aadhar Card" name="father_aadhar_card" onChange={this.onChange} value={data.father_aadhar_card}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Bank Name:</FormLabel>
                                    <Input placeholder="Father Bank Name" name="father_bank_name" onChange={this.onChange} value={data.father_bank_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Bank Name:</FormLabel>
                                    <Input placeholder="Student Bank Name" name="student_bank_name" onChange={this.onChange} value={data.student_bank_name}/>
                                </FormGroup>
                            </Col>

                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Bank Number:</FormLabel>
                                    <Input placeholder="Father Bank Number" name="father_bank_number" onChange={this.onChange} value={data.father_bank_number}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Bank Number:</FormLabel>
                                    <Input placeholder="Student Bank Number" name="student_bank_number" onChange={this.onChange} value={data.student_bank_number}/>
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <RedLabel>Parent Info:</RedLabel>
                        </Row>
                        <Row>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father ContactNo 1:</FormLabel>
                                    <Input  placeholder="Father ContactNo 1" name="father_contactno1" onChange={this.onChange} value={data.father_contactno1}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father ContactNo 2:</FormLabel>
                                    <Input  placeholder="Father ContactNo 2" name="father_contactno2" onChange={this.onChange} value={data.father_contactno2}/>
                                </FormGroup>
                            </Col>
                            
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>SMS Number:</FormLabel>
                                    <Input  placeholder="SMS Number 2" name="sms_number" onChange={this.onChange} value={data.sms_number}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Email:</FormLabel>
                                    <Input type="email" placeholder="Father Email" name="father_email" onChange={this.onChange} value={data.father_email}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Email:</FormLabel>
                                    <Input type="email" placeholder="Mother Email" name="mother_email" onChange={this.onChange} value={data.mother_email}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Occupation:</FormLabel>
                                    <Input placeholder="Father Occupation" name="father_occupation" onChange={this.onChange} value={data.father_occupation}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Occupation:</FormLabel>
                                    <Input placeholder="Mother Occupation" name="mother_occupation" onChange={this.onChange} value={data.mother_occupation}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Guardian Name:</FormLabel>
                                    <Input placeholder="Guardian Name" name="guardian_name" onChange={this.onChange} value={data.guardian_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Guardian Occupation:</FormLabel>
                                    <Input placeholder="Guardian Occupation" name="guardian_occupation" onChange={this.onChange} value={data.guardian_occupation}/>
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
                                    <Input name="student_login" disabled onChange={this.onChange} value={data.roll_no} placeholder="Student Login"/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father/Mother Login:</FormLabel>
                                    <Input name="parent_login" onChange={this.onChange} value={data.parent_login} placeholder="Parent Login"/>
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
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Photo:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Photo:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Last Marksheet:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Transfer Certificate:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Income Certificate:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Cast Certificate:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>DOB Certificate:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Aadhar Card:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Aadhar Card:</FormLabel>
                                    <UploadFile />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Button primary>Add Admission</Button>
                            <Button warning>Reset</Button>
                        </Row>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}



export default AdmissionStudent