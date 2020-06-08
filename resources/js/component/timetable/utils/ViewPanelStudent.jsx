import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"


import { connect } from "react-redux";
import {setTimetableDispatch} from "../../actions/timetable"

class ViewPanelStudent extends Component{
    constructor(props){
        super(props)
      this.addClickFunction = this.addClickFunction.bind(this)
    }
    addClickFunction(){
        this.props.sendEventType("add",null)
    }
    componentDidMount(){
        const {timetables,setTimetableDispatch} = this.props
        if(Object.keys(timetables).length == 0)
            setTimetableDispatch()
    }
    updateTimeTable(time_table_name){
        this.props.sendEventType("edit",time_table_name)
    }
    render(){
        const {timetables} = this.props
        return(
            <div>
                <CardComponent title="TimeTable" back_link="/admin/timetable" add_object={{'text':"Add",'clickFunction':this.addClickFunction}}>
                   { Object.keys(timetables).length > 0 && <div className="table-responsive">
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
                            Object.keys(timetables).map((item,id) => {
                                return <tr key={id}>
                                <td>{id+1}</td>
                                <td>{timetables[item].time_table_name}</td>
                                <td  className="table-actions">
                                            <a href="#!" onClick={e => this.updateTimeTable(timetables[item].time_table_name)} className="table-action" data-toggle="tooltip" data-original-title="Edit TimeTable">
                                                <i className="fas fa-user-edit" />
                                            </a>
                                            <a href="#!" onClick={e => this.removeClass(timetables[item].time_table_name)} className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete TimeTable">
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        timetables:state.timetables
    };
}

export default connect(mapStateToProps,{setTimetableDispatch})(ViewPanelStudent);