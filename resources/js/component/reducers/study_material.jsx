import { SET_STUDY_MATERIAL_GROUPS,SET_TEACHER_STUDY_MATERIAL_GROUPS } from "../types";

export function studyMaterialGroup(state = {}, action = {}) {
  switch (action.type) {
    case SET_STUDY_MATERIAL_GROUPS:
      var newData={};
      newData[action.class_id]=action.groups;
      return Object.assign({}, state, newData)

    default:
      return state;
  }
}

export function studyMaterialGroupTeacher(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHER_STUDY_MATERIAL_GROUPS:
      return action.teacher_groups;
    default:
      return state;
  }
}