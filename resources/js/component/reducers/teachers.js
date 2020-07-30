import { SET_TEACHERS,SET_TEACHERS_NAME,SET_TEACHER_ONLINEXAM,SET_TEACHER_ONLINETEST_STUDENTANSWERS } from "../types";

export function setTeachers(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHERS:
      return action.teachers;
    default:
    return state;
  }
}


export function setTeachersName(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHERS_NAME:
      return action.teacher_names;
    default:
      return state;
  }
}

export function setTeacherOnlineTestAnswers(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHER_ONLINETEST_STUDENTANSWERS:
      return action.monthlytest_withstudentanswers;
    default:
      return state;
  }
}

export function setTeacherWiseOnlinExam(state = {}, action = {}) {
  switch (action.type) {
    case SET_TEACHER_ONLINEXAM:
      return action.onlineexam;
    default:
      return state;
  }
}