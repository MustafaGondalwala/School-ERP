import { SET_STUDY_MATERIAL_GROUPS } from "../types";

export function studyMaterialGroup(state = {}, action = {}) {
  switch (action.type) {
    case SET_STUDY_MATERIAL_GROUPS:
      // return {
      //   ...state,
      //   groups: {
      //     ...state.groups,
      //     [action.class_id]: action.groups
      //   }
      // }
      var newData={};
      newData[action.class_id]=action.groups;
      return Object.assign({}, state, newData)

    default:
      return state;
  }
}