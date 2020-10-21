import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import TeacherHeader from "../header/TeacherHeader"
import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import api from "../../api"
import { Table, Thead } from "../../utils/Components"
import EmptyHeader from "../../utils/EmptyHeader"

class TeacherOnlineTestPastClassView extends Component{
    constructor(props){
        super(props)
        this.state = {
            onlineTest:""
        }
    }
    componentDidMount(){
        const {class_id} = this.props.match.params
        api.online_monthlytest_classwise_past(class_id).then(data => {
            const {onlineTest} = data
            this.setState({
                onlineTest
            })
        })
    }
    render(){
        const {class_id} = this.props.match.params
        const {onlineTest} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="OnlineExam" header="View Past OnlineTest" back_link={"/teacher/online-exam/class/"+class_id} />
                <BodyComponent>
                   <CardComponent title="View Past Online Test">
                        {
                            onlineTest ?
                            <Table>
                                <Thead>
                                    <th>Sr no.</th>
                                    <th>Monthy Test</th>
                                    <th>Exam Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </Thead>
                                <tbody>
                                    {
                                        onlineTest.map((item,id) => {
                                            return <tr>
                                                <td>{id+1}</td>
                                                <td>{item.monthy_test_type.monthly_test}</td>
                                                <td>{item.exam_date}</td>
                                                <td>{item.start_time}</td>
                                                <td>{item.start_time}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                            :
                            <h3>Loading ...</h3>
                        }
                   </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

export default TeacherOnlineTestPastClassView