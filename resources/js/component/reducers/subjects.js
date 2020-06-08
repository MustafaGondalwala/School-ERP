import { SET_SUBJECTS } from "../types";

export function setSubjects(state = {}, action = {}) {
  switch (action.type) {
    case SET_SUBJECTS:
      return action.subjects;
    default:
      return state;
  }
}