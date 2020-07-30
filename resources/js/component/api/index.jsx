let api = axios
let formDataConfig = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}
import Swal from "sweetalert2"
import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import { data } from "jquery";

api.interceptors.response.use((response) => response, (error) => {
    const {status,data} = error.response
    if(status == 401){
        Swal.fire("Error",data.message+". Please Login Page.",'error')
        localStorage.removeItem("userAccount");
        localStorage.removeItem("token");
        localStorage.removeItem("user_type");
        localStorage.removeItem("school_id");
        setAuthorizationHeader();
    }else if(status == 500){
        Swal.fire("Error","Server Error has Occured Please again later.",'error')
    }else if(status == 404){
        Swal.fire("Error","Can Find the Route",'error')
    }
    return Promise.reject(error);
  });

export default {
        adminclerk:{
            student:{
                register:{
                    add: data => api.post("/api/v1/adminclerk/student/register",data,formDataConfig).then(response => response.data.success),
                    list: class_string => api.post("/api/v1/adminclerk/student/register/list",{class_string}).then(response => response.data.success),
                    bulk_add: data => api.post("/api/v1/adminclerk/student/register/bulk_add",{data}).then(response => response.data.success),
                },
                listAll : () => api("/api/v1/adminclerk/student/listAll").then(response => response.data.success),
                listByClassId: class_id => api("/api/v1/adminclerk/student/list/"+class_id).then(response => response.data.success),
                getstudent: (student_id) => api("/api/v1/adminclerk/student/list-individual/"+student_id).then(response => response.data.success),
                update_student: data => api.post('/api/v1/adminclerk/student/update',data,formDataConfig).then(response => response.data.success),
                get_roll_no: class_id => api("/api/v1/adminclerk/student/get-rollno-by-classid/"+class_id).then(response => response.data.success),
                class_wise_student_photos: class_id => api("/api/v1/adminclerk/student/photos/"+class_id).then(response => response.data.success),
                advanced_search: data => api.post("/api/v1/adminclerk/student/advanced_search",data).then(response => response.data.success),            
                admission: {
                    add: (data) => api.post('/api/v1/adminclerk/student/admission',data,formDataConfig).then(response => response.data.success),
                    bulk_add: data => api.post('/api/v1/adminclerk/student/admission/bulk_add',{data}).then(response => response.data.success),
                    update_student_cell: data => api.post('/api/v1/adminclerk/student/admission/update-particular-cell',data).then(response => response.data.success),
                },
                medical_info:{
                    get: (student_id,checkup_type) => api.post('/api/v1/adminclerk/student/medical_info',{student_id,checkup_type}).then(response => response.data.success),
                    update: data => api.post('/api/v1/adminclerk/student/medical_info/update',data).then(response => response.data.success),
                },
                update_photo: data => api.post('/api/v1/adminclerk/student/update_photo',data,formDataConfig).then(response => response.data.success),
            },
            exam:{
                hall_ticket:{
                    get: (data) => api.post("/api/v1/adminclerk/exam/hallticket",data).then(response => response.data.success),
                    update: (class_hallticket)  => api.put("/api/v1/adminclerk/exam/hallticket",{class_hallticket}).then(response => response.data.success),
                    getIndividual: data => api.post("/api/v1/adminclerk/exam/individual-hallticket",data).then(response => response.data.success)
                },
            },
            fee:{
                pending_fees:{
                    get_classwise: data => api.post("/api/v1/adminclerk/fee/pending_fee_class",data).then(response => response.data.success),
                },
                get_installments: () => api("/api/v1/adminclerk/fee/installments").then(response => response.data.success),
                update_installments: total_installments => api.put("/api/v1/adminclerk/fee/installments",{total_installments}).then(response => response.data.success),
                add_fee_type: fee_type => api.post("/api/v1/adminclerk/fee/fee_type",{fee_type}).then(response => response.data.success),
                get_fee_type: () => api("/api/v1/adminclerk/fee/fee_type").then(response => response.data.success),
                remove_fee_type: fee_type_id => api.delete("/api/v1/adminclerk/fee/fee_type/"+fee_type_id).then(response => response.data.success),
                get_classwise_fees: class_id => api.post("/api/v1/adminclerk/fee/classwise",{class_id}).then(response=> response.data.success),
                update_class_wise_fees: data => api.put('/api/v1/adminclerk/fee/classwise',data).then(response => response.data.success),
                get_individual_fees: data => api.post("/api/v1/adminclerk/fee/individual",data).then(response => response.data.success),
            get_individual_feesRead: data => api.post("/api/v1/adminclerk/fee/individual",data).then(response => response.data.success),
                update_individual_fees: (fee_individual,send_message) => api.put("/api/v1/adminclerk/fee/individual",{fee_individual,send_message}).then(response => response.data.success),
                pay_fees: (fee_individual,payment_type,student_id) => api.post("/api/v1/adminclerk/fee/pay",{fee_individual,payment_type,student_id}).then(response => response.data.success),
                get_receipts: (student_id) => api.post("/api/v1/adminclerk/fee/receipts",{student_id}).then(response => response.data.success),
                view_receipt: (receipt_id) => api("/api/v1/parent/fee/receipts/"+receipt_id).then(response => response.data.success),
            },
        },
        student:{
            get_student_searchable: () => api("/api/v1/student/searchable").then(response => response.data.success),
            get_student_searchable: searchText => api("/api/v1/student/searchable/"+searchText).then(response => response.data.success),
            get_student_searchable_by_class: class_id => api("/api/v1/student/searchable/class/"+class_id).then(response => response.data.success),
            notices:{
                view: () => api('/api/v1/notices/2').then(response=> response.data.success),
            },
        },
        staff:{
            get_staff_searchable: () => api("/api/v1/admin/staff/searchable").then(response => response.data.success),
            get_staff_searchable: searchText => api("/api/v1/admin/staff/searchable/"+searchText).then(response => response.data.success),
            notices:{
                view: () => api('/api/v1/notices/1').then(response=> response.data.success),
            },
        },
        admin: {
            empid:{
                get: () => api.post('/api/v1/admin/empid').then(response => response.data.success),
                update: tempEmpID => api.put('/api/v1/admin/empid',{tempEmpID}).then(response => response.data.success),
            },
            subject:{
                add: new_subject => api.post("/api/v1/admin/subject",{new_subject}).then(response => response.data.success),
                delete: subject_id => api.delete("/api/v1/admin/subject/"+subject_id).then(response => response.data.success),
            
            },
            get_subjects: () => api("/api/v1/admin/subject").then(response => response.data.success),
            get_distinct_class: () => api("/api/v1/admin/class/distinct").then(response=> response.data.success),
            class:{
                subject_class_wise: class_id =>  api("/api/v1/admin/class/subject-classwise/"+class_id).then(response => response.data.success),
                update_subject_class_wise: (class_id,subject_id) => api.put("/api/v1/admin/class/subject-classwise/"+class_id,{subject_id}).then(response => response.data.success),
                delete_subject_class_wise: (class_id,subject_id) => api.delete("/api/v1/admin/class/subject-classwise/"+class_id+"/"+subject_id).then(response => response.data.success),
            },
            report:{
                fee:{
                    get_daywise: () => api("/api/v1/admin/report/fee/daywise").then(response => response.data.success),
                    get_weekwise: () => api("/api/v1/admin/report/fee/weekwise").then(response => response.data.success),
                    get_monthwise: () => api("/api/v1/admin/report/fee/monthwise").then(response => response.data.success),
                    get_classwise_report: () =>  api("/api/v1/admin/report/fee/classwise_report").then(response => response.data.success),
                    get_installment_report: () =>  api("/api/v1/admin/report/fee/installment_report").then(response => response.data.success),
                
                },
                classwise: () => api("/api/v1/admin/report/student/classwise-report").then(response => response.data.success),
                religion_castewise: () => api("/api/v1/admin/report/student/religion-caste-report").then(response => response.data.success),
            },
            clerk:{
                add: data => api.post("/api/v1/admin/clerk",data).then(response=> response.data.success),
                getAll: data => api("/api/v1/admin/clerk",data).then(response=> response.data.success),
                add: data => api.post("/api/v1/admin/clerk",data).then(response=> response.data.success),
                update: data => api.post("/api/v1/admin/clerk/update",data).then(response=> response.data.success),
                changePassword: (clerk_id,password) => api.post("/api/v1/admin/clerk/changePassword",{clerk_id,password}).then(response=> response.data.success),
            },
            noticeboard:{
                add: data => api.post('/api/v1/admin/noticeboard',data).then(response=> response.data.success),
                view: () => api('/api/v1/admin/noticeboard').then(response=> response.data.success),
                viewEach: notice_id => api('/api/v1/admin/noticeboard/'+notice_id).then(response=> response.data.success),
                update: data => api.post('/api/v1/admin/noticeboard/update',data).then(response=> response.data.success),
            },
            fee:{
                get_due_date: data => api.post("/api/v1/admin/fee/due_date",data).then(response => response.data.success),
                update_due_date: data => api.put("/api/v1/admin/fee/due_date",{data}).then(response => response.data.success),
                fee_type:{
                    get: class_id => api("/api/v1/adminclerk/fee/fee_type/class/"+class_id).then(response => response.data.success),
                    new: (class_id,fee_type) => api.post("/api/v1/adminclerk/fee/fee_type/class/"+class_id,{fee_type}).then(response => response.data.success),
                    update: (class_id,fee_type,id) => api.put("/api/v1/adminclerk/fee/fee_type/class/"+class_id,{fee_type,id}).then(response => response.data.success),
                    delete: (class_id,row_id) => api.delete("/api/v1/adminclerk/fee/fee_type/class/"+class_id+"/"+row_id).then(response => response.data.success),
                }
            },
            teacher:{
                add: data => api.post("/api/v1/admin/teacher",data,{headers:{'Content-Type': 'multipart/form-data'}}).then(response => response.data.success),
                view_all: () => api("/api/v1/admin/teacher").then(response => response.data.success),
                assigned_teacher: data => api.post("/api/v1/admin/teacher/assigned_teacher",data).then(response => response.data.success),
                view_particular_teacher: teacher_id => api("/api/v1/admin/teacher/view/"+teacher_id).then(response => response.data.success),
                update: data => api.post("/api/v1/admin/teacher/update",data,formDataConfig).then(response => response.data.success),
            },
            student:{
                view_all_student: () => api("/api/v1/admin/student").then(response => response.data.success),
                get_student_searchable: () => api("/api/v1/adminteacher/student/searchable").then(response => response.data.success),
                get_student_searchable: searchText => api("/api/v1/adminteacher/student/searchable/"+searchText).then(response => response.data.success),
                setrollno: (rollno_string,roll_id,id) => api.post("/api/v1/admin/student/set_rollno",{rollno_string,roll_id,id}).then(response => response.data.success),
            },
            get_years: () => api("/api/v1/year").then(response => response.data.success),
            add_class: (new_class) => api.post("/api/v1/admin/class",{new_class}).then(response => response.data.success),
            rename_class: (new_class_name,old_classname) => api.put("/api/v1/admin/class",{new_class_name,old_classname}).then(response => response.data.success),
            delete_class: (class_title) => api.delete("/api/v1/admin/class/"+class_title,{class_title}).then(response => response.data.success),
            add_section: data => api.post("/api/v1/admin/class/section",data).then(response => response.data.success),
            exam:{
                exam_type:{
                    add: exam_type => api.post("/api/v1/admin/exam/type",{exam_type}).then(response => response.data.success),
                    get: () => api("/api/v1/admin/exam/type").then(response => response.data.success),
                    remove: exam_type_id => api.delete("/api/v1/admin/exam/type/"+exam_type_id).then(response => response.data.success),
                },
                monthly_test:{
                    add: monthly_test => api.post("/api/v1/admin/exam/monthly_test",{monthly_test}).then(response => response.data.success),
                    remove: monthly_test_id => api.delete("/api/v1/admin/exam/monthly_test/"+monthly_test_id).then(response => response.data.success),
                },
                marksheet:{
                    get: (data) => api.post("/api/v1/admin/exam/marksheet",data).then(response => response.data.success),
                    classwise: data => api.post("/api/v1/admin/exam/marksheet/classwise",data).then(response => response.data.success),
                    student: (data) => api.post("/api/v1/admin/exam/marksheet/individual",data).then(response => response.data.success),
                    update: (exam_marksheet) => api.put("/api/v1/admin/exam/marksheet/individual",{exam_marksheet}).then(response => response.data.success),
                }
            },
            class_period:{
                add_update: data => api.put("/api/v1/admin/class/class_period",data).then(response => response.data.success),
                get: () => api("/api/v1/admin/class/class_period").then(response => response.data.success),
                delete: period_id => api.delete("/api/v1/admin/class/class_period/"+period_id).then(response => response.data.success),
            },
            timetable:{
                add: (timetable_name) => api.post("/api/v1/admin/timetable",{timetable_name}).then(response => response.data.success),
                update: timetable => api.put("/api/v1/admin/timetable",{timetable}).then(response => response.data.success),
                get: () => api("/api/v1/admin/timetable").then(response => response.data.success),
                getTimetable: (timetable_name) => api.post("/api/v1/admin/timetable/get",{timetable_name}).then(response => response.data.success),
                publish_timetable: (publish_timetable) => api.put("/api/v1/admin/class/publish_timetable",{publish_timetable}).then(response => response.data.success),
            },
            stafftimetable:{
                add: (timetable_name) => api.post("/api/v1/admin/stafftimetable",{timetable_name}).then(response => response.data.success),
                update: timetable => api.put("/api/v1/admin/stafftimetable",{timetable}).then(response => response.data.success),
                get: () => api("/api/v1/admin/stafftimetable").then(response => response.data.success),
                getTimetable: (timetable_name) => api.post("/api/v1/admin/stafftimetable/get",{timetable_name}).then(response => response.data.success),
                publish_timetable: (publish_timetable) => api.put("/api/v1/admin/teacher/publish_timetable",{publish_timetable}).then(response => response.data.success),
            }
        },
    adminteacher:{
        homework:{
            add: (data) => api.post("/api/v1/teacher/homework",data,formDataConfig).then(response => response.data.success),
            get: (class_id) => api("/api/v1/teacher/homework/"+class_id).then(response => response.data.success),
            update: data => api.post("/api/v1/teacher/homework/update",data,formDataConfig).then(response => response.data.success),
            delete: homework_id => api.delete("/api/v1/teacher/homework/"+homework_id,data).then(response => response.data.success),
            past:{
                get: class_id => api("/api/v1/teacher/homework/past").then(response => response.data.success),
            },
            get_submission: homework_id => api("/api/v1/teacher/homework/submission/"+homework_id).then(response => response.data.success),
            homework_check: (type,student_homework_id) => api.put("/api/v1/teacher/homework/submission",{type,student_homework_id}).then(response => response.data.success),
            get_student_status: homework_id => api("/api/v1/teacher/homework/student_status/all/"+homework_id).then(response => response.data.success),
            getTeacherwise: () => api("/api/v1/teacher/homework/teacher").then(response => response.data.success),
        },
        student_attendance:{
            get: data => api.post("/api/v1/adminteacher/attendance/student",data).then(response => response.data.success),
            update: student_attendance => api.put("/api/v1/adminteacher/attendance/student",{student_attendance}).then(response => response.data.success),
            get_classwise: (class_id,select_month) => api.post("/api/v1/adminteacher/attendance/student/getclasswise",{class_id,select_month}).then(response => response.data.success),
            get_individual: (student_id,select_month) => api.post("/api/v1/adminteacher/attendance/student/getindividual",{student_id,select_month}).then(response => response.data.success),
        },
        staff_attendance:{
            get: data => api.post("/api/v1/adminteacher/attendance/staff",data).then(response => response.data.success),
            update: staff_attendance => api.put("/api/v1/adminteacher/attendance/staff",{staff_attendance}).then(response => response.data.success),
            get_individual: (staff_id,select_month) => api.post("/api/v1/adminteacher/attendance/staff/getindividual",{staff_id,select_month}).then(response => response.data.success),
        },
        
        study_material:{
            teacher:{
                group:{
                    get: () => api("/api/v1/adminteacher/studymaterial/teacher/group").then(response => response.data.success),
                    add: (data) => api.post("/api/v1/adminteacher/studymaterial/teacher/group",data).then(response => response.data.success),
                    update: (data) => api.put("/api/v1/adminteacher/studymaterial/teacher/group",data).then(response => response.data.success),
                    delete: chapter_id => api.delete("/api/v1/adminteacher/studymaterial/teacher/group/"+chapter_id).then(response => response.data.success),
                },
                material:{
                    add: (data) => api.post("/api/v1/adminteacher/studymaterial/teacher/material",data).then(response => response.data.success),
                    update: data => api.post("/api/v1/adminteacher/studymaterial/teacher/material/update",data).then(response => response.data.success),
                    delete: lession_id => api.delete("/api/v1/adminteacher/studymaterial/teacher/material/"+lession_id).then(response => response.data.success),
                }
            },
            group:{
                add: (study_group,class_id) => api.post("/api/v1/adminteacher/studymaterial/group/"+class_id,{study_group}).then(response => response.data.success),
                update: (study_group,class_id,id) => api.put("/api/v1/adminteacher/studymaterial/group/"+class_id+"/"+id,{study_group}).then(response => response.data.success),
                get: (class_id) => api("/api/v1/studymaterial/group/"+class_id,).then(response => response.data.success),
            },
            material:{
                update: (class_id,formData) => api.post("/api/v1/adminteacher/studymaterial/material/"+class_id+"/update",formData).then(response => response.data.success),
                add: (class_id,formData) => api.post("/api/v1/adminteacher/studymaterial/material/"+class_id,formData).then(response => response.data.success),
                getAll: (class_id,group_id) => api("/api/v1/adminteacher/studymaterial/material/"+class_id+"/"+group_id).then(response => response.data.success),
                delete: (class_id,lession_id) => api.delete("/api/v1/adminteacher/studymaterial/material/"+class_id+"/"+lession_id).then(response => response.data.success),
            }
        },
        onlineexam:{
            monthly_test:{
                add: (data) => api.post("/api/v1/adminteacher/onlineexam/monthlytest",data).then(response => response.data.success),
                get: () => api("/api/v1/adminteacher/onlineexam/monthlytest").then(response => response.data.success),
                getDetailsWithStudentAnswers: () => api.post('/api/v1/adminteacher/onlineexam/monthlytest/withanswers').then(response => response.data.success),
                update_marksheet: (answers,onlinetest_id) => api.post('/api/v1/adminteacher/onlineexam/monthlytest/update_marksheet',{answers,onlinetest_id}).then(response => response.data.success),
            },
        },
        questionbank:{
            add: (data) => api.post("/api/v1/adminteacher/questionbank",data).then(response => response.data.success),
            get: () => api("/api/v1/adminteacher/questionbank").then(response => response.data.success),
            question:{
                add: (data,question_id,question_type) => api.post("/api/v1/adminteacher/questionbank/question/"+question_id+"/"+question_type,data).then(response => response.data.success),
            },
        },
        exam:{
            monthly_test:{
                get_students: data => api.post("/api/v1/adminteacher/exam/monthly_test/get_students",data).then(response => response.data.success),
                get_individual: id => api.get("/api/v1/monthly_test/individual/"+id).then(response => response.data.success),
                update_marksheet: (remark,grade,marksheet,monthtest_id,marksheet_id) => api.put("/api/v1/adminteacher/exam/monthly_test",{remark,grade,marksheet,monthtest_id,marksheet_id}).then(response => response.data.success),
                publishMarksheet: marksheet_id => api.get("/api/v1/adminteacher/exam/monthly_test/individual-publish/"+marksheet_id).then(response => response.data.success),
                unpublishMarksheet: marksheet_id => api.get("/api/v1/adminteacher/exam/monthly_test/individual-unpublish/"+marksheet_id).then(response => response.data.success),
                get_monthly_test: class_id => api.get("/api/v1/adminteacher/exam/monthly_test/get_all/"+class_id).then(response => response.data.success),
                add: (data,class_id) => api.post("/api/v1/adminteacher/exam/monthly_test/add/"+class_id,data).then(response => response.data.success),
                remove: (monthly_test_id,class_id) => api.delete("/api/v1/adminteacher/exam/monthly_test/delete/"+class_id+"/"+monthly_test_id).then(response => response.data.success),
            },
            marksheet:{
                get: (data) => api.post("/api/v1/adminteacher/exam/marksheet",data).then(response => response.data.success),
                get_students: data => api.post("/api/v1/adminteacher/exam/marksheet/get_students",data).then(response => response.data.success),
                get_individual: id => api.get("/api/v1/adminteacher/exam/marksheet/individual/"+id).then(response => response.data.success),
                student: (data) => api.post("/api/v1/adminteacher/exam/marksheet/individual",data).then(response => response.data.success),
                update: (exam_marksheet) => api.put("/api/v1/adminteacher/exam/marksheet/individual",{exam_marksheet}).then(response => response.data.success),
                update_marksheet: (remark,grade,marksheet,marksheet_id,exam_type,student_id) => api.put("/api/v1/adminteacher/exam/marksheet",{remark,grade,marksheet,marksheet_id,exam_type,student_id}).then(response => response.data.success),
                publishMarksheet: marksheet_id => api.get("/api/v1/adminteacher/exam/marksheet/individual-publish/"+marksheet_id).then(response => response.data.success),
                unpublishMarksheet: marksheet_id => api.get("/api/v1/adminteacher/exam/monthly_test/individual-unpublish/"+marksheet_id).then(response => response.data.success),
            }
        }
    },
    parent:{
        homework:{
            get: student_ids =>  api.post("/api/v1/parent/homework",{student_ids}).then(response => response.data.success),
        },
        fee:{
            get_individual_feesRead: data => api.post("/api/v1/parent/fee/individual",data).then(response => response.data.success),
            get_receipts: (student_id) => api.post("/api/v1/parent/fee/receipts",{student_id}).then(response => response.data.success),
            view_receipt: (receipt_id) => api("/api/v1/parent/fee/receipts/"+receipt_id).then(response => response.data.success),
        },
    },
    class: () => api("/api/v1/class").then(response => response.data.success),
    subjects: () => api("/api/v1/subject").then(response => response.data.success),
    classwise_timetable: (class_id) => api("/api/v1/classwise_timetable/"+class_id).then(response => response.data.success),
    teachers: () => api("/api/v1/teacher").then(response => response.data.success),
    teacher_names: () => api("/api/v1/teacher/names").then(response => response.data.success),
    monthly_test: () => api("/api/v1/monthly_test").then(response => response.data.success),
    subject_class_wise: class_id =>  api("/api/v1/subject-classwise/"+class_id).then(response => response.data.success),
    monthlytest_classwise: class_id =>  api("/api/v1/monthlytest-classwise/"+class_id).then(response => response.data.success),
    online_monthlytest_classwise: class_id => api("/api/v1/online-monthlytest-classwise/"+class_id).then(response => response.data.success),
    timetable_classwise: class_id => api("/api/v1/timetable/"+class_id).then(response => response.data.success),
    empid:{
        get: () => api.post("/api/v1/empid").then(response => response.data.success),
    },
    parentstudent: {
        homework:{
            submit: data => api.post("/api/v1/parentstudent/homework/submit",data,formDataConfig).then(response => response.data.success),
            current:{
                get: student_id => api("/api/v1/parentstudent/homework/current/"+student_id).then(response => response.data.success),
            }
        },
        timetable: {
            get: class_id => api("/api/v1/parentstudent/timetable/"+class_id).then(response => response.data.success),
        },
        exam:{
            monthtest:{
                getOnlineTestDetails: onlinetest_id => api.post("/api/v1/parentstudent/exam/monthtest/getOnlineTestDetails",{onlinetest_id}).then(response => response.data.success),
                current: student_id => api("/api/v1/parentstudent/exam/monthtest/current/"+student_id).then(response => response.data.success),
                submitAnswers: (answers,onlinetest_id) => api.post("/api/v1/parentstudent/exam/monthtest/submitanswers",{answers,onlinetest_id}).then(response => response.data.success),
            }
        },
        results:{
            monthlytest: student_id => api("/api/v1/parentstudent/results/monthlytest/"+student_id).then(response => response.data.success),
        }
    },
    header:{
        adminclerk:{
            student: () => api("/api/v1/adminclerk/student/header").then(response => response.data.success),
        },
        admin:{
            teacher: () => api("/api/v1/admin/teacher/header").then(response => response.data.success),
            fee: () => api("/api/v1/admin/fee/header").then(response => response.data.success),
            timetable: () => api("/api/v1/admin/timetable/header").then(response => response.data.success),
        }
    }
}