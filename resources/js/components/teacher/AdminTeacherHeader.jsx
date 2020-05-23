import React,{ Component } from "react"
import { newAdminTeacherHeader } from "../actions/auth"
import { connect } from "react-redux"



class AdminTeacherHeader extends Component{
  constructor(props){
    super(props)
    this.state = {
      total_teacher:0,
      total_assigned_teacher:0,
      total_present_today:0,
      total_absent_today:0,
      total_leave_today:0
    }
    this.fetchData = this.fetchData.bind(this)
  }

  fetchData(data){
      this.setState({
          total_teacher:data.total_teacher,
          total_assigned_teacher:data.total_assigned_class,
        })
        data.total_attendance.map(item =>{
          if(item.attendance_type == 1)
            this.setState({
              total_present_today:item.total
            })
          else if(item.attendance_type == 2)
            this.setState({
              total_absent_today:item.total
            })
          else if(item.attendance_type == 3)
            this.setState({
              total_leave_today:item.total
            })
        })
  }
  componentDidMount(){
    if(Object.keys(this.props.adminTeacherHeader).length > 0){
      this.fetchData(this.props.adminTeacherHeader)
    }else{
      axios({
      url:"/api/teacher/get/header"
      }).then(response => {
        var data = response.data.success
        this.props.newAdminTeacherHeader(data)
        this.fetchData(data)
      })
    }
  }
  render(){
    const {mainHeader,header,sub_header} = this.props
    const {total_teacher,total_assigned_teacher,total_present_today,total_absent_today,total_leave_today} = this.state
    return (
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
                        <h5 className="card-title text-uppercase text-muted mb-0">Total Teachers</h5>
                        <span className="h2 font-weight-bold mb-0">{total_teacher}</span>
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
                        <h5 className="card-title text-uppercase text-muted mb-0">Total Teacher Assigned</h5>
                        <span className="h2 font-weight-bold mb-0">{total_assigned_teacher}</span>
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
                        <h5 className="card-title text-uppercase text-muted mb-0">Total Teacher Present Today</h5>
                        <span className="h2 font-weight-bold mb-0">{total_present_today}</span>
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
                        <h5 className="card-title text-uppercase text-muted mb-0">Total Teacher Absent Today</h5>
                        <span className="h2 font-weight-bold mb-0">{total_absent_today}</span>
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
                        <h5 className="card-title text-uppercase text-muted mb-0">Total Teacher Leave Today</h5>
                        <span className="h2 font-weight-bold mb-0">{total_leave_today}</span>
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
    adminTeacherHeader: state.adminTeacherHeader,
  };
}
export default connect(mapStateToProps,{ newAdminTeacherHeader })(AdminTeacherHeader);
