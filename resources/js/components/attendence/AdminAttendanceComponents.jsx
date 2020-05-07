import React,{Component} from "react"
import {Link} from "react-router-dom"
import {EveryStudentRow,SelectClass,FillAttendanceForm,SelectDate,FillAttendanceFormStaff} from "./utils/utiles"



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

export const AdminAttendanceHeader = ({mainHeader,header,sub_header}) => (
	<div className="header bg-primary pb-6">
		  <div className="container-fluid">
		    <div className="header-body">
		      <div className="row align-items-center py-4">
		        <div className="col-lg-6 col-7">
		          <h6 className="h2 text-white d-inline-block mb-0">{mainHeader}</h6>
		          <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
		            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
		              <li className="breadcrumb-item"><a href="#"><i className="fas fa-home" /></a></li>
		              <li className="breadcrumb-item"><a href="#">{header}</a></li>
		              {sub_header && 
		              	<li className="breadcrumb-item active" aria-current="page">{sub_header}</li>
		          	  }
		            </ol>
		          </nav>
		        </div>
		        <div className="col-lg-6 col-5 text-right">
		          <a href="#" className="btn btn-sm btn-neutral">New</a>
		          <a href="#" className="btn btn-sm btn-neutral">Filters</a>
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Present Today</h5>
		                  <span className="h2 font-weight-bold mb-0">350,897</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
		                    <i className="ni ni-active-40" />
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Absence Today</h5>
		                  <span className="h2 font-weight-bold mb-0">2,356</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
		                    <i className="ni ni-chart-pie-35" />
		                  </div>
		                </div>
		              </div>
		             
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Leave Today</h5>
		                  <span className="h2 font-weight-bold mb-0">924</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
		                    <i className="ni ni-money-coins" />
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
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

	getDate(date,attendance_type){
		console.log(date,attendance_type)
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
					{this.state.attendance_type && <FillAttendanceFormStaff staff_type={true} attendance_type={this.state.attendance_type} date={this.state.date} />}
				</div>
			</div>
		)
	}
}

export  class EditAttendanceStudent extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:null,
			section:null,
			date:null,
			attendance_type:null
		}
		this.getClass = this.getClass.bind(this)
	}
	componentDidMount(){
			this.getClass("10th","A","2020-05-05","fill")
	}
	getClass(classes,section,date,attendance_type){
		this.setState({
			classes:classes,
			section:section,
			date:date,
			attendance_type:attendance_type
		})
	}
	render(){
		return(
			<div>
			<AdminAttendanceHeader mainHeader="Attendance" header="Student Attendance"/>
	    		<div className="container-fluid mt--6">
					<SelectClass title="Select Class" back_link={"/admin/attendance"}  submit={this.getClass}/>
					{this.state.attendance_type && <FillAttendanceForm attendance_type={this.state.attendance_type} date={this.state.date} classes={this.state.classes} section={this.state.section} />}
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
	            		<ColComponent title={"View Particular Student Attendance"} description={"View Particular Student Attendance in System"} button_text="Enter" link={"/admin/attendance/edit-student-attendance"} />
	            		<ColComponent title={"View Particular Staff Attendance"} description={"View Particular Staff Attendance in System"} button_text="Enter" link={"/admin/attendance/edit-staff-attendance"} />
			       </div>
				</div>
			</div>
)