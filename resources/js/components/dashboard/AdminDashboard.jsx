import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import LeftSide from "./LeftSide/LeftSide"
import NavBar from "./TopNavbar/TopNavbar"
import Header from "./Header/Header"

export default class AdminDashboard extends Component {
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
