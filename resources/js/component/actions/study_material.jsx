
import {SET_STUDY_MATERIAL_GROUPS,SET_TEACHER_STUDY_MATERIAL_GROUPS} from "../types"
import api from "../api";


export const setGroup = (groups,class_id) => ({
    type: SET_STUDY_MATERIAL_GROUPS,
    groups,
    class_id
  });

  export const setTeacherGroup = (teacher_groups) => ({
    type: SET_TEACHER_STUDY_MATERIAL_GROUPS,
    teacher_groups
  });


export const setTeacherGroupDispatch = () => dispatch => {
  api.adminteacher.study_material.teacher.group.get().then(data => {
    dispatch(setTeacherGroup(data.groups))
  })
}


export const setGroupDispatch = (class_id) => dispatch => 
    api.adminteacher.study_material.group.get(class_id).then(data => {
        dispatch(setGroup(data.groups,class_id))
    })