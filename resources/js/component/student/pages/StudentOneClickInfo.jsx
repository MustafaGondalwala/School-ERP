import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { FormGroup, FormLabel, Col, Button } from "../../utils/Components"
import Row from "../../utils/Row"
import SelectStudent from "../../utils/SelectStudent"
import GetClassId from "../../utils/GetClassId"

class StudentOneClickInfo extends Component{
    render(){
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="One Click Info">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="One Click Info" back_link="/admin/student">
                        <Row>
                            <Col md="4" lg="4">
                                <FormGroup>
                                    <FormLabel>
                                        Select Student
                                    </FormLabel>
                                    <SelectStudent />
                                </FormGroup>
                            </Col>
                            <Col md="4" lg="4">
                               <GetClassId errors="" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Button primary>Penalty</Button>
                                <Button primary>Fee Details</Button>
                                <Button primary>Student Details</Button>
                            </Col>
                            <Col md="8">
                                <Button primary>Medical & Physical</Button>
                                <Button primary>View Report</Button>
                                <Button primary>Attendance</Button>
                                <Button primary>Assignment</Button>
                            </Col>
                        </Row>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

export default StudentOneClickInfo