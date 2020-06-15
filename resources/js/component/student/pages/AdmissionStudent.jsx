import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import Row from "../../utils/Row"
import { RedLabel, Col, FormGroup, FormLabel, Input , Select, SelectOption, UploadImage, Button } from "../../utils/Components"

class AdmissionStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                roll_no:'',
                class_id:"",
                student_name:'',
                father_name:'',
                mother_name:'',
                father_qualification:'',
                mother_qualification:'',
                handicapped:"",
                student_aadhar_card:'',
                father_aadhar_card:'',
                father_bank_name:'',
                student_bank_name:'',
                father_bank_number:'',
                mother_bank_number:'',
                father_contactno1:'',
                father_contactno2:'',
                sms_number:'',
                father_email:'',
                mother_email:'',
                father_occupation:'',
                mother_occupation:'',
                guardian_name:'',
                guardian_occupation:'',
                student_photo:'',
                father_photo:'',
                mother_photo:'',
                last_marksheet:'',
                transfer_certificate:'',
                income_certificate:'',
                caste_certificate:'',
                dob_certificate:'',
                student_aadhar_card_photo:'',
                father_aadhar_card_photo:'',
            },
            errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.sendClassId = this.sendClassId.bind(this)
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    onFileChange(e){
        const {name,files} = e.target
        var value = files[0]
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    validate(data){
        const errors = {};
        if (!data.roll_no) errors.roll_no = "Can't be blank";
        if (!data.father_name) errors.father_name = "Can't be blank";
        if (!data.mother_name) errors.mother_name = "Can't be blank";
        if (!data.student_name) errors.student_name = "Can't be blank";
        if (!data.father_contactno1) errors.father_contactno1 = "Can't be blank";
        if (!data.sms_number) errors.sms_number = "Can't be blank";
        if (!data.class_id) errors.class_id = "Can't be blank";
        return errors
    }
    sendClassId(class_id){
        this.setState({
            data: {...this.state.data,["class_id"]: class_id}
        })
    }
    submit(){
        const {data} = this.state
        const errors = this.validate(data)
        this.setState({errors})
        if(Object.keys(errors).length == 0){
            
        }
    }
    render(){
        const {data,errors} = this.state
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
                                    <FormLabel>RollNo*:</FormLabel>
                                    <Input errors={errors} name="roll_no" onChange={this.onChange} value={data.roll_no}/>
                                </FormGroup>
                            </Col>
                            <GetClassId sendClassId={this.sendClassId} errors={errors}/>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Name*:</FormLabel>
                                    <Input errors={errors} placeholder="Student Name" name="student_name" onChange={this.onChange} value={data.student_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Name*:</FormLabel>
                                    <Input errors={errors} placeholder="Father Name" name="father_name" onChange={this.onChange} value={data.father_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Name*:</FormLabel>
                                    <Input errors={errors} placeholder="Mother Name" name="mother_name" onChange={this.onChange} value={data.mother_name}/>
                                </FormGroup>
                            </Col>

                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Qualification:</FormLabel>
                                    <Input errors={errors} placeholder="Father Qualification" name="father_qualification" onChange={this.onChange} value={data.father_qualification}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Qualification:</FormLabel>
                                    <Input errors={errors} placeholder="Mother Qualification" name="mother_qualification" onChange={this.onChange} value={data.mother_qualification}/>
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
                                    <Input errors={errors} placeholder="Student Aadhar Card" name="student_aadhar_card" onChange={this.onChange} value={data.student_aadhar_card}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Aadhar Card:</FormLabel>
                                    <Input errors={errors} placeholder="Father Aadhar Card" name="father_aadhar_card" onChange={this.onChange} value={data.father_aadhar_card}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Bank Name:</FormLabel>
                                    <Input errors={errors} placeholder="Father Bank Name" name="father_bank_name" onChange={this.onChange} value={data.father_bank_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Bank Name:</FormLabel>
                                    <Input errors={errors} placeholder="Student Bank Name" name="student_bank_name" onChange={this.onChange} value={data.student_bank_name}/>
                                </FormGroup>
                            </Col>

                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Bank Number:</FormLabel>
                                    <Input errors={errors} placeholder="Father Bank Number" name="father_bank_number" onChange={this.onChange} value={data.father_bank_number}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Bank Number:</FormLabel>
                                    <Input errors={errors} placeholder="Student Bank Number" name="student_bank_number" onChange={this.onChange} value={data.student_bank_number}/>
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
                                    <Input errors={errors} type="number"  placeholder="Father ContactNo 1" name="father_contactno1" onChange={this.onChange} value={data.father_contactno1}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father ContactNo 2:</FormLabel>
                                    <Input errors={errors}  type="number" placeholder="Father ContactNo 2" name="father_contactno2" onChange={this.onChange} value={data.father_contactno2}/>
                                </FormGroup>
                            </Col>
                            
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>SMS Number*:</FormLabel>
                                    <Input errors={errors} type="number" placeholder="SMS Number 2" name="sms_number" onChange={this.onChange} value={data.sms_number}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Email:</FormLabel>
                                    <Input errors={errors} type="email" placeholder="Father Email" name="father_email" onChange={this.onChange} value={data.father_email}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Email:</FormLabel>
                                    <Input errors={errors} type="email" placeholder="Mother Email" name="mother_email" onChange={this.onChange} value={data.mother_email}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Occupation:</FormLabel>
                                    <Input errors={errors} placeholder="Father Occupation" name="father_occupation" onChange={this.onChange} value={data.father_occupation}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Occupation:</FormLabel>
                                    <Input errors={errors} placeholder="Mother Occupation" name="mother_occupation" onChange={this.onChange} value={data.mother_occupation}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Guardian Name:</FormLabel>
                                    <Input errors={errors} placeholder="Guardian Name" name="guardian_name" onChange={this.onChange} value={data.guardian_name}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Guardian Occupation:</FormLabel>
                                    <Input errors={errors} placeholder="Guardian Occupation" name="guardian_occupation" onChange={this.onChange} value={data.guardian_occupation}/>
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
                                    <Input errors={errors} name="student_login" disabled value={data.roll_no} placeholder="Student Login"/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father/Mother Login:</FormLabel>
                                    <Input errors={errors} name="parent_login" disabled value={data.father_contactno1} placeholder="Parent Login"/>
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
                                    <UploadImage name="student_photo" value={data.student_photo} onChange={this.onFileChange}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Photo:</FormLabel>
                                    <UploadImage name="father_photo" value={data.father_photo} onChange={this.onFileChange} />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Mother Photo:</FormLabel>
                                    <UploadImage name="mother_photo" value={data.mother_photo} onChange={this.onFileChange} />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Last Marksheet:</FormLabel>
                                    <UploadImage name="last_marksheet" value={data.last_marksheet} onChange={this.onFileChange} />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Transfer Certificate:</FormLabel>
                                    <UploadImage name="transfer_certificate" value={data.transfer_certificate} onChange={this.onFileChange}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Income Certificate:</FormLabel>
                                    <UploadImage name="income_certificate" value={data.income_certificate} onChange={this.onFileChange} />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Cast Certificate:</FormLabel>
                                    <UploadImage name="caste_certificate" value={data.caste_certificate} onChange={this.onFileChange}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>DOB Certificate:</FormLabel>
                                    <UploadImage name="dob_certificate" value={data.income_certificate} onChange={this.onFileChange} />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Student Aadhar Card:</FormLabel>
                                    <UploadImage name="student_aadhar_card_photo" value={data.student_aadhar_card_photo} onChange={this.onFileChange}/>
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Father Aadhar Card:</FormLabel>
                                    <UploadImage name="father_aadhar_card_photo" value={data.father_aadhar_card_photo} onChange={this.onFileChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Button primary onClick={e => this.submit()}>Add Admission</Button>
                            <Button warning>Reset</Button>
                        </Row>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}



export default AdmissionStudent