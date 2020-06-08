import { SET_FEE_TYPE } from "../types";

export default function feeType(state = {}, action = {}) {
  switch (action.type) {
    case SET_FEE_TYPE:
      return action.feeType;
    default:
      return state;
  }
}