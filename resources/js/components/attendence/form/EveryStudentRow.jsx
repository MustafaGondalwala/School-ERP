import React, {Component} from "react"

export default class EveryStudentRow extends Component{
	render(){
		return(
						<tr>
				    			<td>{this.props.id+1}</td>
				    			<td>{this.props.student.student_roll_no}</td>
				    			<td>{this.props.student.student_name}</td>
				    			<td>{this.props.student.student_father_name}</td>
				    			<td>
				    				<select className="form-control" data-id={this.props.student.id} name="attendance" value={this.props.student.attendance_type} onChange={this.props.onChange}>
				    					<option value="1"> Present </option>
				    					<option value="2"> Absence </option>
				    					<option value="3"> Leave </option>
				    					<option value="4"> None </option>
				    				</select>
				    			</td>
				    			</tr>

		)
	}
}