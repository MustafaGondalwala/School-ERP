import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import {ParentLeftSide,ParentTopNavbar} from "./ParentComponent"
import { connect } from "react-redux";


import { newParentChildren,logout } from "../actions/auth"

class ParentDashboard extends Component {
    constructor(props){
      super(props)
      this.state = {
        students:"",
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
      if(Object.keys(this.props.parent_children).length == 0){
        axios({
          url:"/api/v1/parent/get-childs"
        }).then(response => {
          self.setState({
            students:response.data.success.students
          })
          this.props.newParentChildren(response.data.success.students)
        })
      }
      else{
        this.setState({
          students:this.props.parent_children
        })
      }
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
            <ParentLeftSide students={this.state.students} />
            <div className="main-content" id="panel">
              <ParentTopNavbar/>
               {this.props.children}
            </div>
         </div>
       )
     }
};




function mapStateToProps(state) {
  return {
    user: state.user,
    parent_children: state.parent_children
  };
}

export default connect(mapStateToProps,{ newParentChildren,logout })(ParentDashboard);

