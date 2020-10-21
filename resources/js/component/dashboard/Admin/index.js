import React,{Component} from "react";
import {Link,Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/login"

export const AdminLeftSide = () => {
  var userAccount = JSON.parse(localStorage.getItem("userAccount"))
 const front_pic = (userAccount.info.school.front_pic)
  return(
  <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
      <div className="scrollbar-inner">
        <div className="sidenav-header  d-flex  align-items-center">
          <a className="navbar-brand">
            <img src={front_pic} style={{width:"100%","maxHeight":"4rem","height":"4rem"}} className="navbar-brand-img img" alt="..." />
          </a>
          <div className="ml-auto ">
            <div className="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line"></i>
                <i className="sidenav-toggler-line"></i>
                <i className="sidenav-toggler-line"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-inner">
          <div className="collapse navbar-collapse" id="sidenav-collapse-main">
            <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                <i className="ni ni-dashboard text-primary"></i>
                <span className="sidenav-mini-icon"> D </span>
                <span className="nav-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/student">
                <i className="ni ni-shop text-primary"></i>
                <span className="sidenav-mini-icon"> S </span>
                <span className="nav-link-text">Student</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/teacher" >
                <i className="ni ni-ungroup text-orange"></i>
                <span className="sidenav-mini-icon"> T </span>
                <span className="nav-link-text">Teacher</span>
              </Link>

            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/fees" >
                <i className="ni ni-ungroup text-orange"></i>
                <span className="sidenav-mini-icon"> F </span>  
                <span className="nav-link-text">Fees</span>
              </Link>

            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/admin/timetable">
                <i className="ni ni-single-copy-04 text-pink"></i>
                <span className="sidenav-mini-icon"> T </span>

                <span className="nav-link-text">Timetable</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/attendance">
                <i className="ni ni-align-left-2 text-default"></i>
                <span className="sidenav-mini-icon"> A </span>

                <span className="nav-link-text">Attendance</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/exam" className="nav-link" >
                <i className="ni ni-map-big text-primary"></i>
                <span className="sidenav-mini-icon"> E </span>
                <span className="nav-link-text">Exam</span>
              </Link>
            
            </li>
          <li className="nav-item">
              <Link className="nav-link" to="/admin/leave">
                <i className="ni ni-archive-2 text-green"></i>
                <span className="sidenav-mini-icon"> L </span>

                <span className="nav-link-text">Leave</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/noticeboard">
                <i className="ni ni-archive-2 text-green"></i>
                <span className="sidenav-mini-icon"> N </span>
                <span className="nav-link-text">Notice Board</span>
              </Link>
            </li>
            
          </ul>
          </div>
        </div>
      </div>
   </nav>
  )
}
 

export class AdminTopNavbar extends Component{
  constructor(props){
    super(props)
    this.state = {
      show_logout_view:false,
      show_notification:false
    }
    this.ChangeWindowLogout = this.ChangeWindowLogout.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  ChangeWindowLogout(){
        if(this.state.show_logout_view == false){
          this.setState({
            show_logout_view:true
          })
        }else{
          this.setState({
            show_logout_view:false
          })
      }
  }
  ChangeNotification(){
    if(this.state.show_notification == false){
      this.setState({
        show_notification:true
      })
    }else{
      this.setState({
        show_notification:false
      })
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        show_logout_view:false
      })
   }
  }
  convertUserType(type){
    switch(type){
      case 1:
        return "admin"
      case 2:
        return "parent"
      case 3:
        return "student"
      case 4:
        return "teacher"
      case 5:
        return "clerk"
      case 6:
        return "staff"
      case 7:
        return "trust"
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  render(){
    return(
      <div ref={this.setWrapperRef}>
          <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* Search form */}
                <form
                  className="navbar-search navbar-search-light form-inline mr-sm-3"
                  id="navbar-search-main"
                >
                  <div className="form-group mb-0">
                    <div className="input-group input-group-alternative input-group-merge">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-search" />
                        </span>
                      </div>
                      <input className="form-control" placeholder="Search" type="text" />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-action="search-close"
                    data-target="#navbar-search-main"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </form>
                {/* Navbar links */}
                <ul className="navbar-nav align-items-center  ml-md-auto ">
                  </ul>
                <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
                  <li className="nav-item dropdown show">
                    <a onClick={e => this.ChangeWindowLogout()}
                      className="nav-link pr-0"
                      style={{cursor:"pointer"}}
                    >
                      <div className="media align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                          <img
                            alt="Image placeholder"
                            src="/assets/img/theme/team-4.jpg"
                          />
                        </span>
                        <div className="media-body  ml-2  d-none d-lg-block">
                          <span className="mb-0 text-sm  font-weight-bold">
                            {this.props.user.name} | {this.convertUserType(this.props.user.user_type)}
                          </span>
                        </div>
                      </div>
                    </a>
                    {this.state.show_logout_view && <div>
                    <div className="dropdown-menu dropdown-menu-right show">
                      <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </div>
                      <Link to="/admin/setting" className="dropdown-item">
                        <i className="ni ni-settings-gear-65" />
                        <span>Settings</span>
                      </Link>
                      <div className="dropdown-divider" />
                      <a onClick={e => this.props.logout()} 
                          style={{cursor:"pointer"}}
                         className="dropdown-item">
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </a>
                    </div>
                    </div>}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
      </div>
    )
  }
}

class AdminDashboard extends Component {
    constructor(props){
      super(props)
      this.state = {
        logout:false
      }
      this.logout = this.logout.bind(this)
    }
    logout(e){
      var self = this
      this.props.logout().catch(error => {
          localStorage.removeItem("userAccount");
          localStorage.removeItem("token");
          localStorage.removeItem("user_type");
          localStorage.removeItem("school_id");
          setAuthorizationHeader();
      })
    }
     render () {
      if(this.state.logout){
        return <Redirect push={true} to="/login"/>
      }
      const {user,children,logout} = this.props
       return (
         <div>
         <AdminLeftSide/>
           <div className="main-content" id="panel">
             <AdminTopNavbar user={user} logout={logout}/>
             {children}
           </div>
         </div>
       )
     }
};


export const AdminDashboardHome = () => [
    <div>Admin Dashboard Home</div>
]


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps,{ logout })(AdminDashboard);