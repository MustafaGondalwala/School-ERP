import React, { Suspense } from "react"
import ClerkDashboardRoutes from "../../routes/ClerkDashboardRoutes"

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
import ClerkStudentHomePage from "../../student/pages/ClerkStudentHomePage"


const ClerkStudentRoutes = () => (
    <span>
        <ClerkDashboardRoutes exact path="/clerk/student" component={ClerkStudentHomePage}/>
        <ClerkDashboardRoutes exact path="/clerk/student/set-roll_no" component={SetRollNo} />
        <ClerkDashboardRoutes exact path="/clerk/student/register-student" component={RegisterPage} />
        <ClerkDashboardRoutes exact path="/clerk/student/register-student-list" component={RegisterListPage} />
        <ClerkDashboardRoutes exact path="/clerk/student/register-student-bulk" component={BulkStudentRegister} />
        <ClerkDashboardRoutes exact path="/clerk/student/admission-student" component={AdmissionStudent} />
        <ClerkDashboardRoutes exact path="/clerk/student/admission-student/:register_id" component={AdmissionStudent} />
        <ClerkDashboardRoutes exact path="/clerk/student/edit-student/:edit_student_id" component={AdmissionStudent} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-admission-list" component={AdmissionStudentList} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-admission-bulk" component={BulkStudentAdmission} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-profile-update" component={StudentProfileUpdate} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-profile-update-bulk" component={BulkStudentProfile} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-profile-image" component={StudentProfileImages} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-profile-update-images-bulk" component={BulkStudentProfileImages} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-list" component={StudentList} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-advanced-search" component={StudentAdvancedSearch} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-oneclick-info" component={StudentOneClickInfo} />
        <ClerkDashboardRoutes exact path="/clerk/student/medical-info" component={StudentMedicalInfo} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-physical-fitness" component={StudentPhysicalFitness} />
        <ClerkDashboardRoutes exact path="/clerk/student/student-generate-id-card" component={StudentGenerateIdCard} />
        <ClerkDashboardRoutes exact path="/clerk/student/promote-student" component={PromoteStudent} />
    </span>
)

export default ClerkStudentRoutes