import React, { Component, Suspense } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminAddNoticeBoard from "./AdminAddNoticeBoard"
import AdminAttendanceHeader from "../../header/admin/AdminAttendanceHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import AdminAddForm from "../form/AdminAddForm"
const ViewEditNoticeBoard = React.lazy(() => import("../form/ViewEditNoticeBoard")) 
import Swal from "sweetalert2"
export default class AdminViewNoticeBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            notices:"",
            view:"",
            edit:""
        }
        this.changeStateValue = this.changeStateValue.bind(this)
        this.eventType = this.eventType.bind(this)
    }
    componentDidMount(){
        api.admin.noticeboard.view().then(data => {
            const {notices} = data
            this.setState({
                notices
            })
        })
    }
    viewNotice(notice_id){
        api.admin.noticeboard.viewEach(notice_id).then(data => {
          const {notice} = data
          notice.checked = {
            parent:Boolean(notice.parent),
            student:Boolean(notice.student),
            staff:Boolean(notice.staff),
          }
          notice.publish = Boolean(notice.publish)
          this.changeStateValue("view",notice)
        })
    }
    editNotice(notice_id){
        api.admin.noticeboard.viewEach(notice_id).then(data => {
          const {notice} = data
          notice.checked = {
            parent:Boolean(notice.parent),
            student:Boolean(notice.student),
            staff:Boolean(notice.staff),
          }
          notice.publish = Boolean(notice.publish)
          this.changeStateValue("edit",notice)
        })
    }
    changeStateValue(name,value){
        this.setState({
            [name]:value
        })
    }
    submit(data){
        Object.keys(data.checked).map((item,id) => {
            data[item] = data.checked[item]
        })
        let formData = new FormData();    //formdata object
        Object.keys(data).map(item => {
          formData.append(item,data[item])
        })
        return api.admin.noticeboard.update(formData).then(data => {
            const {message,notices,notice} = data
            Swal.fire("Success",message,"success");
            this.changeStateValue("notices",notices);
            this.changeStateValue("edit",notice)
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
    removeNotice(notice_id){

    }
    eventType(type,id){
        switch(type){
            case "view":
                this.changeStateValue("view","")
                this.changeStateValue("edit","")
                this.viewNotice(id)
                break
            case "edit":
                this.changeStateValue("view","")
                this.changeStateValue("edit","")
                this.editNotice(id)
                break
            case "remove":
                this.changeStateValue("view","")
                this.changeStateValue("edit","")
                this.removeNotice(id)

        }
    }
    render(){
        const {notices,view,edit} = this.state
        return(
            <span>
                <TopBreadCrumb mainHeader="NoticeBoard" header="View NoticeBoard">
                    <AdminAttendanceHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="View Notice's" back_link="/admin/noticeboard">
                        {notices ? 
                            <Suspense fallback={<h1>Loading ...</h1>}>
                                <ViewEditNoticeBoard eventType={this.eventType} notices={notices}/>
                            </Suspense>
                         : <h3>Loading ...</h3>}
                    </CardComponent>
                    {view && <AdminAddForm title="View Notice" data={view} type={3}/>}
                    {edit && <AdminAddForm submit={this.submit} title="Edit Notice" data={edit} type={2}/>}
                
                </BodyComponent>
            </span>
        )
    }
}
