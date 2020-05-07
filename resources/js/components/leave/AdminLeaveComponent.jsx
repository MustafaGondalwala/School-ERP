import React,{Component} from "react"
import {Link} from "react-router-dom"


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

export const AdminLeaveHeader = ({mainHeader,header,sub_header}) => (
		<div className="header bg-primary pb-6">
		  <div className="container-fluid">
		    <div className="header-body">
		      <div className="row align-items-center py-4">
		        <div className="col-lg-6 col-7">
		          <h6 className="h2 text-white d-inline-block mb-0">{mainHeader}</h6>
		          <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
		            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
		              <li className="breadcrumb-item"><a href="#"><i className="fas fa-home" /></a></li>
		              <li className="breadcrumb-item"><a href="#">{header}</a></li>
		              {sub_header && 
		              	<li className="breadcrumb-item active" aria-current="page">{sub_header}</li>
		          	  }
		            </ol>
		          </nav>
		        </div>
		        <div className="col-lg-6 col-5 text-right">
		          <a href="#" className="btn btn-sm btn-neutral">New</a>
		          <a href="#" className="btn btn-sm btn-neutral">Filters</a>
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Leave Request Pending</h5>
		                  <span className="h2 font-weight-bold mb-0">350,897</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
		                    <i className="ni ni-active-40" />
		                  </div>
		                </div>
		              </div>
		              
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Todays Leave Request</h5>
		                  <span className="h2 font-weight-bold mb-0">2,356</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
		                    <i className="ni ni-chart-pie-35" />
		                  </div>
		                </div>
		              </div>
		             
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Student Leave Request</h5>
		                  <span className="h2 font-weight-bold mb-0">924</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
		                    <i className="ni ni-money-coins" />
		                  </div>
		                </div>
		              </div>
		           
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Staff Leave Request</h5>
		                  <span className="h2 font-weight-bold mb-0">924</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
		                    <i className="ni ni-money-coins" />
		                  </div>
		                </div>
		              </div>
		           
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
)
export const AdminLeaveHome = () => (
			<div>
				 <AdminLeaveHeader mainHeader="Leave" header="Home"/>
				 <div className="container-fluid mt--6">
			      <div className="row card-wrapper">
			      	<ColComponent title="Attend Request" description="Attend Leave Request from Staff and Student" link="/admin/leave/attend-request" button_text="Attend"/>
			       </div>
			    </div>
		    </div>
		)





const renderSwitchUserType = (user_type) => {
	switch(user_type){
		case 1:
			return "Student"
		break
		case 2:
			return "Staff"
		break
	}
}
const renderSwitchStatus = (status) => {
	switch(status){
		case 1:
			return "Accepted"
		case 2:
			return "Pending"
		case 0:
			return "Rejected"
	}
}

class RequestPant extends Component{
	constructor(props){
		super(props)
		this.state = {
			model_reason: ""
		}
		this.updateModelReason = this.updateModelReason.bind(this)
	}
	updateModelReason(e){
		var reason = e.target.getAttribute('data-reason')
		this.setState({
			model_reason:reason
		})
	}

	render(){
		return(
			<div className="card mb-4">
						<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							  <div class="modal-dialog" role="document">
							    <div class="modal-content">
							      <div class="modal-header">
							        <h5 class="modal-title" id="exampleModalLabel">View Leave Reason</h5>
							        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div class="modal-body">
							      	{this.state.model_reason}
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							      </div>
							    </div>
							  </div>
							</div>
				        <div className="card-body">	
							<div className="table-responsive">
								<table className="table datatable">
									<tr>
										<th>User Type</th>
										<th>Name</th>
										<th>From</th>
										<th>To</th>
										<th>Reason</th>
										<th>Status</th>
										<th>Action</th>
									</tr>
									{this.props.student_request && this.props.student_request.map((item,key) => {
										return <tr key={key}>
											<td>
											{renderSwitchUserType(item.user_type)}
											</td>
											<td>
												{item.user_type == 1 ? <span>{item.student_info.student_name}</span> : <span>{item.staff.name}</span>}
											</td>
											<td>{item.from}</td>
											<td>{item.to}</td>
											<td>
											<button type="button" data-reason={item.reason} onClick={(e) => this.updateModelReason(e)} class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">Reason</button></td>
											<td>{renderSwitchStatus(item.accepted)}</td>
											<td>
												<div className="btn btn-group">
													<button className="btn btn-success btn-sm" data-id={item.id} data-user-type={item.user_type} data-action-type="accept" data-status={item.accepted} onClick={(e) => this.props.ChangeLeaveStatus(e)}>Accept</button>
													<button className="btn btn-warning btn-sm" data-id={item.id} data-user-type={item.user_type} data-action-type="reject" data-status={item.accepted} onClick={(e) => this.props.ChangeLeaveStatus(e)}>Reject</button>
												</div>
											</td>
										</tr>
									})}
								</table>
							</div>
						</div>
			</div>
		)
	}
}

export class AttendLeaveRequest extends Component{
	constructor(props){
		super(props)
		this.state = {
			student_request: "",
			user_id:"",
		}
	}
	componentDidMount(){
		var self = this;
		axios({
			url:"/api/v1/leave",
		}).then(response => {
			self.setState({
				student_request: response.data.success.leave_request
			})
			console.log(response.data.success.leave_request)
		})
	}

	ChangeLeaveStatus(e){
		var id = e.target.getAttribute('data-id')
		var status = e.target.getAttribute('data-status')
		var actiontoTaken = e.target.getAttribute("data-action-type");
		var user_type = e.target.getAttribute('data-user-type')
		axios({
			url:"/api/v1/leave/update",
			method:"patch",
			data:{
				id,status,user_type,actiontoTaken
			}
		}).then(response => {
			console.log(response.data)
		})
	}
	render(){
		return(
			<div>
				 <AdminLeaveHeader mainHeader="Leave" header="Attend Request"/>
		    		<div className="container-fluid mt--6">
		    			{this.state.student_request && <RequestPant student_request={this.state.student_request} ChangeLeaveStatus={this.ChangeLeaveStatus}/>}
					</div>
			</div>
		)
	}
}