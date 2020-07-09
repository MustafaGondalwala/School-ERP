import { SET_EXAM_TYPE,SET_MONTHLY_TEST } from "../types";
import api from "../api"

export const getExamType = exam_type => ({
  type:SET_EXAM_TYPE,
  exam_type
})

export const setMonthlyTest = monthly_test => ({
  type:SET_MONTHLY_TEST,
  monthly_test
})

export const getExamTypeDispatch = () => dispatch => {
    api.admin.exam.exam_type.get().then(data => {
      dispatch(getExamType(data.exam_types))
    })
  }

export const getMonthlyTestDispatch = () => dispatch => {
  api.monthly_test().then(data => {
    dispatch(setMonthlyTest(data.monthly_test))
  })
}