import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import AddTeacherForm from "../form/AddTeacherForm"
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'

import api from "../../api"

export default class TeacherAddTeacher extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            "button_text":"Add"
        }
        this.submit = this.submit.bind(this)
    }

    submit(data){
        this.setState({
            button_text:"Adding .."
        })
        return api.admin.add_teacher(data).then(data => {
            Swal.fire("Success",data.success.message,"success");
            this.setState({
                button_text:"Add"
            })
        })   
    }
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Teacher" header="Add Teacher" />
                        <AddTeacherForm submit={this.submit} button_text={this.state.button_text} title="Add Teacher" back_link="/admin/teacher"/>
            </div>
        )
    }
}