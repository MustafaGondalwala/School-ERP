
import {SET_SUBJECTS} from "../types"
import api from "../api";


export const setSubjects = (subjects) => ({
    type: SET_SUBJECTS,
    subjects 
  });

export const setSubjectDispatch = () => dispatch => 
  api.subjects().then(data => {
    dispatch(setSubjects(data.subjects))
  })