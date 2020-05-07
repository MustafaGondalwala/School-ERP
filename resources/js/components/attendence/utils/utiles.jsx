
import React, {Component} from "react"
import {Link} from "react-router-dom"
import DatePicker from "react-datepicker";
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";


const renderStudentAttendance = (attendance_type) => {
	switch(attendance_type){
		case 1:
			return "Present"
		case 2:
			return "Absence"
		case 3:
			return "Leave"
		case 4:
			return "None"
	}
}
export  const EveryStudentRow = ({id,user,onChange,attendance_type,type}) => (
						
						<tr>
				    			<td>{id+1}</td>
				    			<td>

				    			{type == "student" ? <span>{user.student.roll_no}</span>
				    			: 
					    			<span>
					    				{user.staff.empid}
					    			</span> 
				    			}
				    			</td>
				    			<td>
				    			{type == "student" ? <span>{user.student.student_name}</span> : <span>{user.staff.name}</span>}
				    			</td>
				    			<td>
				    			{type == "student" ? <span>{user.student.father_name}</span> : <span>{user.staff.designation}</span>}</td>
				    			<td>
				    				{attendance_type == "fill" ?
				    				<select className="form-control" data-id={user.id} name="attendance" value={user.attendance_type} onChange={onChange}>
				    					<option value="1"> Present </option>
				    					<option value="2"> Absence </option>
				    					<option value="3"> Leave </option>
				    					<option value="4"> None </option>
				    				</select>
				    				:  <span>{renderStudentAttendance(user.attendance_type)}</span> }
				    			</td>
				    			{attendance_type == "fill" && <td><input type="checkbox" /></td>}
				    			</tr>
)


const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856" }}>{text}</span>
);



export class SelectDate extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	  dateT:moment(new Date()).format('YYYY-MM-DD'),
	    	  date:new Date(),
	    }
	    this.get_attendance_response = this.get_attendance_response.bind(this)
	    this.handleDate = this.handleDate.bind(this)
	}

	get_attendance_response(attendance_type){
	  	    if(this.state.class_ !== "")
	  	   		this.props.submit(this.state.dateT,attendance_type)
	  		else
	  			this.setState({
	  				class_error:"Can't be blank"
	  			})
	}

	handleDate(date){
	    this.setState({
	      date :date,
	      dateT:moment(date).format('YYYY-MM-DD')
	    });
	  };
	render(){
		const {errors} = this
		return(
		<div className="card mb-4">
	        <div className="card-header">
	          <h3 className="mb-0">
	          		{ this.props.title }
	          	<Link  to={this.props.back_link} class="btn btn-neutral float-right" type="submit">Back</Link></h3>
	        </div>
	        <div className="card-body">
	          <div className="row">
					<div className="col-md-4">
		              <div className="form-group">
		                <label className="form-control-label" htmlFor="example3cols1Input">Select Date</label>
    		          	<DatePicker
    		          		className="form-control"
					        selected={this.state.date}
					        onSelect={(e) => this.handleDate(e)}
					        onChange={(e) => this.handleDate(e)}
					      />  
    		          </div>
		            </div>	        		
				</div>
	          	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("view")}>View Attendance</button>
	        	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("fill")}>Fill Attendance</button>
	        </div>
      	</div>
		)
	}
}



export  class SelectClass extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	          section:[],
	          distinct_classes:[],
	          classes:[],
	    	  classs_error:"",
	    	  dateT:moment(new Date()).format('YYYY-MM-DD'),
	    	  date:new Date(),
	    	  class_:"",
	    	  section_:"",
	    }
	    this.get_attendance_response = this.get_attendance_response.bind(this)
	    this.onChangeClasses =this.onChangeClasses.bind(this)
	    this.handleDate = this.handleDate.bind(this)
	}
		   

	   onChangeClasses(e){
	    var value = e.target.value
	    var value_by = []
	    this.state.classes.map((item)=>{
	      if(item.class_title == value){
	        value_by.push(item.section)
	      }
	    })
	    this.setState({
	      section:value_by
	    })
	    this.setState({
	    	class_:e.target.value
	    })
	    if(value_by.length >= 1){
	      this.setState({
	        section_: value_by[0]
	      })
	    }else{
	      this.setState({
	        section_: "",
	        section:[]
	      })
	    }
	  }
	  onChange(e){
	    this.setState({
	      [e.target.name]: e.target.value
	    });
	  }

	  
	  
	  get_attendance_response(attendance_type){
	  	   if(this.state.class_ !== "")
	  	   		this.props.submit(this.state.class_,this.state.section_,this.state.dateT,attendance_type)
	  		else
	  			this.setState({
	  				class_error:"Can't be blank"
	  			})
	  }

	  handleDate(date){
	    this.setState({
	      date :date,
	      dateT:moment(date).format('YYYY-MM-DD')
	    });
	  };
	  componentDidMount(){
	    var self = this
	
	    axios({
	      method:"post",
	      url:"/api/v1/class/get-all-classes"
	    }).then(response=>{
	      const uniqueClasses = [];
	      response.data.success.classes.map(item => {
	          if (uniqueClasses.indexOf(item.class_title) === -1) {
	              uniqueClasses.push(item.class_title)
	          }
	      });
	      self.setState({
	        classes:response.data.success.classes,
	        distinct_classes:uniqueClasses
	      });
	    })
	  }
	render(){
		const {errors} = this
		return(
		<div className="card mb-4">
	        <div className="card-header">
	          <h3 className="mb-0">
	          		{ this.props.title }
	          	<Link  to={this.props.back_link} class="btn btn-neutral float-right" type="submit">Back</Link></h3>
	        </div>
	        <div className="card-body">
	          <div className="row">
	            <div className="col-md-6">
	              <div className="form-group">
                       <label className="form-control-label" htmlFor="example3cols3Input">Class</label>
                       <select class="form-control"  name="class" onChange={(e) =>this.onChangeClasses(e)}>
                       					<option value="">Select Class</option>
                                        {this.state.distinct_classes.map(function(item){
                                          return <option value={item}>{item}</option>
                                        })}
                       </select>
                       {this.state.class_error && <InlineError text={this.state.class_error} />}
                     </div>
	            </div>

	            <div className="col-md-4">
	             <div className="form-group">
                       <label className="form-control-label" htmlFor="example3cols3Input">Section</label>
                                    <select class="form-control" value={this.section_} name="section_" onChange={(e) =>this.onChange(e)}>
                                      {
                                        this.state.section &&
                                        this.state.section.map((item)=>{
                                          return <option  value={item}>{item}</option>
                                        })
                                      }
                                      </select>
                     </div>
	            </div>
					<div className="col-md-4">
		              <div className="form-group">
		                <label className="form-control-label" htmlFor="example3cols1Input">Select Date<br /></label>
    		          	<DatePicker
    		          		className="form-control"
					        selected={this.state.date}
					        onSelect={(e) => this.handleDate(e)}
					        onChange={(e) => this.handleDate(e)}
					      />  
    		          </div>
		            </div>	        		
				</div>
	          	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("view")}>View Attendance</button>
	        	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("fill")}>Fill Attendance</button>
	        </div>
      	</div>
		)
	}
}


export class FillAttendanceFormStaff extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:null,
			section:null,
			date:null,
			button_text:"Update Attendance"
		}
		this.fetchProps = this.fetchProps.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	componentDidMount(){
		this.fetchProps()
	}
	componentWillReceiveProps(){
		this.fetchProps()
	}
	fetchProps(){
		var self = this
		this.setState({
			date:this.props.date,
			staff_attendace:null,
		})
		axios({
			url:"/api/v1/attendance/staff",
			method:"post",
			data: {
				date:this.props.date
			},
		}).then( response => {
			var staff_attendance = response.data.success.staff_attendance
			self.setState({
				staff_attendance: staff_attendance
			})
			var total_present = 0;
			var total_absent = 0;
			var total_leave = 0;
			staff_attendance.map(item => {
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
				}
			})
			self.setState({
				total_leave,total_present,total_absent
			})
		})
	}

	onChange(e){
		var id  = e.target.getAttribute('data-id');
		var temp_state = this.state.staff_attendance
		temp_state.map( item => {
			if(item.id == id){
				item.attendance_type = e.target.value 
			}
		})
		this.setState({
			staff_attendance:temp_state
		})
	}

	onSubmit(e){
		var self = this;
		this.setState({
			button_text:"Updating Attendance ..."
		})
		axios({
			method:"patch",
			url:"/api/v1/attendance/staff",
			data: this.state,
		}).then(response => {
			var staff_attendance = response.data.success.staff_attendance
			self.setState({
				staff_attendance: staff_attendance,
				button_text:"Update Attendance"
			})
			var total_present = 0;
			var total_absent = 0;
			var total_leave = 0;
			staff_attendance.map(item => {
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
				}
			})
			self.setState({
				total_leave,total_present,total_absent
			})
		})
	}

	render(){
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
			    		<div className="row">
				    		<div className="col">
				    		<label><h5>Present Staff:</h5></label>
				    		<input type="text" disabled value={this.state.total_present} className="form-control" />
				    		</div>
				    		<div className="col">
				    		<label><h5>Leave Staff:</h5></label>
				    		<input type="text" disabled value={this.state.total_leave} className="form-control" />
				    		</div>
				    		<div className="col">
				    		<label><h5>Absent Staff:</h5></label>
				    		<input type="text" disabled value={this.state.total_absent} className="form-control" />
				    		</div>
				    	</div>
			    	</div>
			    	<br />
			    	<br />
			    	{this.state.staff_attendance ? <span>
		    		
			    		<div classNameName="row">
					    	<div className="table-responsive">
						    	<table className="table datatable">
						    		<thead>
					    				<tr>
							    			<th>S.no</th>
							    			<th>Emp ID</th>
							    			<th>Employee Name</th>
							    			<th>Designation</th>
							    			<th>Attendance</th>
							    			{this.props.attendance_type == "fill" &&
							    				<th><input type="checkbox" className="custom-control-input"/>Check</th>
							    			}
					    				</tr>
						    		</thead>
						    		<tbody>
						    		{this.state.staff_attendance && this.state.staff_attendance.map((item,id) => {
						    			return <EveryStudentRow attendance_type={this.props.attendance_type} onChange={this.onChange} type="staff" user={item} id={id}/>
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
			    	</span> : <h2>Loading ...</h2>}
			    </div>
		    </div>
		)
	}
}

export class FillAttendanceForm extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:null,
			section:null,
			date:null,
			button_text:"Update Attendance",
			total_present:0,
			total_absent:0,
			total_leave:0
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
		axios({
			url:"/api/v1/attendance",
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
				}
			})
			self.setState({
				total_leave,total_present,total_absent
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
		axios({
			method:"patch",
			url:"/api/v1/attendance/",
			data: this.state,
		}).then(response => {
			var student_attendance = response.data.success.student_attendance
			self.setState({
				student_attendance: student_attendance,
				button_text:"Update Attendance"
			})
			var total_present = 0;
			var total_absent = 0;
			var total_leave = 0;
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
				}
			})
			self.setState({
				total_leave,total_present,total_absent
			})
		})
	}

	render(){
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
		    	</span> : <h2>Loading ...</h2>}
		    	
		    </div>
		  </div>

		)
	}
}