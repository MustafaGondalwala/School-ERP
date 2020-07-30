
import {SET_CLASSWISE_SUBJECTS} from "../types"
import api from "../api";


export const setClasswiseSubjects = (subjectclasswise,class_id) => ({
    type: SET_CLASSWISE_SUBJECTS,
    subjectclasswise,
    class_id
  });

export const setClasswiseSubjectsDispatch = (class_id) => dispatch => 
    api.subject_class_wise(class_id).then(data => {
        dispatch(setClasswiseSubjects(data.subjectclasswise,class_id))
    })