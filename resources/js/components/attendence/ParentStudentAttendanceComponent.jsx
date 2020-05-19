import React from "react"
import ParentStudentAttendanceHeader from "./utils/ParentStudentAttendanceHeader"
import { Link } from "react-router-dom"
import moment from "moment"
import {EveryStudentRowForIndividual,ViewAttendance} from "./utils/utiles"
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

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

export class ParentStudentViewAttendance extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			view_monthwise_link:""
		}
	}
	updateIds(){
		if(localStorage.getItem('user_type') === "parent"){
			var view_monthwise_link = "/attendance/view_monthwise/"+this.props.match.params.student_id
			this.setState({
				view_monthwise_link
			})
		}
	}
	componentDidMount(){
		this.updateIds();
	}
	componentWillReceiveProps(){
		this.updateIds();
	}
	render(){
		return(
			<div>
				<ParentStudentAttendanceHeader mainHeader="Attendance" header="Home"/>
				<div className="container-fluid mt--6">
					<div className="row">
						<ColComponent title="View Attendance" description="View Student Attendance Month wise" button_text="View" link={this.state.view_monthwise_link}/>
					</div>
				</div>
			</div>
		)
	}
}


export class ParentStudentViewAttendanceMonthwise extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			student_id:""
		}
	}

	getAttendance(){
		if(localStorage.getItem('user_type') == "parent"){
			this.setState({
				student_id:this.props.match.params.student_id
			})
		}
	}
	componentDidMount(){
		this.getAttendance();
	}
	componentWillReceiveProps(){
		this.getAttendance();
	}
	render(){
		return(
			<div>
				<ParentStudentAttendanceHeader mainHeader="Attendance" header="View"/>
				<div className="container-fluid mt--6">
					<div className="row">
						{this.state.student_id && <ViewAttendance type="student" access_type="parent" student_id={this.state.student_id}/>}
					</div>
				</div>
			</div>
		)
	}
}


export class ViewAttendanceStudentModule extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	date: moment(new Date()).format('YYYY-MM'),
	    	attendance_details:"",
	    	student_details:"",
	    	total_month_count:"",
	    	total_present:0,
	    	total_absent:0,
	    	total_leave:0,
	    	none_entry:0
	    }
	    this.handleDate = this.handleDate.bind(this)
	    this.getAttendance = this.getAttendance.bind(this)
	}

	getAttendance(date = moment(new Date()).format('YYYY-MM')){
		this.setState({
		  attendance_details: "",
		  staff_details:"",
		  total_present: 0,
		  total_absent: 0,
		  total_leave: 0,
		  total_none: 0,
		  none_entry: 0,
		});
		self = this;
		  var url="/api/v1/student/attendance"
		axios({
		  url: url,
		  method: "post",
		  data: {
		    data: date,
		  },
		}).then((response) => {
		  self.setState({
		    attendance_details: response.data.success.attendance_details,
		    student_details: response.data.success.student_details,
		    total_month_count: response.data.success.total_month_count,
		    total_count: response.data.success.total_count,
		  });
		  var total_count = response.data.success.total_count;
		  total_count.map((item) => {
		    switch (item.attendance_type) {
		      case 1:
		        this.setState({
		          total_present: item.total,
		        });
		        break;
		      case 2:
		        this.setState({
		          total_absent: item.total,
		        });
		        break;
		      case 3:
		        this.setState({
		          total_leave: item.total,
		        });
		        break;
		      case 4:
		        this.setState({
		          total_none: item.total,
		        });
		        break;
		    }
		  });
		});
	}
	componentDidMount(){
		this.getAttendance()
	}
	componentWillReceiveProps(){
		this.getAttendance()
	}
	handleDate(e){
		this.setState({
			date:e.target.value
		})
		this.getAttendance(e.target.value)
	 };

	render(){
		const dataPoints = [{"y":this.state.total_present,label:"Total Present"},
							{"y":this.state.total_absent,label:"Total Absent"},
							  									   {"y":this.state.total_leave,label:"Total Leave"},
							  									   {"y":this.state.total_none,label:"Total None Entry"}
							  										];
		return(
			<div className="card mb-4">
			  <div className="card-body">
			    <div className="row">
						<div className="col-md-12">
			              <div className="form-group">
			                <label className="form-control-label" htmlFor="example3cols1Input">Select Month</label>
			                <input value={this.state.date} onChange={(e) => this.handleDate(e)} className="form-control" type="month" id="bdaymonth" name="bdaymonth" />
	    		          </div>	

			            {this.state.attendance_details && 
			            	<div>
			            		<div className="row">
			            			<table className="table">
			            				<tr>
			            				<td><label className="form-control-label">Total Present</label></td>
			            				<td><input type="number" className="form-control" disabled value={this.state.total_present}/></td>
			            				<td><label className="form-control-label"> Total Absent</label></td>
			            				<td><input type="number" className="form-control" disabled value={this.state.total_absent}/></td>
			            				</tr>
			            				<tr>
			            				<td><label className="form-control-label"> Total Leave</label></td>
			            				<td><input type="number" className="form-control" disabled value={this.state.total_leave}/></td>
			            				<td><label className="form-control-label"> None Entry</label></td>
			            				<td><input type="number" className="form-control" disabled value={this.state.total_none}/></td>
			            				</tr>
			            				<tr>
			            				<td><label className="form-control-label"> Total Entry</label></td>
			            				<td><input type="number" className="form-control" disabled value={this.state.total_month_count}/></td>
			            				</tr>
			            			</table>
			            		</div>
			            		<br />
			            		<div className="row">
								  <div className="table-responsive">
								    <table className="table">
								      <thead>
								        <th>S.NO</th>
								        <th>DATE</th>
								        <th>DAY</th>
								        <th>ATTENDANCE</th>
								      </thead>
								      <tbody>
								        {this.state.attendance_details.map((item, id) => {
								          return (
								            <EveryStudentRowForIndividual
								              id={id + 1}
								              user={this.state.student_details}
								              attendance={item}
								              type="1"
								            />
								          );
								        })}
								      </tbody>
								    </table>
								  </div>
							  	</div>
							</div>
			            }
			            </div>
			    </div>
			  </div>
			</div>
		)
	}
}