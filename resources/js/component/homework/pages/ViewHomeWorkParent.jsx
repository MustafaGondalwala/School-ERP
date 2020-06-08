import React,{Component} from "react"
import ParentHeader from "../header/ParentHeader"
import { connect } from "react-redux";
import ViewPanelHomeWorkParent from "../panel/ViewPanelHomeWorkParent"
import ViewParticularHomeWork from "../form/ViewParticularHomeWorkParent"

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
                break
        }
    }
    render(){
        const {student_id} = this.props.match.params
        const {view_id} = this.state
        return(
            <div>
                <ParentHeader mainHeader="Home" header="Homewrok" sub_header="View Current/Past"/>
                <div className="container-fluid mt--6">
                    <ViewPanelHomeWorkParent sendEventType={this.sendEventType} student_id={student_id} />
                    {view_id && <ViewParticularHomeWork view_id={view_id} student_id={student_id} /> }
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