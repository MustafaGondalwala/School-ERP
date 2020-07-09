import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import EmptyHeader from "../../utils/EmptyHeader"
import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import Row from "../../utils/Row"
import Swal from "sweetalert2"

import api from "../../api"
import { Table, Thead, Button, FormGroup, FormLabel, Input, Col } from "../../utils/Components"

class ChangePasswordClerk extends Component{
    constructor(props){
        super(props)
        this.state = {
            clerk:"",
            showpanel:""
        }
        this.showpanel = this.showpanel.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }
    componentDidMount(){
        api.admin.clerk.getAll().then(data => {
            const {clerk} = data
            this.setState({
                clerk
            })
        })
    }
    showpanel(clerk_id){
        this.setState({
            showpanel:""
        },() => {
            this.setState({
                showpanel:clerk_id
            })
        })
    }
    changePassword(clerk_id,password){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
          }).then((result) => {
            if (result.value) {
                api.admin.clerk.changePassword(clerk_id,password).then(data => {
                    Swal.fire("Sucess",data.message,"success")
                    this.setState({
                        showpanel:""
                    })
                }).catch(error => {
                    if(error.response){
                        const {status,data} = error.response
                        if(status == 422)
                            Swal.fire("Invalid Data","Please Check the Data","warning")
                        else if(status == 500 || status == 400)
                            Swal.fire("Errror Occurred","Error Occurred. Please try again Later.","error")
                    }
                })
            }
          })
    }
    render(){
        const {clerk,showpanel} = this.state
        return( 
            <div>
                <EmptyHeader mainHeader="Clerk" header="Change Password"/>
                <BodyComponent>
                    <CardComponent back_link="/admin/fees" title="Clerk List">
                        {clerk && 
                            <Table>
                                <Thead>
                                <th>Srno</th>
                                <th>EmpID</th>
                                <th>Clerk Name</th>
                                <th>Change Password</th>
                                </Thead>
                                <tbody>
                                    {clerk.map((item,id) => {
                                        return <tr key={id}>
                                            <td>{id+1}</td>
                                            <td>{item.empid}</td>
                                            <td>{item.clerk_name}</td>
                                            <td><Button onClick={e => this.showpanel(item.id)} primary sm>Change</Button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        }
                    </CardComponent>
                    {showpanel && <ChangePasswordForm changePassword={this.changePassword} clerk_id={showpanel} />}
                </BodyComponent>
            </div>
        )
    }
}


class ChangePasswordForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            password:"",
            clerk_id:"",
        }
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }
    componentDidMount(){
        const {clerk_id} = this.props
        this.setState({
            clerk_id
        })
    }
    submit(){
        const {clerk_id,password} = this.state
        this.props.changePassword(clerk_id,password)
    }
    render(){
        const {password} = this.state
        return(
            <CardComponent title="Change Password">
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>New Password</FormLabel>
                            <Input value={password} name="password" onChange={this.onChange} type="password" placeholder="New Password"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button primary sm onClick={this.submit}>Change</Button>
                    </Col>
                </Row>
            </CardComponent>
        )
    }
}


export default ChangePasswordClerk