import { SET_EXAM_TYPE,SET_MONTHLY_TEST } from "../types";

export function examType(state = {}, action = {}) {
  switch (action.type) {
    case SET_EXAM_TYPE:
      return action.exam_type;
    default:
      return state;
  }
}

export function monthlyTest(state = {}, action = {}) {
  switch (action.type) {
    case SET_MONTHLY_TEST:
      return action.monthly_test;
    default:
      return state;
  }
}


