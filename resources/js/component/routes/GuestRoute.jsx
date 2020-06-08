import React,{ Component } from "react"
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const getUserTypeString = (user_type) => {
    switch(user_type){
      case 1:
        return "admin"
        break
      case 2:
        return "student"
        break
      case 3:
        return "parent"
        break
      case 4:
        return "teacher"
        break
      case 4:
        return "clerk"
        break
      case 5:
        return "management"
        break
    }
}

const GuestRoute = ({ isAuthenticated,user_type, component: Component, ...rest }) => {
  const url = "/"+getUserTypeString(user_type)+"/dashboard"
  return(
      <Route
        {...rest}
        render={props =>
          !isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={url} />
          )}
      />
  );

}
  
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.user_type,
    user_type: state.user.user_type
  };
}

export default connect(mapStateToProps)(GuestRoute);