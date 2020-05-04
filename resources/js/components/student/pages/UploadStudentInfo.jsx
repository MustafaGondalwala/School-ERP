import React,{Component} from "react"
import SelectIndividualStudent from "../../fees/form/SelectIndividualStudent"
import RegisterStudentForm from "../forms/RegisterStudentForm"
export default class UploadStudentInfo extends Component{
	constructor(props){
		super(props)
		this.state = {
			student_info: "",
			add_student_button_text:"Update"
		}

		this.getStudent = this.getStudent.bind(this)
		this.update_student_info = this.update_student_info.bind(this)
	}

	componentDidMount(){
		var self = this
		axios({
			url:"/api/v1/student/get-indivitual-student/5"
		}).then(response => {
			self.setState({
				student_info:response.data.success
			})
		})
	}
	update_student_info(data){
		var self = this
	    this.setState({
	      add_student_button_text:"Updating Student ..."
	    })
	    const formData = new FormData();
	    Object.keys(data).map((item)=>{
	      formData.append(item,data[item])
	    })
		axios({
			url:"/api/v1/student/add-register-student",
			method:"post",
      		data:formData,
		}).then(response => {
			this.setState({
				add_student_button_text:"Update",
				student_info:"",
				show_success_message:true
			})
		})
	}

	getStudent(student_id,select_year){
		this.setState({
			student_info:"",
				show_success_message:false

		})
		var self = this
		axios({
			url:"/api/v1/student/get-indivitual-student/"+student_id
		}).then(response => {
			self.setState({
				student_info:response.data.success,
				show_success_message:false

			})
		})
	}
	render(){
		return(
			<div>
      		<div className="container-fluid mt--6">
      			{this.state.show_success_message &&
                  <div className="row">
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-icon"><i className="ni ni-like-2" /></span>
                        <span className="alert-text">
                          <div>Student Data Uploaded.</div>
                        </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                  </div>
                }


      			<SelectIndividualStudent submit={this.getStudent} title="Select Student" hide_year={true}/>
			</div>
			<br />
			<br />
			<br />

			{this.state.student_info && 
					<RegisterStudentForm submit={this.update_student_info} add_student_button_text={this.state.add_student_button_text} title={"Update Student Info"} hide_button = {true} student_info = {this.state.student_info} />		
			}
			</div>
		)
	}
}