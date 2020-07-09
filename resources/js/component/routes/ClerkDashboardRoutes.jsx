import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ClerkDashboard from '../dashboard/Clerk'


const ClerkDashboardRoutes = ({ isAuthenticated,component: Component, ...rest }) => {
    return (
     <Route
        {...rest}
        render={props =>
          isAuthenticated ? <ClerkDashboard {...rest}>
                    <Component {...props} />
                </ClerkDashboard> : <Redirect to="/" />}
      />
    )
}

function mapStateToProps(state) {
  return {
    isAuthenticated:state.user.user_type == 5
  };
}

export default connect(mapStateToProps)(ClerkDashboardRoutes);
