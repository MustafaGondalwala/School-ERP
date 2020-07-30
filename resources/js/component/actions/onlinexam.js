import {SET_TEACHER_ONLINEXAM,SET_TEACHER_ONLINETEST_STUDENTANSWERS} from "../types"
import api from "../api"
export const teacherWiseOnlineTest = (onlineexam) => ({
    type:SET_TEACHER_ONLINEXAM,
    onlineexam
})

export const setOnlineTestWithStudentAnswers = (monthlytest_withstudentanswers) => ({
  type:SET_TEACHER_ONLINETEST_STUDENTANSWERS,
  monthlytest_withstudentanswers
})

export const onlinetestWithStudentAnswersDispatch = () => dispatch => {
  api.adminteacher.onlineexam.monthly_test.getDetailsWithStudentAnswers().then(data => {
    dispatch(setOnlineTestWithStudentAnswers(data.monthlytest_withstudentanswers))
  })
}

export const teacherWiseOnlineTestDispatch = () => dispatch => 
    api.adminteacher.onlineexam.monthly_test.get().then(data => {
      dispatch(teacherWiseOnlineTest(data.onlineExam))
    })
