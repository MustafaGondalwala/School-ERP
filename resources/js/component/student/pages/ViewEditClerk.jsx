import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import AddClerkForm from "../form/AddClerkForm";
import ViewPanelClerk from "../panel/ViewPanelClerk"
import api from "../../api"
class ViewEditClerk extends Component{
    constructor(props){
        super(props)
        this.state = {
            add:false,
            edit:"",
            view:""
        }
        this.changeState =  this.changeState.bind(this)
        this.eventType = this.eventType.bind(this)
    }
    changeState(name,value){
        this.setState({
            [name]:value
        })
    }
    eventType(type,row){
        switch(type){
            case "view":
                this.changeState("add","")
                this.changeState("view","")
                this.changeState("edit","")
                this.setState({
                    view:""
                },() => {
                    this.setState({
                        view:row
                    })
                })
                break
            case "add":
                this.changeState("add",true)
                this.changeState("view","")
                this.changeState("edit","")
                break
            case "edit":
                this.changeState("add","")
                this.changeState("view","")
                this.setState({
                    edit:""
                },() => {
                    this.setState({
                        edit:row
                    })
                })
                break
        }
    }
    addClerkToSystem(data){
        const formData = new FormData();
        console.log(data)
        Object.keys(data).map((item) => {
        formData.append(item, data[item]);
        });
        return api.admin.clerk.add(formData)
    }
    updateClerkInSystem(data){
        const formData = new FormData();
        console.log(data)
        Object.keys(data).map((item) => {
        formData.append(item, data[item]);
        });
        api.admin.clerk.update(formData)
    }
    render(){
        const {add,view,edit} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Clerk" sub_header="Add/Edit/View">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent add_object={{'text':"Add",'clickFunction':() => this.eventType("add",null)}} title="Clerk Info"  back_link="/admin/student">
                        <ViewPanelClerk eventType={this.eventType} />
                    </CardComponent>
                    {add && <AddClerkForm title="Add Clerk" submit={this.addClerkToSystem} type="add"/>}
                    {view && <AddClerkForm title="View Clerk" data={view} type="view" />}
                    {edit && <AddClerkForm title="Edit Clerk" submit={this.updateClerkInSystem} data={edit} type="edit" />}

                </BodyComponent>
            </div>
        )
    }
}

export default ViewEditClerk