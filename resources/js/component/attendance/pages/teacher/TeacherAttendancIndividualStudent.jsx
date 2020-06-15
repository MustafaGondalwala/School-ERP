import React from "react"
import TopBreadCrumb from "../../../utils/TopBreadcrumb"
import AttendanceHeader from "../../../header/teacher/AttendanceHeader"
import BodyComponent from "../../../utils/BodyComponent"
import CardComponent from "../../../utils/CardComponent"
import Row from "../../../utils/Row"
import { Col, Button, Table, Thead } from "../../../utils/Components"
import SelectStudent from "../../../utils/SelectStudent"

const TeacherAttendanceIndividualStudent = () => (
    <div>
        <TopBreadCrumb>
            <AttendanceHeader />
        </TopBreadCrumb>
        <BodyComponent>
            <CardComponent title="Select Student" back_link="/teacher/attendance/class/1">
                <Row>
                    <Col md="4">
                        <SelectStudent />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md="6">
                        <Button primary>Fetch</Button>
                    </Col>
                </Row>
            </CardComponent>
            <CardComponent title="List" download print>
            <Table>
                <Thead>
                    <th>Sr no.</th>
                    <th>Staus</th>

                </Thead>
            </Table>
            </CardComponent>
        </BodyComponent>
    </div>
)

export default TeacherAttendanceIndividualStudent