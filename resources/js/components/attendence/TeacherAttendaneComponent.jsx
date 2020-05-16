import React,{Component} from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { SelectDate, FillAttendanceForm, SelectStudent, ViewParticularAttendance, AddEditTeacherAttendance } from "./utils/utiles"
import { newAssignedTeacherClass,newTeacherAttendance } from "../actions/auth"
import moment from "moment"
import TeacherAttendanceHeader from "./utils/TeacherAttendanceHeader";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

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

export class TeacherAttendanceHome extends Component{
	
	render(){
		return(
			<div>
				<TeacherAttendanceHeader class_id={this.props.match.params.class_id} mainHeader="Teacher Attendance" header="Home" />
				<div className="container-fluid mt--6">
					<div className="row">
						<ColComponent title={"Student Attendance"} description="Edit/View Student Attendance" link={`/attendance/${this.props.match.params.class_id}/edit`} button_text="Edit/View"/>
						<ColComponent title={"View individual Student Attendance"} description="View individual Student Attendance" link={`/attendance/${this.props.match.params.class_id}/view`} button_text="View"/>
					</div>
				</div>
			</div>	
		)
	}
}


export class TeacherAttendanceViewIndividual extends Component{
	constructor(props){
		super(props)
		this.state = {
			student_id:""
		}
	}
	handleInputChange(e){
		this.setState({
		  student_id:e.value
		})
	  };
	  render(){
		return(
			<div>
				<TeacherAttendanceHeader class_id={this.props.match.params.class_id} mainHeader="Teacher Attendance" header="Home" />
				<div className="container-fluid mt--6">
					<ViewParticularAttendance user_type="student" class_id={this.props.match.params.class_id} access_type="teacher" title="Select Student" back_link={`/teacher/attendance/${this.props.match.params.class_id}`}/>
				</div>
			</div>
		)
	}
}


class TeacherAttendanceEditView extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:"",
			section:""
		}
		this.updateClassSection = this.updateClassSection.bind(this)
	}

	updateClassSection(){
		if(Object.keys(this.props.assignTeacherClass).length == 0){
          axios({
            url:"/api/v1/teacher/assign/"+this.props.user.id
          }).then(response => {
            this.props.newAssignedTeacherClass(response.data.success.assigned_class)
            this.setState({
              assigned_class: response.data.success.assigned_class
            })
            response.data.success.assigned_class.map(item => {
            	if(item.id == this.props.match.params.class_id){
            		this.setState({
            			classes:item.class_title,
            			section:item.section
            		})
            	}
            })
          })
        }else{
          this.setState({
            assigned_class:this.props.assignTeacherClass
          })
          this.props.assignTeacherClass.map(item => {
          	if(item.id == this.props.match.params.class_id){
            		this.setState({
            			classes:item.class_title,
            			section:item.section
            		})
            	}
          })
        }
	}
	componentDidMount(){
		this.updateClassSection()
	}
	componentWillReceiveProps(){
		this.updateClassSection()
	}
	render(){
		return(
			<div>
			<TeacherAttendanceHeader class_id={this.props.match.params.class_id} mainHeader="Teacher Attendance" header="Home" />
				<div className="container-fluid mt--6">
					<AddEditTeacherAttendance classes={this.state.classes} title="Select Date" back_link={`/teacher/attendance/${this.props.match.params.class_id}`} section={this.state.section}/>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
  return {
    user: state.user,
    assignTeacherClass: state.assignTeacherClass
  };
}

const ConnectedTeacherAttendanceEditView = connect(mapStateToProps,{newAssignedTeacherClass}) (TeacherAttendanceEditView); 
export {ConnectedTeacherAttendanceEditView as TeacherAttendanceEditView}
