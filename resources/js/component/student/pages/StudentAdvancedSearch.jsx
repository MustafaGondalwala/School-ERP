import React, { Component } from "react"
import { render } from "react-dom"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Col from "../../utils/Col"
import Row from "../../utils/Row"
import SelectStudent from "../../utils/SelectStudent"
import { FormGroup, FormLabel, Table ,Thead, Input, SelectOption,Select, Button, ButtonGroup} from "../../utils/Components"
import GetClassId from "../../utils/GetClassId"
import api from "../../api"

import AdmissionList from "../panel/AdmissionList"


class RegisterListPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : {
                student_name:"",
                father_name: "",
                mother_name: "",
                class_id: "",
                father_contact_no:"",
                age: "",
                gender:"",
                religion:"",
                caste:"",
                student_roll_no:""
            },
            button_text:"Fetch",
            students:""
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)

    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    sendClassId(class_id){
        this.setState({
            data: {...this.state.data,["class_id"]: class_id}
        })
    }
    submit(){
        const {data} = this.state
        this.setState({
            button_text:"Fetching ..."
        })
        api.adminclerk.student.advanced_search(data).then(data => {
            const {students} = data
            this.setState({
                students,
                button_text:"Fetch"
            })
        })
    }
    render(){
        const {data,button_text,students} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Register" sub_header="Register List">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Student Advanced Search" back_link="/admin/student">
                        <Row>
                        
                            <Col md="4" lg="3">
                                <FormGroup>
                                    <FormLabel>Student RollNo</FormLabel>
                                    <Input onChange={this.onChange} name="student_roll_no" value={data.student_roll_no} placeholder="Student Name"/>
                                </FormGroup>
                            </Col>
                            <Col md="4" lg="3">
                                <FormGroup>
                                    <FormLabel>Student Name</FormLabel>
                                    <Input onChange={this.onChange} name="student_name" value={data.student_name} placeholder="Student Name"/>
                                </FormGroup>
                            </Col>
                            <Col md="4" lg="3">
                                <FormGroup>
                                    <FormLabel>Father Name</FormLabel>
                                    <Input onChange={this.onChange} name="father_name"  value={data.father_name} placeholder="Father Name"/>
                                </FormGroup>
                            </Col>
                            <Col md="4" lg="3">
                                <FormGroup>
                                    <FormLabel>Mother Name</FormLabel>
                                    <Input onChange={this.onChange} name="mother_name"  value={data.mother_name} placeholder="Mother Name"/>
                                </FormGroup>
                            </Col>
                            <Col md="4" lg="3">
                                <FormGroup>
                                    <FormLabel>Father Contact No</FormLabel>
                                    <Input onChange={this.onChange} name="father_contact_no"  value={data.father_contact_no} placeholder="Father Contact No" type="number"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <GetClassId class_id={data.class_id} sendClassId={this.sendClassId} errors=""/>
                        <br />
                        <Row>
                            <Col md="4" lg="2">
                                <FormGroup>
                                    <FormLabel>Age</FormLabel>
                                    <Select onChange={this.onChange} name="age"  value={data.age}>
                                        <SelectOption value="">-- Select --</SelectOption>
                                        <SelectOption value="1">1-5</SelectOption>
                                        <SelectOption value="2">5-10</SelectOption>
                                        <SelectOption value="3">10-15</SelectOption>
                                        <SelectOption value="4">15-20</SelectOption>
                                        <SelectOption value="5">20-25</SelectOption>
                                        <SelectOption value="6">25-30</SelectOption>
                                    </Select>
                                </FormGroup>
                            </Col>  
                            <Col md="4" lg="2">
                                <FormGroup>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onChange={this.onChange} name="gender"  value={data.gender}>
                                        <SelectOption value="">-- Select --</SelectOption>
                                        <SelectOption value="1">Male</SelectOption>
                                        <SelectOption value="2">Female</SelectOption>
                                        <SelectOption value="3">Other</SelectOption>

                                    </Select>
                                </FormGroup>
                            </Col>  
                        </Row>
                        <Row>
                        <Col md="4" sm="6">
                            <FormGroup>
                            <FormLabel>Religion*:</FormLabel>
                            <Select
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
                            <Select value={data.caste} name="caste" onChange={this.onChange}>
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
                        <Col md="4" lg="2">
                                <FormGroup>
                                    <Button primary onClick={this.submit}>{button_text}</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardComponent>
                        {students && <AdmissionList students={students}/>}
                </BodyComponent>
            </div>
        )
    }
}

const ViewRegisterTable = () => (
    <CardComponent title="List" print download>
        <Table>
            <Thead>
                <th>Sr no.</th>
                <th>Roll no.</th>
                <th>Student Name</th>
                <th>Father Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>View Details</th>
                <th>OneClick</th>
            </Thead>
            <tbody>
                <tr>
                </tr>
            </tbody>
        </Table>
        </CardComponent>
    )

export default RegisterListPage