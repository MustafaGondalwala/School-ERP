import React, { Component } from "react"
import { render } from "react-dom"
import CardComponent from "../../utils/CardComponent"
import {setTimetableTeacherDispatch} from "../../actions/timetable"
import { connect } from "react-redux";

class ViewPanelStaff extends Component{
    constructor(props){
        super(props)
      this.addClickFunction = this.addClickFunction.bind(this)
    }
    addClickFunction(){
        this.props.sendEventType("add",null)
    }
    componentDidMount(){
        const {teacher_timetables,setTimetableTeacherDispatch} = this.props
        if(Object.keys(teacher_timetables).length == 0)
            setTimetableTeacherDispatch()
    }
    updateTimeTable(time_table_name){
        this.props.sendEventType("edit",time_table_name)
    }
    render(){
        const {teacher_timetables} = this.props
        return(
            <CardComponent title="TimeTable" back_link="/admin/timetable" add_object={{'text':"Add",'clickFunction':this.addClickFunction}}>
            { Object.keys(teacher_timetables).length > 0 && <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sr no.</th>
                                <th>Time Table Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(teacher_timetables).map((item,id) => {
                                return <tr key={id}>
                                <td>{id+1}</td>
                                <td>{teacher_timetables[item].time_table_name}</td>
                                <td  className="table-actions">
                                            <a href="#!" onClick={e => this.updateTimeTable(teacher_timetables[item].time_table_name)} className="table-action" data-toggle="tooltip" data-original-title="Edit TimeTable">
                                                <i className="fas fa-user-edit" />
                                            </a>
                                            <a href="#!" onClick={e => this.removeClass(teacher_timetables[item].time_table_name)} className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete TimeTable">
                                                <i className="fas fa-trash" />
                                            </a>
                                        </td>
                                </tr>
                            }) 
                        }
                        </tbody>
                    </table>
                    
                   </div>
                   }
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        teacher_timetables:state.teacher_timetables
    };
}

export default connect(mapStateToProps,{setTimetableTeacherDispatch})(ViewPanelStaff);