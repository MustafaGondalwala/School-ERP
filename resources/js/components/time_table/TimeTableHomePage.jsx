import React,{Component} from "react"
import {Link} from "react-router-dom"

export default class TimeTableHomePage extends Component{
	render(){
		return(
			<div className="container-fluid mt--6">
        		<div className="row">
        			<div className="col-lg-4">
        			  <div className="card">
			            <div className="card-header bg-transparent">
			              <h2 className="h3 mb-0">Set Teacher Subject/Class Wise</h2>
			            </div>
			            <div className="card-body">
			              <p className="card-text mb-4">Set Teacher based on perferened Subject and Class.</p>
			              <Link to={"/admin/time-table/set-teacher-subject-classes-wise"} className="btn btn-primary" >
			              Set
			              </Link>
			            </div>
			          </div>
			        </div>


			        <div className="col-lg-4">
        			  <div className="card">
			            <div className="card-header bg-transparent">
			              <h2 className="h3 mb-0">Time Table Generate</h2>
			            </div>
			            <div className="card-body">
			              <p className="card-text mb-4">Generate the Time Table.</p>
			              <Link to={"/admin/time-table/generate-time-table"} className="btn btn-primary" >
			              Set
			              </Link>
			            </div>
			          </div>
			        </div>

			        <div className="col-lg-4">
        			  <div className="card">
			            <div className="card-header bg-transparent">
			              <h2 className="h3 mb-0"> View Time Table For Student </h2>
			            </div>
			            <div className="card-body">
			              <p className="card-text mb-4">View the Time Table.</p>
			              <Link to={"/admin/time-table/view-time-table"} className="btn btn-primary" >
			              View
			              </Link>
			            </div>
			          </div>
			        </div>

			         <div className="col-lg-4">
        			  <div className="card">
			            <div className="card-header bg-transparent">
			              <h2 className="h3 mb-0"> View Time Table For Teachers </h2>
			            </div>
			            <div className="card-body">
			              <p className="card-text mb-4">View the Time Table for Teachers.</p>
			              <Link to={"/admin/time-table/view-time-table-for-teacher"} className="btn btn-primary" >
			              View
			              </Link>
			            </div>
			          </div>
			        </div>
        		</div>
        	</div>
		)
	}
}