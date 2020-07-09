import React, { Component, Suspense } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminNoticeBoardHeader from "../../header/admin/AdminNoticeBoardHeader"
import BodyComponent from "../../utils/BodyComponent"
import AdminAddForm from "../form/AdminAddForm"
import api from "../../api"
import Swal from "sweetalert2"

export default class AdminAddNoticeBoard extends Component{
    submit(data){

        Object.keys(data.checked).map((item,id) => {
            data[item] = data.checked[item]
        })
        let formData = new FormData();    //formdata object
        Object.keys(data).map(item => {
          formData.append(item,data[item])
        })
        return api.admin.noticeboard.add(formData).then(data => {
            const {message} = data
            Swal.fire("Success",message,"success");
        }).catch(error => {
            if(error.response){
                const {status,data} = error.response
                if(status == 422){
                    Swal.fire('Error Occured',data.message,"warning");
                }else if(status == 400){
                    Swal.fire("Error Occured","Error Occurred in Process. Please Try Again Later ..","error");
                }
            }
        })
    }
    render(){
        return(
            <div>
                <TopBreadCrumb mainHeader="Noticeboard" header="Add">
                    <AdminNoticeBoardHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <AdminAddForm submit={this.submit} type={1} title={"Add Notice"} back_link={"/admin/noticeboard"}/>
                </BodyComponent>
            </div>
        )
    }
}