import { SET_MONTHLYTEST_RESULT } from "../types";

export function monthlyTestResult(state = {}, action = {}) {
  switch (action.type) {
    case SET_MONTHLYTEST_RESULT:
      var newData={};
      newData[action.student_id]=action.monthlytestResult;
      return Object.assign({}, state, newData)
    default:
      return state;
  }
}
