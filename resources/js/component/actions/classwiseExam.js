
import {SET_CLASSWISE_MONTHLYTEST,SET_ONLINE_CLASSWISE_MONTHLYTEST} from "../types"
import api from "../api";


export const setClasswiseMonthlyTest = (monthlytestclasswise,class_id) => ({
    type: SET_CLASSWISE_MONTHLYTEST,
    monthlytestclasswise,
    class_id
  });

export const setClasswiseMonthlyTestDispatch = (class_id) => dispatch => 
    api.monthlytest_classwise(class_id)
    .then(data => {
        dispatch(setClasswiseMonthlyTest(data.monthlyTest,class_id))
    })


export const setClasswiseOnlineMonthlyTest = (online_monthlytestclasswise,class_id) => ({
    type: SET_ONLINE_CLASSWISE_MONTHLYTEST,
    online_monthlytestclasswise,
    class_id
    });

export const setClasswiseOnlineMonthlyTestDispatch = (class_id) => dispatch => 
      api.online_monthlytest_classwise(class_id)
      .then(data => {
          dispatch(setClasswiseOnlineMonthlyTest(data.onlineExam,class_id))
      })