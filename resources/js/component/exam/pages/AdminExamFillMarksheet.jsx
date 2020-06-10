import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import { connect } from "react-redux";
import {getExamTypeDispatch} from "../../actions/exam"
import MutipleSelectSubject from "../../utils/MultipleSelectSubject"
import YearSelectComponent from "../../utils/YearSelectComponent"
import InlineError from "../../utils/InlineError"

import api from "../../api"
import Swal from "sweetalert2";

class AdminExamFillMarksheet extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                class_id:"",
                exam_type:"",
                subjects:"",
                year:""
            },
            button_text:"Fetch",
            errors:{}
        }
        this.setStateData = this.setStateData.bind(this)
        this.sendClassId = this.sendClassId.bind(this)
        this.sendSubjects = this.sendSubjects.bind(this)
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    async componentDidMount(){
        const {examType} = this.props
        this.submit()
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
    async sendSubjects(subjects){
        this.setStateData("subjects",subjects)
    }
    async onChange(e){
        this.setStateData(e.target.name,e.target.value)
    }
    validate(data){
        const errors = {};
        if (!data.class_id) errors.class_id = "Can't be blank";
        if (!data.exam_type) errors.exam_type = "Can't be blank";
        if (!data.subjects) errors.subjects = "Can't be blank";
        return errors;
    }
    submit(){
        const errors = this.validate(this.state.data);
        const {data} = this.state
        this.setState({ errors });   
        if(Object.keys(errors).length == 0 ){
            this.setState({
                class_hallticket:"",
                button_text:"Fetching Marksheet ..."
            })
            api.admin.exam.marksheet.get(data).then(data => {
                console.log(data)
            //    const {class_hallticket} = data
            //     this.setState({
            //         class_hallticket,
            //         button_text:"Fetch"
            //     })
            }).catch(error => {
                this.setState({
                    button_text:"Fetch"
                })
                Swal.fire("Error Occured","Error Occured in Process.Please Try Later ...","error")
            })
        }
    }

    updateClassHallTicket(class_hallticket){
        return api.admin.exam.hall_ticket.update(class_hallticket).then(data => {
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
                        <GetClassId sendClassId={this.sendClassId} errors={errors} />
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-control-label">Exam Type</label>
                                <select onChange={e => this.onChange(e)} name="exam_type" className="form-control">
                                    <option value="">-- Select --</option>
                                    {Object.keys(examType).length > 0 && examType.map((item,id) => {
                                    return <option value={item.id}>{item.exam_type}</option>
                                    })}
                                </select>
                                {errors.exam_type && <InlineError text={errors.exam_type} /> }
                            </div>
                            <div className="col-md-4">
                                    <div className="form-group">
                                    <label className="form-control-label">Subject</label>
                                    <MutipleSelectSubject sendSubjects={this.sendSubjects}/>
                                    {errors.subjects && <InlineError text={errors.subjects} /> }
                                    </div>
                            </div>
                            <div className="col-md-4">
                                    <YearSelectComponent value={data.year} label="Select Year" name="year" onChange={this.onChange} errors=""/>
                            </div>
                        </div>
                        <div className="row">
                            <button onClick={e => this.submit()} className="btn btn-primary">{button_text}</button>
                        </div>
                    </CardComponent>
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

export default connect(mapStateToProps,{getExamTypeDispatch})(AdminExamFillMarksheet);
