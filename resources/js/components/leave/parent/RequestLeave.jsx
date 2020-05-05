import React,{Component} from "react"
import { ParentLeaveHeader } from "./ParentLeaveComponent"
export class RequestLeave extends Component{
	render(){
		return(
			<div>
				<ParentLeaveHeader mainHeader="Leave" header="Request Leave" sub_header=""  />
				
				<div className="container-fluid mt--6">
					<div className="card mb-4">
					  <div className="card-header">
					    <h3 className="mb-0">Leave Request Form</h3>
					  </div>
					  <div className="card-body">
					    <form>
					    	<div className="form-group">
					    		<label className="form-control-label">Test</label>
					    		<input type="text" className="form-control"/>
					    	</div>
					    </form>
					  </div>
					</div>
				</div>

			</div>
		)
	}
}