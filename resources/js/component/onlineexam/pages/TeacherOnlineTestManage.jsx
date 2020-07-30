import React,{Component,Suspense} from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import TeacherHeader from "../header/TeacherHeader"
import BodyComponent from "../../utils/BodyComponent"
import {teacherWiseOnlineTest,teacherWiseOnlineTestDispatch} from "../../actions/onlinexam.js"

import {setQuestionPaperDispatch} from "../../actions/questionpaper"

// import {setClasswiseOnlineMonthlyTest,setClasswiseOnlineMonthlyTestDispatch} from "../../actions/classwiseExam"
import { connect } from "react-redux";
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, Button } from "../../utils/Components"
const ViewQuestions = React.lazy(() => import("../../question/form/ViewQuestions"))
class TeacherOnlineTestManage extends Component{
    constructor(props){
        super(props)
        this.state = {
            questionpaper_id:""
        }
        this.sendEventType = this.sendEventType.bind(this)
    }
    componentDidMount(){
        const {teacher_onlineexam,questionpaper} = this.props
        if(Object.keys(teacher_onlineexam).length == 0)
            this.props.teacherWiseOnlineTestDispatch()
        if(Object.keys(questionpaper).length == 0)
            this.props.setQuestionPaperDispatch()
    }
    sendEventType(type,id){
        switch(type){
            case "view_question":
                this.setState({
                    questionpaper_id:""
                },() => {
                    this.setState({
                        questionpaper_id:id
                    })
                })
            break
        }
    }
    render(){
        const {teacher_onlineexam} = this.props
        const {questionpaper_id} = this.state
        return <div>
            <TopBreadCrumb mainHeader="Online Exam" header="Test" sub_header="Manage">
                <TeacherHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Manage Online Test">
                <Table>
                    <Thead>
                            <th>Sr no.</th>
                            <th>Monthly Test</th>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Remark</th>
                            <th>View Question Paper</th>
                            <th>Edit</th>
                            <th>Delete</th>
                    </Thead>
                    <tbody>
                    {
                        Object.keys(teacher_onlineexam).length > 0 && teacher_onlineexam.map((item,id) => {
                            return <tr key={id}>
                                <td>{id+1}</td>
                                <td>{item.class.class_title}</td>
                                <td>{item.class.section}</td>
                                <td>{item.monthy_test_type.monthly_test}</td>
                                <td>{item.exam_date}</td>
                                <td>{item.start_time}</td>
                                <td>{item.end_time}</td>
                                <td>{item.remark}</td>
                                <td><Button primary sm onClick={e => this.sendEventType("view_question",item.questionpaper_id)}>View</Button></td>
                                <td><Button warning sm>Edit</Button></td>
                                <td><Button warning sm>Delete</Button></td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
                </CardComponent>
                {
                    questionpaper_id &&
                    <Suspense fallback={<h1>Loading Component</h1>}>
                        <ViewQuestions title={"View Question"} question_id={questionpaper_id}/>
                    </Suspense>
                }
            </BodyComponent>
        </div>
    }
}


function mapStateToProps(state) {
    return {
        teacher_onlineexam:state.teacher_onlineexam,
        questionpaper:state.questionpaper
    };
}

export default connect(mapStateToProps,{teacherWiseOnlineTestDispatch,setQuestionPaperDispatch})(TeacherOnlineTestManage);