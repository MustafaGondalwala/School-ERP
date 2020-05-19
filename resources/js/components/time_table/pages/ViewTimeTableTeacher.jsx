import React,{Component} from "react"
import SelectTeachers from "../form/SelectTeachers"
import {AdminTableTableHeader} from "../TimeTableHomePage"

export default class ViewTimeTableTeacher extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			teachers:null,
			teacher_id:null
		}

		this.getTeacherID = this.getTeacherID.bind(this)
	}
	componentDidMount(){
		this.getTeacherID(2);
	}

	getTeacherID(teacher_id){
		console.log(teacher_id)
		this.setState({
			teacher_id:teacher_id
		})
		axios({
			url:"/api/v1/time-table/get-time-table-teacher-wise",
			method:"post",
			data : {
				"teacher_id":teacher_id
			}
		}).then(response => {
			console.log(response.data)
		})
	}


	render(){
		return(
			<div>
			<AdminTableTableHeader mainHeader="Time Table" header="View Time Table" sub_header="Teacher" />
			<div className="container-fluid mt--6">
				<SelectTeachers back_link="/admin/time-table" submit={this.getTeacherID} />
			</div>
			</div>
		)
	}
}