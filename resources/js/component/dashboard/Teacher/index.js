import React,{Component} from "react";
import {Link,Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/login"

export const TeacherLeftSide = ({assigned_class}) => {
  return(
    <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
      <div className="scrollbar-inner">
        <div className="sidenav-header  d-flex  align-items-center">
          <a className="navbar-brand" href="dashboard.html">
            <img src="/assets/img/brand/blue.png" className="navbar-brand-img" alt="..." />
          </a>
          <div className=" ml-auto ">
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
                  <Link to="/teacher/dashboard" className="nav-link" >
                    <i className="ni ni-ungroup text-orange" />
                    <span className="nav-link-text">Dashboard</span>
                  </Link>
                </li>

             { assigned_class && assigned_class.map((classes,key) => {
                return <li key={key} className="nav-item">
                <a className="nav-link collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls={key}>
                  <i className="ni ni-ungroup text-orange" />
                    {
                      classes.section != null ?  <span className="nav-link-text">{classes.class_title}-{classes.section}</span>
                      : <span className="nav-link-text">{classes.class_title}</span>
                    }
                </a>
                <div className="collapse show" id={key} >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link to={`/teacher/attendance/class/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> A </span>
                        <span className="sidenav-normal"> Attendance </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/leave/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> L </span>
                        <span className="sidenav-normal"> Leave </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/homework/class/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> H </span>
                        <span className="sidenav-normal"> Homework </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/timetable/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> T </span>
                        <span className="sidenav-normal"> TimeTable </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/exam/class/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> E </span>
                        <span className="sidenav-normal"> Exam </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/class-info/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> C </span>
                        <span className="sidenav-normal"> Class Info </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/virtual-classes/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> C </span>
                        <span className="sidenav-normal"> Virtual Class </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/study-material/class/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> S </span>
                        <span className="sidenav-normal"> Study Material </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/teacher/online-exam/class/${classes.id}`} className="nav-link">
                        <span className="sidenav-mini-icon"> O </span>
                        <span className="sidenav-normal"> Online Exam </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              })}
                <li className="nav-item">
                  <Link to="/teacher/noticeboard" className="nav-link" >
                    <i className="ni ni-ungroup text-orange" />
                    <span className="nav-link-text">Noticeboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teacher/homework" className="nav-link" >
                    <i className="ni ni-ungroup text-orange" />
                    <span className="nav-link-text">Home Work</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teacher/online-exam" className="nav-link" >
                    <i className="ni ni-ungroup text-orange" />
                    <span className="nav-link-text">Online Exam</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/teacher/study-material/teacher"} className="nav-link" >
                    <i className="ni ni-ungroup text-orange" />
                    <span className="nav-link-text">Study Material</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teacher/questionpaper" className="nav-link" >
                    <i className="ni ni-ungroup text-orange" />
                    <span className="nav-link-text">Question Paper</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teacher/salary" className="nav-link" >
                    <i className="ni ni-ungroup text-orange" />
                    <span className="nav-link-text">Salary Info</span>
                  </Link>
                </li>
              </ul>
          </div>
        </div>
      </div>
  </nav>
  )  
}

export class TeacherTopNavbar extends Component{
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
    const {assigned_class,user} = this.props
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
                  <li className="nav-item d-xl-none">
                    {/* Sidenav toggler */}
                    <div
                      className="pr-3 sidenav-toggler sidenav-toggler-dark active"
                      data-action="sidenav-pin"
                      data-target="#sidenav-main"
                    >
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                      </div>
                    </div>
                  </li>
                  <li className="nav-item d-sm-none">
                    <a
                      className="nav-link"
                      href="#"
                      data-action="search-show"
                      data-target="#navbar-search-main"
                    >
                      <i className="ni ni-zoom-split-in" />
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      onClick={e => this.ChangeNotification()}
                    >
                      <i className="ni ni-bell-55" />
                    </a>
                    {this.state.show_notification &&
                      <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden show">
                        <div className="px-3 py-3">
                        <h6 className="text-sm text-muted m-0">
                          You have <strong className="text-primary">13</strong> notifications.
                        </h6>
                      </div>
                      <div className="list-group list-group-flush">
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img
                                alt="Image placeholder"
                                src="/assets/img/theme/team-1.jpg"
                                className="avatar rounded-circle"
                              />
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">John Snow</h4>
                                </div>
                                <div className="text-right text-muted">
                                  <small>2 hrs ago</small>
                                </div>
                              </div>
                              <p className="text-sm mb-0">
                                Let's meet at Starbucks at 11:30. Wdyt?
                              </p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img
                                alt="Image placeholder"
                                src="/assets/img/theme/team-2.jpg"
                                className="avatar rounded-circle"
                              />
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">John Snow</h4>
                                </div>
                                <div className="text-right text-muted">
                                  <small>3 hrs ago</small>
                                </div>
                              </div>
                              <p className="text-sm mb-0">
                                A new issue has been reported for Argon.
                              </p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img
                                alt="Image placeholder"
                                src="/assets/img/theme/team-3.jpg"
                                className="avatar rounded-circle"
                              />
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">John Snow</h4>
                                </div>
                                <div className="text-right text-muted">
                                  <small>5 hrs ago</small>
                                </div>
                              </div>
                              <p className="text-sm mb-0">Your posts have been liked a lot.</p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img
                                alt="Image placeholder"
                                src="/assets/img/theme/team-4.jpg"
                                className="avatar rounded-circle"
                              />
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">John Snow</h4>
                                </div>
                                <div className="text-right text-muted">
                                  <small>2 hrs ago</small>
                                </div>
                              </div>
                              <p className="text-sm mb-0">
                                Let's meet at Starbucks at 11:30. Wdyt?
                              </p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img
                                alt="Image placeholder"
                                src="/assets/img/theme/team-5.jpg"
                                className="avatar rounded-circle"
                              />
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">John Snow</h4>
                                </div>
                                <div className="text-right text-muted">
                                  <small>3 hrs ago</small>
                                </div>
                              </div>
                              <p className="text-sm mb-0">
                                A new issue has been reported for Argon.
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <a
                        href="#!"
                        className="dropdown-item text-center text-primary font-weight-bold py-3"
                      >
                        View all
                      </a>
                    </div>
                    }
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      href="#"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ni ni-ungroup" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default dropdown-menu-right">
                      <div className="row shortcuts px-4">
                        <a href="#!" className="col-4 shortcut-item">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                            <i className="ni ni-calendar-grid-58" />
                          </span>
                          <small>Calendar</small>
                        </a>
                        <a href="#!" className="col-4 shortcut-item">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                            <i className="ni ni-email-83" />
                          </span>
                          <small>Email</small>
                        </a>
                        <a href="#!" className="col-4 shortcut-item">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                            <i className="ni ni-credit-card" />
                          </span>
                          <small>Payments</small>
                        </a>
                        <a href="#!" className="col-4 shortcut-item">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                            <i className="ni ni-books" />
                          </span>
                          <small>Reports</small>
                        </a>
                        <a href="#!" className="col-4 shortcut-item">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                            <i className="ni ni-pin-3" />
                          </span>
                          <small>Maps</small>
                        </a>
                        <a href="#!" className="col-4 shortcut-item">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                            <i className="ni ni-basket" />
                          </span>
                          <small>Shop</small>
                        </a>
                      </div>
                    </div>
                  </li>
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
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-single-02" />
                        <span>My profile</span>
                      </a>
                      <Link to="/teacher/setting" className="dropdown-item">
                        <i className="ni ni-settings-gear-65" />
                        <span>Settings</span>
                      </Link>
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-calendar-grid-58" />
                        <span>Activity</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-support-16" />
                        <span>Support</span>
                      </a>
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

class TeacherDashboard extends Component {
    constructor(props){
      super(props)
      this.state = {
        logout:false
      }
      this.logout = this.logout.bind(this)
    }
    logout(e){
      var self = this
      this.props.logout()
    }
     render () {
      if(this.state.logout){
        return <Redirect push={true} to="/login"/>
      }
      const {assigned_class,user,logout} = this.props
       return (
         <div>
         <TeacherLeftSide assigned_class={assigned_class} />
           <div className="main-content" id="panel">
             <TeacherTopNavbar  user={user} logout={logout}/>
             {this.props.children}
           </div>
         </div>
       )
     }
};


export const TeacherDashboardHome = () => [
    <div>Teacher Dashboard Home</div>
]


function mapStateToProps(state) {
  return {
    user: state.user,
    assigned_class:state.assigned_class
  };
}

export default connect(mapStateToProps,{ logout })(TeacherDashboard);