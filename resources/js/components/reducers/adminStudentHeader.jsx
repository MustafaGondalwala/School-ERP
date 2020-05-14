import { ADMIN_STUDENT_HEADER } from "../types";

export default function adminStudentHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_STUDENT_HEADER:
      return action.adminStudentHeader;
    default:
      return state;
  }
}