import React,{Component} from "react"
import LoginForm from "../form/LoginForm"

export default class LoginPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      errors:"",
      login_button_text:"Sign in"
    }

    this.submit = this.submit.bind(this)
  }
  submit(data){
    var self = this
    this.setState({
      login_button_text:"Loading ..."
    })
    axios({
      method:"post",
      url:"/api/v1/login",
      data:data
    }).then(response=>{
      localStorage.setItem('token',response.data.success.token);
      localStorage.setItem('user_type',response.data.success.user.user_type);
      localStorage.setItem('user',JSON.stringify(response.data.success.user));
      var user_type = response.data.success.user.user_type
      console.log(user_type)
      var url = ""
      if(user_type == "admin")
        url = "/admin/dashboard"
      else if(user_type == "parent")
        url = "/parent/dashboard"
      else if (user_type == "student")
        url = "/student/dashboard"
      if(url != "")
        self.props.history.push(url)
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors.message,
        login_button_text:"Sign in"
      })
    })
  }
  render(){
    return(
      <div className="main-content">
  {/* Header */}
  <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
    <div className="container">
      <div className="header-body text-center mb-7">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 px-5">
            <h1 className="text-white">Welcome!</h1>
            <p className="text-lead text-white">Use the login for access for Student,Parent,Teacher and Staff Login</p>
          </div>
        </div>
      </div>
    </div>
    <div className="separator separator-bottom separator-skew zindex-100">
      <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <polygon className="fill-default" points="2560 0 2560 100 0 100" />
      </svg>
    </div>
  </div>
  {/* Page content */}
  <div className="container mt--8 pb-5">
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7">
        <div className="card bg-secondary border-0 mb-0">
          <div className="card-body px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
            </div>
            {this.state.errors  && <label style={{color:"#ae5856"}}>{this.state.errors}</label>}


            <LoginForm  login_button_text={this.state.login_button_text} submit={this.submit}/>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <a href="#" className="text-light"><small>Forgot password?</small></a>
          </div>
          <div className="col-6 text-right">
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>

    )
  }
}
