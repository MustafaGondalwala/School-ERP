import { SET_TEACHERS,SET_TEACHERS_NAME } from "../types";

export function setTeachers(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHERS:
      return action.teachers;
    default:
    return state;
  }
}


export function setTeachersName(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHERS_NAME:
      return action.teacher_names;
    default:
      return state;
  }
}