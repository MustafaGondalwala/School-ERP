import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import Row from "../../utils/Row"
import Col from "../../utils/Col"

import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import {FormLabel,FormGroup,Input,UploadInput,Button} from "../../utils/Components"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import GetClassId from "../../utils/GetClassId"

const RegisterPage = () => {

   return(
    <div>
        <TopBreadCrumb mainHeader="Student" header="Add" sub_header="Register Student">
            <AdminStudentHeader />
        </TopBreadCrumb>
        <BodyComponent>
            <CardComponent title="Student Register Page" back_link="/admin/student">
                <Row>
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Class</label>
                            <select className="form-control">
                                <option>5th</option>
                                <option>6th</option>
                                <option>7th</option>
                            </select>
                       </div>
                    </Col>
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Register No.</label>
                            <input type="number"   className="form-control" name="register_no"  placeholder="Register No." />
                       </div>
                    </Col>   
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Student Name</label>
                            <input type="text"   className="form-control" name="student_name"  placeholder="Student Name" />
                       </div>
                    </Col> 
                </Row>
                <Row>
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Father Name</label>
                            <input type="integer"   className="form-control" name="roll_no"  placeholder="Student Name" />
                       </div>
                    </Col>
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Mother Name</label>
                            <input type="integer"   className="form-control" name="roll_no"  placeholder="Mother Name" />
                       </div>
                    </Col>
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Father Contact1</label>
                            <input type="integer"   className="form-control" name="roll_no"  placeholder="Father Contact1" />
                       </div>
                    </Col> 
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Father Contact2</label>
                            <input type="integer"   className="form-control" name="roll_no"  placeholder="Father Contact2" />
                       </div>
                    </Col> 
                </Row>
                <Row>
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <FormLabel>DOB</FormLabel>
                            <input className="form-control" type="date" />
                       </div>
                    </Col> 
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <FormLabel>Gender</FormLabel>
                            <select className="form-control">
                                <option>male</option>
                                <option>female</option>
                            </select>
                       </div>
                    </Col> 
                    <Col md="4" sm="4">
                        <div className="form-group">
                            <FormLabel>Date of Admission</FormLabel>
                           <input type="date" className="form-control" />
                       </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>Address</FormLabel>
                            <Input placeholder="Student Address" />
                        </FormGroup>
                    </Col>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>Block</FormLabel>
                            <Input placeholder="Block" />
                        </FormGroup>
                    </Col>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>District</FormLabel>
                            <Input placeholder="District" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>State</FormLabel>
                            <Input placeholder="State" />
                        </FormGroup>
                    </Col>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>Pincode</FormLabel>
                            <Input placeholder="Pincode" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>Student Photo</FormLabel>
                            <UploadInput />
                        </FormGroup>
                    </Col>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>Mother Photo</FormLabel>
                            <UploadInput />
                        </FormGroup>
                    </Col>
                    <Col md="4" sm="4">
                        <FormGroup>
                            <FormLabel>Father Photo</FormLabel>
                            <UploadInput />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Button primary>Register Student</Button>
                    <Button warning>Reset</Button>
                </Row>
            </CardComponent>
        </BodyComponent>
    </div>
   )
}



export default RegisterPage