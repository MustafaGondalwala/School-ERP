import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import LoginForm from "./forms/LoginForm"
import LeftSide from "./dashboard/AdminLeftSide"
import NavBar from "./dashboard/AdminNavbar"
import Header from "./dashboard/Header"
import AdminStudentPanel from "./student/Panel"

export default class AdminDashboard extends Component {
    componentDidMount(){
      console.log(this.props.header)
    }
     render () {
       return (
         <div>
         <LeftSide/>
           <div className="main-content" id="panel">
             <NavBar/>
             <Header header={this.props.header} subheader={this.props.subheader}/>
             {this.props.children}
           </div>
         </div>
       )
     }
};
