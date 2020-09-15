import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import {setGradeTypeDispatch} from "../../actions/grade"
import { connect } from "react-redux";
import EmptyHeader from "../../utils/EmptyHeader";
import BodyComponent from "../../utils/BodyComponent";
import { getExamTypeDispatch } from "../../actions/exam";
import {setExamResultsDispatch} from "../../actions/view_results"
import { Table,Thead,Button, getKey, getGrade } from "../../utils/Components";
import { examResult } from "../../reducers/view_results";


class StudentViewExamResult extends Component{
    constructor(props){
        super(props)
        this.state = {
            row:"",
            max_marks:""
        }
    }
    componentDidMount(){
        const {setGradeTypeDispatch,gradeType} = this.props
        const {student_id} = this.props.match.params
        if(examResult[student_id] == undefined)
            this.props.setExamResultsDispatch(student_id)

        if(Object.keys(gradeType).length == 0)
            setGradeTypeDispatch()
    }

    showResults(row){
        this.setState({
            row,
            me_marks:"",
            max_marks:""
        })
    }
    showResultsMe(me_marks,max_marks){
        this.setState({
            row:"",
            me_marks,
            max_marks
        })
    }
    render(){
        const {student_id} = this.props.match.params
        const {examResult,gradeType} = this.props
        const {row,me_marks,max_marks} = this.state
        var total_marks = 0;
        return(
            <div>
            <EmptyHeader mainHeader="View Result" header="Exam"/>
            <BodyComponent>
                <CardComponent title="Exam List">
                    {
                        examResult[student_id] != undefined ? 
                        <Table>
                            <Thead>
                                <td>Sr no.</td>
                                <td>Exam</td>
                                <th>Publish At</th>
                                <th>View Total Marks</th>
                                <th>View Result</th>
                            </Thead>
                            <tbody>
                            {
                                examResult[student_id].map((item,id) => {
                                    return <tr key={getKey()}>
                                        <td>{id+1}</td>
                                        <td>{item.exam_type}</td>
                                        <td>{item.publish_at.toString()}</td>
                                        <td><Button onClick={e => this.showResults(item)} sm primary>Other Students</Button></td>
                                        <td><Button onClick={e => this.showResultsMe(item.groups[student_id],item.max_marks)} primary sm >View</Button></td>
                                    </tr>   
                                })
                            }
                            </tbody>
                        </Table>
                        : <h3>Loading ...</h3>
                    }
                </CardComponent>
                {   row && 
                    <CardComponent title={"Results: "+row.exam_type}>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Student RollNo.</th>
                            <th>Student Name</th>
                            <th>Total Marks</th>
                        </Thead>
                        <tbody>
                        {
                            Object.keys(row.groups).map((item,id) => {
                                var total_marks = 0
                                row.groups[item].map(item =>{
                                    total_marks += item.total_marks
                                })
                                var student_name = ""
                                var roll_no = ""
                                const temp_store = row.student_marksheet.filter(value => value.student_id == item )[0]
                                if(temp_store != undefined)
                                {
                                    student_name = temp_store.student.student_name
                                    roll_no = temp_store.student.roll_no
                                }
                                return <tr key={getKey()}>
                                    <td>{id+1}</td>
                                    <td>{student_name}</td>
                                    <td>{roll_no}</td>
                                    <td>{total_marks}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                    
                    </CardComponent>
                }
                {
                    me_marks && 
                    <CardComponent title={"Result:"}>
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Subjects</th>
                                <th>Marks</th>
                                <th>Grade</th>
                            </Thead>
                            <tbody>
                            {
                                me_marks.map((item,id) => {
                                    total_marks += item.total_marks
                                return <tr key={getKey()}>
                                    <td>{id+1}</td>
                                    <td>{item.subject.subject_name}</td>
                                    <td>{item.total_marks}</td>
                                    <td>{getGrade(gradeType,item.total_marks,max_marks)}</td>
                                </tr>
                                })
                            }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>{total_marks}</td>
                                    <td>{getGrade(gradeType,total_marks,max_marks * me_marks.length)}</td>
                                </tr>
                            </tfoot>
                        </Table>
                        
                    </CardComponent>   
                }
            </BodyComponent>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        gradeType:state.gradeType,
        examResult: state.examResult,
    };
}

export default connect(mapStateToProps,{setGradeTypeDispatch,getExamTypeDispatch,setExamResultsDispatch})(StudentViewExamResult);