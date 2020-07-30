import React,{Component} from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {setAdminTeacherHomeWorkDispatch} from "../../actions/header"

class AdminTeacherHeader extends Component{
    constructor(props){
      super(props)
      this.state = {
        total_teacher:"Loading ...",
        total_assigned_teacher:"Loading ...",
        total_present:"Loading ...",
        total_leave:"Loading ...",
        total_absent:"Loading ...",
      }
    }
    componentDidMount(){
      const {adminTeacherHeader,setAdminTeacherHomeWorkDispatch} = this.props
      if(Object.keys(adminTeacherHeader).length == 0)
        setAdminTeacherHomeWorkDispatch()
    }
    render(){
      const {mainHeader,header,sub_header,adminTeacherHeader} = this.props
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
                  <button href="#"  className="btn btn-sm btn-neutral">Back</button>
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
                          <span className="h2 font-weight-bold mb-0">{adminTeacherHeader.teacher_count ||  <h5>Loading ...</h5>}</span>
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
                          <h5 className="card-title text-uppercase text-muted mb-0">Total Assigned Teachers</h5>
                          <span className="h2 font-weight-bold mb-0">{adminTeacherHeader.total_assignedTeacher ||  <h5>Loading ...</h5>}</span>
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
      adminTeacherHeader:state.adminTeacherHeader
    };
}

export default connect(mapStateToProps,{setAdminTeacherHomeWorkDispatch})(AdminTeacherHeader);