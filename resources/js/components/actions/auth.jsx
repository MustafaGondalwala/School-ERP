import { USER_LOGGED_IN, USER_LOGGED_OUT,FILE_CREATED,PARENT_CHILDREN } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const newFileCreate = files => ({
  type: FILE_CREATED,
  files
})


export const parentChildren = students => ({
  type:PARENT_CHILDREN,
  students
})


export const login = response_data => dispatch => {  
  switch(response_data.user_type){
    case "admin":
      localStorage.userAccount = JSON.stringify(response_data.user)
      localStorage.SMS = response_data.token
      localStorage.user_type = response_data.user.user_type
      dispatch(userLoggedIn(response_data.user));
      setAuthorizationHeader(response_data.token,response_data.user_type);
      return true;
      break
    case "parent":
      localStorage.userAccount = JSON.stringify(response_data.user)
      localStorage.SMS = response_data.token
      localStorage.user_type = response_data.user.user_type
      dispatch(userLoggedIn(response_data.user));
      setAuthorizationHeader(response_data.token,response_data.user_type);
      return true;
    case "student":
      console.log("student")
  }
}
  

export const logout = () => dispatch => {
  localStorage.removeItem("CloudinaryImageApp");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const fileCreated = files => dispatch => {
  dispatch(newFileCreate(files))
}

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.CloudinaryImageApp = user.token;
    dispatch(userLoggedIn(user));
  });


export const newParentChildren = data => dispatch => {
    dispatch(parentChildren(data));
}