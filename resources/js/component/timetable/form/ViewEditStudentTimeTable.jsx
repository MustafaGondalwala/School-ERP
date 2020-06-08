import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";

import {setSubjectDispatch, setSubjects} from "../../actions/subjects"
import {setTeacherDispatch} from "../../actions/teacher"
import { connect } from "react-redux";

class ViewEditStudentTimeTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            timetable:"",
            title:""
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {subjects,setSubjectDispatch,timetable,setTeacherDispatch,teachers,type} = this.props
        
        if(Object.keys(teachers).length == 0){
            setTeacherDispatch()
        }

        if(Object.keys(subjects).length == 0){
            setSubjectDispatch()
        }
        this.setState({
            timetable
        })
        var title = ""
        switch(type){
            case "add":
                title="Add TimeTable"
                break
            case "edit":
                title = "Edit TimeTable"
                break
            case "view":
                title = "View TimeTable"
                break
        }
        this.setState({
            title
        })
    }
    onChange(e,label){
        const {timetable} = this.state
        const tempstate = timetable
        tempstate[label][e.target.name] = e.target.value
        this.setState({
            timetable:tempstate
        })
    }
    render(){
        const { type,subjects,teachers} = this.props
        const {timetable,title} = this.state
        return(
            <CardComponent title={title}>
            {timetable &&
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th scope="row" colSpan="2">
                        <center>Monday</center>
                      </th>
                      <th scope="row" colSpan="2">
                        <center>Tuesday</center>
                      </th>
                      <th colSpan="2" scope="row">
                        <center>Wednesday</center>
                      </th>
                      <th colSpan="2" scope="row">
                        <center>Thursday</center>
                      </th>
                      <th colSpan="2" scope="row">
                        <center>Friday</center>
                      </th>
                      <th colSpan="2" scope="row">
                        <center>Saturday</center>
                      </th>
                    </tr>
                    <tr>
                      <th scope="row">Period Name</th>
                      <th scope="row">Time From</th>
                      <th scope="row">Time To</th>
                      <th scope="row">Subject Name </th>
                      <th scope="row">Teacher Name </th>
                      <th scope="row">Subject Name </th>
                      <th scope="row">Teacher Name </th>
                      <th scope="row">Teacher Name </th>
                      <th scope="row">Subject Name </th>
                      <th scope="row">Teacher Name </th>
                      <th scope="row">Subject Name </th>
                      <th scope="row">Teacher Name </th>
                      <th scope="row">Subject Name </th>
                      <th scope="row">Teacher Name </th>
                      <th scope="row">Subject Name </th>
                    </tr>
                  </thead>
                  <tbody>
                      { Object.keys(timetable).map((item,key) => {
                          return <EachView type={type} teachers={teachers} changeFunc={this.onChange} row={timetable[item]} subjects={subjects} key={key} label={item} />
                        })}
                  </tbody>
                  <tfoot>
                  <tr>
                      <td>
                        {type == "add" && <button className="btn btn-primary" onClick={e => this.props.submit(timetable)}>Add</button>}
                        {type == "edit" && <button className="btn btn-primary" onClick={e => this.props.submit(timetable)}>Edit</button>}
                        
                      </td>
                  </tr>
                  </tfoot>
                </table>
              </div>
               }
            </CardComponent>
          
        )
    }
}

function mapStateToProps(state) {
    return {
        subjects:state.subjects,
        teachers:state.teachers
    };
}

export default connect(mapStateToProps,{setSubjectDispatch,setTeacherDispatch})(ViewEditStudentTimeTable);




const EachView = ({type,row,label,key,subjects,changeFunc,teachers}) => {
    function tConvert(time){
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        let part = hour > 12 ? 'pm' : 'am';        
        min = (min+'').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour+'').length == 1 ? `0${hour}` : hour;
        return (`${hour}:${min} ${part}`)
    }
    var disabled = ""
    if(type == "view"){
        disabled = "disabled"
    }
    return(
        <tr key={key}>
            <td>
                {label}
            </td>
            <td>
                {tConvert(row.start_time)}
            </td>
            <td>
                {tConvert(row.end_time)}
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled} name="monday_subject_name"  className="form-control" value={row.monday_subject_name}>
                    <option value="-1">---</option>
                    {Object.keys(subjects).length > 0 && subjects.map((item,key) => {
                        return <option key={key} value={item.id}>{item.subject_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}   name="monday_teacher_name"  className="form-control" value={row.monday_teacher_name}>
                    <option value="-1">---</option>
                    {Object.keys(teachers).length > 0 && teachers.map((item,key) => {
                        return <option key={key} value={item.id}>{item.teacher_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}  name="tuesday_subject_name" className="form-control" value={row.tuesday_subject_name}>
                    <option value="-1">---</option>
                    {Object.keys(subjects).length > 0 && subjects.map((item,key) => {
                        return <option key={key} value={item.id}>{item.subject_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}   name="tuesday_teacher_name"  className="form-control" value={row.tuesday_teacher_name}>
                    <option value="-1">---</option>
                    {Object.keys(teachers).length > 0 && teachers.map((item,key) => {
                        return <option key={key} value={item.id}>{item.teacher_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}  name="wednesday_subject_name" className="form-control" value={row.wednesday_subject_name}>
                    <option value="-1">---</option>
                    {Object.keys(subjects).length > 0 && subjects.map((item,key) => {
                        return <option key={key} value={item.id}>{item.subject_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}   name="wednesday_teacher_name"  className="form-control" value={row.wednesday_teacher_name}>
                    <option value="-1">---</option>
                    {Object.keys(teachers).length > 0 && teachers.map((item,key) => {
                        return <option key={key} value={item.id}>{item.teacher_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}  name="thursday_subject_name" className="form-control" value={row.thursday_subject_name}>
                    <option value="-1">---</option>
                    {Object.keys(subjects).length > 0 && subjects.map((item,key) => {
                        return <option key={key} value={item.id}>{item.subject_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}   name="thursday_teacher_name"  className="form-control" value={row.thursday_teacher_name}>
                    <option value="-1">---</option>
                    {Object.keys(teachers).length > 0 && teachers.map((item,key) => {
                        return <option key={key} value={item.id}>{item.teacher_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}  name="friday_subject_name" className="form-control" value={row.friday_subject_name}>
                    <option value="-1">---</option>
                    {Object.keys(subjects).length > 0 && subjects.map((item,key) => {
                        return <option key={key} value={item.id}>{item.subject_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}   name="friday_teacher_name"  className="form-control" value={row.friday_teacher_name}>
                    <option value="-1">---</option>
                    {Object.keys(teachers).length > 0 && teachers.map((item,key) => {
                        return <option key={key} value={item.id}>{item.teacher_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}  name="saturday_subject_name" className="form-control" value={row.saturday_subject_name}>
                    <option value="-1">---</option>
                    {Object.keys(subjects).length > 0 && subjects.map((item,key) => {
                        return <option key={key} value={item.id}>{item.subject_name}</option>
                    })}
                </select>
            </td>
            <td>
                <select onChange={e => changeFunc(e,label)} disabled={disabled}   name="saturday_teacher_name"  className="form-control" value={row.saturday_teacher_name}>
                    <option value="-1">---</option>
                    {Object.keys(teachers).length > 0 && teachers.map((item,key) => {
                        return <option key={key} value={item.id}>{item.teacher_name}</option>
                    })}
                </select>
            </td>
        </tr>
    )
}



