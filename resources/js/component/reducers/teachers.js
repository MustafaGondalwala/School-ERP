import { SET_TEACHERS } from "../types";

export function setTeachers(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHERS:
      return action.teachers;
    default:
    return state;
  }
}
