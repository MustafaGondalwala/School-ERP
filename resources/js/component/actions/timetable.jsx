
import {SET_TIMETABLE} from "../types"
import api from "../api";


export const setTimetable = (timetables) => ({
    type: SET_TIMETABLE,
    timetables
  });

export const setTimetableDispatch = () => dispatch => {
    api.admin.timetable.get().then(data => {
        dispatch(setTimetable(data.time_tables))
    })
}
