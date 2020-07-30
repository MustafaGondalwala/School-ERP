import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { Col, Button, Table, Thead, FormGroup, FormLabel, Input, RedLabel } from "../../utils/Components"
import GetClassId from "../../utils/GetClassId"
import api from "../../api"
import YearSelectComponent from "../../utils/YearSelectComponent"

class PromoteStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_id:"",
            students:"",
            individual_student:""
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.promoteShow = this.promoteShow.bind(this)
        this.sendYearID = this.sendYearID.bind(this)
        this.sendClassIdPromote = this.sendClassIdPromote.bind(this)
    }
    componentDidMount(){
        this.sendClassId(1)
    }
    promoteShow(row){
        this.setState({
            individual_student:row
        })
    }
    sendYearID(year_id){
        this.setState({
            individual_student: {...this.state.individual_student,["year_id"]: year_id}
        })
    }
    sendClassIdPromote(class_id){
        this.setState({
            individual_student: {...this.state.individual_student,["class_id"]: class_id}
        },() => {
            console.log(class_id)
        })
    }
    sendClassId(class_id){
        this.setState({
            class_id
        })
        api.adminclerk.student.listByClassId(class_id).then(data => {
            const {students} = data
            this.setState({
                students
            })
        })
    }
    render(){
        const {class_id,students,individual_student} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Promote Student">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Student Promote" back_link="/admin/student">
                        <Row>
                            <Col md="6" sm="6">
                                <GetClassId class_id={class_id} sendClassId={this.sendClassIdPromote} errors="" />
                            </Col>
                        </Row>
                    </CardComponent>
                    {individual_student && 
                        <CardComponent title={'Student Roll No: '+individual_student.roll_no}>
                            <Row>
                                <Col md={4} sm={4} lg={4}>
                                    <FormGroup>
                                        <FormLabel>Student Name: </FormLabel>
                                        <Input value={individual_student.student_name} disabled={true}/>
                                    </FormGroup>
                                </Col>
                                <Col md={4} sm={4} lg={4}>

                                    <FormGroup>
                                        <FormLabel>Father Name: </FormLabel>
                                        <Input value={individual_student.father_name} disabled={true}/>
                                    </FormGroup>
                                </Col>
                                <Col md={4} sm={4} lg={4}>
                                    <FormGroup>
                                        <FormLabel>Current Class/Section: </FormLabel>
                                        <Input value={`${individual_student.class.class_title}${'-' + individual_student.class.section || ''}` } disabled={true}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <RedLabel>Promote Details</RedLabel>
                            <GetClassId sendClassId={this.sendClassIdPromote} class_id={individual_student.class_id} md={6} sm={6} lg={6} />
                            <br />
                            <Row>
                                <Col md={6} sm={6} lg={6} >
                                    <FormGroup>
                                        <FormLabel>Select Next Year</FormLabel>
                                        <YearSelectComponent sendYearID={this.sendYearID}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} sm={6} lg={6} >
                                    <FormGroup>
                                        <Button primary sm>Promote Student</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardComponent>
                    }
                    <CardComponent title="Student List">
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                <th>Father Name</th>
                                <th>Father Contact No</th>
                                <th>Promote</th>
                            </Thead>
                            <tbody>
                                {students && students.map((item,id) => {
                                    return <tr>
                                        <td>{id+1}</td>
                                        <td>{item.roll_no}</td>
                                        <td>{item.student_name}</td>
                                        <td>{item.father_name}</td>
                                        <td>{item.father_contact_no1}</td>
                                        <td><Button onClick={e => this.promoteShow(item)} primary sm>Promote</Button></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }

}

export default PromoteStudent