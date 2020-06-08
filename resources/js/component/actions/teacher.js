
import {SET_TEACHERS} from "../types"
import api from "../api";


export const setTeachers = (teachers) => ({
    type: SET_TEACHERS,
    teachers
  });

  export const setTeacherDispatch = () => dispatch => {
    api.teachers().then(data => {
      dispatch(setTeachers(data.teachers))
    })
}
