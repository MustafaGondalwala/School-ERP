import React,{Component} from "react"
import {Link} from  "react-router-dom"

export default class FeesHomePage extends Component{
  render(){
    return(
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-gradient-primary border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0 text-white">Tasks completed</h5>
                    <span className="h2 font-weight-bold mb-0 text-white">8/24</span>
                    <div className="progress progress-xs mt-3 mb-0">
                      <div className="progress-bar bg-success" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} style={{width: '30%'}} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-neutral mr-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-h" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <p className="mt-3 mb-0 text-sm">
                  <a href="#!" className="text-nowrap text-white font-weight-600">See details</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-gradient-info border-0">
              {/* Card body */}
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0 text-white">Contacts</h5>
                    <span className="h2 font-weight-bold mb-0 text-white">123/267</span>
                    <div className="progress progress-xs mt-3 mb-0">
                      <div className="progress-bar bg-success" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '50%'}} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-neutral mr-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-h" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <p className="mt-3 mb-0 text-sm">
                  <a href="#!" className="text-nowrap text-white font-weight-600">See details</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-gradient-danger border-0">
              {/* Card body */}
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0 text-white">Items sold</h5>
                    <span className="h2 font-weight-bold mb-0 text-white">200/300</span>
                    <div className="progress progress-xs mt-3 mb-0">
                      <div className="progress-bar bg-success" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-neutral mr-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-h" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <p className="mt-3 mb-0 text-sm">
                  <a href="#!" className="text-nowrap text-white font-weight-600">See details</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-gradient-default border-0">
              {/* Card body */}
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0 text-white">Notifications</h5>
                    <span className="h2 font-weight-bold mb-0 text-white">50/62</span>
                    <div className="progress progress-xs mt-3 mb-0">
                      <div className="progress-bar bg-success" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} style={{width: '90%'}} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-neutral mr-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-h" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <p className="mt-3 mb-0 text-sm">
                  <a href="#!" className="text-nowrap text-white font-weight-600">See details</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-deck flex-column flex-xl-row">
          <div className="card">
            <div className="card-header bg-transparent">
              <h2 className="h3 mb-0">Set Fee Installments</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">Set the Total Numbe of Fee Installments</p>
              <Link to={"/admin/fees/set-installments"} className="btn btn-primary" >
              Set
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-transparent">
              <h2 className="h3 mb-0">Set Fee Due Date</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">Set the Due date for Fee Payments.</p>
              <Link to={"/admin/fees/set-due-dates"} className="btn btn-primary" >
              Set
              </Link>
            </div>
          </div>


          <div className="card">
            <div className="card-header bg-transparent">
              <h2 className="h3 mb-0">Set Fee</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">Set Fees For Individual</p>
              <Link to={"/admin/fees/set-fees-individual"} className="btn btn-primary" >
              Set
              </Link>
            </div>
          </div>


        </div>

        <div className="card-deck flex-column flex-xl-row">
          <div className="card">
            <div className="card-header bg-transparent">
              <h2 className="h3 mb-0">Set Fee Class Wise</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">Set Fees For Class Wise</p>
              <Link to={"/admin/fees/set-fees-class-wise"} className="btn btn-primary" >
              Set
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-transparent">
              <h2 className="h3 mb-0">Pay Fees</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">Pay Fees for Individual Student</p>
              <Link to={"/admin/fees/pay-fees"} className="btn btn-primary" >
              Set
              </Link>
            </div>
          </div>

           <div className="card">
            <div className="card-header bg-transparent">
              <h2 className="h3 mb-0">View Receipt</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">View The Fees Receipt for Student</p>
              <Link to={"/admin/fees/view-receipt"} className="btn btn-primary" >
                View
              </Link>
            </div>
          </div>
        </div>




        </div>

    )
  }
}
