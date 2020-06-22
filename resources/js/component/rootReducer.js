import { combineReducers } from "redux";

import {user,assigned_class} from "./reducers/user";
import installments from "./reducers/setInstallments"
import year from "./reducers/setYear"
import feeType from "./reducers/feeType"
import {setClass as classes ,setDistinctClass as distinct_classes,classPeriod as class_periods,setClassWiseTimeTable as classwise_timetable} from "./reducers/classes"
import {setSubjects as subjects} from "./reducers/subjects"
import {setTeachers as teachers,setTeachersName as teachers_name} from "./reducers/teachers"
import {setTimetable as timetables} from "./reducers/timetable"
import {class_homeworks} from "./reducers/homework"
import {parent_childs,parent_homework} from "./reducers/parent"
import {examType} from "./reducers/exam"

export default combineReducers({
    user,
    installments,
    year,
    feeType,
    distinct_classes,
    classes,
    class_periods,
    subjects,
    teachers,
    timetables,
    assigned_class,
    class_homeworks,
    parent_childs,
    parent_homework,
    classwise_timetable,
    examType,
    teachers_name
  });