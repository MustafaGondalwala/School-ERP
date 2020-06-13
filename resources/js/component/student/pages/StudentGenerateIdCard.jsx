import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import Row from "../../utils/Row"
import { Col, Button, Table, Thead } from "../../utils/Components"

const StudentGenerateIdCard = () => {
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Generate ID Card">
                <AdminStudentHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Generate ID Card" back_link="/admin/student">
                    <Row>
                        <Col sm="6" md="6">
                        <GetClassId errors=""/>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm="6" md="6">
                        <Button primary>Fetch</Button>
                        </Col>
                    </Row>
                </CardComponent>
                <CardComponent title="List">
                <Table>
                    <Thead>
                        <th>Sr no.</th>
                        <th>Roll No.</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Assigned ID Card</th>
                        <th>Generate ID</th>
                    </Thead>
                </Table>
                </CardComponent>
            </BodyComponent>
        </div>
    )
}
export default StudentGenerateIdCard