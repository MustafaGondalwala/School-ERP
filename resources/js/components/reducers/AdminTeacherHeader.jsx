import { ADMIN_TEACHER_HEADER } from "../types";

export default function adminTeacherHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_TEACHER_HEADER:
      return action.adminTeacherHeader;
    default:
      return state;
  }
}