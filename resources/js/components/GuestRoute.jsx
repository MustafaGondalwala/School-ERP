import React,{ Component } from "react"
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const GuestRoute = ({ isAuthenticated,user_type, component: Component, ...rest }) => {
	const url = "/"+user_type+"/dashboard"
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