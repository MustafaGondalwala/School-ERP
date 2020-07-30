import { SET_QUESTION_PAPER } from "../types";

export function questionpaper(state = {}, action = {}) {
  switch (action.type) {
    case SET_QUESTION_PAPER:
      return action.questionpaper;
    default:
      return state;
  }
}