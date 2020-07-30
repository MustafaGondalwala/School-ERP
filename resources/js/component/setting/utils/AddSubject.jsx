import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import InlineError from "../../utils/InlineError"
import Swal from 'sweetalert2'
import api from "../../api"
import {setSubjectDispatch,setSubjects} from "../../actions/subjects"
import { connect } from "react-redux";

class AddSubject extends Component{
    constructor(props){
        super(props)
        this.state = {
            new_subject:"",
            add_button:"Add Subject",
            error:""
        }
        this.submit = this.submit.bind(this)
        this.removeSubject = this.removeSubject.bind(this)
        this.updateSubject = this.updateSubject.bind(this)
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
        const {subjects,setSubjectDispatch} = this.props
        if(Object.keys(subjects).length == 0){
            setSubjectDispatch();
        }
    }
    submit(){
        const {error,new_subject,add_button} = this.state;
        const {setSubjects} = this.props;
        if(new_subject == ""){
            this.setState({
                error:"Can't be Blank"
            })
        }else{
            this.setState({
                error:"",
                add_button:"Adding Subject ..."
            })
            api.admin.subject.add(new_subject).then(data => {
              Swal.fire("Subject Added!!","Subject Added in System","success");
              setSubjects(data.subjects)
              this.setState({
                new_subject:"",
                add_button:"Add Subject",
              })
            }).catch(error => {
                this.setState({
                    add_button:"Add Subject",
                })
                if(error.response)
                    if(error.response.status == 422){
                        Swal.fire("Validation Error","Class Already Exists","warning")
                    }else if(error.response.status == 400){
                        Swal.fire("Subject Name Already Exists","Subject Already Exists","warning")
                    }

                else
                    Swal.fire("Error Occured","Error Occured in Application. Please try Later","error");
            })

        }
    }
    updateSubject(old_classname){
        const {setSubjects} = this.props 
        Swal.fire({
            title: 'Enter your new Subject Name',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Rename Subject',
            showLoaderOnConfirm: true,
            preConfirm: (new_class_name) => {
              return api.admin.rename_class(new_class_name,old_classname).then(data => {
                    return data;
                }).catch(error => {
                    var message = error.response.data.error.message;
                    Swal.showValidationMessage(
                        `Request failed: ${message}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.value) {
              setClassSection(result.value.classes)
              Swal.fire(
                "Class Rename Successull!!",
                "Class Renamed",
                "success"
              )
            }
          })
    }
    removeSubject(subject_id){
        const {setSubjects} = this.props
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be get Class Back!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                api.admin.subject.delete(subject_id).then(data => {
                    setSubjects(data.subjects);
                    Swal.fire("Class Removed",data.message,"success");
                }).catch(error => {
                    Swal.fire("Error Occured","Error Occured in Process. Please Try Later.","error")
                })
            }
          })
    }
    render(){
        const {add_button,new_subject,error} = this.state
        const {subjects} = this.props
        return(
            <div className="col-md-6">
                <CardComponent title="Add Subject">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="form-group">
                             <label className="form-control-label">Add Subject</label>
                            <input type="text" name="new_subject" value={new_subject} placeholder="Add Subject" onChange={e => this.onChange(e)} className="form-control"/>
                            {error && <InlineError text={error}/>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <button className="btn btn-primary"  onClick={e => this.submit()}>{add_button}</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Subject</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(subjects).length > 0 && subjects.map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.subject_name}</td>
                                            <td  className="table-actions">
                                                <a href="#!" onClick={e => this.updateSubject(item)} className="table-action" data-toggle="tooltip" data-original-title="Edit product">
                                                    <i className="fas fa-user-edit" />
                                                </a>
                                                <a href="#!" onClick={e => this.removeSubject(item.id)} className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete product">
                                                    <i className="fas fa-trash" />
                                                </a>
                                            </td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </CardComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        subjects:state.subjects
    };
}

export default connect(mapStateToProps,{setSubjectDispatch,setSubjects})(AddSubject);