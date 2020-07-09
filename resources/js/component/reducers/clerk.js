import { SCHOOL_CLERKS} from "../types";

export function schoolClerks(state = {}, action = {}) {
  switch (action.type) {
    case SCHOOL_CLERKS:
      return action.clerks;
    default:
      return state;
  }
}
