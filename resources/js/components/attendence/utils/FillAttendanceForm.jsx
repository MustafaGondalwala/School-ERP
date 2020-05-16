import React,{Component} from "react"
import { connect } from "react-redux"
import { EveryStudentRow, Chart } from "./utiles"
import moment from "moment"
import { removeTeacherAttendance } from "../../actions/auth"
class FillAttendanceForm extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:null,
			section:null,
			date:null,
			button_text:"Update Attendance",
			total_present:0,
			total_absent:0,
			total_leave:0,
			total_none:0
		}
		this.fetchProps = this.fetchProps.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	fetchProps(){
		var self = this
		this.setState({
			classes:this.props.classes,
			section:this.props.section,
			date:this.props.date,
			student_attendance:null,
		})

		var url = "/api/v1/attendance"
		if(this.props.user_type == "teacher"){
			url = "/api/v1/attendance/teacher"
		}
		axios({
			url:url,
			method:"post",
			data: {
				classes:this.props.classes,
				section:this.props.section,
				date:this.props.date
			},
		}).then( response => {
			var student_attendance = response.data.success.student_attendance
			self.setState({
				student_attendance: student_attendance
			})
			var total_present = 0;
			var total_absent = 0;
			var total_leave = 0;
			var total_none = 0;
			student_attendance.map(item => {
				switch(item.attendance_type){
					case 1:
						total_present += 1;
						break;
					case 2:
						total_absent += 1;
						break;
					case 3:
						total_leave += 1
						break
					case "4":
					case 4:
						total_none += 1;
						break;
				}
			})
			self.setState({
				total_leave,total_present,total_absent,total_none
			})

		})
	}
	componentDidMount(){
		this.fetchProps()
	}
	componentWillReceiveProps(){
		this.fetchProps()
	}

	onChange(e){
		var id  = e.target.getAttribute('data-id');
		var temp_state = this.state.student_attendance
		temp_state.map( item => {
			if(item.id == id){
				item.attendance_type = e.target.value 
			}
		})
		this.setState({
			student_attendance:temp_state
		})
	}

	onSubmit(e){
		var self = this;
		this.setState({
			button_text:"Updating Attendance ..."
		})
		var url = "/api/v1/attendance"
		if(this.props.user_type == "teacher"){
			url = "/api/v1/attendance/teacher"
		}
		axios({
			method:"patch",
			url:url,
			data: this.state,
		}).then(response => {
			this.props.removeTeacherAttendance();
			var student_attendance = response.data.success.student_attendance
			self.setState({
				student_attendance: student_attendance,
				button_text:"Update Attendance"
			})
			var total_present = 0;
			var total_absent = 0;
			var total_leave = 0;
			var total_none = 0;
			student_attendance.map(item => {
				switch(item.attendance_type){
					case "1":
					case 1:
						total_present += 1;
						break;
					case "2":
					case 2:
						total_absent += 1;
						break;
					case "3":
					case 3:
						total_leave += 1
						break
					case 4:
					case "4":
						total_none +=1
						break;
				}
			})
			self.setState({
				total_leave,total_present,total_absent,total_none
			})
		})
	}

	render(){
		const dataPoints = [{"y":this.state.total_present,label:"Total Present"},
							{"y":this.state.total_absent,label:"Total Absent"},
							  									   {"y":this.state.total_leave,label:"Total Leave"},
							  									   {"y":this.state.total_none,label:"Total None Entry"}
							  										];
		return(
		  <div className="card mb-4">
		    <div className="card-header">
		      <h3 className="mb-0">

		      {this.props.attendance_type == "fill" ? <span>Fill </span> : <span>View </span>}
		       Attendance</h3>
		    </div>
		    <div className="card-body">
		    	<div className="row">
		    		<div className="col">
		    			Attendance Date: {this.state.date}
		    		</div>
		    		<div className="col">
		    			<div className="col">
		    			<span>Class: {this.state.classes}</span>
		    			</div>

		    			{this.state.section && 
		    				<div className="col"><span>Section: {this.state.section}</span></div>
		    			}
		    		</div>
		    	</div>
		    	<div className="row">
		    		<div className="col">
		    		<label><h5>Present Student:</h5></label>
		    		<input type="text" disabled value={this.state.total_present} className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Leave Student:</h5></label>
		    		<input type="text" disabled value={this.state.total_leave} className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Absent Student:</h5></label>
		    		<input type="text" disabled value={this.state.total_absent} className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Attendance Pending:</h5></label>
		    		<input type="text" disabled value={this.state.total_none} className="form-control" />
		    		</div>
		    	</div>
		    	<br />
		    	<br />

		    	{this.state.student_attendance ? <span>
		    		
		    		<div classNameName="row">
			    	<div className="table-responsive">
				    	<table className="table datatable">
				    		<thead>
			    				<tr>
					    			<th>S.no</th>
					    			<th>Roll No</th>
					    			<th>Student Name</th>
					    			<th>Father Name</th>
					    			<th>Attendance</th>
					    			{this.props.attendance_type == "fill" &&
					    				<th><input type="checkbox" className="custom-control-input"/>Check</th>
					    			}
			    				</tr>
				    		</thead>
				    		<tbody>
				    		{this.state.student_attendance && this.state.student_attendance.map((item,id) => {
				    			return <EveryStudentRow attendance_type={this.props.attendance_type} onChange={this.onChange} type="student" user={item} id={id}/>
				    		})}
				    		</tbody>
				    	</table>
			    	</div>
		    	</div>
		    	
		    	{this.props.attendance_type == "fill" &&
			    	<div className="row">
			    		<button className="btn btn-primary" onClick={this.onSubmit}>{this.state.button_text}</button>
			    	</div>
		    	}
		        
		    	<br />
		    	<br />
		        {this.props.attendance_type == "view" && <Chart title={`Student Attendance for ${moment(new Date()).format('DD-MM-YYYY')}`} filename={`student_attendance`} type="pie" dataPoints={dataPoints}/>}
		    	</span> : <h2>Loading ...</h2>}
		    	
		    </div>
		  </div>

		)
	}
}

export default connect(null,{ removeTeacherAttendance })(FillAttendanceForm);
