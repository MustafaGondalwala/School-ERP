import React, { Component } from "react"

import CardComponent from "../../utils/CardComponent"
import {setTeacherGroupDispatch} from "../../actions/study_material"
import { connect } from "react-redux";
import GetClassId from "../../utils/GetClassId"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import { Select, SelectOption,Input,RedLabel,FormGroup, FormLabel, Button,Table, Thead } from "../../utils/Components"
import {setClasswiseSubjects,setClasswiseSubjectsDispatch} from "../../actions/classwiseSubject"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import Swal from "sweetalert2"

class AddEditGroup extends Component{
    constructor(props){
        super(props)
        this.initialData = {
            group_name:"",
            class_id:"",
            subject_id:"",
        }
        this.state = {
            data : this.initialData,
            error:"",
            id:"",
            errors:{},
            button_text:"Add"
        }
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.sendClassId = this.sendClassId.bind(this)
    }
    componentDidMount(){
        const {row} = this.props
        if(row){
            console.log(row)
            this.setState({
                data:row,
                id:row.id,
                button_text:"Edit"
            },() =>[
                this.sendClassId(row.class_id)
            ])
        }

    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value},
        })
    } 
    sendClassId(class_id){
        const {classwiseSubject,setClasswiseSubjectsDispatch} = this.props
        this.setState({
            data: {...this.state.data,["class_id"]: class_id},
        },() => {
            if (classwiseSubject[class_id] == undefined) {
                setClasswiseSubjectsDispatch(class_id)
            }
        })
    }
    validate(data){
        const errors = {};
        if (!data.class_id) errors.class_id = "Can't be blank";
        if (!data.subject_id) errors.subject_id = "Can't be blank";
        if (!data.group_name) errors.group_name = "Can't be blank";
        return errors;
    }

    submit(){
        const {data,id} = this.state
        const errors = this.validate(data)
        this.setState({
            errors
        })
        if(Object.keys(errors).length == 0){
            this.props.submit(data,id).then(() => {
                this.setState({
                    data : this.initialData,
                })
            })
        }
    }
    render(){
        const {errors,button_text,id,data} = this.state
        const {title} = this.props
        const {classwiseSubject} = this.props
        return(
            <CardComponent title={title}>
                <GetClassId class_id={data.class_id} sendClassId={this.sendClassId}/>
                <br />
                        <Row>
                            <Col md={6} md={6}>
                                <FormGroup>
                                    <FormLabel>{title}</FormLabel>
                                    <Input errors={errors} name="group_name" value={data.group_name} onChange={this.onChange} placeholder={title}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6}>
                                    <FormGroup>
                                        <FormLabel>Select Subject</FormLabel>
                                        {data.class_id ?
                                        <Select errors={errors} name="subject_id" value={data.subject_id} onChange={this.onChange}>
                                            <SelectOption value=''> -- Select --</SelectOption>
                                            {classwiseSubject[data.class_id] !== undefined &&
                                                classwiseSubject[data.class_id].map((item, id) => {
                                                    return (
                                                    <SelectOption key={id} value={item.id}>
                                                        {item.subject.subject_name}
                                                    </SelectOption>
                                                    );
                                            })}
                                        </Select>
                                        : <RedLabel>Please Select Class</RedLabel>}
                                    </FormGroup>
                                </Col> 
                        </Row>
                        <Row>
                            <Col md={6} md={6}>
                                <FormGroup>
                                    <Button primary sm onClick={this.submit}>
                                        {button_text}
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        classwiseSubject: state.classwiseSubject,
    };
}

export default connect(mapStateToProps,{setClasswiseSubjectsDispatch,setClasswiseSubjects})(AddEditGroup);
