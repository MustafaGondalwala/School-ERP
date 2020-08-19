import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, Button, Col, FormGroup, FormLabel, Input, Select, SelectOption, getGrade } from "../../utils/Components"
import api from "../../api"
import { connect } from "react-redux";
import Row from "../../utils/Row"
import Swal from "sweetalert2"
import {setGradeTypeDispatch} from "../../actions/grade"

 class ViewStudentDetailsExamMarksheet extends Component{
    constructor(props){
        super(props)
        this.state = {
            marksheet:"",
            row:"",
            marksheet_id:"",
            exam_type:"",
            studentDetails:""
        }
        this.updateMarksheet = this.updateMarksheet.bind(this)
        this.updateStudentMarksheet = this.updateStudentMarksheet.bind(this)
    }
    componentDidMount(){
        const {studentDetails,exam_type,setGradeTypeDispatch,gradeType} = this.props
        if(Object.keys(gradeType).length == 0)
            setGradeTypeDispatch()
        this.setState({
            studentDetails,
            exam_type
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

    updateStudentMarksheet(remark,marksheet,marksheet_id,student_id){
        const {exam_type} = this.props
        api.adminteacher.exam.marksheet.update_marksheet(remark,marksheet,marksheet_id,exam_type,student_id).then(data => {
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
    render(){
        const {submit,exam_type,gradeType,max_marks} = this.props
        const {row,marksheet_id,studentDetails} = this.state
        console.log(row)
        return(
            <span>
                {row && <MonthlyTestMarksheet max_marks={max_marks} gradeType={gradeType}  submit={this.updateStudentMarksheet} marksheet_id={marksheet_id} row={row}/>}
                <CardComponent title={"Students Details"}>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Student Roll No</th>
                            <th>Student Name</th>
                            <th>Action</th>
                            <th>Status</th>
                        </Thead>
                        <tbody>
                            {studentDetails.length > 0 && studentDetails.map((item,id) => {
                                return <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{item.student.roll_no}</td>
                                    <td>{item.student.student_name}</td>
                                    <td><Button primary sm onClick={() => this.submit(item,item.id)}>Fill</Button></td>
                                    <td>{this.statusString(item.status)}</td>
                                </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </CardComponent>

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
        }
        this.onChange  = this.onChange.bind(this)
        this.onChangeRow = this.onChangeRow.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount(){
        const {marksheet_id,row} = this.props
        const {remark} = row
        this.setState({
            remark
        })
        api.adminteacher.exam.marksheet.get_individual(marksheet_id).then(data => {
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
        const {remark,marksheet} = this.state
        const  {marksheet_id} = this.props
        const {student_id} = this.props.row
        this.props.submit(remark,marksheet,marksheet_id,student_id);
    }
    onChangeRow(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }
    render(){
        const {row,gradeType,max_marks} = this.props
        const {marksheet,remark} = this.state
        var total_marks = 0;
        const title = "Exam  Marksheet: "+row.student.roll_no
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
                            <th>Total Marks</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marksheet.map((item,id) => {
                            total_marks += parseInt(item.total_marks)
                            return <EveryRow key={id} gradeType={gradeType} max_marks={max_marks} onChange={this.onChange} index={id} row={item} />
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <Input value={total_marks} disabled/>
                            </td>
                            <td>
                            {getGrade(gradeType,total_marks,marksheet.length*max_marks)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                </div>
                : <h3>Loading Marksheet ...</h3>
                }
                <Row>
                    <button className="btn btn-primary" onClick={this.submit}>Update</button>
                </Row>
            </CardComponent>
        )
    }
}

const EveryRow = ({index,row,onChange,gradeType,max_marks}) => {
    return(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{row.subject.subject_name}</td>
            <td><input type="number" min="0" name="total_marks" onChange={e => onChange(e,index)} value={row.total_marks || 0} className="form-control" /></td>
            <td>
            {getGrade(gradeType,row.total_marks,max_marks)}
            </td>
        </tr>
    )
}


function mapStateToProps(state) {
    return {
        gradeType: state.gradeType,
    };
  }
  
  export default connect(mapStateToProps, { setGradeTypeDispatch })(
    ViewStudentDetailsExamMarksheet
  );