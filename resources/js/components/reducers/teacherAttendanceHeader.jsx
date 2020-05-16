import { TEACHER_CLASS_ATTENDANCE,TEACHER_CLASS_ATTENDANCE_EMPTY } from "../types";

export default function attendanceTeacherHeader(state = {}, action = {}) {
  switch (action.type) {
    case TEACHER_CLASS_ATTENDANCE:
      return action.attendanceTeacherHeader;
    case TEACHER_CLASS_ATTENDANCE_EMPTY:
    	return {};
    default:
      return state;
  }
}