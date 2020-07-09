import React, { Component,Suspense } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { Col, FormGroup, FormLabel, SelectOption, Select, Button  } from "../../utils/Components"
import SelectStudent from "../../utils/SelectStudent"
import api from "../../api"

const ClassHallTicketEdit =  React.lazy(() => import("../form/ClassHallTicketEdit"))


import { connect } from "react-redux";
import {getExamTypeDispatch} from "../../actions/exam"
import InlineError from "../../authentication/form/InlineError"


class AdminIndividualClassHallTicket extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                student_id:"",
                exam_type:"",
            },
            class_hallticket:"",
            button_text:"Fetch",
            errors:"",
            class_id:""
        }
        this.selectStudent = this.selectStudent.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    async componentDidMount(){
        const {examType} = this.props
        if(Object.keys(examType).length == 0)
            this.props.getExamTypeDispatch();
    }
    selectStudent(student_id){
        this.setState({
            data: {...this.state.data,["student_id"]: student_id}
        })
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    validate(data){
        const errors = {};
        if (!data.student_id) errors.student_id = "Can't be blank";
        if (!data.exam_type) errors.exam_type = "Can't be blank";
        return errors;
    }
    submit(){
        const errors = this.validate(this.state.data);
        const {data} = this.state
        this.setState({ errors });   
        if(Object.keys(errors).length == 0 ){
            this.setState({
                class_hallticket:"",
                button_text:"Fetching Hall Ticket ..."
            })
            api.adminclerk.exam.hall_ticket.getIndividual(data).then(data => {
               const {class_hallticket,class_id} = data
                this.setState({
                    class_hallticket,
                    button_text:"Fetch",
                    class_id
                })
            })
        }   
    }
    render(){
        const {errors,data,button_text,class_hallticket,class_id} = this.state
        console.log(class_id)
        const {examType} = this.props
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="Exam Hall Ticket" sub_header="Individual Hall Ticket"/>
                <BodyComponent>
                    <CardComponent title="Select Student" back_link="/admin/exam">
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>Select Student</FormLabel>
                                    <SelectStudent sendStudentId={this.selectStudent}/>
                                    {errors.student_id && <InlineError text={errors.student_id}/>}
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <FormLabel>Exam Type</FormLabel>
                                    <Select  errors={errors} onChange={this.onChange} name="exam_type" value={data.exam_type}>
                                        <SelectOption value={""}> -- Select -- </SelectOption>
                                        {Object.keys(examType).length > 0 && examType.map((item,id) => {
                                        return <SelectOption key={id} value={item.id}>{item.exam_type}</SelectOption>
                                        })}
                                    </Select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Button primary onClick={this.submit}>{button_text}</Button>
                            </Col>
                        </Row>
                    </CardComponent>
                    {(class_hallticket && class_id) && 
                        <Suspense fallback={<h2>Loading Component ...</h2>}>
                            <ClassHallTicketEdit type={"view"} class_hallticket={class_hallticket} title={"View/Print Class Hall Ticket"} class_id={class_id}/>
                        </Suspense>
                    }
                </BodyComponent>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        examType:state.examType
    };
}

export default connect(mapStateToProps,{getExamTypeDispatch})(AdminIndividualClassHallTicket);