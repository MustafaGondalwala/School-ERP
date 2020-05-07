import { PARENT_CHILDREN } from "../types";

export default function parent_children(state = {}, action = {}) {
  switch (action.type) {
    case PARENT_CHILDREN:
      return action.students;
    default:
      return state;
  }
}