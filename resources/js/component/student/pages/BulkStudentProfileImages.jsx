import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import { FormGroup, FormLabel, UploadFile, Button, Table, Thead, ButtonGroup } from "../../utils/Components"

const BulkStudentProfileUpdate = () => {
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Profile Update" sub_header="Bulk">
                <AdminStudentHeader/>
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Bulk Student Profile Update " back_link="/admin/student">
                    <Row>
                    <Col md="2">
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Student Photo</label>
                            </div>
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Father Photo</label>
                            </div>
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Mother Photo</label>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Last Marksheet</label>
                          </div>
                          <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Transfer Certificate</label>
                          </div><div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Income Certificate</label>
                          </div>
                        </Col>
                    
                        <Col md="2">
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Cast Certificate</label>
                            </div>
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> DOB Certificate</label>
                            </div>
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Student Aadhar Card</label>
                            </div>
                            <div className="checkbox-inline">
                            <label><input type="checkbox" value="" /> Father Aadhar Card</label>
                            </div>
                        </Col>
                    </Row>
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
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardComponent>
            </BodyComponent>
        </div>
    )
}




export default BulkStudentProfileUpdate