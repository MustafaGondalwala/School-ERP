import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import { FormGroup, FormLabel, UploadFile, Button, Table, Thead, ButtonGroup } from "../../utils/Components"

const BulkStudentRegister = () => {
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Register" sub_header="Bulk">
                <AdminStudentHeader/>
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Bulk Register Student" back_link="/admin/student">
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <FormLabel>Select Csv</FormLabel>
                                <UploadFile />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <ButtonGroup>
                                <Button primary sm>Upload</Button>
                                <Button success sm>Download</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardComponent>
                <CardComponent title="List">
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Register No</th>
                            <th>Student Name</th>
                            <th>Father Name</th>
                            <th>Mother Name</th>
                            <th>Father ContactNo1</th>
                            <th>Father ContactNo2</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Date of Admission</th>
                            <th>Admission</th>
                            <th>Block</th>
                            <th>District</th>
                            <th>State</th>
                            <th>Pincode</th>
                            <th>Pincode</th>
                            <th>Remove</th>
                        </Thead>
                    </Table>
                </CardComponent>
            </BodyComponent>
        </div>
    )
}




export default BulkStudentRegister