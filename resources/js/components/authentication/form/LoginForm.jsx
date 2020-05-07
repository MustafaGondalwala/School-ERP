import React,{Component} from "react"
import InlineError from "../messages/InlineError"


export default class LoginForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {
        email_mobile_no:"9586756273",
        password:"9586756273"
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
