
import React,{ Component } from "react"
import { newAdminAttendancetHeader } from "../../actions/auth"
import { connect } from "react-redux"


class AdminAttendanceHeader extends Component{
	constructor(props){
		super(props)
		this.state = {
		 total_staff_present:0,
		 total_staff_absent:0,
		 total_staff_leave:0,
		 total_staff_none:0,
		 total_student_present:0,
		 total_student_absent:0,
		 total_student_leave:0,
		 total_student_none:0,
		}
		this.updateHeader = this.updateHeader.bind(this)
	}

	updateHeader(data){
		var staff_details = data.staff;
			 staff_details.map((item) => {
				    switch (item.attendance_type) {
				      case 1:
				        this.setState({
				          total_staff_present: item.total,
				        });
				        break;
				      case 2:
				        this.setState({
				          total_staff_absent: item.total,
				        });
				        break;
				      case 3:
				        this.setState({
				          total_staff_leave: item.total,
				        });
				        break;
				      case 4:
				        this.setState({
				          total_staff_none: item.total,
				        });
				        break;
				  }
			 })
			 var student_details = data.student;
			 student_details.map((item) => {
				    switch (item.attendance_type) {
				      case 1:
				        this.setState({
				          total_student_present: item.total,
				        });
				        break;
				      case 2:
				        this.setState({
				          total_student_absent: item.total,
				        });
				        break;
				      case 3:
				        this.setState({
				          total_student_leave: item.total,
				        });
				        break;
				      case 4:
				        this.setState({
				          total_student_none: item.total,
				        });
				        break;
				  
				  }
			})	
	}
	componentDidMount(){
		self = this;
		if(Object.keys(this.props.adminAttendanceHeader).length == 0){
			axios({
			url:"/api/v1/attendance/header"
	}).then(response => {
			self.props.newAdminAttendancetHeader(response.data.success.header);
		self.updateHeader(response.data.success.header)
		})
		}else{
			self.updateHeader(this.props.adminAttendanceHeader)
		}
	}
	render(){
		const {mainHeader,header,sub_header} = this.props
		return(
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Present Student Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_student_present}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Absence Student Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_student_absent}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Leave Student Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_student_leave}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Entry Pending Student Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_student_none}</span>
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
		      <div className="row">
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Present Staff Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_staff_present}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Absence Staff Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_staff_absent}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Leave Staff Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_staff_leave}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Entry Pending Staff Today</h5>
		                  <span className="h2 font-weight-bold mb-0">{this.state.total_staff_none}</span>
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
	}

}

function mapStateToProps(state) {
  return {
    adminAttendanceHeader: state.adminAttendanceHeader,
  };
}
export default connect(mapStateToProps,{ newAdminAttendancetHeader })(AdminAttendanceHeader);