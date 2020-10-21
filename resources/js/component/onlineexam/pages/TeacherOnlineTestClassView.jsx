import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import TeacherHeader from "../header/TeacherHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import EmptyHeader from "../../utils/EmptyHeader"
import api from "../../api"
import { Table, Thead } from "../../utils/Components"

class TeacherOnlineTestClassView extends Component{
    constructor(props){
        super(props)
        this.state = {
            onlineExam:""
        }
    }
    componentDidMount(){
        const {class_id} = this.props.match.params
        api.online_monthlytest_classwise(class_id).then(data => {
            const {onlineExam} = data
            this.setState({
                onlineExam
            })
        })
    }
    render(){
        const {onlineExam} = this.state
        const {class_id} = this.props.match.params
        return(
            <div>
                <EmptyHeader mainHeader="OnlineExam" header="View Current OnlineTest" />
                <BodyComponent>
                    <CardComponent title="View Current Online Test" back_link={"/teacher/online-exam/class/"+class_id}>
                    { onlineExam ? <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Monthy Test</th>
                            <th>Exam Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </Thead>
                        <tbody>
                            {
                                onlineExam.map((item,id) => {
                                    console.log(item)
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
export default TeacherOnlineTestClassView