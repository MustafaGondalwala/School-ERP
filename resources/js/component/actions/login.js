import { USER_LOGGED_IN, 
    USER_LOGGED_OUT,
    ASSIGNED_CLASS,
    SET_PARENT_CHILDS
    } from "../types";

import api from "../api/login";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";


export const setParentChild = (parent_childs) => ({
  type:SET_PARENT_CHILDS,
  parent_childs
})

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
  });
  
  export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
  });

  export const setAssignedClass = (assigned_class) => ({
    type: ASSIGNED_CLASS,
    assigned_class
  })


export const login = credentials => dispatch => {
    return api.user.login(credentials).then(data => {
      const { token,user,user_type,school_id } = data
      localStorage.token = token
      localStorage.user_type = user_type
      localStorage.school_id = school_id
      if(user_type == 4){
        localStorage.assigned_class = JSON.stringify(data.user.info.class)
        dispatch(setAssignedClass(data.user.info.class))
      }else if(user_type == 3){
        localStorage.parent_childs = JSON.stringify(data.user.info);
        dispatch(setParentChild(data.user.info));
      }
      localStorage.userAccount = JSON.stringify(user)
      setAuthorizationHeader(token,user_type,school_id);
      dispatch(userLoggedIn(user));
      return user_type
    })
}


export const logout = () => dispatch => {
  return api.user.logout().then(data => {
    localStorage.removeItem("userAccount");
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("school_id");
    setAuthorizationHeader();
    dispatch(userLoggedOut());
  })
};