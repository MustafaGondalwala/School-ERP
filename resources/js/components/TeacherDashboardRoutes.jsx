import React,{ Component } from "react"
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import TeacherDashboard from './dashboard/TeacherComponent'

const TeacherDashboardRoutes = ({isAuthenticated,component: Component, ...rest }) => {
    return (
    	<Route
        {...rest}
        render={props =>
        isAuthenticated ? <TeacherDashboard {...rest}>
                    <Component {...props} />
                </TeacherDashboard> : <Redirect to="/login" />}
      />
    )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.user_type == "teacher"
  };
}

export default connect(mapStateToProps)(TeacherDashboardRoutes);