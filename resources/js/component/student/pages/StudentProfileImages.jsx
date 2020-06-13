import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { FormLabel, Col, Table, Thead } from "../../utils/Components"
import Row from "../../utils/Row"
import GetClassId from "../../utils/GetClassId"
import SelectStudent from "../../utils/SelectStudent"

class StudentProfileImages extends Component{
    render(){
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Profile Update">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Select Class" back_link="/admin/student">
                        <Row>
                            <Col md="6" sm="6">
                                <FormLabel>Select Student</FormLabel>
                                <SelectStudent/>
                            </Col>
                            <GetClassId errors=""/>
                        </Row>
                    </CardComponent>
                    <CardComponent title="List" print download>
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Student Name</th> 
                                <th>Roll No</th>  
                                <th>Student Photo</th>
                                <th>Father Photo</th>
                                <th>Mother Photo</th>
                                <th>Last Marksheet</th>
                                <th>Transfer Certificate</th>
                                <th>Income Certificate</th>
                                <th>Cast Certificate</th>
                                <th>DOB Certificate</th>
                                <th>Student Aadhar Card</th>
                                <th>Father Aadhar Card</th>
                            </Thead>
                        </Table>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

export default StudentProfileImages