import { SET_EXAM_TYPE } from "../types";

export function examType(state = {}, action = {}) {
  switch (action.type) {
    case SET_EXAM_TYPE:
      return action.exam_type;
    default:
      return state;
  }
}