import React,{Component} from "react"
import TeacherHomePage from "../header/TeacherHeader"
import ViewPanelHomeWork from "../panel/ViewPanelHomeWork"
import AddHomeWork from "../form/AddHomeWork"
import ViewParticularHomeWork from "../form/ViewParticularHomeWork"
import api from "../../api"

class ViewHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            add_panel:false,
            edit_panel:false,
            view_panel:false,
            class_id:"",
            view_id:""
        }
        this.sendEventType = this.sendEventType.bind(this)
        this.changeState = this.changeState.bind(this)
    }
    changeState(name,value){
        this.setState({
            [name]:value
        })
    }
    componentDidMount(){
        this.changeState("class_id",this.props.match.params.class_id)
    }
    sendEventType(type,id){
        switch(type){
            case "add":
                this.changeState("add_panel",true)
                this.changeState("edit_panel",false)
                this.changeState("view_panel",false)
                this.changeState("view_id","")
                break
            case "view":
                this.changeState("view_id",id);
                this.changeState("view_panel",true)
                this.changeState("add_panel",false)
                this.changeState("edit_panel",false)
                break
        }
    }

    addHomeWork(data,class_id){
        return api.teacher.homework.add(data).then(data => {
            console.log(data)
        })
    }
    render(){
        const {add_panel,class_id,view_id,view_panel} = this.state
        return(
            <div>
                <TeacherHomePage mainHeader="Teacher" header="HomeWrok" sub_header="Add/Edit/Update/Delete"/>
                <div className="container-fluid mt--6">
                    <ViewPanelHomeWork sendEventType={this.sendEventType}  class_id = {this.props.match.params.class_id} sendEventType={this.sendEventType} />
                    {add_panel  && <AddHomeWork class_id={class_id} submit={this.addHomeWork}/>} 
                    {view_panel && <ViewParticularHomeWork view_id={view_id}/> }
                </div>
            </div>
        )
    }
}

export default ViewHomeWork