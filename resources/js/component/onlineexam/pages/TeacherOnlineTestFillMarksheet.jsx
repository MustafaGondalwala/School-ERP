import React, { Component, Suspense } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import { connect } from "react-redux";
import {onlinetestWithStudentAnswersDispatch,setOnlineTestWithStudentAnswers} from "../../actions/onlinexam"
import { Table, Thead, Button, getKey } from "../../utils/Components"
const ViewStudentsAnswers = React.lazy(() => import("../form/ViewStudentsAnswers"))
import Swal from "sweetalert2"

class TeacherOnlineTestFillMarksheet extends Component{
    constructor(props){
        super(props)
        this.state = {
            view_students:""
        }
        this.update_marksheet = this.update_marksheet.bind(this)
    }
    componentDidMount(){
        const {monthlytest_withstudentanswers} = this.props
        if(Object.keys(monthlytest_withstudentanswers).length == 0)
            this.props.onlinetestWithStudentAnswersDispatch()
    }
    update_marksheet(answers,marksheet_id){
        api.adminteacher.onlineexam.monthly_test.update_marksheet(answers,marksheet_id).then(data => {
            const {message,monthlytest_withstudentanswers} = data
            this.props.setOnlineTestWithStudentAnswers(monthlytest_withstudentanswers)
            Swal.fire("Success",message,"success");
            this.setState({
                view_students:""
            })
        })
    }
    sendEvent(type,item){
        switch(type){
            case "view_students":
                this.setState({
                    view_students:""
                },() => {
                    this.setState({
                        view_students:item
                    })
                })
                break
        }
    }
    render(){
        const {monthlytest_withstudentanswers} = this.props
        const {view_students} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="Online Exam" header="Test" sub_header="Fill Marksheet" />
                <BodyComponent>
                    <CardComponent title="Online Test">
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Monthy Test</th>
                                <th>View QuestionPaper</th>
                                <th>Total Attended Students</th>
                                <th>View Student Answers</th>
                            </Thead>
                            <tbody>
                                {
                                    Object.keys(monthlytest_withstudentanswers).length > 0 && monthlytest_withstudentanswers.map((item,id) => {
                                        return <tr key={getKey()}>
                                            <td>{id+1}</td>
                                            <td>{item.monthy_test_type.monthly_test}</td>
                                            <td><Button primary sm>View</Button></td>
                                            <td>{item.with_student_answers.length}</td>
                                            <td><Button primary sm onClick={e => this.sendEvent("view_students",item)}>View Answers</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </CardComponent>
                    {
                        view_students && <Suspense fallback={<h1>Loading Component ...</h1>}>
                        <ViewStudentsAnswers update_marksheet={this.update_marksheet}  questionpaper={view_students.questionpaper} monthlytest_title={view_students.monthy_test_type.monthly_test} onlinetest_id={view_students.id} studentsMarksheet={view_students.with_student_answers}/>
                        </Suspense>
                    }
                </BodyComponent>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        monthlytest_withstudentanswers:state.monthlytest_withstudentanswers
    };
}

export default connect(mapStateToProps,{onlinetestWithStudentAnswersDispatch,setOnlineTestWithStudentAnswers})(TeacherOnlineTestFillMarksheet);