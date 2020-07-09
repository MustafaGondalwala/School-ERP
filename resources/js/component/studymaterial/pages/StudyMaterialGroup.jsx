import React, { Component } from "react"
import StudyMatrialTeacherHeader from "../header/StudyMatrialTeacherHeader"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"


import Row from "../../utils/Row"
import Col from "../../utils/Col"
import { Input, FormGroup, FormLabel, Button,Table, Thead } from "../../utils/Components"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import Swal from "sweetalert2"

import {setGroupDispatch,setGroup} from "../../actions/study_material"
import { connect } from "react-redux";


class StudyMaterialGroup extends Component{
    constructor(props){
        super(props)
        this.state = {
            groups:"",
            row:""
        }
        this.addGroup = this.addGroup.bind(this)
        this.updateGroupShow = this.updateGroupShow.bind(this)
        this.updateGroup = this.updateGroup.bind(this)

    }
    async componentDidMount(){
        const {class_id} = this.props.match.params
        const {groups,setGroupDispatch} = this.props
        if(Object.keys(groups).length == 0 || groups[class_id] == undefined){
            await setGroupDispatch(class_id)
        }
    }
    addGroup(study_group,id){
        const {class_id} = this.props.match.params
        return api.adminteacher.study_material.group.add(study_group,class_id).then(data => {
            Swal.fire("Success","New Group Added !!","success")  
            const {groups} = data
            this.props.setGroup(groups,class_id)
        }).catch(error => {
            if(error.response){
                const {data,status} = error.response
                if(status == 422){
                    Swal.fire("Invalid Data","Please Check your Data","warning")
                }else if(status == 400){
                    Swal.fire("Already Exists","Gourp Name Already Exists. Please Different Name","warning")
                }
            }
        })
    }

    updateGroup(study_group,id){
        const {class_id} = this.props.match.params
        return api.adminteacher.study_material.group.update(study_group,class_id,id).then(data => {
            Swal.fire("Success","Group Update !!","success")  
            const {groups} = data
            this.setState({
                row:""
            })
            this.props.setGroup(groups,class_id)
        }).catch(error => {
            if(error.response){
                const {data,status} = error.response
                if(status == 422){
                    Swal.fire("Invalid Data","Please Check your Data","warning")
                }else if(status == 400){
                    Swal.fire("Already Exists","Gourp Name Already Exists. Please Different Name","warning")
                }
            }
        })
    }
    updateGroupShow(row){
        this.setState({
            row:""
        }, () => {
            this.setState({
                row
            })
        })
    }
    render(){
        const {class_id} = this.props.match.params
        const {groups} = this.props
        const {row} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Study Material" header="Group">
                    <StudyMatrialTeacherHeader/>
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Study Material Groups" back_link={"/teacher/study-material/class/"+class_id}>
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Group Name</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </Thead>
                            <tbody>
                                {
                                    groups[class_id] !== undefined && groups[class_id].map((item,id) => {
                                        return <tr key={id}>
                                            <td>{id+1}</td>
                                            <td>{item.group_name}</td>
                                            <td>{new Date(item.created_at).toLocaleString()}</td>
                                            <td>
                                            <td  className="table-actions">
                                                <a href="#!" onClick={e => this.updateGroupShow(item)} className="table-action" data-toggle="tooltip" data-original-title="Edit product">
                                                    <i className="fas fa-user-edit" />
                                                </a>
                                                <a href="#!" onClick={e => this.removeClass(item)} className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete product">
                                                    <i className="fas fa-trash" />
                                                </a>
                                            </td>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </CardComponent>
                    {row && <AddEditGroup submit={this.updateGroup} row={row} title="Edit Group"/> }
                    <AddEditGroup submit={this.addGroup} title="Add Group"/>        
                </BodyComponent>
            </div>
        )
    }
}


class AddEditGroup extends Component{
    constructor(props){
        super(props)
        this.state = {
            study_group:"",
            error:"",
            id:"",
            button_text:"Add"
        }
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {row} = this.props
        if(row){
            this.setState({
                study_group:row.group_name,
                id:row.id,
                button_text:"Edit"
            })
        }
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    } 
    submit(){
        const {study_group,id} = this.state
        if(study_group == "")
            this.setState({
                error:"Can't be Blank"
            })
        else{
            this.setState({
                error:""
            })
            this.props.submit(study_group,id).then(() => {
                this.setState({
                    study_group:""
                })
            })
        }
    }
    render(){
        const {study_group,error,button_text,id} = this.state
        const {title} = this.props
        return(
            <CardComponent title={title}>
                        <Row>
                            <Col md={6} md={6}>
                                <FormGroup>
                                    <FormLabel>{title}</FormLabel>
                                    <Input name="study_group" value={study_group} onChange={this.onChange} placeholder={title}/>
                                    {error && <InlineError text={error}/>}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} md={6}>
                                <FormGroup>
                                    <Button primary sm onClick={this.submit}>
                                        {button_text}
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups:state.studyMaterialGroup
    };
}

export default connect(mapStateToProps,{setGroupDispatch,setGroup})(StudyMaterialGroup);