import { Component } from "react";

import React from "react"
import CardComponent from "../../utils/CardComponent";
import Row from "../../utils/Row";
import { Col, FormGroup, FormLabel, Input, Button } from "../../utils/Components";
import api from "../../api";
import Swal from "sweetalert2"

export default class UpdateEmpID extends Component{
    constructor(props){
        super(props)
        this.state = {
            empid:"",
            schoolCode: "",
            tempEmpid:""
        }
    }
    componentDidMount(){
        api.admin.empid.get().then(data => {
            const {empid, schoolCode} = data
            this.setState({
                empid,schoolCode,tempEmpid:empid
            })
        })
    }

    submit(){
        const {tempEmpid} = this.state
        if(tempEmpid == "")
            Swal.fire("Invalid Data","Please Enter Proper Empid","warning")
        else{
            api.admin.empid.update(tempEmpid).then(data => {
                const {empid, schoolCode} = data
                this.setState({
                    empid,schoolCode,tempEmpid:empid
                })

                Swal.fire("Success","EmpID Updated!!","success");
            })
        }
    }
    render(){
        const {empid, schoolCode,tempEmpid} = this.state
        return(
            <div className="col-md-6">
                <CardComponent title="Update EmpID">
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>Current EmpID:</FormLabel>
                                <br />
                                {schoolCode}-{empid}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>
                                    EmpID:
                                </FormLabel>
                                <Input type="number" value={tempEmpid} onChange={e => 
                                    this.setState({
                                        tempEmpid:e.target.value
                                    })
                                }
                                placeholder="EmpID"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={e => this.submit()} primary>Update EmpID</Button>
                        </Col>
                    </Row>
                </CardComponent>
            </div>
        )
    }
}