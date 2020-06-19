import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import InlineError from "../../utils/InlineError"
import Swal from 'sweetalert2'
import api from "../../api"
import {getClassSection,setClassSection} from "../../actions/classes"
import { connect } from "react-redux";

class AddClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            new_class:"",
            add_button:"Add Class",
            error:""
        }
        this.submit = this.submit.bind(this)
        this.removeClass = this.removeClass.bind(this)
        this.updateClass = this.updateClass.bind(this)
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
        const {classes,getClassSection} = this.props
        if(Object.keys(classes).length == 0){
            getClassSection();
        }
    }
    submit(){
        const {error,new_class,add_button} = this.state;
        const {setClassSection} = this.props;
        if(new_class == ""){
            this.setState({
                error:"Can't be Blank"
            })
        }else{
            this.setState({
                error:"",
                add_button:"Adding Class ..."
            })
            return api.admin.add_class(new_class).then(data => {
              console.log(data)
              Swal.fire("Class Added!!","Class Added in System","success");
              setClassSection(data.classes)
              this.setState({
                new_class:"",
                add_button:"Add Class",
              })
            }).catch(error => {
                this.setState({
                    add_button:"Add Class",
                })
                if(error.response)
                    if(error.response.status == 422){
                        Swal.fire("Validation Error","Class Already Exists","warning")
                    }
                else
                    Swal.fire("Error Occured","Error Occured in Application. Please try Later","error");
            })

        }
    }
    updateClass(old_classname){
        const {setClassSection} = this.props 
        Swal.fire({
            title: 'Enter your new Class Name',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Rename Class',
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
    removeClass(class_title){
        const {setClassSection} = this.props
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
                api.admin.delete_class(class_title).then(data => {
                    setClassSection(data.classes);
                    Swal.fire("Class Removed",data.message,"success");
                }).catch(error => {
                    Swal.fire("Error Occured","Error Occured in Process. Please Try Later.","error")
                })
            }
          })
    }
    render(){
        const {add_button,new_class,error} = this.state
        const {classes} = this.props
        return(
            <div className="col-md-6">
                <CardComponent title="Add Class">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="form-group">
                             <label className="form-control-label">Add Class</label>
                            <input type="text" name="new_class" value={new_class} placeholder="Add Class" onChange={e => this.onChange(e)} className="form-control"/>
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
                                            <th>Class</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(classes).length > 1 && classes.map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item}</td>
                                        <td  className="table-actions">
                                            <a href="#!" onClick={e => this.updateClass(item)} className="table-action" data-toggle="tooltip" data-original-title="Edit product">
                                                <i className="fas fa-user-edit" />
                                            </a>
                                            <a href="#!" onClick={e => this.removeClass(item)} className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete product">
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
        classes:state.distinct_classes
    };
}

export default connect(mapStateToProps,{getClassSection,setClassSection})(AddClass);