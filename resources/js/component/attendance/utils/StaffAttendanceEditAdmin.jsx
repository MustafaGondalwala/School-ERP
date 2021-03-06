import React,{Component, Suspense} from "react"
import CardComponent from "../../utils/CardComponent"
import InlineError from "../../authentication/form/InlineError"
import api from "../../api"
const FillViewFormStaff = React.lazy(() => import("../form/FillViewFormStaff")) 

export default class StaffAttendanceEditAdmin extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                select_date:"",
            },
            view_type:"",
            staff_attendance:"",
            errors:{},
            view_button:"View Attendance",
            fill_button:"Fill Attendance"
        }
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

    validate(data){
        const errors = {};
        if (!data.select_date) errors.select_date = "Can't be blank";
        return errors;
    }
    submit(type){
        const errors = this.validate(this.state.data);
        this.setState({ errors })
        if(Object.keys(errors).length == 0){
            this.setState({
                staff_attendance:""
            })
            if(type == "fill"){
                this.changeState("fill_button","Loading ...");
            }else{
                this.changeState("view_button","Loading ...");
            }
            api.adminteacher.staff_attendance.get(this.state.data).then(data => {
                this.setState({
                    staff_attendance:data.staff_attendance,
                    view_type:type,
                    view_button:"View Attendance",
                    fill_button:"Fill Attendance"
                })
            })
        }
    }
    updateStudentAttendance(staff_attendance){
        return api.adminteacher.staff_attendance.update(staff_attendance).then(data => {
        })
    }
    render(){
        const {errors,data,staff_attendance,view_type,view_button,fill_button} = this.state
        return(
            <div>
                <CardComponent title="Select Staff" back_link="/admin/attendance">
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
                {(view_type && staff_attendance ) && 
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <FillViewFormStaff updateStudentAttendance={this.updateStudentAttendance} select_date={data.select_date} view_type={view_type} staff_attendance={staff_attendance}/>  
                </Suspense>
                }
            </div>
        )
    }
}