import React from "react"
import { render } from "react-dom"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Col from "../../utils/Col"
import Row from "../../utils/Row"
import SelectStudent from "../../utils/SelectStudent"
import { FormGroup, FormLabel, Table ,Thead, Input, SelectOption,Select, Button, ButtonGroup} from "../../utils/Components"
import GetClassId from "../../utils/GetClassId"


const RegisterListPage = () => {
    const student_info = [1,23]
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Register" sub_header="Register List">
                <AdminStudentHeader />
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Student Advanced Search" back_link="/admin/student">
                    <Row>
                        <Col md="4" lg="3">
                            <FormGroup>
                                <FormLabel>Student Name</FormLabel>
                                <Input />
                            </FormGroup>
                        </Col>
                        <Col md="4" lg="3">
                            <FormGroup>
                                <FormLabel>Father Name</FormLabel>
                                <Input />
                            </FormGroup>
                        </Col>
                        <Col md="4" lg="3">
                            <FormGroup>
                                <FormLabel>Mother Name</FormLabel>
                                <Input />
                            </FormGroup>
                        </Col>
                      <GetClassId errors=""/>
                    </Row>
                    <Row>
                        <Col md="4" lg="2">
                            <FormGroup>
                                <FormLabel>Age</FormLabel>
                                <Select>
                                    <SelectOption>1-5</SelectOption>
                                    <SelectOption>5-10</SelectOption>
                                    <SelectOption>1-5</SelectOption>
                                    <SelectOption>1-5</SelectOption>
                                </Select>
                            </FormGroup>
                        </Col>  
                        <Col md="4" lg="2">
                            <FormGroup>
                                <div className="checkbox-inline">
                                <FormLabel>Has Leave</FormLabel>
                                <br />
                                <input type="checkbox" value="" />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Col md="4" lg="2">
                            <FormGroup>
                                <div className="checkbox-inline">
                                <FormLabel>Realtime</FormLabel>
                                <br />
                                <input type="checkbox" value="" />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button primary>Search</Button>
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
                <th>Roll no.</th>
                <th>Student Name</th>
                <th>Father Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>View Details</th>
                <th>OneClick</th>
            </Thead>
            <tbody>
                <tr>
                </tr>
            </tbody>
        </Table>
        </CardComponent>
    )

export default RegisterListPage