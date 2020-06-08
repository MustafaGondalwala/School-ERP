import Axios from "axios";

export default {
    user: {
        add_student: data => axios.post("/api/v1/admin/student",data,{headers: { 'Content-Type': 'multipart/form-data' }}).then(response => response.data.success)
    }
}