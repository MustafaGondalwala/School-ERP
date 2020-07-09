import React,{Component} from "react"
import api from "../../api"
import ViewEditStaffTimeTable from "../form/ViewEditStaffTimeTable"
import Swal from 'sweetalert2'


export default class EditTimeTableStaff extends Component{
    constructor(props){
        super(props)
        this.state = {
            timetable:""
        }
        this.submit = this.submit.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }
    fetchData(time_table_name){
        this.setState({
            timetable:""
        })
        api.admin.stafftimetable.getTimetable(time_table_name).then(data => {
            this.setState({
                timetable:data.timetables
            })
        }).catch(error => {
            Swal.fire("Error Occured","Error Occured in Process. Try again Later","error")
        })
    }
    componentWillReceiveProps(){
        const {time_table_name} = this.props
        this.fetchData(time_table_name)
    }
    componentDidMount(){
        const {time_table_name} = this.props
        this.fetchData(time_table_name)
    }
    submit(timetable){
        api.admin.stafftimetable.update(timetable).then(data => {
            this.setState({
                timetable_name:"",
                timetable:""
            })
            Swal.fire("success",data.message,"success")
        }).catch(error => {
            Swal.fire("Error Occured","Error Occured in Process. Try again Later","error")
        })
    }
    render(){
        const {timetable} = this.state
        return(
            <div>
                {
                    timetable ? <ViewEditStaffTimeTable submit={this.submit} type="edit" timetable={timetable}/>:<div>Loading ...</div>
                }
            </div>
        )
    }
}