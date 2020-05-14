import React,{Component} from "react"
import { Link } from "react-router-dom"
import { newAdminStudentHeader } from "../../actions/auth"
import { connect } from "react-redux"

class AdminStudentHeader extends Component{
  constructor(props){
    super(props)
    this.state = {
      total_students:"Loading ...",
      total_admission:"Loading ..."
    }
    this.updateProps = this.updateProps.bind(this)
  }
  updateProps(){
    var self = this;
    if(Object.keys(this.props.adminStudentHeader).length != 0){
      const { total_students, total_admission} = this.props.adminStudentHeader
      self.setState({
        total_students,total_admission
      })
    }else{
      axios({
      url:"/api/v1/student/admin/header"
      }).then(response => {
        self.props.newAdminStudentHeader(response.data.success.header)
        const { total_students, total_admission} = response.data.success.header
        self.setState({
        total_students,total_admission
        })
      })
    }
  }
  componentDidMount(){
    this.updateProps()
  }
  componentWillReceiveProps(){
    this.updateProps()
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
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    adminStudentHeader: state.adminStudentHeader,
  };
}
export default connect(mapStateToProps,{ newAdminStudentHeader })(AdminStudentHeader);
