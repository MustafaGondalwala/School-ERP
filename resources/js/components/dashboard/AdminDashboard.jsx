import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import {AdminLeftSide,AdminTopNavbar} from "./AdminComponents"

import { connect } from "react-redux";
import { logout } from "../actions/auth"

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
      axios({
        method:"post",
        url:"/api/logout",
      }).then(function(response){
          localStorage.removeItem("token");
          localStorage.removeItem("userAccount");
          localStorage.removeItem("SMS");
          localStorage.removeItem("user_type");
          self.setState({
            logout:true
          })
      })
    }
     render () {
      if(this.state.logout){
        return <Redirect push={true} to="/login"/>
      }
       return (
         <div>
         <AdminLeftSide/>
           <div className="main-content" id="panel">
             <AdminTopNavbar user={this.props.user} logout={this.props.logout}/>
             {this.props.children}
           </div>
         </div>
       )
     }
};


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps,{ logout })(AdminDashboard);