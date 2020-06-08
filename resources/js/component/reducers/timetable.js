import { SET_TIMETABLE } from "../types";

export function setTimetable(state = {}, action = {}) {
  switch (action.type) {
    case SET_TIMETABLE:
      return action.timetables;
    default:
    return state;
  }
}
