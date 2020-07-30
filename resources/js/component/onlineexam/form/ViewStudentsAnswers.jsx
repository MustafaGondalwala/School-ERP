import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, getKey, Button,getOnlineTestStatusText,getQuestionType, Input } from "../../utils/Components"
export class ViewStudentsAnswers extends Component{
    constructor(props){
        super(props)
        this.state = {
            onlinetest_id:"",
            studentsMarksheet:"",
            answers:"",
            copy_answers:"",
            marksheet_id:""
        }
        this.changeFinalMarks = this.changeFinalMarks.bind(this)
    }
    componentDidMount(){
        const {studentsMarksheet,onlinetest_id} = this.props
        this.setState({
            studentsMarksheet,onlinetest_id
        })
    }
    viewStudentsAnswers(answers,marksheet_id){
        this.setState({
            answers:"",
            marksheet_id
        }, () => {
            this.setState({
                answers,
                marksheet_id
            })
        })
    }
    changeFinalMarks(answer_id,e){
        const {value} = e.target
        const {answers} = this.state
        const answer_object = answers.filter(item => item.id == answer_id)[0]
        answer_object.final_marks = parseInt(value)
        this.setState({
            answers
        })
    }
    submit(){
        const {answers,marksheet_id} = this.state
        this.props.update_marksheet(answers,marksheet_id)
    }
    
    render(){
        const {monthlytest_title,questionpaper} = this.props
        const {studentsMarksheet,answers} = this.state
        var total_marks = 0;
        return(
            <div>
                <CardComponent title={'Students Marksheet: '+monthlytest_title}>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Student Roll No</th>
                            <th>Student Name</th>
                            <th>Question Attend</th>
                            <th>View Question/Answers</th>
                            <th>Status</th>
                        </Thead>
                        <tbody>
                        {
                            studentsMarksheet.length > 0 && studentsMarksheet.map((item,id) => {
                                return <tr key={getKey()}>
                                    <td>{id+1}</td>
                                    <td>
                                        {item.student.roll_no}
                                    </td>
                                    <td>
                                        {item.student.student_name}
                                    </td>
                                    <td>
                                        {item.answers.length}
                                    </td>
                                    <td>
                                        <Button primary sm onClick={e => this.viewStudentsAnswers(item.answers,item.id)}>View Answers</Button>
                                    </td>
                                    <td>
                                        {getOnlineTestStatusText(item.status)}
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </CardComponent>
                {answers && 
                    <CardComponent title={'Online Test Marksheet: '}>
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Question Type</th>
                                <th>Question</th>
                                <th>Student Answer</th>
                                <th>Student Marks</th>
                                <th>Max Marks</th>
                                <th>Final Marks</th>
                            </Thead>
                            <tbody>
                            {
                                questionpaper && questionpaper.question.map((item,id) => {
                                    var student_correct_answers =  answers.filter(answer_item => answer_item.question_id == item.id)[0]
                                    return <tr key={getKey()}>
                                        <td>{id+1}</td>
                                        <td>{getQuestionType(item.question_type)}</td>
                                        <td>
                                                {
                                                    item.question_type == 1 && 
                                                    ShowQuestionType1(item)
                                                }
                                                {
                                                    item.question_type == 2 && 
                                                    ShowQuestionType2(item)
                                                }
                                                {
                                                    item.question_type == 3 && 
                                                    ShowQuestionType3(item)
                                                }
                                                {
                                                    (item.question_type == 4 || item.question_type == 5 ) &&
                                                    ShowQuestionType4or5(item)
                                                }
                                        </td>
                                        <th>
                                            {student_correct_answers.correct}
                                        </th>
                                        <td>
                                            {(item.question_type == 4 || item.question_type == 5) && <p>Teacher Prevention Required!</p> }
                                            {(item.question_type != 4 && item.question_type != 5) &&
                                                <span>
                                                    {item.correct == student_correct_answers.correct ? <span>{item.marks}</span> : <span>0</span>}
                                                </span>
                                            }
                                        </td>
                                        <th>
                                            {item.marks}
                                        </th>
                                        <td>
                                        {(item.question_type == 4 || item.question_type == 5) && <p><Input type="number" value={student_correct_answers.final_marks} max={item.marks} onChange={e => this.changeFinalMarks(student_correct_answers.id,e)}/></p> }
                                        {(item.question_type != 4 && item.question_type != 5) &&
                                            <span>
                                                {item.correct == student_correct_answers.correct ? <p><Input type="number" defaultValue={item.marks} max={item.marks} onChange={e => this.changeFinalMarks(student_correct_answers.id,e)}  value={student_correct_answers.final_marks}/></p> : <p><Input type="number" value={student_correct_answers.final_marks} defaultValue="0" max={item.marks} onChange={e => this.changeFinalMarks(student_correct_answers.id,e)}/></p>}
                                            </span>
                                        }
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><Button onClick={e => this.submit()} warning sm>Update Marksheet</Button></td>
                                </tr>
                            </tfoot>
                        </Table>
                    </CardComponent>
                }
            </div>
        )
    }
}

const ShowQuestionType4or5 = (item) => {
    return(
        <div>
            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
        </div>
    )
}
const ShowQuestionType3 = (item) => {
    return(
        <div>
            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
            <Table>
                <tbody>
                <tr>
                    <th>
                        Correct:
                    </th>
                    <th>
                        <div dangerouslySetInnerHTML={{ __html: item.correct }} />
                    </th>
                </tr>
                </tbody>
            </Table>
        </div>
    )    
}

const ShowQuestionType2 = (item) => {
    return(
        <div>
            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
            <Table>
                <tbody>
                <tr>
                    <th>
                        Correct:
                    </th>
                    <th>
                        {item.correct == 1 ? <b>True</b> : <b>False</b>}
                    </th>
                </tr>
                </tbody>
            </Table>
        </div>
    )    
}
const ShowQuestionType1 = (item) => {
    return(
        <div>
                            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td><b>1.</b> {item.option_1}</td>
                                        <td><b>2.</b> {item.option_2}</td>
                                    </tr>
                                    <tr>
                                        <td><b>3.</b> {item.option_1}</td>
                                        <td><b>4.</b> {item.option_2}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Correct:
                                        </th>
                                        <th>
                                            {item.correct}
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
        </div>
    )
}

export default ViewStudentsAnswers