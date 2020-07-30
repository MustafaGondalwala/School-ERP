import { SET_CLASS_HOMEWORK,SET_PARENT_HOMEWORK,SET_TEACHER_HOMEWORK,SET_STUDENT_CURRENT_HOMEWORK,SET_TEACHER_PAST_HOMEWORK} from "../types";


import api from "../api"
export const setHomeWorks = class_homeworks => ({
    type: SET_CLASS_HOMEWORK,
    class_homeworks
});


export const setParentHomeWork = parent_homework => ({
  type: SET_PARENT_HOMEWORK,
  parent_homework
});

export const setTeacherHomeWork = teacherwise_homework => ({
  type:SET_TEACHER_HOMEWORK,
  teacherwise_homework
})


export const setStudentCurrentHomeWork = (student_id,studentCurrent_homework) => ({
  type:SET_STUDENT_CURRENT_HOMEWORK,
  student_id,
  studentCurrent_homework
})
export const setPastHomeWorks = (teacherwise_past_homework) => ({
  type:SET_TEACHER_PAST_HOMEWORK,
  teacherwise_past_homework
})



export const setStudentCurrentHomeWorkDispatch = (student_id) => dispatch => 
  api.parentstudent.homework.current.get(student_id).then(data => {
    dispatch(setStudentCurrentHomeWork(student_id,data.current_homework))
  })



  export const setPastHomeWorksDispatch = (class_id) => dispatch => 
    api.adminteacher.homework.past.get().then(data => {
      dispatch(setPastHomeWorks(data.teacherwise_past_homework))
    })

export const setHomeWorksDispatch = (class_id) => dispatch => 
    api.teacher.homework.get(class_id).then(data => {
      dispatch(setHomeWorks(data.class_homeworks))
    })

    export const setTeacherwiseHomeWorkDispatch = () => dispatch => 
  api.adminteacher.homework.getTeacherwise().then(data => {
    dispatch(setTeacherHomeWork(data.teacherwise_homework))
  })

export const setParentHomeWorkDispatch = (student_ids) => dispatch => 
        api.parent.homework.get(student_ids).then(data => {
        dispatch(setParentHomeWork(data.student_homework)); 
        return data.student_homework
    })
