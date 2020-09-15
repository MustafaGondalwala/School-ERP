import React, { Component } from "react"
import {setTeacherwiseHomeWorkDispatch} from "../../actions/homework"
import { connect } from "react-redux";
import EmptyHeader from "../../utils/EmptyHeader";
import TeacherHeader from "../header/TeacherHeader";
import CardComponent from "../../utils/CardComponent"
import TopBreadCrumb from "../../utils/TopBreadcrumb";
import BodyComponent from "../../utils/BodyComponent";
import AddEditHomeWork from "../form/AddEditHomeWork"
import StudentHomeWorkView from "../form/StudentHomeWorkView"
import ViewTeacherWisePanel from "../panel/ViewTeacherWisePanel";

export default class TeacherCheckStudentHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            view:"",
        }
        this.changeState = this.changeState.bind(this)
        this.sendEventType = this.sendEventType.bind(this)
    }

    changeState(name,value){
        this.setState({
            [name]:value
        })
    }

    sendEventType(type,row){
        switch(type){
            case "view":
                this.setState({
                    view:"",
                    check:""
                }, () => {
                    this.setState({ view:row })
                })
            break
            case "check":
                this.setState({
                    view:"",
                    check:""
                }, () => {
                    this.setState({ check:row })
                })
            break
        }
    }
    render(){
        const {view,check} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="HomeWork" header="Check"/>
                <BodyComponent>
                    <CardComponent title="View HomeWork" back_link="/teacher/homework">
                        <ViewTeacherWisePanel sendEventType={this.sendEventType}  type="check"/>
                    </CardComponent>
                    {view && <AddEditHomeWork data={view} type="3" />}
                    {check && <StudentHomeWorkView check_id={check}/>}
                </BodyComponent>
            </div>
        )
    }
}

