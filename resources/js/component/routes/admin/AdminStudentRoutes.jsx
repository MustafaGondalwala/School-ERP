import React, { Suspense } from "react"
import AdminDashboardRoutes from "../../routes/AdminDashboardRoutes"

/**
 * Student Import
 */
import RegisterPage from "../../student/pages/RegisterPage"
import RegisterListPage from "../../student/pages/RegisterListPage"
import BulkStudentRegister from "../../student/pages/BulkStudentRegister" 
import AdmissionStudent from "../../student/pages/AdmissionStudent"
import AdmissionStudentList from "../../student/pages/AdmissionStudentList"
import BulkStudentAdmission from "../../student/pages/BulkStudentAdmission"
import BulkStudentProfile from "../../student/pages/BulkStudentProfile"
import StudentProfileImages from "../../student/pages/StudentProfileImages"
import StudentProfileUpdate from "../../student/pages/StudentProfileUpdate"
import BulkStudentProfileImages from "../../student/pages/BulkStudentProfileImages"
import StudentList from "../../student/pages/StudentList"
import StudentAdvancedSearch from "../../student/pages/StudentAdvancedSearch"
import StudentOneClickInfo from "../../student/pages/StudentOneClickInfo"
import StudentMedicalInfo from "../../student/pages/StudentMedicalInfo"
import StudentPhysicalFitness from "../../student/pages/StudentPhysicalFitness"
import StudentGenerateIdCard from "../../student/pages/StudentGenerateIdCard"
import PromoteStudent from "../../student/pages/PromoteStudent"
import StudentAdminHomePage from "../../student/pages/StudentAdminHomePage"
import SetRollNo from "../../student/pages/SetRollNo"
import ViewEditClerk from "../../student/pages/ViewEditClerk"
import SetRegisterIDStudent from "../../student/pages/SetRegisterIDStudent"

const AdminStudentRoutes = () => (
    <span>
        <AdminDashboardRoutes exact path="/admin/student" component={StudentAdminHomePage} />
        <AdminDashboardRoutes exact path="/admin/student/clerk" component={ViewEditClerk} />
        <AdminDashboardRoutes exact path="/admin/student/set-roll_no" component={SetRollNo} />
        <AdminDashboardRoutes exact path="/admin/student/register-student/:register_id" component={RegisterPage} />
        <AdminDashboardRoutes exact path="/admin/student/register-student" component={RegisterPage} />
        <AdminDashboardRoutes exact path="/admin/student/register-student-list" component={RegisterListPage} />
        <AdminDashboardRoutes exact path="/admin/student/register-student-bulk" component={BulkStudentRegister} />
        <AdminDashboardRoutes exact path="/admin/student/admission-student" component={AdmissionStudent} />
        <AdminDashboardRoutes exact path="/admin/student/admission-student/:register_id" component={AdmissionStudent} />
        <AdminDashboardRoutes exact path="/admin/student/edit-student/:edit_student_id" component={AdmissionStudent} />
        <AdminDashboardRoutes exact path="/admin/student/student-admission-list" component={AdmissionStudentList} />
        <AdminDashboardRoutes exact path="/admin/student/student-admission-bulk" component={BulkStudentAdmission} />
        <AdminDashboardRoutes exact path="/admin/student/student-profile-update" component={StudentProfileUpdate} />
        <AdminDashboardRoutes exact path="/admin/student/student-profile-update-bulk" component={BulkStudentProfile} />
        <AdminDashboardRoutes exact path="/admin/student/student-profile-image" component={StudentProfileImages} />
        <AdminDashboardRoutes exact path="/admin/student/student-profile-update-images-bulk" component={BulkStudentProfileImages} />
        <AdminDashboardRoutes exact path="/admin/student/student-list" component={StudentList} />
        <AdminDashboardRoutes exact path="/admin/student/student-advanced-search" component={StudentAdvancedSearch} />
        <AdminDashboardRoutes exact path="/admin/student/student-oneclick-info" component={StudentOneClickInfo} />
        <AdminDashboardRoutes exact path="/admin/student/medical-info" component={StudentMedicalInfo} />
        <AdminDashboardRoutes exact path="/admin/student/student-physical-fitness" component={StudentPhysicalFitness} />
        <AdminDashboardRoutes exact path="/admin/student/student-generate-id-card" component={StudentGenerateIdCard} />
        <AdminDashboardRoutes exact path="/admin/student/promote-student" component={PromoteStudent} />
        <AdminDashboardRoutes exact path="/admin/student/set-register" component={SetRegisterIDStudent} />
    </span>
)

export default AdminStudentRoutes