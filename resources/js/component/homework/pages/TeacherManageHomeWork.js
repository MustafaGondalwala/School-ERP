import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import ViewClassWiseHomeWork from "../form/ViewClassWiseHomeWork"
import Swal from 'sweetalert2'
import ViewTeacherWisePanel from "../panel/ViewTeacherWisePanel"
import AddEditHomeWork from "../form/AddEditHomeWork"
import api from "../../api"
import {setTeacherHomeWork} from "../../actions/homework"
import { connect } from "react-redux";


class TeacherManageHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            view:"",
            edit:""
        }
        this.changeState = this.changeState.bind(this)
        this.sendEventType = this.sendEventType.bind(this)
        this.updateHomeWork = this.updateHomeWork.bind(this)
    }

    changeState(name,value){
        this.setState({
            [name]:value
        })
    }
    updateHomeWork(data){
        return api.adminteacher.homework.update(data).then(data => {
            this.props.setTeacherHomeWork(data.teacher_homework)
            Swal.fire("Data Updated",data.message,"success")
        })
    }
    deleteHomeWork(homework_id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              api.adminteacher.homework.delete(homework_id).then(data => {
                this.props.setTeacherHomeWork(data.teacher_homework)
                Swal.fire("Data Updated",data.message,"success")
            })
            }
          })
    }
    sendEventType(type,row){
        switch(type){
            case "view":
                this.setState({
                    view:"",
                    edit:""
                }, () => {
                    this.setState({ view:row })
                })
            break
            case "edit":
                this.setState({
                    view:"",
                    edit:""
                }, () => {
                    this.setState({ edit:row })
                })
            break
            case "delete":
                this.deleteHomeWork(row.id);
            break
        }
    }
    render(){
        const {view,edit} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="HomeWork" header="Current" sub_header="Manage"/>
                <BodyComponent>
                    <CardComponent title="View HomeWork" back_link="/teacher/homework">
                        <ViewTeacherWisePanel sendEventType={this.sendEventType} type="editdelete" />
                    </CardComponent>

                    {view && <AddEditHomeWork data={view} type="3" />}
                    {edit && <AddEditHomeWork submit={this.updateHomeWork} data={edit} type="2" />}
                </BodyComponent>
            </div>
        )
    }
}

export default connect(null,{setTeacherHomeWork})(TeacherManageHomeWork);