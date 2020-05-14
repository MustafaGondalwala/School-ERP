import { USER_LOGGED_IN, 
         USER_LOGGED_OUT,
         FILE_CREATED,
         PARENT_CHILDREN,
         ASSIGNED_TEACHER_CLASS,
         TEACHER_CLASS_ATTENDANCE,
         ADMIN_STUDENT_HEADER } from "../types";
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


export const assignedTeacherClass = assignTeacherClass => ({
  type:ASSIGNED_TEACHER_CLASS,
  assignTeacherClass
})

export const attendanceTeacherHeader = attendanceTeacherHeader => ({
  type:TEACHER_CLASS_ATTENDANCE,
  attendanceTeacherHeader
})

export const adminStudentHeader = adminStudentHeader => ({
  type: ADMIN_STUDENT_HEADER,
  adminStudentHeader
})

export const login = response_data => dispatch => {
      localStorage.userAccount = JSON.stringify(response_data.user)
      localStorage.SMS = response_data.token
      localStorage.user_type = response_data.user.user_type
      dispatch(userLoggedIn(response_data.user));
      setAuthorizationHeader(response_data.token,response_data.user_type);
      return true;
}
  

export const logout = () => dispatch => {
  localStorage.removeItem("userAccount");
  localStorage.removeItem("SMS");
  localStorage.removeItem("user_type");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const fileCreated = files => dispatch => {
  dispatch(newFileCreate(files))
}

export const newAssignedTeacherClass = classes => dispatch => {
  dispatch(assignedTeacherClass(classes))
}


export const newAdminStudentHeader = data => dispatch => {
  dispatch(adminStudentHeader(data))
}
export const newTeacherAttendance = data => dispatch => {
  dispatch(attendanceTeacherHeader(data))
}

export const newParentChildren = data => dispatch => {
    dispatch(parentChildren(data))
}