import React, { Component } from "react"
import BodyComponent from "../../utils/BodyComponent"
import EmptyHeader from "../../utils/EmptyHeader"
import CardComponent from "../../utils/CardComponent"
import ViewPastTeacherWisePanel from "../panel/ViewPastTeacherWisePanel"
import AddEditHomeWork from "../form/AddEditHomeWork"


class TeacherPastManageHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            view:"",
            edit:""
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
                    edit:""
                }, () => {
                    this.setState({ view:row })
                })
            break
        }
    }

    render(){
        const {view} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="HomeWork" header="Past" sub_header="Manage"/>
                <BodyComponent>
                    <CardComponent title="View HomeWork" back_link="/teacher/homework">
                        <ViewPastTeacherWisePanel sendEventType={this.sendEventType} type="editdelete" />
                    </CardComponent>
                    {view && <AddEditHomeWork data={view} type="3" />}
                </BodyComponent>
            </div>
        )
    }
}

export default TeacherPastManageHomeWork