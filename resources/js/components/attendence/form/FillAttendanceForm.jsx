import React,{ Component } from "react"
import EveryStudentRow from "./EveryStudentRow"

export default class FillAttendanceForm extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:null,
			section:null,
			date:null
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
			student_attendance:null
		})
		axios({
			url:"/api/v1/attendance/get-student-attendance",
			method:"post",
			data: {
				classes:this.props.classes,
				section:this.props.section,
				date:this.props.date
			}
		}).then( response => {
			self.setState({
				student_attendance:response.data.success.student_attendance
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
		// this.setState({
		// 	student_attendance:null
		// })
		axios({
			method:"post",
			url:"/api/v1/attendance/update-attendance",
			data: this.state,
		}).then(response => {
			self.setState({
				student_attendance:response.data.success.student_attendance
			})
		})
	}

	render(){
		return(
		  <div className="card mb-4">
		    <div className="card-header">
		      <h3 className="mb-0">Fill Attendance</h3>
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
		    		<div className="col">
		    			<label> Change Date: </label>
		    			<input className="form-control" type="date" value={this.state.date} />
		    		</div>
		    	</div>
		    	<div className="row">
		    		<div className="col">
		    		<label><h5>Present Student:</h5></label>
		    		<input type="text" className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Leave Student:</h5></label>
		    		<input type="text" className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Absent Student:</h5></label>
		    		<input type="text" className="form-control" />
		    		</div>
		    	</div>
		    	<br />
		    	<br />

		    	{this.state.student_attendance ? <span>
		    		
		    		<div classNameName="row">
			    	<div className="table-responsive">
				    	<table className="table">
				    		<thead>
			    				<tr>
				    			<th>S.no</th>
				    			<th>Roll No</th>
				    			<th>Student Name</th>
				    			<th>Father Name</th>
				    			<th>Attendance</th>
			    				</tr>
				    		</thead>
				    		<tbody>
				    		{this.state.student_attendance && this.state.student_attendance.map((item,id) => {
				    			return <EveryStudentRow onChange={this.onChange}  student={item} id={id}/>
				    		})}
				    		</tbody>
				    	</table>
			    	</div>
		    	</div>
		    	<div className="row">
		    	<button className="btn btn-primary btn-block" onClick={this.onSubmit}>Update Attendance</button>
		    	</div>

		    	</span> : <h2>Loading ...</h2>}
		    	
		    </div>
		  </div>

		)
	}
}