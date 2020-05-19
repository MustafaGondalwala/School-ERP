import React, { Component } from "react";
export default class ParentStudentAttendanceHeader extends Component {
	render(){
		return(
			<div className="header bg-primary pb-6">
		        <div className="container-fluid">
		          <div className="header-body">
		            <div className="row align-items-center py-4">
		              <div className="col-lg-6 col-7">
		                <h6 className="h2 text-white d-inline-block mb-0">
		                  {this.props.mainHeader}
		                </h6>
		                <nav
		                  aria-label="breadcrumb"
		                  className="d-none d-md-inline-block ml-md-4"
		                >
		                  <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
		                    <li className="breadcrumb-item">
		                      <a href="#">
		                        <i className="fas fa-home" />
		                      </a>
		                    </li>
		                    <li className="breadcrumb-item">
		                      <a href="#">{this.props.header}</a>
		                    </li>
		                    {this.props.sub_header && (
		                      <li
		                        className="breadcrumb-item active"
		                        aria-current="page"
		                      >
		                        {this.props.sub_header}
		                      </li>
		                    )}
		                  </ol>
		                </nav>
		              </div>
		              <div className="col-lg-6 col-5 text-right">
		                <a href="#" className="btn btn-sm btn-neutral">
		                  New
		                </a>
		                <a href="#" className="btn btn-sm btn-neutral">
		                  Filters
		                </a>
		              </div>
		            </div>
		            <div className="row">
		              <div className="col-xl-3 col-md-6">
		                <div className="card card-stats">
		                  <div className="card-body">
		                    <div className="row">
		                      <div className="col">
		                        <h5 className="card-title text-uppercase text-muted mb-0">
		                          This Month Total Present
		                        </h5>
		                        <span className="h2 font-weight-bold mb-0">
		                        </span>
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
		                        <h5 className="card-title text-uppercase text-muted mb-0">
		                          This Month Absence
		                        </h5>
		                        <span className="h2 font-weight-bold mb-0">
		                        </span>
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
		                        <h5 className="card-title text-uppercase text-muted mb-0">
		                          This Month Leave
		                        </h5>
		                        <span className="h2 font-weight-bold mb-0">
		                        </span>
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
		                        <h5 className="card-title text-uppercase text-muted mb-0">
		                          Total Present
		                        </h5>
		                        <span className="h2 font-weight-bold mb-0">
		                        </span>
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
		                        <h5 className="card-title text-uppercase text-muted mb-0">
		                          Total Absence
		                        </h5>
		                        <span className="h2 font-weight-bold mb-0">
		                        </span>
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
		                        <h5 className="card-title text-uppercase text-muted mb-0">
		                          Total Leave
		                        </h5>
		                        <span className="h2 font-weight-bold mb-0">
		                        </span>
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