import { SET_PARENT_CHILDS,SET_PARENT_HOMEWORK } from "../types";

export function parent_childs(state = {}, action = {}) {
  switch (action.type) {
    case SET_PARENT_CHILDS:
      return action.parent_childs;
    default:
      return state;
  }
}

export function parent_homework(state = {}, action = {}) {
  switch (action.type) {
    case SET_PARENT_HOMEWORK:
      return action.parent_homework;
    default:
      return state;
  }
}
