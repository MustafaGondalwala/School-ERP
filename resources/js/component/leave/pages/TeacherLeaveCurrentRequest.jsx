import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import { Table, Thead, getKey, getLeaveStatus, Button, FormGroup, FormLabel, PreviewAttachmentFile } from "../../utils/Components"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import Swal from "sweetalert2"

class TeacherLeaveCurrentRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            studentleaves:"",
            viewStudent:""
        }
    }
    componentDidMount(){
        const {class_id} = this.props.match.params
        api.adminteacher.leave.viewCurrent(class_id).then(data => {
            const {studentleaves} = data
            this.setState({
                studentleaves
            })
        })
    }
    changeStatus(leave_id,status,showData){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, "+showData+" it!"
          }).then((result) => {
            if (result.value) {
             api.adminteacher.leave.changeStatus(leave_id,status).then(data => {
                const {studentleaves,status} = data
                this.setState({
                    studentleaves,
                    viewStudent:""
                })
                Swal.fire("Success","Data Updated!!","success")
             })
            }
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
                <EmptyHeader mainHeader="Leave" header="View Current Request"/>
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
                                    <Button success onClick={e => this.changeStatus(viewStudent.id,2,"Accept")}>Accept</Button>
                                    <Button warning onClick={e => this.changeStatus(viewStudent.id,3,"Reject")}>Reject</Button>
                                </Col>
                            </Row>
                        </CardComponent>
                    }
                </BodyComponent>
            </div>
        )
    }
}

export default TeacherLeaveCurrentRequest