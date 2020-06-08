import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import ViewStudent from "../utils/ViewStudent"
export default class StudentViewStudent extends Component{
	render(){
		return(
			<div>
				<AdminHeader mainHeader="Student" header="View Student"/>
                <div className="container-fluid mt--6">
                	<ViewStudent />
				</div>
			</div>
		)
	}
}