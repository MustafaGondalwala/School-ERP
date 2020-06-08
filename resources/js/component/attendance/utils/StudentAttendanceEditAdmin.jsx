import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import InlineError from "../../authentication/form/InlineError"
import api from "../../api"
import FillViewFormStudent from "../form/FillViewFormStudent"

export default class StudentAttendanceEditAdmin extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                class_id:"",
                select_date:"",
            },
            view_type:"",
            student_attendance:"",
            errors:{},
            view_button:"View Attendance",
            fill_button:"Fill Attendance"
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.submit = this.submit.bind(this)
        this.changeState = this.changeState.bind(this)
    }
    onChange(e){
        this.setState({
            data: {...this.state.data,[e.target.name]:e.target.value}
        });
    }
    changeState(type,value){
        this.setState({
            [type]:value
        })
    }
    sendClassId(class_id){
        this.setState({
            data: {...this.state.data,["class_id"]:class_id}
        });
    }

    validate(data){
        const errors = {};
        if (!data.select_date) errors.select_date = "Can't be blank";
        if (!data.class_id) errors.class_id = "Can't be blank";
        return errors;
    }
    submit(type){
        const errors = this.validate(this.state.data);
        this.setState({ errors })
        if(Object.keys(errors).length == 0){
            this.setState({
                student_attendance:""
            })
            if(type == "fill"){
                this.changeState("fill_button","Loading ...");
            }else{
                this.changeState("view_button","Loading ...");
            }
            api.admin.student_attendance.get(this.state.data).then(data => {
                this.setState({
                    student_attendance:data.student_attendance,
                    view_type:type,
                    view_button:"View Attendance",
                    fill_button:"Fill Attendance"
                })
            })
        }
    }
    updateStudentAttendance(student_attendance){
        return api.admin.student_attendance.update(student_attendance).then(data => {
            return data
        })
    }
    render(){
        const {errors,data,student_attendance,view_type,view_button,fill_button} = this.state
        return(
            <div>
                <CardComponent title="Select Class" back_link="/admin/attendance">
                        <GetClassId errors={errors} sendClassId={this.sendClassId} />
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label className="form-control-label">
                                    Select Date
                                </label>
                                <input type="date" onChange={e => this.onChange(e)} name="select_date" value={data.date} className="form-control"/>
                                {errors.select_date && <InlineError text={errors.select_date} />}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                               <button className="btn btn-primary" onClick={e => this.submit("view")}>{view_button}</button> 
                               <button className="btn btn-primary" onClick={e => this.submit("fill")}>{fill_button}</button> 
                            </div>
                        </div>
                </CardComponent>
                {(view_type && student_attendance ) && <FillViewFormStudent select_date={data.select_date} updateStudentAttendance={this.updateStudentAttendance} view_type={view_type} student_attendance={student_attendance}/>}  
            </div>
        )
    }
}