import { SET_CLASS_HOMEWORK,SET_PARENT_HOMEWORK } from "../types";


import api from "../api"
export const setHomeWorks = class_homeworks => ({
    type: SET_CLASS_HOMEWORK,
    class_homeworks
});


export const setParentHomeWork = parent_homework => ({
  type: SET_PARENT_HOMEWORK,
  parent_homework
});




export const setHomeWorksDispatch = (class_id) => dispatch => {
    api.teacher.homework.get(class_id).then(data => {
      dispatch(setHomeWorks(data.class_homeworks))
    })
}
  

export const setParentHomeWorkDispatch = (student_ids) => dispatch => 
        api.parent.homework.get(student_ids).then(data => {
        dispatch(setParentHomeWork(data.student_homework)); 
        return data.student_homework
    })
