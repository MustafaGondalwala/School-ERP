import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, Button, Col, FormGroup, FormLabel, Input, Select, SelectOption } from "../../utils/Components"
import api from "../../api"
import Row from "../../utils/Row"
import Swal from "sweetalert2"
 class ViewStudentDetailsMonthlyTest extends Component{
    constructor(props){
        super(props)
        this.state = {
            marksheet:"",
            row:"",
            marksheet_id:"",
            studentDetails:""
        }
        this.updateMarksheet = this.updateMarksheet.bind(this)
        this.updateStudentMarksheet = this.updateStudentMarksheet.bind(this)
    }
    componentDidMount(){
        const {studentDetails} = this.props
        this.setState({
            studentDetails
        })
    }
    updateMarksheet(studentDetails){
        this.setState({
            studentDetails
        })
    }
    submit(row,marksheet_id){
        this.setState({
            row:"",
            marksheet_id:""
        },() => {
            this.setState({
                row,
                marksheet_id
            })
        })
    }

    updateStudentMarksheet(remark,grade,marksheet,marksheet_id,monthly_test,student_id){
        api.adminteacher.exam.monthly_test.update_marksheet(remark,grade,marksheet,marksheet_id,monthly_test,student_id).then(data => {
            const {message,marksheet} = data
            Swal.fire("Success",message,"success");
            this.setState({
                studentDetails:""
            })
            this.updateMarksheet(marksheet)
        }).catch(error => {
            if(error.response){
                const {status} = error.response
                if(status == 422 || status == 400){
                    Swal.fire("Invalid Data","Data is Valid. Please Enter Correct Data","warning");
                }
            }
        })
    }

    statusString(status){
        switch(status){
            case 1:
                return "Not Edit";
            case 2:
                return "Edited"
            case 3:
                return 'Publish'
        }
    }
    unpublishMarksheet(marksheet_id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, UnPublish this Marksheet !'
          }).then((result) => {
            if (result.value) {
                api.adminteacher.exam.monthly_test.unpublishMarksheet(marksheet_id).then(data => {
                    const {message,studentDetails} = data
                    this.setState({
                        studentDetails:""
                    })
                    this.updateMarksheet(studentDetails)

                    Swal.fire("Success",message,"success");
                }).catch(error => {
                    Swal.fire("Error Occured","Error Occured.","error")
                })
            }
          })
    }
    publishMarksheet(marksheet_id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Publish this Marksheet !'
          }).then((result) => {
            if (result.value) {
                api.adminteacher.exam.monthly_test.publishMarksheet(marksheet_id).then(data => {
                    const {message,studentDetails} = data
                    this.setState({
                        studentDetails:""
                    })
                    this.updateMarksheet(studentDetails)
                    Swal.fire("Success",message,"success");
                }).catch(error => {
                    Swal.fire("Error Occured","Error Occured.","error")
                })
            }
          })
    }
    render(){
        const {submit,exam_type} = this.props
        const {row,marksheet_id,studentDetails} = this.state
        return(
            <span>
                <CardComponent title={"Students Details"}>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Student Roll No</th>
                            <th>Student Name</th>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Publish / Unpublish</th>
                            <th>Publish At</th>
                        </Thead>
                        <tbody>
                            {studentDetails.length > 0 && studentDetails.map((item,id) => {
                                return <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{item.student.roll_no}</td>
                                    <td>{item.student.student_name}</td>
                                    <td><Button primary sm onClick={() => this.submit(item,item.id)}>Fill</Button></td>
                                    <td>{this.statusString(item.status)}</td>
                                    <td>
                                        {item.status == 2 &&
                                            <Button primary sm onClick={() => this.publishMarksheet(item.id)}>Publish</Button>
                                        }
                                        {item.status == 3 &&
                                            <Button danger sm onClick={() => this.unpublishMarksheet(item.id)}>UnPublish</Button>
                                        }
                                    </td>
                                    <td>{(item.publish_at && item.status == 3) && new Date(item.publish_at).toLocaleString()}</td>
                                </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </CardComponent>

                {row && <MonthlyTestMarksheet exam_type={exam_type} submit={this.updateStudentMarksheet} marksheet_id={marksheet_id} row={row}/>}
            </span>
        )
    }
}

class MonthlyTestMarksheet extends Component {
    constructor(props){
        super(props)
        this.state = {
            marksheet:"",
            remark:"",
            grade:""
        }
        this.onChange  = this.onChange.bind(this)
        this.onChangeRow = this.onChangeRow.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount(){
        const {marksheet_id,row} = this.props
        const {remark,grade} = row
        this.setState({
            remark,
            grade
        })
        api.adminteacher.exam.monthly_test.get_individual(marksheet_id).then(data => {
            const {marksheet} = data
            this.setState({
                marksheet
            })
        })
    }
    onChange(e,index){
        const {name,value} = e.target
        const {marksheet} = this.state
        marksheet[index][name] = value
        this.setState({
            marksheet
        })
    }
    submit(){
        const {remark,grade,marksheet} = this.state
        const  {marksheet_id,exam_type} = this.props
        const {student_id} = this.props.row
        this.props.submit(remark,grade,marksheet,marksheet_id,exam_type,student_id);
    }
    onChangeRow(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }
    render(){
        const {row} = this.props
        const {marksheet,remark,grade} = this.state
        var total_marks = 0;
        var max_marks = 0;
        var min_marks = 0;

        const title = "Month Test Marksheet: "+row.student.roll_no
        return(
            <CardComponent title={title}>
                <Row>
                    <Col md={6} sm={4}>
                        <FormGroup>
                            <FormLabel>Student Name</FormLabel>
                            <Input value={row.student.student_name} disabled/>
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={4}>
                        <FormGroup>
                            <FormLabel>Student Roll No</FormLabel>
                            <Input value={row.student.roll_no} disabled />
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={4}>
                        <FormGroup>
                            <FormLabel>Father Name</FormLabel>
                            <Input value={row.student.father_name} disabled />
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={4}>
                        <FormGroup>
                            <FormLabel>Father Contact No</FormLabel>
                            <Input value={row.student.father_contact_no1} disabled />
                        </FormGroup>
                    </Col>
                </Row>
                <br />
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


export default ViewStudentDetailsMonthlyTest