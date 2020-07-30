import { SET_CLASSWISE_SUBJECTS } from "../types";

export function classwiseSubject(state = {}, action = {}) {
  switch (action.type) {
    case SET_CLASSWISE_SUBJECTS:
      var newData={};
      newData[action.class_id]=action.subjectclasswise;
      return Object.assign({}, state, newData)

    default:
      return state;
  }
}