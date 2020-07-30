import { SELECT_STUDENT } from "../types";

export function select_student(state = {}, action = {}) {
  switch (action.type) {
    case SELECT_STUDENT:
      return action.select_student;
    default:
      return state;
  }
}