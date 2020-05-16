import React,{Component} from "react"
import {Link} from "react-router-dom"
import {EveryStudentRow,
		SelectClass,
		FillAttendanceForm,
		SelectDate,
		ViewParticularAttendance,
		FillAttendanceFormStaff} from "./utils/utiles"
import AdminAttendanceHeader from "./utils/AdminAttendanceHeader"



export const ColComponent = ({title,description,link,button_text}) => (
					<div className="col-lg-6">
			              <div className="card">
			                <div className="card-body">
			                  <h3 className="card-title mb-3">{title}</h3>
			                  <p className="card-text mb-4">{description}</p>
			                  <Link to={link} className="btn btn-primary">{button_text}</Link>
			                </div>
			              </div>
		            </div>
)

export class EditAttendanceTeacher extends Component{
	constructor(props){
		super(props)
		this.state = {
			date:null,
			attendance_type:null
		}
		this.getDate = this.getDate.bind(this)
	}
	componentDidMount(){
	}
	getDate(date,attendance_type){
		this.setState({
			date:date,
			attendance_type:attendance_type
		})
	}
	render(){
		return(
			<div>
				<AdminAttendanceHeader mainHeader="Attendance" header="Staff Attendance"/>
				<div className="container-fluid mt--6">
					<SelectDate title="Select Date" back_link={"/admin/attendance"}  submit={this.getDate}/>
				</div>
			</div>
		)
	}
}

export  class EditAttendanceStudent extends Component{
	render(){
		return(
			<div>
			<AdminAttendanceHeader mainHeader="Attendance" header="Student Attendance"/>
	    		<div className="container-fluid mt--6">
					<SelectClass title="Select Class" back_link={"/admin/attendance"}  />
				</div>
			</div>
		)
	}
} 
export const AttendanceHomePage = ()  => (
			<div>
				<AdminAttendanceHeader mainHeader="Attendance" header="Home"/>
				<div className="container-fluid mt--6">
				  <div className="row card-wrapper">
	            		<ColComponent title={"Student Attendance"} description={"Edit/View Student Attendance in System"} button_text="Enter" link={"/admin/attendance/edit-student-attendance"} />
	            		<ColComponent title={"Staff Attendance"} description={"Edit/View Staff Attendance in System"} button_text="Enter" link={"/admin/attendance/edit-staff-attendance"} />
	            		<ColComponent title={"View Particular Student Attendance"} description={"View Particular Student Attendance in System"} button_text="Enter" link={"/admin/attendance/view-particular-student-attendance"} />
	            		<ColComponent title={"View Particular Staff Attendance"} description={"View Particular Staff Attendance in System"} button_text="Enter" link={"/admin/attendance/view-particular-staff-attendance"} />
			       </div>
				</div>
			</div>
)

export class ViewParticularStudentAttendance extends Component{
	render(){
		return(
			<div>
				<AdminAttendanceHeader mainHeader="Attendance" header="View Particular" sub_header="Student"/>
				<div className="container-fluid mt--6">
					<ViewParticularAttendance access_type="admin" title="View Particular Student" user_type="student" back_link="/admin/attendance" />
				</div>
			</div>
		)
	}
}

export const ViewParticularStaffAttendance = () => (
	<div>
				<AdminAttendanceHeader mainHeader="Attendance" header="View Particular" sub_header="Staff"/>
				<div className="container-fluid mt--6">
					<ViewParticularAttendance access_type="admin" title="View Particular Staff" user_type="staff" back_link="/admin/attendance" />
				</div>
			</div>	
)