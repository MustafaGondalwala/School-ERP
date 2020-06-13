import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import Row from "../../utils/Row"
import { Col, FormLabel, FormGroup, Input, UploadFile, Select, SelectOption, Button } from "../../utils/Components"
import SelectStudent from "../../utils/SelectStudent"
import InlineError from "../../utils/InlineError"

const StudentMedicalInfo = () => {
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Medical Info">
            <AdminStudentHeader /> 
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Student Medical Info" back_link="/admin/student">
                    <Row>
                        <Col md="4" sm="6" lg="4">
                            <FormLabel>Select Student</FormLabel>
                            <SelectStudent />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4" sm="12" lg="4">
                            <FormGroup>
                                <FormLabel>Student Name</FormLabel>
                                <Input disabled placeholder="Student Name"/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Father Name</FormLabel>
                                <Input disabled placeholder="Father Name"/>
                            </FormGroup>
                        </Col>
                        <Col md="4" sm="12" lg="4">
                            <FormGroup>
                                <FormLabel>Student RollNo</FormLabel>
                                <Input disabled placeholder="Student RollNo"/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Class:</FormLabel>
                                <Input disabled placeholder="Class"/>
                            </FormGroup>
                        </Col>
                        <Col md="4" sm="12" lg="4">
                            <FormGroup>
                                <FormLabel>Section:</FormLabel>
                                <Input disabled placeholder="Section"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>                        
                        <Col md="2" sm="6" lg="4">
                            <FormGroup>
                                <FormLabel>Checkup Date</FormLabel>
                                <Input type="date" />
                            </FormGroup>
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormGroup>
                                <FormLabel>Doctor Name</FormLabel>
                                <Input placeholder="Doctor Name"/>
                            </FormGroup>
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormGroup>
                                <FormLabel>Report</FormLabel>
                                <UploadFile />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Student Height</FormLabel>
                            <Input type="number" placeholder="Student Height"/>
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Student Weight</FormLabel>
                            <Input type="number" placeholder="Student Weight"/>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Blood Group</FormLabel>
                            <Input placeholder="Blood Group" />
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Blood Pressure</FormLabel>
                            <Input placeholder="Blood Pressure" />
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Hemoglobin Level</FormLabel>
                            <Input placeholder="Hemoglobin Level" />
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Diabetes Level</FormLabel>
                            <Input placeholder="Diabetes Level" />
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>HIV</FormLabel>
                            <Select value="no">
                                <SelectOption value="yes">Yes</SelectOption>
                                <SelectOption value="no">No</SelectOption>
                            </Select>
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>TB Infection</FormLabel>
                            <Select value="no">
                                <SelectOption value="yes">Yes</SelectOption>
                                <SelectOption value="no">No</SelectOption>
                            </Select>
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Description</FormLabel>
                            <Input placeholder="Description" />
                        </Col>
                        
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Remark</FormLabel>
                            <Input placeholder="Remark" />
                        </Col>
                        <Col md="2" sm="6" lg="4">
                            <FormLabel>Heath Marks</FormLabel>
                            <Input placeholder="Heath Marks" type="number" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="6">
                           <Button primary>Submit</Button>
                        </Col>
                    </Row>
                </CardComponent>
            </BodyComponent>
        </div>
    )
}

export default StudentMedicalInfo;