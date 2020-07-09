import React,{Component,Suspense} from "react"
const TeacherHeader = React.lazy(() => import("../../../header/teacher/AttendanceHeader")) 
const StudentAttendanceEditAdmin = React.lazy(() => import("../../utils/StudentAttendanceEditAdmin"))
import TopBreadCrumb from "../../../utils/TopBreadcrumb"
 const AdminAttendanceTeacherEdit = (props) =>  {
    const {class_id} = props.match.params   
    return(
        <div>
            <Suspense fallback={<h1>Loading ...</h1>}>
                <TopBreadCrumb mainHeader="Attendance" header="Student" sub_header="Edit Attendance">
                    <TeacherHeader mainHeader="Attendance" header="Edit/View"/>
                </TopBreadCrumb>
            </Suspense>
            <div className="container-fluid mt--6">
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <StudentAttendanceEditAdmin class_id={class_id} user_type="teacher" />
                </Suspense>
            </div>
        </div>
    )
 }

 export default AdminAttendanceTeacherEdit