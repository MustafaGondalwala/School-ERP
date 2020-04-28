import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginForm from "./forms/LoginForm"
import { useHistory } from "react-router-dom";


export default class SuperAdminLogin extends Component {
  constructor(props) {
    super(props);
      this.state = {
            errors: ""
          };
      this.submit = this.submit.bind(this)

  };
  submit(data){
    var self = this;
      axios({
        method:'post',
        url:"/api/login",
        data:data,
      }).then(function(response){
        localStorage.setItem('token', response.data.success.token);
        localStorage.setItem('user', JSON.stringify(response.data.success.user));
        localStorage.setItem('user_type',response.data.success.user.user_type);
        self.props.history.push("/admin/dashboard")
      })
  }
     render () {
       return (
         <div style={{padding:"1%"}} >
            <h2>Admin Login</h2>
            {this.state.errors}
            <LoginForm submit={this.submit}/>
         </div>
       )
     }
};
