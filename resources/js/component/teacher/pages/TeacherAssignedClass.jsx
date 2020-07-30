import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminTeacherHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { connect } from "react-redux";
import {getClassDispatch,setClassSection} from "../../actions/classes"
import {setTeachersNameDispatch} from "../../actions/teacher"
import { Table, Thead, Select, SelectOption } from "../../utils/Components"
import api from "../../api"
import Swal from "sweetalert2"

class TeacherAssignedClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            teachers_name:""
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        const {value,name} = e.target
        const class_id = e.target.getAttribute('class_id')
        const data = {
            'class_id':class_id,
            'teacher_id':value
        }
        const self = this
        Swal.fire({
            title: 'Are you sure?',
            text: "Assigned Teacher to Class",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showLoaderOnConfirm: true,
            confirmButtonText: 'Yes, Assign Teacher to Class!',
            preConfirm: () => {
                return api.admin.teacher.assigned_teacher(data).then(data => data ).catch(error => {
                  return {error:true}
                })
              }
          }).then((result) => {
              console.log(result)
            if(result.hasOwnProperty('value')){
              if(result.value.hasOwnProperty('error')){
                Swal.fire("Error","Error Occured in Process. Please check the Data","error")
              }
              if(result.value.hasOwnProperty('message')){
                this.props.setClassSection(result.value.classes)
                Swal.fire("Data Updated!!",result.value.message,"success")
              }
            }
          })
    }
    async componentDidMount(){
        const {classes,getClassDispatch,teachers_name,setTeachersNameDispatch} = this.props
        if(Object.keys(classes).length == 0)
            getClassDispatch()
        if(Object.keys(teachers_name).length == 0){
            setTeachersNameDispatch()
        }
    }
    render(){
        const {classes,getClassDispatch,teachers_name} = this.props
        return(
            <div>
                <AdminTeacherHeader mainHeader="Teacher" header="Assigned Class"/>
                <BodyComponent>
                    <CardComponent title="Assigned Class" back_link="/admin/teacher">
                        <Table>
                            <Thead>
                                <td>Sr no.</td>
                                <td>Class Title</td>
                                <td>Section</td>
                                <td>Assigned</td>
                                <td>Action</td>
                            </Thead>
                            <tbody>
                                {Object.keys(classes).length > 0 && classes.map((item,id) => {
                                    return <tr>
                                        <td>{id+1}</td>
                                        <td>{item.class_title}</td>
                                        <td>{item.section}</td>
                                        <td>{item.teacher ? item.teacher.teacher_name : "None Assigned"}</td>
                                        <td>
                                            <Select class_id={item.id} name="assigned_teacher" onChange={this.onChange} value={item.assigned_teacher_id || ''}>
                                            <SelectOption> -- Select -- </SelectOption>
                                            {Object.keys(teachers_name).length > 0 && teachers_name.map((teacher,index) => {
                                                        return <SelectOption value={teacher.id}>{teacher.teacher_name}</SelectOption>
                                            })}
                                            </Select>
                                            
                                        </td>
                                        <td></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      classes:state.classes,
      teachers_name:state.teachers_name
    };
  }
  
  export default connect(mapStateToProps,{getClassDispatch,setClassSection,setTeachersNameDispatch})(TeacherAssignedClass);