import React,{Component} from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import AddEditHomeWork from "../form/AddEditHomeWork"
import api from "../../api"
import { connect } from "react-redux";
import {setTeacherHomeWork} from "../../actions/homework"
import Swal from "sweetalert2"

class TeacherHomeWorkAdd extends Component{
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this)
    }
    submit(data){
        return api.adminteacher.homework.add(data).then(data => {
            this.props.setTeacherHomeWork(data.teacher_homework)
            Swal.fire("Data Added",data.message,"success")
        })
    }
    render(){
        return(
            <div>
                <EmptyHeader mainHeader="Add HomeWork" header="Add"/>
                <BodyComponent>
                    <AddEditHomeWork submit={this.submit} type={1} back_link="/teacher/homework"/>
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        teacherwise_homework:state.teacherwise_homework
    };
}

export default connect(mapStateToProps,{setTeacherHomeWork})(TeacherHomeWorkAdd);