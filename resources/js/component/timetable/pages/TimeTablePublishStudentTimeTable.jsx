import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import AdminHeader from "../header/AdminHeader"
import {getClassDispatch,setClassSection} from "../../actions/classes"
import {setTimetableDispatch} from "../../actions/timetable"

import { connect } from "react-redux";
import api from "../../api"
import Swal from 'sweetalert2'

class TimeTablePublishStudentTimeTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            'publishtimetable':[],
            'button_text':"Update"
        }
    }
    componentDidMount() {
        const {getClassDispatch,classes,timetables,setTimetableDispatch} = this.props
        if(Object.keys(classes).length == 0)
            getClassDispatch()
        if(Object.keys(timetables).length == 0)
            setTimetableDispatch()
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
            api.admin.timetable.publish_timetable(publishtimetable).then(data => {
                this.setState({
                    button_text:"Update"
                })
                setClassSection(data.classes);
                Swal.fire(
                    'Data Updated',
                    'TimeTable Updated Successfully ...',
                    'success'
                  )
            })
        }
    }
    render(){
        const {classes,timetables} = this.props
        const {button_text} = this.state
        return(
            <div>
                <AdminHeader mainHeader="TimeTable" header="Publish Student TimeTable"/>
                <div className="container-fluid mt--6">
                    <CardComponent title="Publish Student TimeTable" back_link="/admin/timetable">
                    {Object.keys(classes).length >0 ? 
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sr. no</th>
                                        <th>Class Name</th>
                                        <th>Section</th>
                                        <th>Assigned TimeTable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {classes.map((item,id)=>{
                                            return <tr key={id}>
                                                <td>{id+1}</td>
                                                <td>{item.class_title}</td>
                                                <td>{item.section}</td>
                                                <td>
                                                    <select onChange={e => this.onChange(e,item.id)} defaultValue={item.time_table_id} className="form-control">
                                                        <option>-- Select --</option>
                                                        {Object.keys(timetables).length > 0 && Object.keys(timetables).map((item,id) => {
                                                            return <option key={id} value={timetables[item].id}>{timetables[item].time_table_name}</option>
                                                        })}
                                                    </select>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                                {Object.keys(classes).length >0 && 
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
      classes:state.classes,
      timetables:state.timetables
    };
  }
  
  export default connect(mapStateToProps,{getClassDispatch,setTimetableDispatch,setClassSection})(TimeTablePublishStudentTimeTable);
  