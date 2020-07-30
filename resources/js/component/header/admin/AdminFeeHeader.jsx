import React,{Component} from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {setAdminFeeHeaderDispatch} from "../../actions/header"

class AdminFeeHeader extends Component{
    componentDidMount(){
      const {adminFeeHeader,setAdminFeeHeaderDispatch} = this.props
      if(Object.keys(adminFeeHeader).length == 0)
        setAdminFeeHeaderDispatch()
    }
    render(){
      const {adminFeeHeader} = this.props
      return(
        <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-stats">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">Today's New Fee Receipts Generated</h5>
                  <span className="h2 font-weight-bold mb-0">{adminFeeHeader.total_receipts}</span>
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
                  <h5 className="card-title text-uppercase text-muted mb-0">Todays's Fee Collection</h5>
                  <span className="h2 font-weight-bold mb-0">{adminFeeHeader.total_collection}</span>
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

  function mapStateToProps(state) {
    return {
      adminFeeHeader:state.adminFeeHeader
    };
  }
  export default connect(mapStateToProps,{setAdminFeeHeaderDispatch})(AdminFeeHeader);