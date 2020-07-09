import React,{Component, Suspense} from "react"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import { connect } from "react-redux";
import {getExamTypeDispatch} from "../../actions/exam"
import MutipleSelectSubject from "../../utils/MultipleSelectSubject"
import YearSelectComponent from "../../utils/YearSelectComponent"
import InlineError from "../../utils/InlineError"

const ClassHallTicketEdit =  React.lazy(() => import("../form/ClassHallTicketEdit"))
import Swal from "sweetalert2";

import api from "../../api"
import Row from "../../utils/Row"
import { Col, FormLabel, SelectOption, Select, FormGroup } from "../../utils/Components"

class AdminClassHallTicket extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                class_id:"",
                exam_type:"",
            },
            button_text:"Fetch",
            class_hallticket:"",
            errors:{}
        }
        this.setStateData = this.setStateData.bind(this)
        this.sendClassId = this.sendClassId.bind(this)
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    async componentDidMount(){
        const {examType} = this.props
        if(Object.keys(examType).length == 0)
            this.props.getExamTypeDispatch();
    
    }
    async setStateData(name,value){
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }

    async sendClassId(class_id){
        this.setStateData("class_id",class_id)
    }
    async onChange(e){
        const {name,value} = e.target
        this.setStateData(name,value)
    }
    validate(data){
        const errors = {};
        if (!data.class_id) errors.class_id = "Can't be blank";
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
            api.adminclerk.exam.hall_ticket.get(data).then(data => {
               const {class_hallticket} = data
                this.setState({
                    class_hallticket,
                    button_text:"Fetch"
                })
            })
        }
    }

    updateClassHallTicket(class_hallticket){
        return api.adminclerk.exam.hall_ticket.update(class_hallticket).then(data => {
            return data
        })
    }

    render(){
        const {examType} = this.props
        const {data,button_text,errors,class_hallticket} = this.state
        return(
            <div>
                <AdminHeader mainHeader="Exam" header="Hall Ticket" sub_header="Class/Section Wise"/>
                <BodyComponent>
                    <CardComponent title="Select Class" back_link="/admin/exam">
                        <GetClassId class_id={data.class_id} sendClassId={this.sendClassId} errors={errors} />
                        <Row>
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
                        <div className="row">
                            <button onClick={e => this.submit()} className="btn btn-primary">{button_text}</button>
                        </div>
                    </CardComponent>
                    {class_hallticket && 
                        <Suspense fallback={<h2>Loading Component ...</h2>}>
                            <ClassHallTicketEdit submit={this.updateClassHallTicket} class_hallticket={class_hallticket} title={"Edit Class Hall Ticket"} class_id={data.class_id}/>
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

export default connect(mapStateToProps,{getExamTypeDispatch})(AdminClassHallTicket);
