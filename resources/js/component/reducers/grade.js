import { GRADE_TYPE } from "../types";

export function gradeType(state = {}, action = {}) {
  switch (action.type) {
    case GRADE_TYPE:
      return action.gradeType;
    default:
      return state;
  }
}