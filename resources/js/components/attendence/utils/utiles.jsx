
import React, {Component} from "react"
import {Link} from "react-router-dom"
import DatePicker from "react-datepicker";
import moment from "moment"
import Select from "react-select"
import FillAttendanceForm from "./FillAttendanceForm"
import "react-datepicker/dist/react-datepicker.css";
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export const ShowAttendance = () => (
	<div>hello</div>
)

export class SelectStudent extends Component{
	constructor(props){
		super(props)
		this.state = {
		  student_list: [],
		}
	  }
	
	  componentDidMount(){
		var self = this
		var url = ""
		if(this.props.class_id && this.props.access_type==="teacher"){
			url = "/api/v1/student/searchable/"+this.props.class_id
		}else{
			url = "/api/v1/student/get-all-searable-student"
		}
		axios({
		  url:url
		}).then(response=>{
		  self.setState({
			student_list:response.data.success.student
		  })
		})
	  }
	 
	render(){
		return(
			<div className="card mb-4">
				<div className="card-header">
				<h3 className="mb-0">{this.props.title} <Link  to={this.props.back_link} class="btn btn-neutral float-right" type="submit">Back</Link></h3>
				</div>
				<div className="card-body">
				<div className="row">
					<div className="col-md-6">
					<div className="form-group">
						<label className="form-control-label" htmlFor="example3cols1Input">Select Student</label>
						<Select options={this.state.student_list}  onChange={this.props.handleInputChange} />
						{/* {errors_student_list && <InlineError  text={errors_student_list}/>} */}
					</div>
					</div>
				</div>
				</div>
			</div>
		)
	}
}
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


export class FillAttendanceFormStaff extends Component{
	constructor(props){
		super(props)
		this.state = {
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
			staff_attendace:"",
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

export class SelectDate extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	dateT:moment(new Date()).format('YYYY-MM-DD'),
	    	date:new Date(),
	    	attendance_type:""
	    }
	    this.get_attendance_response = this.get_attendance_response.bind(this)
	    this.DatePickerChange = this.DatePickerChange.bind(this)
	}

	get_attendance_response(attendance_type){
	  	    if(this.state.dateT !== ""){
	  	    	this.setState({
	  	    		attendance_type
	  	    	})
	  	    }
	  		else
	  		this.setState({
	  			date:"Can't be blank"
	  		})
	}

	DatePickerChange(data){
		this.setState({
	      date :new Date(data),
	      dateT:moment(data).format('YYYY-MM-DD')
	    });
	}
	render(){
		const {errors} = this
		return(
		<div>
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
					        onSelect={this.DatePickerChange}
					        onChange={this.DatePickerChange}
					      />  
    		          </div>	
		            </div>	        		
				</div>
	          	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("view")}>View Attendance</button>
	        	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("fill")}>Fill Attendance</button>
	        </div>
      	</div>
      	{this.state.attendance_type && <FillAttendanceFormStaff attendance_type={this.state.attendance_type} date={this.state.dateT}/>}
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
	    	  attendance_type:""
	    }
	    this.get_attendance_response = this.get_attendance_response.bind(this)
	    this.onChangeClasses =this.onChangeClasses.bind(this)
	    this.handleDate = this.handleDate.bind(this)
	}
		   

	   onChangeClasses(e){
	    var value = e.target.value
	     this.setState({
	      attendance_type:"",
	      class_error:""
	    })
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
	      [e.target.name]: e.target.value,
	    });
	    this.setState({
	      attendance_type:""
	    })
	  }
	  
	  get_attendance_response(attendance_type){
	  	   if(this.state.class_ !== ""){
	  	   		this.setState({
	  	   			class_error:"",
	  	   			attendance_type:attendance_type
	  	   		})
	  	   }
	  		else
	  			this.setState({
	  				class_error:"Can't be blank"
	  			})
	  }

	  handleDate(date){
	    this.setState({
	      date :date,
	      dateT:moment(date).format('YYYY-MM-DD'),
	      attendance_type:""
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
		<div>
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
                                          if(item != null)
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
		{this.state.attendance_type && <FillAttendanceForm attendance_type={this.state.attendance_type} date={this.state.dateT} classes={this.state.class_} section={this.state.section_} />}
      	</div>
		)
	}
}





export class ViewParticularAttendance extends Component{
	constructor(props){
		super(props)
		this.state = {
			student_id:"",
			staff_id:""
		}
	}
	render(){
		const getStudentID = (data) =>{
			this.setState({
				student_id:data.value
			})
		}
		const getStaffID = (data) => {
			this.setState({
				staff_id:data.value
			})
		}
		return(
			<div>
			  {this.props.user_type == "student" ? (
			    <div>
			      <SelectStudent
			        handleInputChange={getStudentID}
			        title={this.props.title}
			        access_type={this.props.access_type}
			        class_id={this.props.class_id}
			        back_link={this.props.back_link}
			      />
			    </div>
			  ) : (
			    <div>
			    	<SelectStaff handleInputChange={getStaffID} title={this.props.title} back_link={this.props.back_link} />
			    </div>
			  )}
			  {this.state.student_id && <ViewAttendance type="student"  student_id={this.state.student_id}/>}
			  {this.state.staff_id && <ViewAttendance type="staff" staff_id={this.state.staff_id} />}
				
			</div>
		)
	}
}


class SelectStaff extends Component{
	constructor(props){
		super(props)
		this.state = {
			staff_list:[]
		}
	}
	componentDidMount(){
		var self = this;
		var url = "/api/v1/staff/searchable"
		axios({
			url:url
		}).then(response=>{
			self.setState({
				staff_list:response.data.success.staff
			})
		})
	}
	render(){
		return(
			<div className="card mb-4">
				<div className="card-header">
				<h3 className="mb-0">{this.props.title} <Link  to={this.props.back_link} class="btn btn-neutral float-right" type="submit">Back</Link></h3>
				</div>
				<div className="card-body">
				<div className="row">
					<div className="col-md-6">
					<div className="form-group">
						<label className="form-control-label" htmlFor="example3cols1Input">Select Student</label>
						<Select options={this.state.staff_list}  onChange={this.props.handleInputChange} />
					</div>
					</div>
				</div>
				</div>
			</div>
		)
	}
}
export class ViewAttendance extends Component{
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
		var url = "";
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
		if (this.props.type == "student"){
		  url =
		    "/api/v1/attendance/get_particular/" +
		    this.props.type +
		    "/" +
		    this.props.student_id


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
		else{
			url = "/api/v1/attendance/get_particular/" +this.props.type + "/" + this.props.staff_id
			axios({
				url:url,
				method:"post",
				data: {
				    data: date,
				  },
			}).then(response=>{
				  self.setState({
				    attendance_details: response.data.success.attendance_details,
				    staff_details: response.data.success.student_details,
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
				})
			})
		}
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
			            		<br />
			            		<br />
			            		<br />
							  	<div className="row">
							  		<Chart type="pie" title="Student Monthly Attendance" file_name="student_monthly_attendance" dataPoints={dataPoints}/>	
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


export const EveryStudentRowForIndividual = ({id,user,attendance,type}) => {
	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	return(
		<tr>
		  <td>{id}</td>
		  <td>{attendance.attendance_date}</td>
		  <td>{weekday[new Date(attendance.attendance_date).getDay()]}</td>
		  <td>{renderStudentAttendance(attendance.attendance_type)}</td>
		</tr>
	)
}


export const Chart  = ({file_name,title,type,dataPoints}) => {
	const options = {
      animationEnabled: true,
      exportFileName: file_name,
      theme: "light2",
      title:{
        text: title
      },
      exportEnabled: true,
      data: [{
        type: type,
        dataPoints: dataPoints
    }]
    };
	return(
    	<CanvasJSChart options = {options} />
	)
}



export class AddEditTeacherAttendance extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	dateT:moment(new Date()).format('YYYY-MM-DD'),
	    	date:new Date(),
	    	attendance_type:""
	    }
	    this.get_attendance_response = this.get_attendance_response.bind(this)
	    this.DatePickerChange = this.DatePickerChange.bind(this)
	}
	get_attendance_response(attendance_type){
	  	    if(this.state.dateT !== ""){
	  	    	this.setState({
	  	    		attendance_type
	  	    	})
	  	    }
	  		else
	  		this.setState({
	  			date:"Can't be blank"
	  		})
	}

	DatePickerChange(data){
		this.setState({
	      date :new Date(data),
	      dateT:moment(data).format('YYYY-MM-DD')
	    });
	}
	render(){
		return(
			<div>
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
							        onSelect={this.DatePickerChange}
							        onChange={this.DatePickerChange}
							      />  
		    		          </div>	
				            </div>	        		
						</div>
			          	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("view")}>View Attendance</button>
			        	<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("fill")}>Fill Attendance</button>
			        </div>
		      	</div>

			{this.state.attendance_type && <FillAttendanceForm attendance_type={this.state.attendance_type} date={this.state.dateT} classes={this.props.classes} section={this.state.section} />}
		    </div>
		)
	}
}
