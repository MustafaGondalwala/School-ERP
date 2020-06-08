import { SET_YEAR } from "../types";

export default function setYear(state = {}, action = {}) {
  switch (action.type) {
    case SET_YEAR:
      return action.years;
    default:
      return state;
  }
}