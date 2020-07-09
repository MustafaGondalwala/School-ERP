import { ADMIN_STUDENT_HEADER } from "../types";


import api from "../api"
export const setAdminStudentHomeWork = adminStudentHeader => ({
    type: ADMIN_STUDENT_HEADER,
    adminStudentHeader
});
  

export const setAdminStudentHomeWorkDispatch = () => dispatch => 
    api.header.adminclerk.student().then(data => {
        const {total} = data
        dispatch(setAdminStudentHomeWork(total)); 
    })