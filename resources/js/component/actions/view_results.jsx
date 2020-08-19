import {SET_MONTHLYTEST_RESULT,SET_EXAM_RESULT} from "../types"
import api from "../api"


export const setMonthlyTestResults = (student_id,monthlytestResult) => ({
    type: SET_MONTHLYTEST_RESULT,
    student_id,
    monthlytestResult
})

export const setExamResults = (student_id,examResult) => ({
    type: SET_EXAM_RESULT,
    student_id,
    examResult
})


export const setExamResultsDispatch = (student_id) => dispatch => 
    api.parentstudent.results.exam(student_id).then(data => {
        const {exam_results} = data
        exam_results.map(item => {
            item.groups = _.groupBy(item.student_marksheet,  'student_id');
        })
        dispatch(setExamResults(student_id,data.exam_results))
    })

export const setMonthlyTestResultsDispatch = (student_id) => dispatch => 
    api.parentstudent.results.monthlytest(student_id).then(data => {
        dispatch(setMonthlyTestResults(student_id,data.monthly_test))
    })