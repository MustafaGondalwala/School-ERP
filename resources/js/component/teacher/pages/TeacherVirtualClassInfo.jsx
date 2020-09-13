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

class TeacherVirtualClassInfo extends Component{
    render(){
        return(
            <div>
                <EmptyHeader mainHeader="Teacher" header="Virtual Class"/>
                <BodyComponent>
                    <CardComponent title="Virtual Class">
                        <h1>Virtual Class will be avaible in Pro Version</h1>
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
  
  export default connect(mapStateToProps,{getClassDispatch,setClassSection,setTeachersNameDispatch})(TeacherVirtualClassInfo);