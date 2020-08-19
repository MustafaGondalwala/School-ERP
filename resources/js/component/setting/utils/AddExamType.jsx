import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import {getExamTypeDispatch,getExamType} from "../../actions/exam"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import { FormGroup, FormLabel, Input } from "../../utils/Components"
import { setClasswiseSubjectsDispatch, setClasswiseSubjects } from "../../actions/classwiseSubject";

class AddExamType extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                exam_type:"",
                min_marks:"",
                max_marks:"",
                subject_ids:"",
            },
            exam_type:"",
            error:"",
            subject_ids:"",
            button_text:"Add Exam Type"
        }
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    componentDidMount(){
        const {examType} = this.props
        if(Object.keys(examType).length == 0)
            this.props.getExamTypeDispatch();
    }
    removeExamType(exam_type_id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              api.admin.exam.exam_type.remove(exam_type_id).then(data => {
                const {message,exam_types} = data
                Swal.fire(
                    'Deleted!',
                    message,
                    'success'
                  )
                 this.props.getExamType(exam_types);
              }).catch(error => {
                  console.log(error)
                  Swal.fire("Error","Error Occured in Proccess","error");
              });
            }
          })
    }

    validate(data){
        const errors = {};
        if (!data.max_marks) errors.max_marks = "Can't be blank";
        if (!data.min_marks) errors.min_marks = "Can't be blank";
        if (!data.exam_type) errors.exam_type = "Can't be blank";
        return errors;
    }

    onSubmit(){
        const {data} = this.state
        const errors = this.validate(data)
        this.setState({errors})
        if(Object.keys(errors).length == 0){
                    this.setState({
                        button_text:"Adding ..."
                    })
                    api.admin.exam.exam_type.add(data).then(data => {
                        const {message} = data
                        this.props.getExamType(data.exam_types)
                        this.setState({
                            button_text:"Add Exam Type",
                            exam_type:"",
                            error:"",
                        })
                        Swal.fire("Success",message,"success");
                    }).catch(error => {
                        if(error.response.status == 422){
                            const message = error.response.data.error.message
                            Swal.fire("Validation Error",message,"warning");
                        }else{
                            Swal.fire("Error Occured","Error Occured in Process","error");
                        }
                    })


        }
    }
    render(){
        const {data,errors,button_text} = this.state
        const {examType} = this.props
        return(
            <CardComponent title="Exam Type" back_link="/admin/exam">
                    <div className="col-md-12">
                        <div className="row">
                            <Col md={4} lg={4}>
                            <FormGroup>
                             <FormLabel>Exam Type</FormLabel>
                             <Input name="exam_type" errors={errors} value={data.exam_type} onChange={e => this.onChange(e)} />
                            </FormGroup>
                            </Col>
                            <Col md={4} lg={4}>
                                <FormGroup>
                                    <FormLabel>Min Marks Per Subject</FormLabel>
                                    <Input name="min_marks" errors={errors} value={data.min_marks} type="number" onChange={e => this.onChange(e)}/>
                                </FormGroup>
                            </Col>
                            <Col md={4} lg={4}>
                                <FormGroup>
                                    <FormLabel>Max Marks Per Subject</FormLabel>
                                    <Input name="max_marks" errors={errors} value={data.max_marks} type="number" onChange={e => this.onChange(e)}/>
                                </FormGroup>
                            </Col>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary" onClick={e => this.onSubmit()}>{button_text}</button>
                        </div>
                        <br />
                        <div className="row">
                            <table className="table">
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Exam Type</th>
                                    <th>Min Marks</th>
                                    <th>Min Max</th>
                                    <th>Remove</th>
                                </tr>
                                <tbody>
                                    {Object.keys(examType).length > 0 && examType.map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.exam_type}</td>
                                        <td>{item.min_marks}</td>
                                        <td>{item.max_marks}</td>
                                        <td><button onClick={e => this.removeExamType(item.id)}  className="btn btn-danger btn-sm">Remove</button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        examType:state.examType,
        classwiseSubject:state.classwiseSubject
    };
}

export default connect(mapStateToProps,{setClasswiseSubjectsDispatch,getExamTypeDispatch,getExamType})(AddExamType);
