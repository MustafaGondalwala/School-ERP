import React,{Component,Suspense} from "react"
import ParentHeader from "../header/ParentHeader"
import { connect } from "react-redux";
const ViewPanelHomeWorkParent = React.lazy(() => import('../panel/ViewPanelHomeWorkParent'));
const ViewParticularHomeWork = React.lazy(() => import('../form/ViewParticularHomeWorkParent'));
const SubmitHomeWork = React.lazy(() => import('../form/SubmitHomeWork'));


class ViewHomeWorkParent extends Component{
    constructor(props){
        super(props)
        this.state = {
            student_data:"",
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
    sendEventType(type,id){
        switch(type){
            case "view":
                this.changeState("view_id",id);
                this.changeState("submit_id","");
                break
            case "submit":
                this.changeState("view_id","");
                this.changeState("submit_id",id);
                break
            case "hide":
                this.changeState("view_id","");
                this.changeState("submit_id","");
                break
        }
    }
    render(){
        const {student_id} = this.props.match.params
        const {view_id,submit_id} = this.state
        return(
            <div>
                <ParentHeader mainHeader="Home" header="Homewrok" sub_header="View Current/Past"/>
                <div className="container-fluid mt--6">
                    <Suspense fallback={<div>Loading…</div>}>
                        <ViewPanelHomeWorkParent sendEventType={this.sendEventType} student_id={student_id} />
                    </Suspense>
                    {view_id && <Suspense fallback={<div>Loading…</div>}><ViewParticularHomeWork view_id={view_id} student_id={student_id} /></Suspense> }
                    {submit_id && <Suspense fallback={<div>Loading…</div>}><SubmitHomeWork sendEventType={this.sendEventType} homework_id={submit_id} student_id={student_id}/></Suspense>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        parent_childs:state.parent_childs
    };
}

export default connect(mapStateToProps)(ViewHomeWorkParent);