import React,{Component} from "react"
import thunk from "redux-thunk";
import { login } from "../../actions/auth";
import { connect } from "react-redux";

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856" }}>{text}</span>
);

class LoginForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {
        email_mobile_no:"",
        password:""
      },
      errors:""
    }
  }
  validate(data){
    const errors = {};
    if (!data.email_mobile_no) errors.email_mobile_no = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";

    return errors;
  }
  onSubmit(e){
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data)

    }
  }
  onChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.value}
    });
  }

  render(){
    const {data,errors} = this.state
    return(
      <form role="form">
        <div className="form-group mb-3">

          <div className="input-group input-group-merge input-group-alternative">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="ni ni-email-83" /></span>
            </div>
            <input value={data.email_mobile_no} name="email_mobile_no" onChange={(e)=>this.onChange(e)} className="form-control" placeholder="Email or Mobile No. or Roll No.
" type="email" />
{errors.email_mobile_no && <InlineError text={errors.email_mobile_no} />}

          </div>
        </div>
        <div className="form-group">
          <div className="input-group input-group-merge input-group-alternative">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
            </div>
            <input value={data.password} name="password" onChange={(e)=>this.onChange(e)} className="form-control" placeholder="Password" type="password" />
            {errors.password && <InlineError text={errors.password} />}

          </div>
        </div>
        <div className="text-center">
          <button type="button" onClick={(e)=>this.onSubmit(e)} className="btn btn-primary my-4">{this.props.login_button_text}</button>
        </div>
      </form>
    )
  }
}


class LoginPage extends Component{
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
      var login_user = this.props.login(response.data.success);
      var user_type = response.data.success.user.user_type
      var url = ""
      if(user_type == "admin")
        url = "/admin/dashboard"
      else if(user_type == "parent")
        url = "/parent/dashboard"
      else if (user_type == "student")
        url = "/student/dashboard"
      else if(user_type == "teacher")
        url = "/teacher/dashboard"
      if(login_user){
        self.props.history.push(url)
      }
      return false;
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

export default connect(null, { login })(LoginPage);

