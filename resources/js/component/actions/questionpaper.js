
import {SET_QUESTION_PAPER} from "../types"
import api from "../api";


export const setQuestionPaper = (questionpaper) => ({
    type: SET_QUESTION_PAPER,
    questionpaper
  });

export const setQuestionPaperDispatch = () => dispatch => 
    api.adminteacher.questionbank.get().then(data => {
        dispatch(setQuestionPaper(data.questionpaper))
    })