import { ADMIN_STUDENT_HEADER,ADMIN_TEACHER_HEADER,ADMIN_FEE_HEADER,ADMIN_TIMETABLE_HEADER } from "../types";

export function adminStudentHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_STUDENT_HEADER:
      return action.adminStudentHeader;
    default:
      return state;
  }
}


export function adminTeacherHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_TEACHER_HEADER:
      return action.adminTeacherHeader;
    default:
      return state;
  }
}

export function adminFeeHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_FEE_HEADER:
      return action.adminFeeHeader;
    default:
      return state;
  }
}

export function adminTimeTableHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_TIMETABLE_HEADER:
      return action.adminTimeTableHeader;
    default:
      return state;
  }
}
