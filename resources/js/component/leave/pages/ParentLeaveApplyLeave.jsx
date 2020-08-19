import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import { FormGroup, FormLabel, Input, Button } from "../../utils/Components"
import api from "../../api"
import Swal from "sweetalert2"

class ParentLeaveApplyLeave extends Component{
    constructor(props){
        super(props)
        this.initalData = {
            date:"",
            reason:"",
            attachment:"",
        }
        this.state = {
            data: this.initalData,
            errors:{}
        }
    }
    onChange(e){
        const {name,value,files} = e.target
        if(name == "attachment"){
            this.setState({
                data: {...this.state.data,[name]: files[0]}
            })
        }else
            this.setState({
                data: {...this.state.data,[name]: value}
            })
    }
    validate(data){
        const errors = {};
        if (!data.date) errors.date = "Can't be blank";
        if (!data.reason) errors.reason = "Can't be blank";
        return errors;
    }
    submit(){
        const {data} = this.state
        const errors = this.validate(data)
        this.setState({ errors })
        if(Object.keys(errors).length == 0){
            let formData = new FormData();    //formdata object
            data.student_id = this.props.match.params.student_id
            Object.keys(data).map(item => {
            formData.append(item,data[item])
            })
            api.parentstudent.leave.add(formData).then(data => {
                const {message} = data
                Swal.fire("Success",message,"success")
                this.setState({
                    data: this.initalData
                })
            }).catch(error => {
                const {data,status} = error.response
                if(status == 400)
                    Swal.fire("Invalid Date","Leave Already Exist","warning");
            })
        }
    }
    render(){
        const {data,errors} = this.state
        const {student_id} = this.props.match.params
        return(
            <div>
                <EmptyHeader mainHeader="Leave" header="Apply for Leave"/>
                <BodyComponent>
                    <CardComponent title="Apply Leave" back_link={"/parent/leave/"+student_id}>
                        <Row>
                            <Col md={6} lg={6}>
                                <FormGroup>
                                    <FormLabel>Date:</FormLabel>
                                    <Input errors={errors} value={data.date} type="date" name="date" onChange={e => this.onChange(e)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} lg={6}>
                                <FormGroup>
                                    <FormLabel>Reason:</FormLabel>
                                    <Input errors={errors} value={data.reason} name="reason" onChange={e => this.onChange(e)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} lg={6}>
                                <FormGroup>
                                    <FormLabel>Attachment:</FormLabel>
                                    <Input type="file" onChange={e => this.onChange(e)} name="attachment"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} lg={6}>
                                <Button primary onClick={e => this.submit()}>Apply</Button>
                            </Col>
                        </Row>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

export default ParentLeaveApplyLeave