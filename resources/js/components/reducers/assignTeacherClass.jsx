import { ASSIGNED_TEACHER_CLASS,TEACHER_CLASS_ATTENDANCE } from "../types";

export default function assignTeacherClass(state = {}, action = {}) {
  switch (action.type) {
    case ASSIGNED_TEACHER_CLASS:
      return action.assignTeacherClass;
   
    default:
      return state;
  }
}