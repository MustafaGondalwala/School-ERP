import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import {StudentLeftSide,StudentTopNavbar} from "./StudentComponent"
import { connect } from "react-redux";
import { logout } from "../actions/auth"

class StudentDashboard extends Component {
    constructor(props){
      super(props)
      this.state = {
        user:"",
        logout:false
      }
      this.logout = this.logout.bind(this)
    }
    componentDidMount(){
      var self = this
      if(localStorage.getItem('userAccount') == "" || localStorage.getItem('user_type') != "parent"){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_type");
        self.setState({
            logout:false
          })
      }

      this.setState({
        user:JSON.parse(localStorage.getItem('userAccount'))
      })
    }

    logout(e){
    var self = this
      axios({
        method:"post",
        url:"/api/logout",
      }).then(function(response){
          self.props.logout()
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("user_type");
          self.setState({
            logout:true
          })
        })
    }
    render () {
      
       return (
         <div>
            <StudentLeftSide />
            <div className="main-content" id="panel">
              <StudentTopNavbar user={this.state.user} logout={this.logout}/>
               {this.props.children}
            </div>
         </div>
       )
     }
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps,{ logout })(StudentDashboard);


