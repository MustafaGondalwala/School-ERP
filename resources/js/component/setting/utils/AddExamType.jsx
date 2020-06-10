import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import {getExamTypeDispatch,getExamType} from "../../actions/exam"


class AddExamType extends Component{
    constructor(props){
        super(props)
        this.state = {
            exam_type:"",
            error:"",
            button_text:"Add Exam Type"
        }
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
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
    onSubmit(){
        const {exam_type} = this.state
        if(exam_type == "")
            this.setState({
                error:"Cannot be Blank"
            })
        else{
            this.setState({
                button_text:"Adding ..."
            })
            api.admin.exam.exam_type.add(exam_type).then(data => {
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
        const {exam_type,error,button_text} = this.state
        const {examType} = this.props
        return(
            <div className="col-md-6">
                <CardComponent title="Add Exam Type">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="form-group">
                             <label className="form-control-label">Add Exam Type</label>
                            <input type="text" name="exam_type" value={exam_type} onChange={e => this.onChange(e)} className="form-control"/>
                            {error && <InlineError text={error}/>}
                            </div>
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
                                    <th>Remove</th>
                                </tr>
                                <tbody>
                                    {Object.keys(examType).length > 0 && examType.map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.exam_type}</td>
                                        <td><button onClick={e => this.removeExamType(item.id)}  className="btn btn-danger btn-sm">Remove</button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </CardComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        examType:state.examType
    };
}

export default connect(mapStateToProps,{getExamTypeDispatch,getExamType})(AddExamType);
