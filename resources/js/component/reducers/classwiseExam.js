import { SET_ONLINE_CLASSWISE_MONTHLYTEST,SET_CLASSWISE_MONTHLYTEST } from "../types";

export function classwiseMonthlyTest(state = {}, action = {}) {
  switch (action.type) {
    case SET_CLASSWISE_MONTHLYTEST:
      var newData={};
      newData[action.class_id]=action.monthlytestclasswise;
      return Object.assign({}, state, newData)
    default:
      return state;
  }
}

export function classwiseOnlineMonthlyTest(state = {}, action = {}) {
  switch (action.type) {
    case SET_ONLINE_CLASSWISE_MONTHLYTEST:
      var newData={};
      newData[action.class_id]=action.online_monthlytestclasswise;
      return Object.assign({}, state, newData)
    default:
      return state;
  }
}