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
      const { token,user,user_type,school_id,year_id } = data
      localStorage.token = token
      localStorage.user_type = user_type
      localStorage.year_id = year_id
      localStorage.school_id = school_id
      if(user_type == 4){
        const {teacher,classes} = data
        localStorage.classes = JSON.stringify(classes)
        localStorage.teacher = JSON.stringify(teacher)
        dispatch(setAssignedClass(classes))
      }
      //   localStorage.assigned_class = JSON.stringify(data.user.info.class)
      //   dispatch(setAssignedClass(data.user.info.class))
      // }else if(user_type == 3){
      //   localStorage.parent_childs = JSON.stringify(data.user.info);
      //   dispatch(setParentChild(data.user.info));
      // }
      localStorage.userAccount = JSON.stringify(user)
      setAuthorizationHeader(token,user_type,school_id,year_id);
      dispatch(userLoggedIn(user));
      return user_type
    })
}


export const logout = () => dispatch => {
  return api.user.logout().then(data => {
    localStorage.clear();
    setAuthorizationHeader();
    dispatch(userLoggedOut());
  })
};