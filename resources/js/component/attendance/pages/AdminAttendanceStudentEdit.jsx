import React,{Component,Suspense} from "react"
const AdminHeader = React.lazy(() => import("../../header/admin/AdminAttendanceHeader")) 
const StudentAttendanceEditAdmin = React.lazy(() => import("../utils/StudentAttendanceEditAdmin"))

import TopBreadCrumb from "../../utils/TopBreadcrumb"
 const AdminAttendanceStudentEdit = () =>  {
    return(
        <div>
            <Suspense fallback={<h1>Loading ...</h1>}>
                <TopBreadCrumb mainHeader="Attendance" header="Student" sub_header="Edit Attendance">
                    <AdminHeader mainHeader="Attendance" header="Edit/View"/>
                </TopBreadCrumb>
            </Suspense>
            <div className="container-fluid mt--6">
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <StudentAttendanceEditAdmin />
                </Suspense>
            </div>
        </div>
    )
 }

 export default AdminAttendanceStudentEdit