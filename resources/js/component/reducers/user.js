import { USER_LOGGED_IN, USER_LOGGED_OUT,ASSIGNED_CLASS } from "../types";

export function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}

export function assigned_class(state = {}, action = {}) {
  switch (action.type) {
    case ASSIGNED_CLASS:
      return action.assigned_class;
    default:
      return state;
  }
}