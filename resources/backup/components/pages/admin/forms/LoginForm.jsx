import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import InlineError from "../message/InlineError";

export default class LoginForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
          data: {
            email:"mustafagondalwala32@gmail.com",
            password: "mustafagondalwala32@gmail.com",
          },
          errors: {}
        };
  };

  onChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.value}
    });
  }

  validate(data){
    const errors = {};

    if (!data.password) errors.password = "Can't be blank";
    if(!data.email) errors.email = "Invalid Email";

    return errors;
  };

  onSubmit(e){
      e.preventDefault();
	    const errors = this.validate(this.state.data);
      this.setState({ errors });
	    if (Object.keys(errors).length === 0) {
	      this.props
	        .submit(this.state.data)
	    }
	  };

  render(){
    const { data, errors } = this.state;

    return(
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="text"
            id="email"
            className="form-control"
            name="email"
            placeholder="Example"
            value={data.email}
            onChange={(e) => this.onChange(e)}
          />
          {errors.email && <InlineError text={errors.email} />}
          <small id="emailHelp" className="form-text text-muted">We'll never share your Username with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="********"
            value={data.password}
            onChange={(e) => this.onChange(e)}
          />
          {errors.password && <InlineError text={errors.password} />}
        </div>
        <button type="button" onClick={(e)=>this.onSubmit(e)}  className="btn btn-primary">Submit</button>
      </form>
    )
  }
}
