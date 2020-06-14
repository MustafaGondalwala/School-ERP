let api = axios
import Swal from "sweetalert2"
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

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
  });

export default {
    admin: {
        get_subjects: () => api("/api/v1/admin/subject").then(response => response.data.success),
        get_distinct_class: () => api("/api/v1/admin/class/distinct").then(response=> response.data.success),
        add_teacher: data => api.post("/api/v1/admin/teacher",data,{headers:{'Content-Type': 'multipart/form-data'}}).then(response => response.data.success),
        view_all_teacher: () => api("/api/v1/admin/teacher").then(response => response.data.success),
        view_particular_teacher: teacher_id => api("/api/v1/admin/teacher/"+teacher_id).then(response => response.data.success),
    	student:{
    		view_all_student: () => api("/api/v1/admin/student").then(response => response.data.success),
            get_student_searchable: () => api("/api/v1/admin/student/searchable").then(response => response.data.success),
            get_student_searchable: searchText => api("/api/v1/admin/student/searchable/"+searchText).then(response => response.data.success),
        },
        fee:{
            get_installments: () => api("/api/v1/admin/fee/installments").then(response => response.data.success),
            update_installments: total_installments => api.put("/api/v1/admin/fee/installments",{total_installments}).then(response => response.data.success),
            get_due_date: data => api.post("/api/v1/admin/fee/due_date",data).then(response => response.data.success),
            update_due_date: data => api.put("/api/v1/admin/fee/due_date",{data}).then(response => response.data.success),
            add_fee_type: fee_type => api.post("/api/v1/admin/fee/fee_type",{fee_type}).then(response => response.data.success),
            get_fee_type: () => api("/api/v1/admin/fee/fee_type").then(response => response.data.success),
            remove_fee_type: fee_type_id => api.delete("/api/v1/admin/fee/fee_type/"+fee_type_id).then(response => response.data.success),
            get_classwise_fees: (class_id,year_id) => api.post("/api/v1/admin/fee/classwise",{class_id,year_id}).then(response=> response.data.success),
            update_class_wise_fees: data => api.put('/api/v1/admin/fee/classwise',data).then(response => response.data.success),
            get_individual_fees: data => api.post("/api/v1/admin/fee/individual/1",data).then(response => response.data.success),
            get_individual_feesRead: data => api.post("/api/v1/admin/fee/individual/0",data).then(response => response.data.success),
            update_individual_fees: (fee_individual,send_message) => api.put("/api/v1/admin/fee/individual",{fee_individual,send_message}).then(response => response.data.success),
            pay_fees: (fee_individual,send_message,payment_type,student_id,year_id) => api.post("/api/v1/admin/fee/pay",{fee_individual,send_message,payment_type,student_id,year_id}).then(response => response.data.success),
            get_receipts: (student_id,year_id) => api.post("/api/v1/admin/fee/receipts",{student_id,year_id}).then(response => response.data.success),
            view_receipt: (receipt_id) => api("/api/v1/admin/fee/receipts/"+receipt_id).then(response => response.data.success),
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
            hall_ticket:{
                get: (data) => api.post("/api/v1/admin/exam/hallticket",data).then(response => response.data.success),
                update: (class_hallticket)  => api.put("/api/v1/admin/exam/hallticket",{class_hallticket}).then(response => response.data.success),
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
        student_attendance:{
            get: data => api.post("/api/v1/admin/attendance/student",data).then(response => response.data.success),
            update: student_attendance => api.put("/api/v1/admin/attendance/student",{student_attendance}).then(response => response.data.success),
            get_classwise: (class_id,select_month) => api.post("/api/v1/admin/attendance/student/getclasswise",{class_id,select_month}).then(response => response.data.success),
            get_individual: (student_id,select_month) => api.post("/api/v1/admin/attendance/student/getindividual",{student_id,select_month}).then(response => response.data.success),
            
        },
        staff_attendance:{
            get: data => api.post("/api/v1/admin/attendance/staff",data).then(response => response.data.success),
            update: staff_attendance => api.put("/api/v1/admin/attendance/staff",{staff_attendance}).then(response => response.data.success),
        },
    },
    teacher:{
        homework:{
            add: (data) => api.post("/api/v1/teacher/homework",data).then(response => response.data.success),
            get: (class_id) => api("/api/v1/teacher/homework/"+class_id).then(response => response.data.success),
        }
    },
    parent:{
        homework:{
            get: student_ids =>  api.post("/api/v1/parent/homework",{student_ids}).then(response => response.data.success),
        }
    },
    class: () => api("/api/v1/admin/class").then(response => response.data.success),
    subjects: () => api("/api/v1/subject").then(response => response.data.success),
    classwise_timetable: (class_id) => api("/api/v1/classwise_timetable/"+class_id).then(response => response.data.success),
    teachers: () => api("/api/v1/teacher").then(response => response.data.success)
}