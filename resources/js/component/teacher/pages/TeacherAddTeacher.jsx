import React,{Component,Suspense} from "react"
const AdminHeader = React.lazy(() => import("../header/AdminHeader"))
const AddTeacherForm =   React.lazy(() => import("../form/AddTeacherForm"))
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'

import api from "../../api"
import BodyComponent from "../../utils/BodyComponent"
import TopBreadCrumb from "../../utils/TopBreadcrumb"

export default class TeacherAddTeacher extends Component{
    
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this)
    }

    submit(data){
        return api.admin.teacher.add(data)  
    }
    render(){
        return(
            <div>
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <AdminHeader mainHeader="Teacher" header="Add Teacher"/>
                </Suspense>
                <BodyComponent>
                    <Suspense fallback={<h1>Loading ...</h1>}>
                        <AddTeacherForm submit={this.submit} title="Add Teacher" back_link="/admin/teacher"/>
                    </Suspense>
                </BodyComponent>
            </div>
        )
    }
}