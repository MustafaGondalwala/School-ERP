import { SET_CLASSES,SET_DISTINCT_CLASSES,SET_CLASS_PERIOD,SET_CLASSWISE_TIMETABLE } from "../types";

export function setClass(state = {}, action = {}) {
  switch (action.type) {
    case SET_CLASSES:
      return action.classes;
    default:
      return state;
  }
}

export function setDistinctClass(state = {}, action = {}) {
    switch (action.type) {
      case SET_DISTINCT_CLASSES:
        return action.distinct_classes;
      default:
        return state;
    }
}

export function classPeriod(state = {}, action = {}) {
  switch (action.type) {
    case SET_CLASS_PERIOD:
      return action.class_periods;
    default:
      return state;
  }
}

const update = (state, mutations) =>
  Object.assign({}, state, mutations)

export function setClassWiseTimeTable(state = [], action = {}) {
  switch (action.type) {
    case SET_CLASSWISE_TIMETABLE:
      return update(state, action.classwise_timetable)
    default:
      return state;
  }
}