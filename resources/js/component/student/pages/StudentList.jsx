import React from "react"
import { render } from "react-dom"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Col from "../../utils/Col"
import Row from "../../utils/Row"
import SelectStudent from "../../utils/SelectStudent"
import { FormGroup, FormLabel, Table ,Thead} from "../../utils/Components"
import GetClassId from "../../utils/GetClassId"


const RegisterListPage = () => {
    const student_info = [1,23]
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="List">
                <AdminStudentHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Student List" back_link="/admin/student">
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <FormLabel>Select Student</FormLabel>
                                <SelectStudent />
                            </FormGroup>
                        </Col>
                      <GetClassId errors=""/>
                    </Row>
                </CardComponent>
                    {student_info && <ViewRegisterTable student_info={student_info}/>}
                
            </BodyComponent>
        </div>
    )
}

const ViewRegisterTable = () => (
    <CardComponent title="List" print download>
        <Table>
            <Thead>
                <th>Sr no.</th>
                <th>Roll no.</th>
                <th>Student Name</th>
                <th>Father Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>View Details</th>
            </Thead>
            <tbody>
                <tr>
                </tr>
            </tbody>
        </Table>
        </CardComponent>
    )

export default RegisterListPage