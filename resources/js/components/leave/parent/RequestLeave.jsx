import React,{Component} from "react"
import { ParentLeaveHeader } from "./ParentLeaveComponent"
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { newParentChildren } from "../../actions/auth"
import InlineError from "../messages/InlineError"

class RequestLeaveForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			data: {
				from:"",
				to:"",
			reason:"Nothing"
			},
			errors:{}
		}
		this.onChange = this.onChange.bind(this)
		this.makeInputNull = this.makeInputNull.bind(this)
	}
	onChange(e){
	    this.setState({
	      data: {...this.state.data,[e.target.name]:e.target.value}
	    });
	  }
	validate(data){
	    const errors = {};
	    if (!data.to) errors.to = "Can't be blank";
	    if (!data.from) errors.from = "Can't be blank";

	    if (data.reason.length < 5) errors.reason = "Min. Length 3 char."
	    return errors;
	 };

	onSubmit(e){
	    e.preventDefault();
	    const errors = this.validate(this.state.data);
	    this.setState({ errors });
	    if (Object.keys(errors).length === 0) {
	      this.props.submit(this.state.data)
	    }
	 }
	makeInputNull(){
		this.setState({
			data: {
				from:"2020-05-20",
				to:"2020-05-25",
				reason:"Nothing"
			}
		})
	}
	componentWillReceiveProps(){
		if(this.props.success_message != ""){
			this.makeInputNull()
		}
		this.setState({
			errors:this.props.errors
		})
	}
	render(){
		const {student} = this.props
		const {data,errors} = this.state	
		return	(
			<form>
			 	{this.props.success_message &&
                  <div className="row">
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-icon"><i className="ni ni-like-2" /></span>
                        <span className="alert-text">
                          <div>{this.props.success_message}</div>
                        </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                  </div>
                }

                {this.props.errors_message && <div className="alert alert-warning alert-dismissible fade show" role="alert">
	                <span className="alert-icon"><i className="ni ni-like-2" /></span>
	                <span className="alert-text"><strong>Warning!</strong> {this.props.errors_message}</span>
	                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
	                  <span aria-hidden="true">×</span>
	                </button>
	              </div>
	              }
				<div className="form-group">
					<label className="form-control-label">Student Name: {student.student_name}</label>
				</div>
				<div className="form-group">
					<label className="form-control-label">Class: {student.class} {student.section}</label>
				</div>
				<div className="form-group">
					<label className="form-control-label">Leave From: </label>
					<input type="date" value={data.from} name="from" className="datepicker form-control" id="from" onChange={(e) =>this.onChange(e)}/>
                     {errors.from && <InlineError text={errors.from} />}
					
				</div>
				<div className="form-group">
					<label className="form-control-label">Leave to: </label>
					<input type="date" value={data.to} name="to" className="datepicker form-control" id="to" onChange={(e) =>this.onChange(e)}/>
                     {errors.to && <InlineError text={errors.to} />}
					
				</div>
				<div className="form-group">
					<label className="form-control-label">Leave Reason: </label>
					<input type="text" value={data.reason} name="reason" className="form-control" onChange={(e) =>this.onChange(e)} placeholder="Rease for Student Leave"/>
                     {errors.reason && <InlineError text={errors.reason} />}
				
				</div>
				<div className="form-group">
					<button  onClick={e => this.onSubmit(e)} className="btn btn-primary">{this.props.button_text}</button>
				</div>
			</form>
		)
	}
}

export class RequestLeave extends Component{
	constructor(props){
		super(props)
		this.state = {
			students:"",
			button_text:"Send Request",
			one_child:"",
			errors_message:"",
			errors:{}
		}
		this.getOneStudent = this.getOneStudent.bind(this)
		this.sendLeaveRequest = this.sendLeaveRequest.bind(this)
	}
	componentDidMount(){
		var self = this
		  if(Object.keys(this.props.students).length == 0){
	        axios({
	          url:"/api/v1/parent/get-childs"
	        }).then(response => {
	          self.setState({
	            students:response.data.success.students
	          })
	          self.getOneStudent(response.data.success.students)
          	  self.props.newParentChildren(response.data.success.students)
	        })
	      }
	      else{
	        this.setState({
	          students:this.props.students
	        })
	         this.getOneStudent(this.props.students)
	      }
	}
	getOneStudent(students){
		var self = this
		var student_id = this.props.match.params.student_id
		students.map(item => {
			if(item.id == student_id){
				self.setState({
					one_child:item
				})
			}
		})
	}

	sendLeaveRequest(data){
		var self = this;
		this.setState({
			button_text:"Sending Request ...",
			success_message:"",
			errors_message:"",
			errors:{}
		})
		data.id = this.state.one_child.id;
		data.type = 1;
		axios({
			url:"/api/v1/leave",
			method:"post",
			data: data
		}).then(response => {
			this.setState({
				success_message:response.data.success.message,
				button_text:"Send Request"
			})
		}).catch(errors => {
			this.setState({
				errors_message:errors.response.data.message,
				button_text:"Send Request",
			})
			this.setState({
				errors:errors.response.data.errors
			})
		})
	}
	render(){
		return(
			<div>
				<ParentLeaveHeader mainHeader="Leave" header="Request Leave" sub_header=""  />
				<div className="container-fluid mt--6">
					<div className="card mb-4">
					  <div className="card-header">
					    <h3 className="mb-0">Leave Request Form<Link  to={`/parent/leave/${this.props.match.params.student_id}`} className="btn btn-neutral float-right" type="submit">Back</Link></h3>
                    

					  </div>
					  <div className="card-body">
					  	{this.state.one_child && 
					    	<RequestLeaveForm errors={this.state.errors} errors_message={this.state.errors_message} success_message={this.state.success_message} button_text={this.state.button_text} submit={this.sendLeaveRequest} student={this.state.one_child}/>
					  	}
					  </div>
					</div>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
  return {
    students: state.parent_children
  };
}

export default connect(mapStateToProps,{ newParentChildren })(RequestLeave);
