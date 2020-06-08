import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TeacherDashboard from '../dashboard/Teacher'


const TeacherDashboardRoutes = ({ isAuthenticated,component: Component, ...rest }) => {
    return (
     <Route
        {...rest}
        render={props =>
          isAuthenticated ? <TeacherDashboard {...rest}>
                    <Component {...props} />
                </TeacherDashboard> : <Redirect to="/" />}
      />
    )
}

function mapStateToProps(state) {
  return {
    isAuthenticated:state.user.user_type == 4
  };
}

export default connect(mapStateToProps)(TeacherDashboardRoutes);
