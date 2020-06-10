import { SET_EXAM_TYPE } from "../types";
import api from "../api"

export const getExamType = exam_type => ({
  type:SET_EXAM_TYPE,
  exam_type
})

export const getExamTypeDispatch = () => dispatch => {
    api.admin.exam.exam_type.get().then(data => {
      dispatch(getExamType(data.exam_types))
    })
  }