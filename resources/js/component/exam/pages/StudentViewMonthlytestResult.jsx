import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"

import {setMonthlyTestResultsDispatch,setMonthlyTestResults} from "../../actions/view_results"
import { connect } from "react-redux";
import { Table, Thead, Button, Col, FormGroup, FormLabel, Input, Select, SelectOption } from "../../utils/Components"
import api from "../../api"

class StudentViewMonthlytestResult extends Component{
    constructor(props){
        super(props)
        this.state = {
            marksheet:"",
            remark:"",
            grade:"",
            row:""
        }
        this.showMarksheet = this.showMarksheet.bind(this)
    }
    componentDidMount(){
        const {setMonthlyTestResultsDispatch,monthlyTestResult} = this.props
        const {student_id} = this.props.match.params
        if(monthlyTestResult[student_id] == undefined)
            setMonthlyTestResultsDispatch(student_id)
    }
    showMarksheet(row){
        const {remark,grade} = row
        this.setState({
            remark,
            grade
        })
        api.adminteacher.exam.monthly_test.get_individual(row.id).then(data => {
            const {marksheet} = data
            this.setState({
                marksheet,
                row
            })
        })
    }
    render(){
        const {student_id} = this.props.match.params
        const {remark,row,grade,marksheet} = this.state
        const {monthlyTestResult} = this.props
        var total_marks = 0;
        var max_marks = 0;
        var min_marks = 0;
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="View Results" sub_header="Monthly Test"/>
                <BodyComponent>
                    <CardComponent title="Results List">
                        <Table>
                            <Thead>
                                <th>Sr no</th>
                                <th>Name</th>
                                <th>Publish At</th>
                                <th>View</th>
                            </Thead>
                            <tbody>
                                {monthlyTestResult[student_id] !== undefined && monthlyTestResult[student_id].map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.monthly_test.monthly_test}</td>
                                        <td>{new Date(item.publish_at).toTimeString()}</td>
                                        <td><Button sm primary onClick={e => this.showMarksheet(item)}>View</Button></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardComponent>
                    {marksheet &&
                    <CardComponent title={"Result: "+row.monthly_test.monthly_test || ''}>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Subject</th>
                            <th>Min Marks</th>
                            <th>Max Marks</th>
                            <th>Total Marks</th>
                            <th>Grade</th>
                        </Thead>
                        <tbody>
                        {marksheet.map((item,id) => {
                            total_marks += parseInt(item.total_marks)
                            min_marks += parseInt(item.min_marks)
                            max_marks += parseInt(item.max_marks)
                            return <EveryRow key={id} onChange={this.onChange} index={id} row={item} />
                        })}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
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
                            </td>
                        </tr>
</tfoot>
                    </Table>
                
                <Row>
                    <Col md={6} sm={4}>
                        <FormGroup>
                            <FormLabel>Remark</FormLabel>
                            <p>{remark}</p>
                        </FormGroup>
                    </Col>
                </Row>
                </CardComponent>
               
                }

                </BodyComponent>
            </div>
        )
    }
}

const EveryRow = ({index,row,onChange}) => {
    return(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{row.subject.subject_name}</td>
            <th>{row.min_marks || 0}</th>
            <th>{row.max_marks || 0}</th>
            <th>{row.total_marks || 0}</th>
            <td>
                <Select disabled={true} name="grade" onChange={e => onChange(e,index)} value={row.grade || 0}>
                    <SelectOption value=""> -- Select -- </SelectOption>
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
            </td>
        </tr>
    )
}


function mapStateToProps(state) {
    return {
        monthlyTestResult:state.monthlyTestResult
    };
}

export default connect(mapStateToProps,{setMonthlyTestResultsDispatch,setMonthlyTestResults})(StudentViewMonthlytestResult);