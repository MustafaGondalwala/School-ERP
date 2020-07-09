import React, { Component,Suspense } from "react"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
const ViewPanelStaff = React.lazy(() => import("../utils/ViewPanelStaff")) 
const AddTimeTableStaff = React.lazy(() => import("../form/AddTimeTableStaff")) 
const EditTimeTableStaff = React.lazy(() => import("../form/EditTimeTableStaff"))


export default class TimeTableViewStaff extends Component{
    constructor(props){
        super(props)
        this.state = {
            add_panel:false,
            edit_panel:false,
            time_table_name:""
        }
        this.sendEventType = this.sendEventType.bind(this)
        this.changeState = this.changeState.bind(this)
    }

    changeState(state_name,type){
        this.setState({
            [state_name]:type
        })
    }
    sendEventType(type,id){
        const {add_panel,edit_panel} = this.state
        switch(type){
            case "add":
                this.changeState("add_panel",true)
                this.changeState("edit_panel",false)
                break
            case "edit":
                    this.changeState("add_panel",false)
                    this.changeState("edit_panel",true)
                    this.setState({
                        time_table_name:id
                    })
        }
    }

    render(){
        const {add_panel,edit_panel,time_table_name} = this.state
        return(
            <div>
                <AdminHeader mainHeader="TimeTable" header="Staff" sub_header="Edit"/>
                <BodyComponent>
                    <Suspense fallback={<h1>Loading ...</h1>}>
                       <ViewPanelStaff sendEventType={this.sendEventType}/>
                    </Suspense>
                       {add_panel  && 
                        <Suspense fallback={<h1>Loading ...</h1>}>
                       <AddTimeTableStaff />
                       </Suspense>
                       } 
                       {edit_panel && 
                        <Suspense fallback={<h1>Loading ...</h1>}>
                            <EditTimeTableStaff time_table_name={time_table_name}/>
                        </Suspense>
                       }
                </BodyComponent>
            </div>
        )
    }
}