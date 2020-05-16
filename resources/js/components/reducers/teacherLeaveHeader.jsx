import { TEACHER_LEAVE_HEADER,TEACHER_LEAVE_HEADER_EMPTY } from "../types";

export default function teacherLeaveHeader(state = {}, action = {}) {
  switch (action.type) {
    case TEACHER_LEAVE_HEADER:
      return action.assignTeacherClass;
   case TEACHER_LEAVE_HEADER_EMPTY:
   		return {}
    default:
      return state;
  }
}