import { SET_TIMETABLE,SET_TIMETABLE_TEACHER } from "../types";

export function setTimetable(state = {}, action = {}) {
  switch (action.type) {
    case SET_TIMETABLE:
      return action.timetables;
    default:
    return state;
  }
}

export function setTimetableTeacher(state = {}, action = {}) {
  switch (action.type) {
    case SET_TIMETABLE_TEACHER:
      return action.teacher_timetables;
    default:
    return state;
  }
}
