import React,{Component} from "react"
import { connect } from "react-redux"
import { newTeacherAttendance } from "../../actions/auth"


class TeacherAttendanceHeader extends Component{
	constructor(props){
		super(props)
		this.state = {
			total_present:"0",
			total_absent:"0",
			total_pending:"0",
			total_leave:"0"
		}
		this.updateProps = this.updateProps.bind(this)
	}
	updateProps(){
		var self = this;
		if(Object.keys(this.props.attendanceTeacherHeader).length == 0 ){
			var self = this;
			axios({
	          url:"/api/v1/teacher/attendance/header"
	        }).then(response => {
	        	Object.keys(response.data.success.attendance_header).map(item => {
				if(this.props.class_id == item){
					var total_present = response.data.success.attendance_header[item].total_present;
					var total_absent = response.data.success.attendance_header[item].total_absent;
					var total_leave = response.data.success.attendance_header[item].total_leave;
					var total_pending = response.data.success.attendance_header[item].total_pending;
					self.setState({
						total_present,total_absent,total_leave,total_pending
					})
				}
			})
	          self.props.newTeacherAttendance(response.data.success.attendance_header)
	        })
		}else{
			Object.keys(this.props.attendanceTeacherHeader).map(item => {
				if(this.props.class_id == item){
					var total_present = this.props.attendanceTeacherHeader[item].total_present;
					var total_absent = this.props.attendanceTeacherHeader[item].total_absent;
					var total_leave = this.props.attendanceTeacherHeader[item].total_leave;
					var total_pending = this.props.attendanceTeacherHeader[item].total_pending;
					self.setState({
						total_present,total_absent,total_leave,total_pending
					})
				}
			})
		}
	}
	componentWillReceiveProps(){
		this.updateProps()
	}
	componentDidMount(){
		this.updateProps()
	}
	render(){
		const {total_present,total_absent,total_pending,total_leave} = this.state
		return(
				<div className="header bg-primary pb-6">
		  <div className="container-fluid">
		    <div className="header-body">
		      <div className="row align-items-center py-4">
		        <div className="col-lg-6 col-7">
		          <h6 className="h2 text-white d-inline-block mb-0">{this.props.mainHeader}</h6>
		          <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
		            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
		              <li className="breadcrumb-item"><a href="#"><i className="fas fa-home" /></a></li>
		              <li className="breadcrumb-item"><a href="#">{this.props.header}</a></li>
		              {this.props.sub_header && 
		              	<li className="breadcrumb-item active" aria-current="page">{this.props.sub_header}</li>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Present</h5>
		                  <span className="h2 font-weight-bold mb-0">{total_present}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Absence</h5>
		                  <span className="h2 font-weight-bold mb-0">{total_absent}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Leave</h5>
		                  <span className="h2 font-weight-bold mb-0">{total_leave}</span>
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
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Pending</h5>
		                  <span className="h2 font-weight-bold mb-0">{total_pending}</span>
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
		      </div>
		    </div>
		  </div>
		</div>
		)
	}
}


function mapStateToProps(state) {
  return {
    attendanceTeacherHeader: state.attendanceTeacherHeader,
  };
}

export default connect(mapStateToProps,{ newTeacherAttendance })(TeacherAttendanceHeader);
