import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import {setClasswiseMonthlyTest,setClasswiseMonthlyTestDispatch,setClasswiseOnlineMonthlyTest} from "../../actions/classwiseExam"
import {teacherWiseOnlineTest,teacherWiseOnlineTestDispatch} from "../../actions/onlinexam.js"
import {setQuestionPaperDispatch} from "../../actions/questionpaper"

import { connect } from "react-redux";
import { FormGroup,Col,Select, FormLabel, SelectOption, Input, Button, RedLabel } from "../../utils/Components";
import api from "../../api"
import Swal from "sweetalert2"
import GetClassId from "../../utils/GetClassId"

class AddEditOnlineTest extends Component{
    constructor(props){
        super(props)
        this.initialDataState = {
            monthly_test:"",
            exam_date:"",
            start_time:"",
            end_time:"",
            questionpaper:"",
            remark:"",
            class_id:"",
        }
        this.state = {
            data : this.initialDataState,
            exam_total_time:"",
            button_text:"Add",
            errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.sendClassId = this.sendClassId.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount(){
        const {class_id,classwiseMonthlyTest,questionpaper} = this.props
        // this.props.teacherWiseOnlineTestDispatch();
        if(Object.keys(questionpaper).length == 0)
            this.props.setQuestionPaperDispatch(class_id)
    }
    submit(){
        const {type} = this.props
        const {data} = this.state
        const errors = this.validate(data)
        this.setState({ errors })
        this.setState({
            button_text:"Adding ..."
        })
        if(Object.keys(errors).length == 0){
            if(type == 1)
                api.adminteacher.onlineexam.monthly_test.add(data).then(data => {
                    Swal.fire("Success","Online Exam Added!!","success")
                    this.props.teacherWiseOnlineTest(data.onlineExam)
                    this.setState({
                        data:this.initialDataState,
                        button_text:"Add"
                    })
                })
        }
    }

    validate(data){
        const errors = {};
        if (!data.monthly_test) errors.monthly_test = "Can't be blank";
        if (!data.exam_date) errors.exam_date = "Can't be blank";
        if (!data.start_time) errors.start_time = "Can't be blank";
        if (!data.end_time) errors.end_time = "Can't be blank";
        if (!data.class_id) errors.class_id = "Can't be blank";
        if (!data.questionpaper) errors.questionpaper = "Can't be blank";
        return errors;
    }

    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    sendClassId(class_id){
        const {classwiseMonthlyTest} = this.props
        this.setState({
            data: {...this.state.data,["class_id"]: class_id}
        },() => {
            if(classwiseMonthlyTest[class_id] == undefined)
                this.props.setClasswiseMonthlyTestDispatch(class_id)
        })
    }

    render(){
        const {title,classwiseMonthlyTest,questionpaper,type} = this.props
        const {data,errors,exam_total_time,button_text} = this.state
        return(
            <CardComponent title={title} back_link={"/teacher/online-exam"}>
                <GetClassId sendClassId={this.sendClassId} errors={errors} class_id={data.class_id}  md={4} sm={4} lg={4}/>
                <br />
                <Row>
                            <Col md={6} sm={6} lg={4}>
                                    <FormGroup>
                                        <FormLabel>Select Monthly Test</FormLabel>
                                        {data.class_id ?
                                        <Select errors={errors} name="monthly_test" onChange={this.onChange} value={data.monthly_test}>
                                           <SelectOption value=""> -- Select --</SelectOption>
                                            {classwiseMonthlyTest[data.class_id] !== undefined &&
                                                classwiseMonthlyTest[data.class_id].map((item, id) => {
                                                    console.log
                                                    return (
                                                    <SelectOption key={id} value={item.id}>
                                                        {item.monthly_test}
                                                    </SelectOption>
                                                    );
                                            })}
                                        </Select>
                                        : <RedLabel>Please Select Class</RedLabel>}
                                    </FormGroup>
                    </Col>
                    <Col md={6} sm={6} lg={4}>
                        <FormGroup>
                            <FormLabel>
                                Select Question Paper
                            </FormLabel>
                                <Select errors={errors} name="questionpaper" onChange={this.onChange} value={data.questionpaper}>
                                    <SelectOption value=""> -- Select -- </SelectOption>
                                    {
                                        Object.keys(questionpaper).length > 0 && questionpaper.map((item,id) => {
                                            return <SelectOption key={id} value={item.id}>{item.title}</SelectOption>
                                        })
                                    }
                                </Select>
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={6} lg={4}>
                        <FormGroup>
                            <FormLabel>
                                Select Date
                            </FormLabel>
                            <Input type="date" name="exam_date" onChange={this.onChange} value={data.exam_date} errors={errors}/>
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={6} lg={4}>
                        <FormGroup>
                            <FormLabel>
                                Start Time
                            </FormLabel>
                            <Input errors={errors} name="start_time" onChange={this.onChange} value={data.start_time} type="time"/>
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={6} lg={4}>
                        <FormGroup>
                            <FormLabel>
                                End Time
                            </FormLabel>
                            <Input errors={errors} name="end_time" onChange={this.onChange} value={data.end_time} type="time" />
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={6} lg={4}>
                        <FormGroup>
                            <FormLabel>
                                End Time
                            </FormLabel>
                            <Input disabled={true} value={exam_total_time} placeholder={"Exam Total Time"} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={6} lg={4}>
                        <FormGroup>
                            <FormLabel>
                                Remark
                            </FormLabel>
                            <Input name="remark" onChange={this.onChange} placeholder="Remark" value={data.remark}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={6}>
                        <Button primary onClick={this.submit}>{button_text}</Button>
                    </Col>
                </Row>
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        classwiseMonthlyTest:state.classwiseMonthlyTest,
        questionpaper:state.questionpaper
    };
}

export default connect(mapStateToProps,{teacherWiseOnlineTest,teacherWiseOnlineTestDispatch,setClasswiseOnlineMonthlyTest,setClasswiseMonthlyTest,setClasswiseMonthlyTestDispatch,setQuestionPaperDispatch})(AddEditOnlineTest);