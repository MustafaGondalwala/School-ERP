import { combineReducers } from "redux";

import user from "./reducers/user";
import files from "./reducers/files"
import parent_children from "./reducers/parentChildren";

export default combineReducers({
  user,
  files,
  parent_children
});