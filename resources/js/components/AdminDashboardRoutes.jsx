import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


import AdminDashboard from './dashboard/AdminDashboard'


const AdminDashboardRoutes = ({ isAuthenticated,component: Component, ...rest }) => {
    return (
     <Route
        {...rest}
        render={props =>
          isAuthenticated ? <AdminDashboard {...rest}>
                    <Component {...props} />
                </AdminDashboard> : <Redirect to="/" />}
      />
    )
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.user_type == "admin"
  };
}

export default connect(mapStateToProps)(AdminDashboardRoutes);
