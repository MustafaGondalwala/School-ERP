import React,{Component, PureComponent} from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {setAdminTimeTableHeaderDispatch,setAdminTimeTableHeader} from "../../actions/header"
import api from "../../api"

class AdminHeader extends PureComponent{
    componentDidMount(){
      const {adminTimeTableHeader,setAdminTimeTableHeaderDispatch} = this.props
      if(Object.keys(adminTimeTableHeader).length == 0){
        setAdminTimeTableHeaderDispatch()
      }
    }
    render(){
      const {mainHeader,header,sub_header,adminTimeTableHeader} = this.props
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
                          <h5 className="card-title text-uppercase text-muted mb-0">Total Class Periods</h5>
                          <span className="h2 font-weight-bold mb-0">{adminTimeTableHeader.total_classperiods}</span>
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
                          <h5 className="card-title text-uppercase text-muted mb-0">Total Student TimeTable</h5>
                          <span className="h2 font-weight-bold mb-0">{adminTimeTableHeader.totalStudentTimeTable}</span>
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
                          <h5 className="card-title text-uppercase text-muted mb-0">Total Staff TimeTable</h5>
                          <span className="h2 font-weight-bold mb-0">{adminTimeTableHeader.totalStaffTimeTable}</span>
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
      adminTimeTableHeader:state.adminTimeTableHeader
    };
}

export default connect(mapStateToProps,{setAdminTimeTableHeaderDispatch,setAdminTimeTableHeader})(AdminHeader);