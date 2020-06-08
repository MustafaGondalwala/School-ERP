import { SET_CLASSES,SET_DISTINCT_CLASSES,SET_CLASS_PERIOD,SET_CLASSWISE_TIMETABLE
} from "../types";


import api from "../api"
export const setClasses = classes => ({
    type: SET_CLASSES,
    classes
});

export const setDistinctClasses = distinct_classes => ({
    type:SET_DISTINCT_CLASSES,
    distinct_classes
}) 

export const getClassPeriod = class_periods => ({
  type:SET_CLASS_PERIOD,
  class_periods
})
export const getClassPeriodDispatch = () => dispatch => {
  api.admin.class_period.get().then(data => {
    dispatch(getClassPeriod(data.class_periods))
  })
}



export const getClassSection = () => dispatch => {
    return api.class().then(data => {
        const uniqueClasses = [];
          data.classes.map((item) => {
            if (uniqueClasses.indexOf(item.class_title) === -1) {
              uniqueClasses.push(item.class_title);
            }
          });
          dispatch(setDistinctClasses(uniqueClasses));
          dispatch(setClasses(data.classes));
    })
}

export const setClassSection = (classes) => dispatch => {
    const uniqueClasses = [];
    classes.map((item) => {
            if (uniqueClasses.indexOf(item.class_title) === -1) {
              uniqueClasses.push(item.class_title);
            }
    });
    dispatch(setDistinctClasses(uniqueClasses));
    dispatch(setClasses(classes));
}

export const getClassDispatch = () =>  dispatch => {
  api.class().then(data => {
    const uniqueClasses = [];
    data.classes.map((item) => {
      if (uniqueClasses.indexOf(item.class_title) === -1) {
        uniqueClasses.push(item.class_title);
      }
    });
    dispatch(setDistinctClasses(uniqueClasses));
    dispatch(setClasses(data.classes));
  })
}

export const updateClassWiseTimeTable = (new_classtimetable) => ({
  type:SET_CLASSWISE_TIMETABLE,
  classwise_timetable:new_classtimetable
})

export  const getClassWiseTimeTable = (class_id) => dispatch => 
  api.classwise_timetable(class_id).then(data => {
    dispatch(updateClassWiseTimeTable(data.classwise_timetable));
    return data.classwise_timetable
  })


