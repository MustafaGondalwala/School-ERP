import React, { Component } from "react"
import api from "../../api"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, Button, Col, FormGroup, FormLabel, Input, Select, SelectOption } from "../../utils/Components"
import Row from "../../utils/Row"
import Swal from "sweetalert2"
class FillMarksheetMonthTest extends Component{
    constructor(props){
        super(props)
        this.state = {
            students:"",
            show_marksheet:"",
        }
        this.update_marksheet = this.update_marksheet.bind(this)
    }
    componentDidMount(){
        const {monthly_test} = this.props
        api.adminteacher.exam.monthly_test.get_students(this.props).then(data => {
            this.setState({
                students:data.studentDetails
            })
        })
    }
    showMarksheet(item){
        this.setState({
            show_marksheet:""
        },() => {
            this.setState({
                show_marksheet:item
            })
        })
    }
    update_marksheet(remark,grade,marksheet,monthtest_id,marksheet_id){
        api.adminteacher.exam.monthly_test.update_marksheet(remark,grade,marksheet,monthtest_id,marksheet_id).then(data => {
            this.setState({
                students:data.marksheet
            })
            Swal.fire("Data Uploaded",data.message,"success");
        })
    }

    unpublishMarksheet(marksheet_id){
        api.adminteacher.exam.monthly_test.unpublishMarksheet(marksheet_id).then(data =>{
            this.setState({
                students:data.studentDetails
            })
            Swal.fire("Data Uploaded","Marksheet UnPublished.","warning");
        })
    }
    publishMarksheet(marksheet_id){
        api.adminteacher.exam.monthly_test.publishMarksheet(marksheet_id).then(data =>{
            this.setState({
                students:data.studentDetails
            })
            Swal.fire("Data Uploaded","Marksheet Published.","success");
        })
    }
    render(){
        const {students,show_marksheet} = this.state
        const {monthly_test} = this.props
        return <div>
            {show_marksheet &&
               <FillMarksheet submit={this.update_marksheet} monthtest_id={monthly_test} marksheet={show_marksheet}/>
            }
            <CardComponent title="Students List">
            {
                students ? <div>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Student Roll No.</th>
                            <th>Student Name</th>
                            <th>Fill</th>
                            <th>Edit</th>
                            <th>Publish/Unpublish</th>
                        </Thead>
                        <tbody>
                            {students.map((item,id) => {
                                return <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{item.student.roll_no}</td>
                                    <td>{item.student.student_name}</td>
                                    <td>
                                    {item.status == 2 && <span>Edited</span>}
                                    {item.status == 3 && <span>Publish</span>}
                                    </td>
                                    <td>
                                    {item.status == 1 &&
                                        <Button onClick={e => this.showMarksheet(item)} sm primary>Fill</Button>
                                    }
                                    </td>
                                    <td>
                                        {item.status == 2 &&
                                            <Button onClick={e => this.publishMarksheet(item.id)} primary sm>Publish</Button>
                                        }
                                        {item.status == 3 &&
                                            <Button onClick={e => this.unpublishMarksheet(item.id)} danger sm>UnPublish</Button>
                                        }
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
                :
                <h4>Loading Students ...</h4>
            }
        </CardComponent>
        </div>
    }
}


class FillMarksheet extends Component{
    constructor(props){
        super(props)
        this.state = {
            marksheet:"",
            title:"",
            student:"",
            remark:"",
            marksheet_id:""
        }
        this.onChange  = this.onChange.bind(this)
        this.onChangeRow = this.onChangeRow.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit(){
        const {remark,grade,marksheet,marksheet_id} = this.state
        const  {monthtest_id} = this.props
        this.props.submit(remark,grade,marksheet,monthtest_id,marksheet_id)
    }

    onChange(e,index){
        const {name,value} = e.target
        const {marksheet} = this.state
        marksheet[index][name] = value
        this.setState({
            marksheet
        })
    }

    onChangeRow(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }

    componentDidMount(){
        const {marksheet} = this.props
        const {student} = marksheet
        const marksheet_id = marksheet.id
        const title = "Month Test Marksheet: "+student.roll_no
        this.setState({
            student,
            title,
            marksheet_id
        })

        api.adminteacher.exam.monthly_test.get_individual(marksheet.id).then(data => {
            const {marksheet} = data
            this.setState({
                marksheet
            })
        })
    }
    render(){
        const {marksheet,student,title} = this.state
        const {remark,grade} = this.state
        var total_marks = 0;
        var max_marks = 0;
        var min_marks = 0;
        return(
            <div>
                <CardComponent title={title}>
                    <Row>
                        <Col md={6} sm={4}>
                            <FormGroup>
                                <FormLabel>Student Name</FormLabel>
                                <Input value={student.student_name} disabled/>
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={4}>
                            <FormGroup>
                                <FormLabel>Student Roll No</FormLabel>
                                <Input value={student.roll_no} disabled />
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={4}>
                            <FormGroup>
                                <FormLabel>Father Name</FormLabel>
                                <Input value={student.father_name} disabled />
                            </FormGroup>
                        </Col>
                        <Col md={6} sm={4}>
                            <FormGroup>
                                <FormLabel>Father Contact No</FormLabel>
                                <Input value={student.father_contact_no1} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                    {marksheet ? 
                        <div className="table_responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sr no.</th>
                                    <th>Subject</th>
                                    <th>Min Marks</th>
                                    <th>Max Marks</th>
                                    <th>Total Marks</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
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
                                    <Select name="grade" onChange={this.onChangeRow} value={grade}>
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
                        </table>
                        </div>
                        : <h3>Loading Marksheet ...</h3>
                        }
                        <Row>
                            <Col md={6} sm={4}>
                                <FormGroup>
                                    <FormLabel>Remark</FormLabel>
                                    <Input type="text" name="remark" onChange={this.onChangeRow} value={remark}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <button className="btn btn-primary" onClick={this.submit}>Update</button>
                        </Row>
                </CardComponent>
            </div>
        )
    }
}

const EveryRow = ({index,row,onChange}) => {
    return(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{row.subject.subject_name}</td>
            <td><input type="number" min="0" name="min_marks" onChange={e => onChange(e,index)} value={row.min_marks || 0} className="form-control" /></td>
            <td><input type="number" min="0" name="max_marks" onChange={e => onChange(e,index)} value={row.max_marks || 0} className="form-control" /></td>
            <td><input type="number" min="0" name="total_marks" onChange={e => onChange(e,index)} value={row.total_marks || 0} className="form-control" /></td>
            <td>
                <Select name="grade" onChange={e => onChange(e,index)} value={row.grade || 0}>
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

export default FillMarksheetMonthTest
