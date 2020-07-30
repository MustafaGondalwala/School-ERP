import { SET_CLASS_HOMEWORK,SET_TEACHER_HOMEWORK,SET_STUDENT_CURRENT_HOMEWORK,SET_TEACHER_PAST_HOMEWORK } from "../types";

export function class_homeworks(state = {}, action = {}) {
  switch (action.type) {
    case SET_CLASS_HOMEWORK:
      return action.class_homeworks;
    default:
      return state;
  }
}


export function studentCurrent_homework(state = {}, action = {}) {
  switch (action.type) {
    case SET_STUDENT_CURRENT_HOMEWORK:
      var newData={};
      newData[action.student_id]=action.studentCurrent_homework;
      return Object.assign({}, state, newData)
    default:
      return state;
  }
}


export function teacherwise_past_homework(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHER_PAST_HOMEWORK:
      return action.teacherwise_past_homework;
    default:
      return state;
  }
}


export function teacherwise_homework(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHER_HOMEWORK:
      return action.teacherwise_homework;
    default:
      return state;
  }
}