import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import {ParentLeftSide,ParentTopNavbar} from "./ParentComponent"

export default class ParentDashboard extends Component {
    constructor(props){
      super(props)

      this.state = {
        students:""
      }
      this.logout = this.logout.bind(this)
    }
    componentDidMount(){
      
      var self = this
      if(localStorage.getItem('user') == "" || localStorage.getItem('user_type') != "parent"){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_type");
        self.setState({
            logout:false
          })
      }
      this.setState({
        user : JSON.parse(localStorage.getItem('user'))
      })
      axios({
        url:"/api/v1/parent/get-childs"
      }).then(response => {
        self.setState({
          students:response.data.success.students
        })
      })
    }

    logout(e){
    var self = this
      axios({
        method:"post",
        url:"/api/logout",
      }).then(function(response){
          localStorage.removeItem("token");
          localStorage.removeItem("user");
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
            <ParentLeftSide students={this.state.students} />
            <div className="main-content" id="panel">
              <ParentTopNavbar user={this.state.user} logout={this.logout}/>
               {this.props.children}
            </div>
         </div>
       )
     }
};
