import { GRADE_TYPE
} from "../types";
import api from "../api"

export const setGradeType = gradeType => ({
    type: GRADE_TYPE,
    gradeType
});

export const setGradeTypeDispatch = () => dispatch => 
    api.grade_type().then(data => {
        dispatch(setGradeType(data.grade_type));
    })