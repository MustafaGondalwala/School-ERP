import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import { Thead, Table, Col, FormLabel, Select, SelectOption, FormGroup, Button } from "../../utils/Components"
import MultipleSelectSubject from "../../utils/MultipleSelectSubject"
import { connect } from "react-redux";
import {setSubjects} from "../../actions/subjects" 
import api from "../../api";
import Row from "../../utils/Row";
import InlineError from "../../utils/InlineError";
import Swal from "sweetalert2"


class AllocateSubjectForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_id:"",
            subjectclasswise:"",
            add:false
        }
        this.changeStateType = this.changeStateType.bind(this)
        this.eventType = this.eventType.bind(this)
        this.updateSubjectPerClass = this.updateSubjectPerClass.bind(this)
        this.deleteClass = this.deleteClass.bind(this)
    }
    componentDidMount(){
        const {subjectclasswise,class_id,setSubjects,subjects} = this.props

        if(Object.keys(subjects).length == 0)
            api.subjects().then(data => {
                setSubjects(data.subjects)
            })

        this.setState({
            subjectclasswise,
            class_id
        })
        
    }
    changeStateType(name,value){
        this.setState({
            [name]:value
        })
    }
    eventType(type,row){
        switch(type){
            case "add":
                this.changeStateType("add",true)
            break
            case "delete":
                this.deleteClass(row)
            break
        }
    }
    deleteClass(subject_id){
        const {class_id} = this.props
        Swal.fire({
            title: 'Are you sure?',
            text: "You will able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Subject From Class!'
          }).then((result) => {
            if (result.value) {
                api.admin.class.delete_subject_class_wise(class_id,subject_id).then(data => {
                    const {subjectclasswise,message} = data
                    this.setState({
                        subjectclasswise,
                        add:false
                    })
                    Swal.fire("Success",message,"success");
                }).catch(error => {
                    if(error.response){
                        const {status,data} = error.response
                        if(status == 422){
                            const {message} = data.error
                            Swal.fire("Invalid Data",message,"warning");
                        }else if(status == 400 || status == 500){
                            Swal.fire("Error Occurred","Problem Occurred in Process. Try again Later.","warning");
                        }
                    }
                })
            }
          })
    }
    updateSubjectPerClass(subject){
        const {class_id} = this.props
        Swal.fire({
            title: 'Are you sure?',
            text: "You will able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update subject to class!'
          }).then((result) => {
            if (result.value) {
                api.admin.class.update_subject_class_wise(class_id,subject).then(data => {
                    const {subjectclasswise,message} = data
                    this.setState({
                        subjectclasswise,
                        add:false
                    })
                    Swal.fire("Success",message,"success");
                }).catch(error => {
                    if(error.response){
                        const {status,data} = error.response
                        if(status == 422){
                            const {message} = data.error
                            Swal.fire("Invalid Data",message,"warning");
                        }
                    }
                })
            }
          })
    }
    render(){
        const {subjectclasswise,class_id,add} = this.state
        const {subjects} = this.props
        return(
            <span>
                <CardComponent title="Subject List Per Class" download add_object={{ text: "Add", clickFunction: () => this.eventType("add",true) }}>
                {subjectclasswise.length > 0 ? 
                <Table>
                    <Thead>
                        <th>Sr no.</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </Thead>
                    <tbody>
                        {subjectclasswise.map((item,id) => {
                            return <tr key={id}>
                                <td>{id+1}</td>
                                <td>{item.subject.subject_name}</td>
                                <td className="table-actions">
                                    <a
                                    href="#!"
                                    onClick={(e) => this.eventType("delete",item.id)}
                                    className="table-action table-action-delete"
                                    data-toggle="tooltip"
                                    data-original-title="Delete Subject"
                                    >
                                    <i className="fas fa-trash" />
                                    </a>
                                </td>
                            </tr>
                            })
                        }
                    </tbody>
                </Table>
                : <h2> No Subject Found for Class </h2>}

                </CardComponent>
            {add && <AddSubjectClass submit={this.updateSubjectPerClass} type={"add"} title={"Add Subject Class"} subjects={subjects} subjectclasswise={subjectclasswise}/>}
            </span>
        )
    }
}

class AddSubjectClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            select_subject:"",
            error:""
        }
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }
    submit(){
        const {select_subject,error} = this.state
        if(select_subject == ""){
            this.setState({
                error:"Select Subject"
            })
            return false
        }
        this.setState({ error : ""})
        this.props.submit(select_subject)
    }
    render(){
        const {type,subjects,title,subjectclasswise} = this.props
        const {select_subject,error} = this.state
        return(
            <CardComponent title={title}>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <FormLabel>Select Subject</FormLabel>
                            <Select name={"select_subject"} onChange={this.onChange}  value={select_subject}>
                                <SelectOption selected>-- Select --</SelectOption>
                                {Object.keys(subjects).length > 0 && subjects.map((item,id) => {
                                    return <SelectOption key={id} value={item.id}>{item.subject_name}</SelectOption>
                                })}
                            </Select>
                            {error && <InlineError text={error}/>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Button primary sm onClick={this.submit}>Add</Button>
                    </Col>
                </Row>
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
      subjects:state.subjects
    };
}

export default connect(mapStateToProps,{setSubjects})(AllocateSubjectForm);
