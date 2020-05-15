import { ADMIN_ATTENDANCE_HEADER } from "../types";

export default function adminAttendanceHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_ATTENDANCE_HEADER:
      return action.adminAttendanceHeader;
    default:
      return state;
  }
}