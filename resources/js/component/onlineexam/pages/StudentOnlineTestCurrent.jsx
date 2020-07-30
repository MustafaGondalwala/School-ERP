import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import { Table, Thead,checkExamDateTime,convert24hrto12hr, Button } from "../../utils/Components"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import { connect } from "react-redux";
import Swal from "sweetalert2"
import { Redirect } from "react-router-dom";

class StudentOnlineTestCurrent extends Component{
    constructor(props){
        super(props)
        this.state = {
            onlinexam:"",
            monthy_test:"",
            redirect:false
        }
        this.attendOnline = this.attendOnline.bind(this)
    }
    componentDidMount(){
        const {user} = this.props
        const student_id = user.info.id
        api.parentstudent.exam.monthtest.current(student_id).then(data => {
            const { monthy_test } = data
            this.setState({
                monthy_test
            })
        })
    }
    attendOnline(test_id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Attend Test!'
          }).then((result) => {
            if (result.value) {
                this.setState({
                    redirect:test_id
                })
            }
          })
    }
    render(){
        const {monthy_test,redirect} = this.state
        if (redirect) {
            return <Redirect to={"/student/attendtest/"+redirect} />
        }
        return(
            <div>
                <EmptyHeader mainHeader="Online Test" header="View Current"/>
                <BodyComponent>
                    <CardComponent title="Online Test">
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Month Test</th>
                                <th>Teacher Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Remark</th>
                                <th>Attend Exam</th>
                            </Thead>
                            <tbody>
                                {
                                    monthy_test && monthy_test.map((item,id) => {
                                        return <tr key={id}>
                                            <td>{id+1}</td>
                                            <td>{item.monthy_test_type.monthly_test}</td>
                                            <td>{item.teacher.teacher_name}</td>
                                            <td>{item.exam_date}</td>
                                            <td>{convert24hrto12hr(item.start_time)}</td>
                                            <td>{convert24hrto12hr(item.end_time)}</td>
                                            <td>{item.remark}</td>
                                            <td>
                                            {/* {checkExamDateTime(item.exam_date,item.start_time,item.end_time) &&  */}
                                            <Button onClick={e => this.attendOnline(item.id)} sm success>Attend</Button>
                                            {/* } */}
                                            </td>
                                        </tr>
                                    })

                                }
                            </tbody>
                        </Table>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user:state.user
    };
}

export default connect(mapStateToProps)(StudentOnlineTestCurrent);