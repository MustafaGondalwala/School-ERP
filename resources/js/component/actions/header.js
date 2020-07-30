import { ADMIN_STUDENT_HEADER, ADMIN_TEACHER_HEADER,ADMIN_FEE_HEADER,ADMIN_TIMETABLE_HEADER } from "../types";


import api from "../api"
export const setAdminStudentHomeWork = adminStudentHeader => ({
    type: ADMIN_STUDENT_HEADER,
    adminStudentHeader
});
  
export const setAdminTeacherHomeWork = adminTeacherHeader => ({
    type: ADMIN_TEACHER_HEADER,
    adminTeacherHeader
})

export const setAdminFeeHeader = adminFeeHeader => ({
    type: ADMIN_FEE_HEADER,
    adminFeeHeader
})

export const setAdminTimeTableHeader = adminTimeTableHeader => ({
    type: ADMIN_TIMETABLE_HEADER,
    adminTimeTableHeader
})

export const setAdminTimeTableHeaderDispatch = () => dispatch => 
    api.header.admin.timetable().then(data => {
        const {total} = data
        dispatch(setAdminTimeTableHeader(total)); 
    })

export const setAdminFeeHeaderDispatch = () => dispatch => 
    api.header.admin.fee().then(data => {
        const {total} = data
        dispatch(setAdminFeeHeader(total)); 
    })

export const setAdminTeacherHomeWorkDispatch = () => dispatch => 
    api.header.admin.teacher().then(data => {
        const {total} = data
        dispatch(setAdminTeacherHomeWork(total)); 
    })

export const setAdminStudentHomeWorkDispatch = () => dispatch => 
    api.header.adminclerk.student().then(data => {
        const {total} = data
        dispatch(setAdminStudentHomeWork(total)); 
    })

