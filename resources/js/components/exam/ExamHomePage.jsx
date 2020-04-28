import React, { Component } from "react"
import {Link} from "react-router-dom"

export default class ExamHomePage extends Component{
	render(){
		return(
			<div className="container-fluid mt--6">
			  <div className="row card-wrapper">
            		<div className="col-lg-6">
			              <div className="card">
			                <div className="card-body">
			                  <h3 className="card-title mb-3">Add. Admin Card</h3>
			                  <p className="card-text mb-4">Add Admin Card in System</p>
			                  <Link to="/admin/exam/add-admit-card" className="btn btn-primary">Enter</Link>
			                </div>
			              </div>
		            </div>
		            <div className="col-lg-6">
			              <div className="card">
			                <div className="card-body">
			                  <h3 className="card-title mb-3">Fill. Exam Marksheet</h3>
			                  <p className="card-text mb-4">Fill the Marksheet of Student in System</p>
			                  <Link to="/admin/exam/fill-exam-marksheet" className="btn btn-primary">Enter</Link>
			                </div>
			              </div>
		            </div>
		            <div className="col-lg-6">
			              <div className="card">
			                <div className="card-body">
			                  <h3 className="card-title mb-3">Fill. Monthly Test Marksheet</h3>
			                  <p className="card-text mb-4">Fill the Marksheet of Student in System</p>
			                  <Link to="/admin/exam/view-admit-card" className="btn btn-primary">Enter</Link>
			                </div>
			              </div>
		            </div>
		        </div>
			</div>
		)
	}
}