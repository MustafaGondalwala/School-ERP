import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { FormLabel, Col, Table, Thead } from "../../utils/Components"
import Row from "../../utils/Row"
import GetClassId from "../../utils/GetClassId"
import SelectStudent from "../../utils/SelectStudent"
import ProfileImagesForm from "../form/ProfileImagesForm"
import api from "../../api"
import Swal from "sweetalert2"
class StudentProfileImages extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_id:"",
            data:"",
            isLoading:false
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.updateStudentPhoto = this.updateStudentPhoto.bind(this)
    }
    sendClassId(class_id){
        this.setState({
            class_id
        })
        this.setState({
            data:"",
            isLoading:true
        })
        return api.adminclerk.student.class_wise_student_photos(class_id).then(data => {
            const {class_wise} = data
            this.setState({
                data:class_wise,
                isLoading:false
            })
        })
    }
    async updateStudentPhoto(name, file, id){
        const formData = new FormData();
        formData.append("name",name)
        formData.append("file",file)
        formData.append("photo_id",id)
        formData.append("class_id",this.state.class_id)
        // this.setState({
        //     data:""
        // })
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result) {
                return api.adminclerk.student.update_photo(formData).then(data => {
                    const {class_wise} = data
                    Swal.fire("Success","Photo Updated !!","success");
                    this.setState({
                        data:""
                    })
                    this.setState({
                        data:class_wise
                    })
                })
            }
          })

        
    }
    render(){
        const {class_id,data,isLoading} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Profile Update">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Select Class" back_link="/admin/student">
                            <GetClassId class_id={class_id} sendClassId={this.sendClassId} errors=""/>
                    </CardComponent>
                    {isLoading && <CardComponent title={"Student List"}><h3>Loaind ...</h3></CardComponent>}
                    { data && <ProfileImagesForm submit={this.updateStudentPhoto} data={data}/> }
                </BodyComponent>
            </div>
        )
    }
}

export default StudentProfileImages