import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { Table, Thead, Button,homeWorkStatus } from "../../utils/Components"
import { Col, FormGroup, FormLabel, PreviewAttachmentFile,Input } from "../../utils/Components"
import CkEditor from "../../utils/CkEditor"
import Swal from "sweetalert2"
import api from "../../api"
import {ReactChartCard as Chart} from "../../utils/Chart"
import { connect } from "react-redux";
import {setTeacherwiseHomeWorkDispatch,setTeacherHomeWork} from "../../actions/homework"

class StudentHomeWorkView extends Component{
    constructor(props){
        super(props)

        this.state = {
            homework:"",
            pending:0,
            completed:0,
            submitted:0,
            rejected:0,
            closed:0
        }
    }
    showHomeWork(homework){
        this.setState({
            homework
        })
    }
    homeWorkCheck(type,homework_id,view_type){
        Swal.fire({
            title: 'Are you sure?',
            text: "You will able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, '+view_type+' it!'
          }).then((result) => {
            if (result.value) {
                this.props.setTeacherHomeWork({})
                api.adminteacher.homework.homework_check(type,homework_id).then(data => {
                    Swal.fire("Success","Student Data Updated !!","success")
                    this.props.setTeacherwiseHomeWorkDispatch();
                })
            }
          })
    }
    
    render(){
        const {check_id,view_type,teacherwise_homework} = this.props
        const {homework} = this.state
        var studenthomework = [];
        var pending = 0,completed = 0,submitted = 0,rejected = 0,closed = 0;
        if(Object.keys(teacherwise_homework).length != 0){
            studenthomework = teacherwise_homework.filter(item => item.id == check_id)[0].studenthomework
            studenthomework.map(item => {
                switch(item.status){
                    case 1:
                        pending++;
                    break;
                    case 2:
                        completed++;
                        break;
                    case 4:
                        submitted++;
                        break;
                    case 5:
                        rejected++;
                        break;
                    case 6:
                        closed++
                    break;
                }
            })
        
        
        
        }
        if(this.props.data !=null){
            studenthomework = this.props.data.studenthomework
            studenthomework.map(item => {
                switch(item.status){
                    case 1:
                        pending++;
                    break;
                    case 2:
                        completed++;
                        break;
                    case 4:
                        submitted++;
                        break;
                    case 5:
                        rejected++;
                        break;
                    case 6:
                        closed++
                    break;
                }
            })
        }
        var i = 0;
        const dataPoints = [{'y':pending,"label":"Pending"},{'y':completed,"label":"Completed"},{'y':submitted,"label":"Submitted"},{'y':rejected,'label':"Rejected"},{'y':closed,'label':"Closed"}];
        return(
            <div>
            <CardComponent title="Student's HomeWork">
                <Table>
                    <Thead>
                        <th>Sr no.</th>
                        <th>Student RollNo</th>
                        <th>Student Name</th>
                        <th>Submit At</th>
                        <th>Status</th>
                        <th>View HomeWork</th>
                    </Thead>
                    <tbody>
                        {studenthomework && studenthomework.map(item => {
                            i++;
                                return <tr>
                                    <td>{i}</td>
                                    <td>{item.student.roll_no}</td>
                                    <td>{item.student.student_name}</td>
                                    <td>
                                    {item.status != 1 &&
                                        <p>{new Date(item.updated_at).toString()}</p>
                                    }
                                    </td>
                                    <td>
                                        {homeWorkStatus(item.status)}
                                    </td>
                                    <td>
                                    {(item.status != 1 && item.status != 5) &&
                                        <Button onClick={e => this.showHomeWork(item)} primary sm>View</Button>
                                    }
                                    </td>
                                </tr>
                        })}
                    </tbody>
                </Table>
                <Chart file_name="HomeWorkReport" title="HomeWork Report" dataPoints={dataPoints}/>
            </CardComponent>
            {homework && 
                <CardComponent title={"Student HomeWork: "+homework.student.roll_no}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <CkEditor value={homework.description} disabled="true"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>Upload Documents</FormLabel>
                                <PreviewAttachmentFile attachments={homework.attachments}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    {view_type != "1" &&
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Button success onClick={e => this.homeWorkCheck(2,homework.id,"Accept ")}> Accept </Button>
                                    <Button danger onClick={e => this.homeWorkCheck(5,homework.id,"Reject ")}> Reject </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    }
                </CardComponent>
            }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        teacherwise_homework:state.teacherwise_homework
    };
}


export default connect(mapStateToProps,{setTeacherwiseHomeWorkDispatch,setTeacherHomeWork})(StudentHomeWorkView);