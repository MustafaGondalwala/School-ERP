import React,{Component} from "react"
import api from "../../api"
import ViewEditStudentTimeTable from "../form/ViewEditStudentTimeTable"
import Swal from 'sweetalert2'


export default class EditTimeTableStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            timetable:""
        }
        this.submit = this.submit.bind(this)
    }
    componentWillReceiveProps(){
        const {time_table_name} = this.props
        this.setState({
            timetable:""
        })
        api.admin.timetable.getTimetable(time_table_name).then(data => {
            this.setState({
                timetable:data.timetables
            })
        }).catch(error => {
            Swal.fire("Error Occured","Error Occured in Process. Try again Later","error")
        })
    }
    componentDidMount(){
        const {time_table_name} = this.props
        this.setState({
            timetable:""
        })
        api.admin.timetable.getTimetable(time_table_name).then(data => {
            this.setState({
                timetable:data.timetables
            })
        }).catch(error => {
            Swal.fire("Error Occured","Error Occured in Process. Try again Later","error")
        })
    }
    submit(timetable){
        api.admin.timetable.update(timetable).then(data => {
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
                    timetable ? <ViewEditStudentTimeTable submit={this.submit} type="edit" timetable={timetable}/>:<div>Loading ...</div>
                }
            </div>
        )
    }
}