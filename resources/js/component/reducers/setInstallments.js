import { SET_FEE_INSTALLMENTS } from "../types";

export default function setInstallments(state = {}, action = {}) {
  switch (action.type) {
    case SET_FEE_INSTALLMENTS:
      return action.installments;
    default:
      return state;
  }
}