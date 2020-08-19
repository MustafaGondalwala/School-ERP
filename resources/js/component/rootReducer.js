import { combineReducers } from "redux";



import {gradeType} from "./reducers/grade"
import {user,assigned_class} from "./reducers/user";
import installments from "./reducers/setInstallments"
import year from "./reducers/setYear"
import feeType from "./reducers/feeType"
import {setClass as classes ,setDistinctClass as distinct_classes,classPeriod as class_periods} from "./reducers/classes"
import {setSubjects as subjects} from "./reducers/subjects"
import {setTeachers as teachers,setTeachersName as teachers_name,setTeacherWiseOnlinExam as teacher_onlineexam,setTeacherOnlineTestAnswers as monthlytest_withstudentanswers} from "./reducers/teachers"
import {setTimetable as timetables,setTimetableTeacher as teacher_timetables,classwiseTimeTable as classwise_timetable} from "./reducers/timetable"
import {class_homeworks,teacherwise_homework,studentCurrent_homework,studentPast_homework,teacherwise_past_homework} from "./reducers/homework"
import {parent_childs,parent_homework} from "./reducers/parent"
import {examType,monthlyTest} from "./reducers/exam"
import {adminStudentHeader,adminTeacherHeader,adminFeeHeader,adminTimeTableHeader} from "./reducers/header"
import {schoolClerks} from "./reducers/clerk"
import {studyMaterialGroup,studyMaterialGroupTeacher as teacher_groups} from "./reducers/study_material"
import {classwiseSubject} from "./reducers/classwiseSubject"
import {questionpaper} from "./reducers/questionpaper"
import {classwiseMonthlyTest,classwiseOnlineMonthlyTest} from "./reducers/classwiseExam"
import {monthlyTestResult,examResult} from "./reducers/view_results"
import {select_student} from "./reducers/select_student"
import {parentStudentLeave as studentleaves} from "./reducers/leave"


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
    teachers_name,
    teacher_timetables,
    adminStudentHeader,
    adminTeacherHeader,
    schoolClerks,
    monthlyTest,
    studyMaterialGroup,
    classwiseSubject,
    questionpaper,
    classwiseMonthlyTest,
    classwiseOnlineMonthlyTest,
    teacher_groups,
    monthlyTestResult,
    examResult,
    teacherwise_homework,
    studentCurrent_homework,
    studentPast_homework,
    teacherwise_past_homework,
    teacher_onlineexam,
    monthlytest_withstudentanswers,
    select_student,
    adminFeeHeader,
    adminTimeTableHeader,
    gradeType,
    studentleaves
  });