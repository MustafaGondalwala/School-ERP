
import {SET_TIMETABLE,SET_TIMETABLE_TEACHER} from "../types"
import api from "../api";


export const setTimetable = (timetables) => ({
    type: SET_TIMETABLE,
    timetables
});
export const setTimetableTeacher = (teacher_timetables) => ({
    type: SET_TIMETABLE_TEACHER,
    teacher_timetables
});

export const setTimetableDispatch = () => dispatch => {
    api.admin.timetable.get().then(data => {
        dispatch(setTimetable(data.time_tables))
    })
}

export const setTimetableTeacherDispatch = () => dispatch => {
    api.admin.stafftimetable.get().then(data => {
        dispatch(setTimetableTeacher(data.time_tables))
    })
}
