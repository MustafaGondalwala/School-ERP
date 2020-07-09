import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import {setTimetable} from "../../actions/timetable"
import { connect } from "react-redux";
import Swal from 'sweetalert2'

import ViewEditStaffTimeTable from "../form/ViewEditStaffTimeTable"

class AddTimeTableStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            fetch_button:"Fetch",
            timetable_name:"",
            timetable:"",
            errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.fetchForm = this.fetchForm.bind(this)
        this.submit = this.submit.bind(this)
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    validate(data){
        const errors = {};
        if (!data.timetable_name) errors.timetable_name = "Can't be blank";
          return errors;
    }
    async fetchForm(){
        const errors = this.validate(this.state);
        this.setState({ errors });
        if(Object.keys(errors).length == 0){
            this.setState({
                fetch_button:"Fetching TimeTable ...",
            })
            const {timetable_name} = this.state
            await api.admin.stafftimetable.add(timetable_name).then(data => {
                // this.props.setTimetable(data.new_timetable_names);
                this.setState({
                    timetable:data.timetable,
                    fetch_button:"Fetch",
                })
            }).catch(error => {
                console.log(error)
                if(error.response){
                    if(error.response.status == 400){
                        this.setState({
                            fetch_button:"Fetch",
                        })
                        Swal.fire("Validation Error",error.response.data.error.message,"warning");
                    }
                }
            })
        }
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
        const {fetch_button,errors,timetable} = this.state
        return(
            <div>
            <CardComponent title="Add TimeTable">
                <div className="row">
                    <div className="form-group col-md-4">
                        <label className="form-control-label">TimeTable Name</label>
                        <input type="text" name="timetable_name" placeholder="Time Table Name" value={this.state.timetable_name} onChange={e => this.onChange(e)} className="form-control" />
                        {errors.timetable_name && <InlineError text={errors.timetable_name}/>}
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={e => this.fetchForm()}>{fetch_button}</button>
                </div>
            </CardComponent>
                {
                    timetable && <ViewEditStaffTimeTable submit={this.submit} type="add" timetable={timetable}/>
                }
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        timetables:state.timetables
    };
}

export default connect(mapStateToProps,{setTimetable})(AddTimeTableStudent);