import React from "react"
import TopBreadcrumb from "../../../utils/TopBreadcrumb"
import AttendanceHeader from "../../../header/teacher/AttendanceHeader"
import CardComponent from "../../../utils/CardComponent"
import BodyComponent from "../../../utils/BodyComponent"
import Row from "../../../utils/Row"
import { Col, FormGroup, FormLabel, Input, ButtonGroup, Button, Table, Thead } from "../../../utils/Components"
const TeacherAttendanceEditView = () => (
    <div>
        <TopBreadcrumb mainHeader="Attendance" header="Edit/View">
            <AttendanceHeader />
        </TopBreadcrumb>
        <BodyComponent>
            <CardComponent title="Select Title">
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <FormLabel>Select Date:</FormLabel>
                            <Input type="date"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="1">
                        <Button primary>View</Button>
                    </Col>
                    <Col md="1">
                        <Button primary>Fill</Button>
                    </Col>
                </Row>
            </CardComponent>
            <CardComponent title="Fil Attendance" download print>
                <Table>
                    <Thead>
                        <td>Sr no.</td>
                        <td>Student Name</td>
                        <td>Status</td>
                    </Thead>
                </Table>
            </CardComponent>
        </BodyComponent>
    </div>
)

export default TeacherAttendanceEditView