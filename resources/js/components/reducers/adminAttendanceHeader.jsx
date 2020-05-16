import { ADMIN_ATTENDANCE_HEADER,ADMIN_ATTENDANCE_HEADER_EMPTY } from "../types";

export default function adminAttendanceHeader(state = {}, action = {}) {
  switch (action.type) {
    case ADMIN_ATTENDANCE_HEADER:
      return action.adminAttendanceHeader;
    case ADMIN_ATTENDANCE_HEADER_EMPTY:
    	return {};
    default:
      return state;
  }
}