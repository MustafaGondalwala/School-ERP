import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import QuestionPaperHeader from "../../header/teacher/QuestionPaperHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import GetClassId from "../../utils/GetClassId"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"

import {setClasswiseSubjects,setClasswiseSubjectsDispatch} from "../../actions/classwiseSubject"
import {setQuestionPaper} from "../../actions/questionpaper"

import { connect } from "react-redux";
import { Select, SelectOption, FormGroup, FormLabel, Input, Button, RedLabel } from "../../utils/Components"
import api from "../../api"
import Swal from "sweetalert2"
import EmptyHeader from "../../utils/EmptyHeader"

class TeacherQuestionPaperAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                class_id:"",
                subject_id:"",
                title:""
            },
            button_text:"Add",
            errors:{}
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    sendClassId(class_id){
        const {classwiseSubject,setClasswiseSubjectsDispatch} = this.props
        this.setState({
            data: {...this.state.data,["class_id"]: class_id},
        },() => {
            this.setState({
                data: {...this.state.data,["subject_id"]: ""},
            })
            if (Object.keys(classwiseSubject).length == 0 || classwiseSubject[class_id] == undefined) {
                setClasswiseSubjectsDispatch(class_id)
            }
        })
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value},
        })
    }
    validate(data){
        const errors = {};
        if (!data.class_id) errors.class_id = "Can't be blank";
        if (!data.subject_id) errors.subject_id = "Can't be blank";
        if (!data.title) errors.title = "Can't be blank";
        if (!data.marks) errors.marks = "Can't be blank";

        return errors;
    }

    submit(){
        const {data} = this.state
        const errors = this.validate(data)
        const {setQuestionPaper} = this.props
        this.setState({ errors })
        this.setState({
            button_text:"Adding ..."
        })
        if(Object.keys(errors).length == 0){
            api.adminteacher.questionbank.add(data).then(data => {
                const {questionpaper} = data
                this.setState({
                    data : {
                        title:"",
                        class_id:"",
                        subject_id: "",
                        marks:""
                    },
                    button_text:"Add"
                })
                setQuestionPaper(questionpaper)
                Swal.fire("Success","Question Paper Added!!","success");
            })
        }
    }
    render(){
        const title="Add Question Paper"
        var back_link = ""
        switch(localStorage.getItem('user_type')){
            case "4":
                back_link = "/teacher/"
                break
            case "1":
                back_link = "/admin/"
                break
        }
        back_link +="questionpaper"
        const {data,button_text,errors} = this.state
        const {classwiseSubject} = this.props
        return(
            <div>
                <EmptyHeader mainHeader="Question Paper" header="Add" />
                <BodyComponent>
                    <CardComponent title={title} back_link={back_link}>
                            <GetClassId errors={errors} class_id={data.class_id} sendClassId={this.sendClassId} sm="12" md="4" error=""/>
                            <br />
                            <Row>
                                <Col md={6} sm={6}>
                                    <FormGroup>
                                        <FormLabel>Select Subject</FormLabel>
                                        {data.class_id ?
                                        <Select errors={errors} name="subject_id" value={data.subject_id} onChange={this.onChange}>
                                            <SelectOption value=""> -- Select --</SelectOption>
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
                                <Col md={6} sm={6}>
                                    <FormGroup>
                                        <FormLabel>
                                            Title
                                        </FormLabel>
                                        <FormGroup>
                                            <Input errors={errors} name="title" value={data.title} onChange={this.onChange} placeholder="Title"/>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>    
                                <Col md={6} sm={6}>
                                    <FormGroup>
                                        <FormLabel>
                                            Total Marks
                                        </FormLabel>
                                        <FormGroup>
                                            <Input errors={errors} name="marks" value={data.marks} onChange={this.onChange} placeholder="Marks"/>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>         
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Button onClick={this.submit} primary >{button_text}</Button>
                                </FormGroup>
                            </Row>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        classwiseSubject: state.classwiseSubject,
    };
  }
  
  export default connect(mapStateToProps, { setQuestionPaper,setClasswiseSubjects,setClasswiseSubjectsDispatch })(
    TeacherQuestionPaperAdd
  );
  