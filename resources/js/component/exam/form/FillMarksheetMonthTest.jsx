import React, { Component } from "react"
import api from "../../api"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, Button, Col, FormGroup, FormLabel, Input, Select, SelectOption, getGrade } from "../../utils/Components"
import Row from "../../utils/Row"
import Swal from "sweetalert2"

import { setClasswiseMonthlyTest } from "../../actions/classwiseExam";
import {setGradeType,setGradeTypeDispatch} from "../../actions/grade"
import { connect } from "react-redux";

class FillMarksheetMonthTest extends Component{
    constructor(props){
        super(props)
        this.state = {
            students:"",
            show_marksheet:"",
            update_students:[]
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {class_id,monthly_test} = this.props
        const {setGradeTypeDispatch,gradeType} = this.props

        if(Object.keys(gradeType).length == 0)
            setGradeTypeDispatch()
        api.adminteacher.exam.monthly_test.get_students(class_id,monthly_test.id).then(data => {
            this.setState({
                students:data.studentDetails
            })
        })

    }
    showMarksheet(item){
        const {monthly_test} = this.props
        this.setState({
            show_marksheet:""
        },() => {
            this.setState({
                show_marksheet:item
            })
        })
    }
    onChange(value,index,item_id){
        const {students,update_students} = this.state
        students[index].total_marks = value
        update_students[item_id] = value
        this.setState({
            students,update_students
        })
    }
    submit(){
        const {students,update_students} = this.state
        const {class_id} = this.props.monthly_test
        if(update_students.length == 0){
            Swal.fire("Invalid Data","Update Aleast One Marks","warning")
            return false
        }
        return api.adminteacher.exam.monthly_test.update_marksheet(update_students,class_id).then(data => {
            Swal.fire("Data Updated",data.message,"success");
            this.props.setClasswiseMonthlyTest(data.monthlyTest,class_id)
        })
    }
  
    render(){
        const {students,show_marksheet} = this.state
        const {monthly_test,gradeType} = this.props
        console.log(monthly_test)
        return <div>
            <CardComponent title="Students List">
            {
                students ? <div>
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Student Roll No.</th>
                            <th>Student Name</th>
                            <th>Marks</th>
                            <th>Grade</th>
                        </Thead>
                        <tbody>
                            {students.map((item,id) => {
                                return <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{item.student.roll_no}</td>
                                    <td>{item.student.student_name}</td>
                                   <td><Input value={item.total_marks || ''} type="number" onChange={e => this.onChange(e.target.value,id,item.id)} name="total_marks"/></td>
                                   <td>{getGrade(gradeType,item.total_marks,monthly_test.max_marks)}</td>
                                </tr>
                            })}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td><Button primary sm onClick={e => this.submit()}>Update</Button></td>
                        </tr>
                        </tfoot>
                    </Table>
                </div>
                :
                <h4>Loading Students ...</h4>
            }
        </CardComponent>
        </div>
    }
}


// class FillMarksheet extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             marksheet:"",
//             title:"",
//             student:"",
//             remark:"",
//             marksheet_id:"",
//             button_text:"Update",
//         }
//         this.onChange  = this.onChange.bind(this)
//         this.onChangeRow = this.onChangeRow.bind(this)
//         this.submit = this.submit.bind(this)
//     }

//     submit(){
//         const {remark,grade,marksheet,marksheet_id} = this.state
//         const  {monthly_test} = this.props
//         this.setState({
//             button_text:"Updating ..."
//         })
//         this.props.submit(remark,grade,marksheet,monthly_test.id,marksheet_id).then(() => {
//             this.setState({
//                 button_text:"Update"
//             })
//         })
//     }

//     onChange(e,index){
//         const {name,value} = e.target
//         const {marksheet} = this.state
//         marksheet[index][name] = value
//         this.setState({
//             marksheet
//         })
//     }

//     onChangeRow(e){
//         const {name,value} = e.target
//         this.setState({
//             [name]:value
//         })
//     }

//     componentDidMount(){
//         const {marksheet,monthly_test,gradeType,max_marks,min_marks} = this.props
//         const {student} = marksheet
//         const marksheet_id = marksheet.id

//         const title = "Month Test Marksheet: "+student.roll_no
//         this.setState({
//             student,
//             title,
//             marksheet_id
//         })

//         api.adminteacher.exam.monthly_test.get_individual(marksheet.id).then(data => {
//             const {marksheet} = data
//             this.setState({
//                 marksheet
//             })
//         })
//     }
//     render(){
//         const {marksheet,student,title,remark,grade,button_text} = this.state
//         const {monthly_test,max_marks,min_marks,gradeType} = this.props
//         var total_marks = 0;
//         return(
//             <div>
//                 <CardComponent title={title}>
//                     <Row>
//                         <Col md={6} sm={4}>
//                             <FormGroup>
//                                 <FormLabel>Student Name</FormLabel>
//                                 <Input value={student.student_name} disabled/>
//                             </FormGroup>
//                         </Col>
//                         <Col md={6} sm={4}>
//                             <FormGroup>
//                                 <FormLabel>Student Roll No</FormLabel>
//                                 <Input value={student.roll_no} disabled />
//                             </FormGroup>
//                         </Col>
//                         <Col md={6} sm={4}>
//                             <FormGroup>
//                                 <FormLabel>Father Name</FormLabel>
//                                 <Input value={student.father_name} disabled />
//                             </FormGroup>
//                         </Col>
//                         <Col md={6} sm={4}>
//                             <FormGroup>
//                                 <FormLabel>Father Contact No</FormLabel>
//                                 <Input value={student.father_contact_no1} disabled />
//                             </FormGroup>
//                         </Col>
//                         <Col md={6} sm={4}>
//                             <FormGroup>
//                                 <FormLabel>Min. Marks</FormLabel>
//                                 <Input value={monthly_test.min_marks} disabled />
//                             </FormGroup>
//                         </Col>
//                         <Col md={6} sm={4}>
//                             <FormGroup>
//                                 <FormLabel>Max. Marks</FormLabel>
//                                 <Input value={monthly_test.max_marks} disabled />
//                             </FormGroup>
//                         </Col>
//                     </Row>
//                     {marksheet ? 
//                         <div className="table_responsive">
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Sr no.</th>
//                                     <th>Subject</th>
//                                     <th>Total Marks</th>
//                                     <th>Grade</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {marksheet.map((item,id) => {
//                                     total_marks += parseInt(item.total_marks)
//                                     return <EveryRow key={id} onChange={this.onChange} max_marks={max_marks} gradeType={gradeType} index={id} row={item} />
//                                 })}
//                             </tbody>
//                             <tfoot>
//                                 <tr>
//                                     <td></td>
//                                     <td></td>
//                                     <td>
//                                         <Input value={total_marks} disabled/>
//                                     </td>
//                                     <td>
//                                     </td>
//                                 </tr>
//                             </tfoot>
//                         </table>
//                         </div>
//                         : <h3>Loading Marksheet ...</h3>
//                         }
//                         <Row>
//                             <Col md={6} sm={4}>
//                                 <FormGroup>
//                                     <FormLabel>Remark</FormLabel>
//                                     <Input type="text" name="remark" onChange={this.onChangeRow} value={remark}/>
//                                 </FormGroup>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <button className="btn btn-primary" onClick={this.submit}>{button_text}</button>
//                         </Row>
//                 </CardComponent>
//             </div>
//         )
//     }
// }

// const EveryRow = ({index,row,onChange,gradeType,max_marks}) => {
//     return(
//         <tr key={index}>
//             <td>{index+1}</td>
//             <td>{row.subject.subject_name}</td>
//             <td><input type="number" min="0" name="total_marks" onChange={e => onChange(e,index)} value={row.total_marks} className="form-control" /></td>
//             <td>
//                {getGrade(gradeType,row.total_marks,max_marks)}
//             </td>
//         </tr>
//     )
// }

function mapStateToProps(state) {
    return {
        gradeType:state.gradeType
    };
}
export default connect(mapStateToProps,{setClasswiseMonthlyTest,setGradeType,setGradeTypeDispatch})(FillMarksheetMonthTest);
