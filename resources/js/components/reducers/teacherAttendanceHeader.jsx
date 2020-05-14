import { TEACHER_CLASS_ATTENDANCE } from "../types";

export default function attendanceTeacherHeader(state = {}, action = {}) {
  switch (action.type) {
    case TEACHER_CLASS_ATTENDANCE:
      return action.attendanceTeacherHeader;
    default:
      return state;
  }
}