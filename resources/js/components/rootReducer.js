import { combineReducers } from "redux";

import user from "./reducers/user";
import files from "./reducers/files"
import parent_children from "./reducers/parentChildren";
import attendanceTeacherHeader from "./reducers/teacherAttendanceHeader"
import assignTeacherClass from "./reducers/assignTeacherClass"
import adminStudentHeader from "./reducers/adminStudentHeader"

export default combineReducers({
  user,
  files,
  parent_children,
  assignTeacherClass,
  attendanceTeacherHeader,
  adminStudentHeader
});