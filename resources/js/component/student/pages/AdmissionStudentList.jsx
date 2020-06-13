import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import Row from "../../utils/Row"
import { Table, Thead, Col,FormLabel,Input } from "../../utils/Components"

const AdmissionStudentList = () => {
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Admission" sub_header="list">
                <AdminStudentHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Select Class" back_link="/admin/student">
                        <Row>
                            <GetClassId errors=""/>
                            <Col md="6" sm="6">
                                <FormLabel>Admission Date</FormLabel>
                                <Input type="date" value="" />
                            </Col>
                        </Row>
                </CardComponent>
                <CardComponent title="Student List" download print >
                    <Table>
                        <Thead>
                            <td>Sr.no</td>
                            <td>Roll No</td>
                            <td>Student Name</td>
                            <td>Father Name</td>
                            <td>View</td>
                            <td>Print</td>
                            <td>Remove</td>
                        </Thead>
                    </Table>
                </CardComponent>
            </BodyComponent>
        </div>
    )
}

export default AdmissionStudentList