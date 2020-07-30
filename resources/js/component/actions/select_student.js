
import {SELECT_STUDENT} from "../types"
import api from "../api";


export const setSelectStudent = (select_student) => ({
    type: SELECT_STUDENT,
    select_student
  });

export const setSelectStudentDispatch = () => dispatch => 
    api.student.get_student_searchable().then(data => {
        dispatch(setSelectStudent(data.student))
    })

    
export const setSelectStudentClassIDDispatch = class_id => dispatch => 
    api.student.get_student_searchable_by_class(class_id).then(data => {
        dispatch(setSelectStudent(data.student))
    })
