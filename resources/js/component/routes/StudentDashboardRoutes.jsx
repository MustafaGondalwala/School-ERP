import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import StudentDashboard from '../dashboard/Student'


const StudentDashboardRoutes = ({ isAuthenticated,component: Component, ...rest }) => {
    return (
     <Route
        {...rest}
        render={props =>
          isAuthenticated ? <StudentDashboard {...rest}>
                    <Component {...props} />
                </StudentDashboard> : <Redirect to="/" />}
      />
    )
}

function mapStateToProps(state) {
  return {
    isAuthenticated:state.user.user_type == 2
  };
}

export default connect(mapStateToProps)(StudentDashboardRoutes);
