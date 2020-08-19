import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import {setGradeTypeDispatch} from "../../actions/grade"
import {setMonthlyTestResultsDispatch,setMonthlyTestResults} from "../../actions/view_results"
import { connect } from "react-redux";
import { Table, Thead, Button, Col, FormGroup, FormLabel, Input, Select, SelectOption, getKey, getGrade } from "../../utils/Components"
import api from "../../api"

class StudentViewMonthlytestResult extends Component{
    constructor(props){
        super(props)
        this.state = {
            row:""
        }
        this.showMarksheet = this.showMarksheet.bind(this)
    }
    componentDidMount(){
        const {setMonthlyTestResultsDispatch,monthlyTestResult,setGradeTypeDispatch,gradeType} = this.props
        const {student_id} = this.props.match.params
        if(monthlyTestResult[student_id] == undefined)
            setMonthlyTestResultsDispatch(student_id)
        if(Object.keys(gradeType).length == 0){
            setGradeTypeDispatch()
        }
    }
    showMarksheet(row){
        this.setState({
            row:"",
        },() => {
            this.setState({
                row
            })
        })
    }
    render(){
        const {student_id} = this.props.match.params
        const {row} = this.state
        const {monthlyTestResult,gradeType} = this.props
        var total_marks = 0;
        var max_marks = 0;
        var min_marks = 0;
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="View Results" sub_header="Monthly Test"/>
                <BodyComponent>
                    <CardComponent title="Results List">
                    {
                        monthlyTestResult[student_id] !== undefined ?
                        <Table>
                            <Thead>
                                <th>Sr no</th>
                                <th>Montly Test</th>
                                <th>Publish At</th>
                                <th>View</th>
                            </Thead>
                            <tbody>
                                {monthlyTestResult[student_id] !== undefined && monthlyTestResult[student_id].map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.monthly_test}</td>
                                        <td>{new Date(item.publish_at).toTimeString()}</td>
                                        <td><Button sm primary onClick={e => this.showMarksheet(item)}>View</Button></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        : <h3>Loading ...</h3>
                    }
                    </CardComponent>
                    {row &&
                    <CardComponent title={"Result: "+row.monthly_test || ''}>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Student Name</th>
                            <th>Student Roll No</th>
                            <th>Marks</th>
                            <th>Grade</th>
                        </Thead>
                        <tbody>
                            {
                                row.student_marks.map((item,id) => {
                                    var showBackground = ''
                                    if(student_id == item.student.id)
                                        showBackground = 'lightblue'
                                    return <tr style={{backgroundColor:showBackground }}  key={getKey()} >
                                        <td>{id+1}</td>
                                        <td>{item.student.student_name}</td>
                                        <td >{item.student.roll_no}</td>
                                        <td>{item.total_marks}</td>
                                        <td>{getGrade(gradeType,item.total_marks,row.max_marks)}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            {/* <td>
                                <Input value={min_marks} disabled/>
                            </td>
                            <td>
                                <Input value={max_marks} disabled/>
                            </td>
                            <td>
                                <Input value={total_marks} disabled/>
                            </td>
                            <td>
                            <Select disabled={true} name="grade" onChange={this.onChangeRow} value={grade}>
                                <SelectOption value={""}> -- Select -- </SelectOption>
                                <SelectOption value={1}>A</SelectOption>
                                <SelectOption value={2}>A-</SelectOption>
                                <SelectOption value={3}>A+</SelectOption>
                                <SelectOption value={4}>B</SelectOption>
                                <SelectOption value={5}>B-</SelectOption>
                                <SelectOption value={6}>B+</SelectOption>
                                <SelectOption value={7}>C</SelectOption>
                                <SelectOption value={8}>D</SelectOption>
                                <SelectOption value={9}>E</SelectOption>
                                <SelectOption value={10}>F</SelectOption>
                            </Select>
                            </td> */}
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
        monthlyTestResult:state.monthlyTestResult
    };
}

export default connect(mapStateToProps,{setMonthlyTestResultsDispatch,setMonthlyTestResults,setGradeTypeDispatch})(StudentViewMonthlytestResult);