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
            <TopBreadCrumb mainHeader="Student" header="Profile Update" sub_header="Bulk">
                <AdminStudentHeader/>
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Bulk Student Profile Update " back_link="/admin/student">
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
                        </Thead>
                    </Table>
                </CardComponent>
            </BodyComponent>
        </div>
    )
}




export default BulkStudentRegister