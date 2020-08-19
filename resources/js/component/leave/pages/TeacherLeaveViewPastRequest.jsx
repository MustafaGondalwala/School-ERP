import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"

import { Table, Thead, getKey, getLeaveStatus, Button, FormGroup, FormLabel, PreviewAttachmentFile, getOnlineTestStatusText } from "../../utils/Components"
import Row from "../../utils/Row"
import Col from "../../utils/Col"

class TeacherLeaveViewPastRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            studentleaves:"",
            viewStudent:""
        }
    }
    componentDidMount(){
        const {class_id} = this.props.match.params
        api.adminteacher.leave.viewAll(class_id).then(data => {
            const {studentleaves} = data
            this.setState({
                studentleaves
            })
        })
    }
    view(item){
        this.setState({
            viewStudent:item
        })
    }
    render(){
        const {studentleaves,viewStudent} = this.state
        const {class_id} = this.props.match.params
        return(
            <div>
            <EmptyHeader mainHeader="Leave" header="View Past Leave"/>
            <BodyComponent>
            <CardComponent title="View Current Request" back_link={"/teacher/leave/"+class_id}>
                    {studentleaves ? 
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Roll No.</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Applied At.</th>
                                <th>Status</th>
                                <th>View</th>
                            </Thead>
                            <tbody>
                                {
                                    studentleaves.map((item,id) => {
                                        return <tr key={getKey()}>
                                        <td>{id+1}</td>
                                        <td>{item.student.roll_no}</td>
                                        <td>{item.student.student_name}</td>
                                        <td>{item.date}</td>
                                        <td>{item.applied_date}</td>
                                        <td>{getLeaveStatus(item.status)}</td>
                                        <td><Button primary sm onClick={e => this.view(item)}>View</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                        :
                        <h3>Loading ...</h3>
                    }
                    </CardComponent>
                    {
                        viewStudent && 
                        <CardComponent title={"View Student:"+viewStudent.student.roll_no}>
                        <Row>
                                <Col md={6} lg={6}>
                                    <FormGroup>
                                        <FormLabel>Date: </FormLabel>
                                        {viewStudent.date}
                                    </FormGroup>
                                </Col>
                                <Col md={6} lg={6}>
                                    <FormGroup>
                                        <FormLabel>Reason: </FormLabel>
                                {viewStudent.reason}
                                    </FormGroup>
                                </Col>
                                {viewStudent.attachment &&
                                    <Col md={6} lg={6}>
                                        <FormGroup>
                                            <FormLabel>Attachment: </FormLabel>
                                            <a download href={viewStudent.attachment}>Download</a>
                                        </FormGroup>
                                    </Col>
                                }
                                <Col md={6} lg={6}>
                                        <FormGroup>
                                            <FormLabel>Status: </FormLabel>
                                            {getLeaveStatus(viewStudent.status)}
                                        </FormGroup>
                                </Col>
                            </Row>
                        </CardComponent>
                    }
            </BodyComponent>
            </div>
        )
    }
}

export default TeacherLeaveViewPastRequest