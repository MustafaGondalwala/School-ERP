import { SET_TIMETABLE,SET_TIMETABLE_TEACHER,SET_CLASSWISE_TIMETABLE } from "../types";

export function setTimetable(state = {}, action = {}) {
  switch (action.type) {
    case SET_TIMETABLE:
      return action.timetables;
    default:
    return state;
  }
}


export function classwiseTimeTable(state = {}, action = {}) {
  switch (action.type) {
    case SET_CLASSWISE_TIMETABLE:
      var newData={};
      newData[action.class_id]=action.classwise_timetable;
      return Object.assign({}, state, newData)
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
