import React,{Component,Suspense} from "react"
const TeacherHomePage = React.lazy(() => import('../header/TeacherHeader'));
const ViewPanelHomeWork = React.lazy(() => import('../panel/ViewPanelHomeWork'));
const AddHomeWork = React.lazy(() => import('../form/AddHomeWork'));
const ViewParticularHomeWork = React.lazy(() => import('../form/ViewParticularHomeWork'));
// const HomeWorkSubmittion = React.lazy(() => import('../form/HomeWorkSubmittion'));
const StudentHomeWorkStatus = React.lazy(() => import("../form/StudentHomeWorkStatus"))
const EditHomeWork = React.lazy(() => import("../form/EditHomeWork"))

import api from "../../api"

class ViewHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            add_panel:false,
            edit_panel:false,
            view_panel:false,
            home_check_panel:false,
            student_status:false,
            home_check_id:"",
            class_id:"",
            view_id:"",
            student_status_id:"",
            edit_homework_data:"",
            edit_homework:"",

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
                this.changeState('home_check_panel',false)
                this.changeState("student_status",false)
                this.changeState("edit_homework",false)

                this.changeState("view_id","")
                break
            case "view":
                this.setState({
                    view_id:id
                },() => {
                    this.setState({
                        view_panel:true
                    })
                })
                this.changeState("view_id",id)
                this.changeState("view_panel",true)
                this.changeState("add_panel",false)
                this.changeState("edit_panel",false)
                this.changeState('home_check_panel',false)
                this.changeState("edit_homework_panel",false)
                this.changeState("student_status",false)
                break
            case "homework_check":
                this.changeState("add_panel",false)
                this.changeState("edit_panel",false)
                this.changeState("view_panel",false)
                this.changeState('home_check_panel',true)
                this.changeState("student_status",false)
                this.changeState("edit_homework",false)

                this.changeState("home_check_id",id);
                break
            case "student_status":
                this.changeState("add_panel",false)
                this.changeState("edit_panel",false)
                this.changeState("view_panel",false)
                this.changeState('home_check_panel',false)
                this.changeState("edit_homework",false)
                this.changeState("student_status",true)
                this.changeState("student_status_id",id)
                break
            case "edit_homework":
                this.changeState("add_panel",false)
                this.changeState("edit_panel",false)
                this.changeState("view_panel",false)
                this.changeState('home_check_panel',false)
                this.changeState("student_status",false)
                this.changeState("edit_homework_panel",true)
                this.changeState("edit_homework_data",id)
                break
        }
    }

    addHomeWork(data,class_id){
        return api.teacher.homework.add(data).then(data => {
            // console.log(data)
        })
    }
    render(){
        const {add_panel,class_id,view_id,view_panel,home_check_panel,home_check_id,student_status_id,student_status,edit_homework_data,edit_homework_panel} = this.state
        return(
            <div>
                <Suspense fallback={<div>Loading…</div>}><TeacherHomePage mainHeader="Teacher" header="HomeWrok" sub_header="Add/Edit/Update/Delete"/></Suspense>
                <div className="container-fluid mt--6">
                    <Suspense fallback={<div>Loading…</div>}> <ViewPanelHomeWork sendEventType={this.sendEventType}  class_id = {this.props.match.params.class_id} sendEventType={this.sendEventType} /></Suspense>
                    
                    {add_panel  && <Suspense fallback={<div>Loading…</div>}>  <AddHomeWork class_id={class_id} submit={this.addHomeWork}/></Suspense>} 
                    
                    {edit_homework_panel && <Suspense fallback={<div>Loading…</div>}><EditHomeWork data={edit_homework_data} /></Suspense>}
                    {view_panel && <Suspense fallback={<div>Loading…</div>}><ViewParticularHomeWork view_id={view_id}/></Suspense> }
                    {/* {home_check_panel && <Suspense fallback={<div>Loading…</div>}><HomeWorkSubmittion homework_id={home_check_id}/></Suspense>} */}
                    {student_status && <Suspense fallback={<div>Loading…</div>}><StudentHomeWorkStatus homework_id={student_status_id}/></Suspense>}
                </div>
            </div>
        )
    }
}

export default ViewHomeWork