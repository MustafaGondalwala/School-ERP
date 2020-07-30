import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"

import CardComponent from "../../utils/CardComponent"
import {setTeacherGroupDispatch,setTeacherGroup} from "../../actions/study_material"
import { connect } from "react-redux";
import GetClassId from "../../utils/GetClassId"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import { Input, FormGroup, FormLabel, Button,Table, Thead } from "../../utils/Components"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import Swal from "sweetalert2"
import AddEditGroup from "../form/AddEditGroup"

class StudyMaterialTeacherGroup extends Component{
    constructor(props){
        super(props)
        this.state = {
            row:""
        }
        this.updateShow = this.updateShow.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
    }
    componentDidMount(){
        const {setTeacherGroupDispatch,teacher_groups} = this.props
        if(Object.keys(teacher_groups).length == 0)
            setTeacherGroupDispatch()
    }
    addGroup(data){
        return api.adminteacher.study_material.teacher.group.add(data).then(data => {
            Swal.fire("Success","New Group Added !!","success")  
            const {groups} = data
            this.props.setTeacherGroup(groups)
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
    updateGroup(data,id){
        return api.adminteacher.study_material.teacher.group.update(data).then(data => {
            Swal.fire("Success","Chapter Updated !!","success")  
            const {groups} = data
            this.props.setTeacherGroup(groups)
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
    removeChapter(chapter_id){
        api.adminteacher.study_material.teacher.group.delete(chapter_id).then(data => {
            Swal.fire("Success","Chapter Removed !!","success")  
            const {groups} = data
            this.props.setTeacherGroup(groups)
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
    updateShow(row){
        this.setState({
            row:""
        },() => {
            this.setState({
                row
            })
        })
    }
    render(){
        const {row} = this.state
        const {teacher_groups} = this.props
        return(
            <div>
                <EmptyHeader mainHeader="Study Material" header="Teacher" sub_header="Lession"/>
                <BodyComponent>
                    <CardComponent title="Chapter List" back_link="/teacher/study-material/teacher">
                        <Table>
                            <Thead>
                                    <td>Sr no.</td>
                                    <td>Class</td>
                                    <td>Section</td>
                                    <td>Subject</td>
                                    <td>Chapter Name</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                            </Thead>
                            <tbody>
                                {Object.keys(teacher_groups).length > 0 && teacher_groups.map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.class.class_title}</td>
                                        <td>{item.class.section}</td>
                                        <td>{item.subject.subject_name}</td>
                                        <td>{item.group_name}</td>
                                        <td><Button warning onClick={e => this.updateShow(item)} sm>Edit</Button></td>
                                        <td><Button danger sm onClick={e => this.removeChapter(item.id)}>Delete</Button></td>
                                    </tr>
                                }) }
                            </tbody>
                        </Table>
                    </CardComponent>
                    {row && <AddEditGroup row={row} submit={this.updateGroup} title="Update Chapter"/>} 
                    <AddEditGroup submit={this.addGroup} title="Add Chapter"/>        
                </BodyComponent>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        teacher_groups:state.teacher_groups,
    };
}

export default connect(mapStateToProps,{setTeacherGroupDispatch,setTeacherGroup})(StudyMaterialTeacherGroup);
