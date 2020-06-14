import React,{Component} from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

class NoticeBoardHeader extends Component{
    constructor(props){
      super(props)
      this.state = {
        total_students:"Loading ...",
        total_admission:"Loading ..."
      }
    }
   
    render(){
      return(
        <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-stats">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">Total Register Students</h5>
                  <span className="h2 font-weight-bold mb-0">{this.state.total_students}</span>
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
                  <h5 className="card-title text-uppercase text-muted mb-0">Total Admission Students</h5>
                  <span className="h2 font-weight-bold mb-0">{this.state.total_admission}</span>
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
    
      )
    }
  }

  export default NoticeBoardHeader;