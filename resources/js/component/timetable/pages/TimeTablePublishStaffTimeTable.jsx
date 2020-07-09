import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import AdminHeader from "../header/AdminHeader"
import {getClassDispatch,setClassSection} from "../../actions/classes"
import {setTeachersNameDispatch} from "../../actions/teacher"
import {setTimetableTeacherDispatch} from "../../actions/timetable"

import { connect } from "react-redux";
import api from "../../api"
import Swal from 'sweetalert2'

class TimeTablePublishStaffTimeTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            'publishtimetable':[],
            'button_text':"Update"
        }
    }
    componentDidMount() {
        const {classes,teacher_timetables,teachers_name,setTimetableTeacherDispatch,setTeachersNameDispatch} = this.props
        if(Object.keys(teacher_timetables).length == 0)
            setTimetableTeacherDispatch()
        if(Object.keys(teachers_name).length == 0)
            setTeachersNameDispatch()
    }
    onChange(e,class_id){
        const {value} = e.target
        const {publishtimetable} = this.state
        publishtimetable[class_id] = value
        this.setState({
            publishtimetable
        })
    }
    updateTimeTable(){
        const {publishtimetable} = this.state
        const {setClassSection} = this.props
        if(publishtimetable.length == 0){
            Swal.fire(
                'Validation Error',
                'Please select Atleast TimeTable',
                'warning'
              )
        }else{
            this.setState({
                button_text:"Updating ..."
            })
            api.admin.stafftimetable.publish_timetable(publishtimetable).then(data => {
                this.setState({
                    button_text:"Update"
                })
                Swal.fire(
                    'Data Updated',
                    'TimeTable Updated Successfully ...',
                    'success'
                  )
            })
        }
    }
    render(){
        const {teacher_timetables,teachers_name} = this.props
        const {button_text} = this.state
        return(
            <div>
                <AdminHeader mainHeader="TimeTable" header="Publish Student TimeTable"/>
                <div className="container-fluid mt--6">
                    <CardComponent title="Publish Student TimeTable" back_link="/admin/timetable">
                    {Object.keys(teachers_name).length >0 ? 
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sr. no</th>
                                        <th>Teacher Name</th>
                                        <th>Assigned TimeTable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {teachers_name.map((item,id)=>{
                                            return <tr key={id}>
                                                <td>{id+1}</td>
                                                <td>{item.teacher_name}</td>
                                                <td>
                                                    <select onChange={e => this.onChange(e,item.id)} value={item.time_table_id} className="form-control">
                                                        <option>-- Select --</option>
                                                        {Object.keys(teacher_timetables).length > 0 && Object.keys(teacher_timetables).map((item,id) => {
                                                            return <option key={id} value={ [item].id}>{teacher_timetables[item].time_table_name}</option>
                                                        })}
                                                    </select>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                                {Object.keys(teacher_timetables).length >0 && 
                                    <tfoot>
                                        <tr>
                                            <td><button className="btn btn-primary" onClick={e => this.updateTimeTable()}>{button_text}</button></td>
                                        </tr>
                                    </tfoot>
                                }
                            </table>
                        </div>
                    : <h5>No Class Found</h5>}
                    </CardComponent>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      teacher_timetables:state.teacher_timetables,
      teachers_name:state.teachers_name
    };
  }
  
  export default connect(mapStateToProps,{setTimetableTeacherDispatch,setTeachersNameDispatch})(TimeTablePublishStaffTimeTable);
  