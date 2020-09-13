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
import EmptyHeader from "../../utils/EmptyHeader"

class TeacherClassInfo extends Component{
   constructor(props){
       super(props)
       this.state = {
           student_info: [] 
       }
   }
    componentDidMount(){
        const {class_id} = this.props.match.params
        api.adminteacher.classinfo.get(class_id).then(data => {
            const {student_info} = data
            this.setState({
                student_info
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
    render(){
        const {student_info} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="Teacher" header="Class Info"/>
                <BodyComponent>
                    <CardComponent title="Class Info">
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Roll No.</th>
                                <th>Student Name</th>
                                <th>Parent Name</th>
                                <th>Parent Mobile</th>
                                <th>Gender</th>
                                <th>Dob</th>
                            </Thead>
                            <tbody>
                                {
                                    student_info.length > 0 && student_info.map((item,id) => {
                                        console.log(item)
                                        return <tr>
                                            <td>{id+1}</td>
                                            <td>{item.roll_no}</td>
                                            <td>{item.student_name}</td>
                                            <td>{item.parent.name}</td>
                                            <td>{item.parent.mobile_no}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.dob}</td>
                                        </tr>
                                    })
                                }
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
  
  export default connect(mapStateToProps,{getClassDispatch,setClassSection,setTeachersNameDispatch})(TeacherClassInfo);