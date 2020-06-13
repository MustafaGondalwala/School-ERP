import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { Col, Button } from "../../utils/Components"
import GetClassId from "../../utils/GetClassId"

const PromoteStudent = () => {
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Promote Student">
                <AdminStudentHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Student Promote" back_link="/admin/student">
                    <Row>
                        <Col md="6" sm="6">
                            <GetClassId errors="" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="6" sm="6">
                            <Button primary>Fetch</Button>
                        </Col>
                    </Row>
                </CardComponent>
            </BodyComponent>
        </div>
    )

}

export default PromoteStudent