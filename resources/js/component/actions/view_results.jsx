import {SET_MONTHLYTEST_RESULT} from "../types"
import api from "../api"


export const setMonthlyTestResults = (student_id,monthlytestResult) => ({
    type: SET_MONTHLYTEST_RESULT,
    student_id,
    monthlytestResult
})


export const setMonthlyTestResultsDispatch = (student_id) => dispatch => 
    api.parentstudent.results.monthlytest(student_id).then(data => {
        dispatch(setMonthlyTestResults(student_id,data.monthly_test))
    })