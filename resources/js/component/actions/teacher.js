
import {SET_TEACHERS,SET_TEACHERS_NAME} from "../types"
import api from "../api";


export const setTeachers = (teachers) => ({
    type: SET_TEACHERS,
    teachers
  });
export const setTeachersName = (teacher_names) => ({
    type: SET_TEACHERS_NAME,
    teacher_names
  });

  export const setTeacherDispatch = () => dispatch => {
    api.teachers().then(data => {
      dispatch(setTeachers(data.teachers))
    })  
  }

  export const setTeachersNameDispatch = () => dispatch => {
    api.teacher_names().then(data => {
      dispatch(setTeachersName(data.teachers_name))
    })  
  }

