import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { FormLabel, Col, Table, Thead } from "../../utils/Components"
import Row from "../../utils/Row"
import GetClassId from "../../utils/GetClassId"

class StudentProfileUpdate extends Component{
    render(){
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Profile Update">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Select Class" back_link="/admin/student">
                        <GetClassId errors=""/>
                    </CardComponent>
                    <CardComponent title="List" print download>
                        <Table>
                            <Thead>
                            <td>Sr no.</td>
                            <td>RollNo</td>
                            <td>Student Name</td>
                            <td>Class</td>
                            <td>Section</td>
                            <td>Father Name</td>
                            <td>Mother Name</td>
                            <td>Father Qualification</td>
                            <td>Mother Qualification</td>
                            <td>Handicapped</td>
                            <td>Student Aadhar Card</td>
                            <td>Father Aadhar Card</td>
                            <td>Father Bank Name</td>
                            <td>Father Bank Number</td>
                            <td>Student Bank Name</td>
                            <td>Student Bank Number</td>
                            <td>Father ContactNo 1</td>
                            <td>Father ContactNo 2</td>
                            <td>SMS Number</td>
                            <td>Father Email</td>
                            <td>Mother Email</td>
                            <td>Father Occupation</td>
                            <td>Mother Occupation</td>
                            <td>Guardian Name</td>
                            <td>Guardian Occupation</td>
                            <td>Remove</td>
                            </Thead>
                        </Table>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

export default StudentProfileUpdate