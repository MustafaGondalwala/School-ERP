
import {SET_YEAR} from "../types"
import api from "../api";


export const setYear = (years) => ({
    type: SET_YEAR,
    years
  });

export const setYearDispatch = () => dispatch => 
    api.get_years().then(data => {
        dispatch(setYear(data.years))
    })