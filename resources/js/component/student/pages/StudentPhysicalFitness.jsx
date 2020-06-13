import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"

const StudentPhsicalFitness = () => {
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Physical Fitness">
                <AdminStudentHeader/>
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Student Physical Fitness" back_link="/admin/student">

                </CardComponent>
            </BodyComponent>
        </div>
    )
}
export default StudentPhsicalFitness