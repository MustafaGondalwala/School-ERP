import React from "react"
import {SET_PARENT_STUDENT_LEAVE} from "../types"
import api from "../api"

export const setParentLeaves = (student_id,studentleaves) => ({
    type:SET_PARENT_STUDENT_LEAVE,
    student_id,
    studentleaves
  })

export const setParentLeavesDispatch = (student_id) => dispatch => 
api.parentstudent.leave.viewAll(student_id).then(data => {
    dispatch(setParentLeaves(student_id,data.studentleaves))
  })


