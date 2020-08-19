import { SET_PARENT_STUDENT_LEAVE } from "../types";

export function parentStudentLeave(state = {}, action = {}) {
    switch (action.type) {
      case SET_PARENT_STUDENT_LEAVE:
        var newData={};
        newData[action.student_id]=action.studentleaves;
        return Object.assign({}, state, newData)
      default:
        return state;
    }
  }