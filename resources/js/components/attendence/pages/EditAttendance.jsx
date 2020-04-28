import React,{Component} from "react"
import SelectClass from "../../fees/form/SelectClass"
import FillAttendanceForm from "../form/FillAttendanceForm"

export default class EditAttendance extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:null,
			section:null,
			date:null,
			attendance_type:null
		}
		this.getClass = this.getClass.bind(this)
	}	
	getClass(classes,section,date,attendance_type){
		console.log(classes,section,date,attendance_type)
		this.setState({
			classes:classes,
			section:section,
			date:date,
			attendance_type:attendance_type
		})
	}
	render(){
		return(
    		<div className="container-fluid mt--6">
				<SelectClass title="Select Class" hide_year="true" attendance_edit="true" submit={this.getClass}/>
				

					{ this.state.attendance_type == "fill" && <FillAttendanceForm attendance_type={this.state.attendance_type} date={this.state.date} classes={this.state.classes} section={this.state.section} />}
				

			</div>
		)
	}
} 