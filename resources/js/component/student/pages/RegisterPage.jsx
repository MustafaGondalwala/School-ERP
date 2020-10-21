import React, { Component,Suspense } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import Row from "../../utils/Row"
import Col from "../../utils/Col"

import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import {FormLabel,FormGroup,Input,UploadImage,UploadInput,Button, Select, SelectOption} from "../../utils/Components"
const AdminStudentHeader  = React.lazy(() => import("../../header/admin/AdminStudentHeader"))
import {getClassSection} from "../../actions/classes"
import { connect } from "react-redux";
import { error } from "jquery"
const RegisterForm = React.lazy(() => import("../form/RegisterForm"))
import GetClassId from "../../utils/GetClassId"
import api from "../../api"
import Swal from "sweetalert2"
class RegisterPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            register_student:null
        }
    }

    async componentDidMount(){
        const {register_id} = this.props.match.params
        if(register_id == "" || register_id == null){
            this.props.history.push('/admin/student/register-student')
        }else{
            await api.admin.student.get_individual_register_student(register_id).then(data => {
                const {register_student} = data
                this.setState({register_student})
            })
        }
    }
    newRegisterStudent(data){
        let formData = new FormData();    //formdata object
        Object.keys(data).map(item => {
          formData.append(item,data[item])
        })
        return api.adminclerk.student.register.add(formData).then(data => {
            Swal.fire("Success","Student Registered","success")
        })
    }
    updateRegisterStudent(data){
        let formData = new FormData();    //formdata object
        Object.keys(data).map(item => {
          formData.append(item,data[item])
        })
        return api.adminclerk.student.register.update(formData).then(data => {
            Swal.fire("Success","Student Update","success")
        })
    }
    render(){
        const {register_student} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Add" sub_header="Register Student">
                   <Suspense fallback={<h1>Loading…</h1>}>
                       <AdminStudentHeader  />
                   </Suspense>
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Student Register Page" back_link="/admin/student">
                        <Suspense fallback={<div>Loading…</div>}>
                            <RegisterForm updateRegisterStudent={this.updateRegisterStudent} register_student={register_student}  newRegisterStudent={this.newRegisterStudent} new={true} />
                        </Suspense>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        classes:state.distinct_classes
    };
}

export default connect(mapStateToProps,{getClassSection})(RegisterPage);