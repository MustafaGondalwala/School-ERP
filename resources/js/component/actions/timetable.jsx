
import {SET_TIMETABLE,SET_TIMETABLE_TEACHER,SET_CLASSWISE_TIMETABLE} from "../types"
import api from "../api";
import Swal from "sweetalert2"

export const setTimetable = (timetables) => ({
    type: SET_TIMETABLE,
    timetables
});
export const setTimetableTeacher = (teacher_timetables) => ({
    type: SET_TIMETABLE_TEACHER,
    teacher_timetables
});

export const setClasswiseTimetable = (class_id,classwise_timetable) => ({
    type:SET_CLASSWISE_TIMETABLE,
    class_id,
    classwise_timetable
})


export const setTimeTableStudentParentDispatch = (class_id) => dispatch => {
    api.timetable_classwise(class_id).then(data => {
        dispatch(setClasswiseTimetable(class_id,data.classwise_timetable))
        return data.classwise_timetable
    }).catch(error => {
        if(error.response){
            const {status,data} = error.response
            if(status == 400){
                Swal.fire("Time Table not Allocated",data.error.message,"warning")
            }
        }
    })
}

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
