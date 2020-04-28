import React,{Component} from "react"
import {Link} from "react-router-dom"

import SetTeacherSubjectClassWiseForm from "../form/setTeacherSubjectClassWiseForm"

export default class setTeacherSubjectClassWise extends Component{
	
	

	render(){
		return(
			<div className="container-fluid mt--6">
		       <div className="row">
		         <div className="col-lg-12 col-md-12">
		           <div className="card-wrapper">
		             <div className="card">
		               <div className="card-header">
		                 <h3 className="mb-0">Set Teacher Subject/Class Wise <Link  to="/admin/time-table" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
		               </div>
		                <div className="card-body">
		              		<SetTeacherSubjectClassWiseForm />



		              	</div>
		              	</div>
		              	</div>
		              	</div>
		              	</div>
		              	</div>


		)
	}
}