import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import { connect } from "react-redux";
import ViewEditStudentTimeTable from "../form/ViewEditStudentTimeTable"

import {setTimeTableStudentParentDispatch} from "../../actions/timetable"
class ViewClassWiseTimeTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            timetable:""
        }
    }
    async componentDidMount(){
        const {class_id,classwise_timetable} = this.props
        if(classwise_timetable.hasOwnProperty(class_id)){
            this.setState({
                timetable:classwise_timetable[class_id]
            })
        }else{
            const timetable = await this.props.setTimeTableStudentParentDispatch(class_id)
            this.setState({
                timetable
            })
        }
    }
    async componentWillReceiveProps(){
        const {class_id,classwise_timetable} = this.props
        if(classwise_timetable.hasOwnProperty(class_id)){
            this.setState({
                timetable:classwise_timetable[class_id]
            })
        }else{
            const timetable = await this.props.setTimeTableStudentParentDispatch(class_id)
            this.setState({
                timetable
            })
        }
    }
    render(){
        const {title} = this.props
        const {timetable} = this.state
        return(
            <div>
                {timetable ? <ViewEditStudentTimeTable type="view" timetable={timetable} title={title}/> : <CardComponent>Loading ...</CardComponent>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        classwise_timetable:state.classwise_timetable
    };
}

export default connect(mapStateToProps,{setTimeTableStudentParentDispatch})(ViewClassWiseTimeTable);
