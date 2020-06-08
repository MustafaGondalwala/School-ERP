import { SET_CLASS_HOMEWORK } from "../types";

export function class_homeworks(state = {}, action = {}) {
  switch (action.type) {
    case SET_CLASS_HOMEWORK:
      return action.class_homeworks;
    default:
      return state;
  }
}