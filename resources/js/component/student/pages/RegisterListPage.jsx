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


const RegisterListPage = () => {
    const student_info = [1,23]
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Register" sub_header="Register List">
                <AdminStudentHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Register List" back_link="/admin/student">
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <FormLabel>Select Student</FormLabel>
                                <SelectStudent />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <FormLabel>Class</FormLabel>
                                <select className="form-control">
                                    <option>5th</option>
                                    <option>6th</option>
                                    <option>7th</option>
                                    <option>8th</option>
                                    <option>9th</option>
                                </select>
                            </FormGroup>
                        </Col>
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
                <th>Register Id.</th>
                <th>Student Name</th>
                <th>Father Name</th>
                <th>Class</th>
                <th>View</th>
                <th>Make Admission</th>
                <th>Print</th>
                <th>Delete</th>
            </Thead>
            <tbody>
                <tr>
                </tr>
            </tbody>
        </Table>
        </CardComponent>
    )

export default RegisterListPage