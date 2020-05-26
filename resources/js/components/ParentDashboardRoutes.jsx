import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ParentDashboard from './dashboard/ParentComponent'
const ParentDashboardRoutes = ({isAuthenticated,component: Component, ...rest }) => {
    return (
    	<Route
        {...rest}
        render={props =>
        isAuthenticated ? <ParentDashboard {...rest}>
                    <Component {...props} />
                </ParentDashboard> : <Redirect to="/" />}
      />
    )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.user_type == "parent"
  };
}

export default connect(mapStateToProps)(ParentDashboardRoutes);
