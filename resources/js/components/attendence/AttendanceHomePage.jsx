import React,{ Component } from "react"
import {Link} from "react-router-dom"
export default class AttendanceHomePage extends Component{
	render(){
		return(
			<div className="container-fluid mt--6">
			  <div className="row card-wrapper">
            		<div className="col-lg-6">
			              <div className="card">
			                <div className="card-body">
			                  <h3 className="card-title mb-3">Student Attendance</h3>
			                  <p className="card-text mb-4">Enter/View Student Attendance in System</p>
			                  <Link to="/admin/attendance/edit-student-attendance" className="btn btn-primary">Enter</Link>
			                </div>
			              </div>
		            </div>
		        </div>
			</div>

		)
	}
}