import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import Row from "../../utils/Row"
import Col from "../../utils/Col"

import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import {FormLabel,FormGroup,Input,UploadImage,UploadInput,Button, Select, SelectOption,PreviewSingleImage} from "../../utils/Components"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import GetClassId from "../../utils/GetClassId"
import {getClassSection} from "../../actions/classes"
import { connect } from "react-redux";
import Swal from "sweetalert2"
import YearSelectComponent from "../../utils/YearSelectComponent"
import api from "../../api"
class RegisterForm extends Component{
    constructor(props){
        super(props)
        this.state = {
           button_text:"Register Student",
           data: {
            register_no:null,
            classes:"",
            student_name:"",
            mother_name:"",
            father_name:"",
            father_contact_no1:"",
            father_contact_no2:"",
            dob:"",
            gender:"male",
            doA:"",
            student_address:"",
            block:"",
            district:"",
            state:"",
            pincode:"",
            student_photo:"",
            mother_photo:"",
            father_photo:"",
            select_year:""
            },
        }
        this.onChange = this.onChange.bind(this)
        this.fileChange = this.fileChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    async componentWillReceiveProps(){
        const {register_student} = this.props
        console.log(register_student.father_photo)
        if(register_student != null){
            await this.setState({data:register_student,button_text:"Update Student"})
            await this.setState({
                data: {...this.state.data,["classes"]: register_student.class}
            })   
        }
    }
    async componentDidMount(){
        const {classes,getClassSection} = this.props
        if(Object.keys(classes).length == 0){
            getClassSection();
        }
        await api.admin.student.getRegisterNo().then(data => {
            const {register_no} = data
            this.setState({
                data: {...this.state.data,["register_no"]: register_no}
            })
        });
    }

    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    fileChange(e){
        const {name,files} = e.target
        this.setState({
            data: {...this.state.data,[name]: files[0]}
        })
    }
    validate(data){
        const errors = {};
        if (!data.classes) errors.classes = "Can't be blank";
        if (!data.student_name) errors.student_name = "Can't be blank";
        if (!data.father_name) errors.father_name = "Can't be blank";
        if (!data.father_contact_no1) errors.father_contact_no1 = "Can't be blank";
        if (!data.dob) errors.dob = "Can't be blank";
        if (!data.gender) errors.gender = "Can't be blank";
        if (!data.student_address) errors.student_address = "Can't be blank";
        if(data.register_no == null){
            errors.register_no = "Invalid Register No";   
        }
        return errors;
    }
    submit(){
        const {data} = this.state
        const errors = this.validate(data)
        this.setState({ errors })
        if(Object.keys(errors).length == 0){
            if(this.props.register_student == null){
                this.setState({
                button_text:"Registering Student ..."
                })

                this.props.newRegisterStudent(data).then(data => {
                    this.setState({
                        button_text:"Register Student",
                        data: {
                            register_no:"",
                            classes:"",
                            student_name:"",
                            mother_name:"",
                            father_name:"",
                            father_contact_no1:"",
                            father_contact_no2:"",
                            dob:"",
                            gender:"male",
                            doA:"",
                            student_address:"",
                            block:"",
                            district:"",
                            state:"",
                            pincode:"",
                            student_photo:"",
                            mother_photo:"",
                            father_photo:"",
                        }
                    })
                    Swal.fire("Success","New Student Registered.","success");
                    api.admin.student.getRegisterNo().then(data => {
                        const {register_no} = data
                        this.setState({
                            data: {...this.state.data,["register_no"]: register_no}
                        })
                    });
                })
            }
            else{
                this.setState({
                    button_text:"Updating Student..."
                })
                this.props.updateRegisterStudent(data).then(data => {
                    this.setState({
                        button_text:"Update Student",
                    })
                    Swal.fire("Success","Student Updated.","success");
                    // api.admin.student.getRegisterNo().then(data => {
                    //     const {register_no} = data
                    //     this.setState({
                    //         data: {...this.state.data,["register_no"]: register_no}
                    //     })
                    // });
                })
            }

            
        }
    }
    render(){
        const {classes,register_student} = this.props
        // console.log(register_student.father_photo)
        const {data,errors,button_text} = this.state
        return(
            <div>
                        <Row>
                            <Col md="4" sm="4">
                             <FormGroup>
                                 <FormLabel>
                                    Select Class
                                 </FormLabel>

                                 {register_student == null ?
                                 <Select errors={errors} name="classes" value={data.classes} onChange={this.onChange}>
                                     <SelectOption>-- Select --</SelectOption>
                                    
                                    {Object.keys(classes).length > 0 && classes.map(data => {
                                        return <SelectOption value={data}>{data}</SelectOption>
                                    })}
                                 </Select>
                                 :  
                                    <div>
                                        <FormGroup>
                                           {this.props.register_student.class}
                                        </FormGroup>
                                    </div>
                                }
                             </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                            <FormGroup>
                                <FormLabel>Register No.</FormLabel>
                                <Input  errors={errors} disabled={true} type="number" value={data.register_no} onChange={this.onChange} name="register_no"  placeholder="Register No." />
                            </FormGroup>
                            </Col>   
                            <Col md="4" sm="4">
                            <FormGroup>
                                <FormLabel>Student Name</FormLabel>
                                <Input errors={errors} type="text" onChange={this.onChange} value={data.student_name} name="student_name"  placeholder="Student Name" />
                            </FormGroup>
                            </Col> 
                        </Row>
                        <Row>
                            <Col md="4" sm="4">
                            <FormGroup>
                                <FormLabel>Father Name</FormLabel>
                                <Input errors={errors} type="text" onChange={this.onChange} value={data.father_name} name="father_name"  placeholder="Father Name" />
                            </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                            <FormGroup>
                                <FormLabel>Mother Name</FormLabel>
                                <Input type="text" onChange={this.onChange} value={data.mother_name} name="mother_name"  placeholder="Mother Name" />
                            </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                                <FormLabel>
                                Father ContactNo 1
                                </FormLabel>
                                <Input errors={errors} type="text" onChange={this.onChange} value={data.father_contact_no1} name="father_contact_no1"  placeholder="Father ContactNo 1" />
                            </Col> 
                            <Col md="4" sm="4">
                            <FormGroup>
                                <FormLabel>Father ContactNo 2</FormLabel>
                                <Input type="text" onChange={this.onChange} value={data.father_contact_no2} name="father_contact_no2"  placeholder="Father ContactNo 2" />
                            </FormGroup>
                            </Col> 
                        </Row>
                        <Row>
                            <Col md="4" sm="4">
                            <FormGroup>
                            <FormLabel>DOB</FormLabel>
                                    <Input errors={errors} type="date" onChange={this.onChange} value={data.dob} name="dob"/>
                            </FormGroup>
                            </Col> 
                            <Col md="4" sm="4">
                                <div className="form-group">
                                    <FormLabel>Gender</FormLabel>
                                   <Select name="gender" value={data.gender} onChange={this.onChange}>
                                       <SelectOption>Male</SelectOption>
                                       <SelectOption>Female</SelectOption>
                                   </Select>
                            </div>
                            </Col> 
                            <Col md="4" sm="4">
                                <div className="form-group">
                                    <FormLabel>Date of Admission</FormLabel>
                                    <Input type="date" onChange={this.onChange} value={data.doA} name="doA"/>
                                 </div>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>Address</FormLabel>
                                    <Input errors={errors} value={data.student_address} onChange={this.onChange} name="student_address" placeholder="Student Address" />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>Block</FormLabel>
                                    <Input value={data.block} onChange={this.onChange} name="block" placeholder="Block" />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>District</FormLabel>
                                    <Input value={data.district} onChange={this.onChange} name="district" placeholder="District" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>State</FormLabel>
                                    <Input value={data.state} onChange={this.onChange} name="state" placeholder="State" />
                                </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>Pincode</FormLabel>
                                    <Input value={data.pincode} onChange={this.onChange} name="pincode"  placeholder="Pincode" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>Student Photo</FormLabel>
                                    <UploadImage name="student_photo"  onChange={this.fileChange}/>
                                {this.props.register_student != null && <img src={this.props.register_student.student_photo} className="img img-thumbnail img-fluid"/>}

                                </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>Mother Photo</FormLabel>
                                    <UploadImage name="mother_photo" onChange={this.fileChange}/>
                                {this.props.register_student != null && <img src={this.props.register_student.mother_photo} className="img img-thumbnail img-fluid"/>}

                                </FormGroup>
                            </Col>
                            <Col md="4" sm="4">
                                <FormGroup>
                                    <FormLabel>Father Photo</FormLabel>
                                    <UploadImage name="father_photo" onChange={this.fileChange}/>
                                </FormGroup>
                                {this.props.register_student != null && <img src={this.props.register_student.father_photo} className="img img-thumbnail img-fluid"/>}
                            </Col>
                        </Row>
                        <Row>
                            <Button primary onClick={this.submit}>{button_text}</Button>
                            <Button warning>Reset</Button>
                        </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        classes:state.distinct_classes
    };
}

export default connect(mapStateToProps,{getClassSection})(RegisterForm);