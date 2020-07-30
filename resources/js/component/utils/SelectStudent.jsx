import React,{Component} from "react"
import api from "../api"
import Select from "react-select";
import {setSelectStudentDispatch,setSelectStudent,setSelectStudentClassIDDispatch} from "../actions/select_student"
import { connect } from "react-redux";


class SelectStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            student_list:[],
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {class_id,setSelectStudentDispatch,select_student,setSelectStudentClassIDDispatch} = this.props
        if(class_id != undefined){
            setSelectStudentClassIDDispatch(class_id)
        }else{
            if(Object.keys(select_student).length == 0)
                setSelectStudentDispatch()   
        }
    }
    onChange(data){
        this.props.sendStudentId(data.value);
    }
    render(){   
        const {select_student} = this.props
        return(
            <Select
            options={select_student}
            onChange={this.onChange}
            onInputChange={this.onInputChange}
            isLoading={false}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        select_student:state.select_student
    };
}

export default connect(mapStateToProps,{setSelectStudentDispatch,setSelectStudent,setSelectStudentClassIDDispatch})(SelectStudent);
