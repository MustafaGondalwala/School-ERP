import React,{Component} from "react"
import { connect } from "react-redux";
import {setStudentPastHomeWorkDispatch,setStudentPastHomeWork} from "../../actions/homework"
import ParentHeader from "../header/ParentHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import { Table, Thead, Button,homeWorkStatus, RedLabel } from "../../utils/Components";
import AddEditHomeWork from "../form/AddEditHomeWork";
import HomeWorkSubmittion from "../form/HomeWorkSubmittion";
import api from "../../api";
import EmptyHeader from "../../utils/EmptyHeader";
import Swal from "sweetalert2"
class StudentParentPastHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            view:"",
            submittion:""
        }
        this.submitHomeWork = this.submitHomeWork.bind(this)
    }
    componentDidMount(){
        const {student_id} = this.props.match.params
        const {studentPast_homework} = this.props
        if(studentPast_homework[student_id] == undefined)
            this.props.setStudentPastHomeWorkDispatch(student_id)
    }
    submitHomeWork(data){
        const {homework_id,student_id} = this.state.submittion.homeworkcheck
        data.class_id = this.state.submittion.class_id
        data.homework_id = homework_id;
        data.student_id = student_id
        let formData = new FormData(); 
        Object.keys(data).map(item => {
            formData.append(item,data[item])
        })
        data.attachments.map((file, id) => {
            formData.append(`attachments[${id}]`, file);
        });
        api.parentstudent.homework.submit(formData).then(data => {
            const {current_homework} = data
            Swal.fire("HomeWork Submitted","HomeWork have sended to System","success")
            this.props.setStudentCurrentHomeWork(student_id,current_homework)
            this.setState({
                submittion:"",
                view:"",
                view_submittion:""
            })
        })
    }
    sendEvent(type,value){
        switch(type){
            case "view":
                this.setState({
                    view:"",
                    view_submittion:"",
                    submittion:""
                }, () => {
                    this.setState({
                        view:value
                    })
                })
            break
            case "submit":
                this.setState({
                    view:"",
                    view_submittion:"",
                    submittion:""
                }, () => {
                    this.setState({
                        submittion:value
                    })
                })
                break
            case "view_submittion":
                this.setState({
                    view:"",
                    view_submittion:"",
                    submittion:""
                }, () => {
                    this.setState({
                        view_submittion:value
                    })
                })
                break
        }
    }
    render(){
        const {student_id} = this.props.match.params
        const {studentPast_homework} = this.props
        const {view,submittion,view_submittion} = this.state
        var user_type = "student"
        if(localStorage.getItem('user_type') == 3)
            user_type = "parent"
        return(
            <div>
                <EmptyHeader mainHeader="HomeWork" header="Past"/>
                <BodyComponent>
                    <CardComponent title="Past HomeWork" back_link={`/${user_type}/homework/${student_id}`}>
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Subject</th>
                                <th>Title</th>
                                <th>Teacher Name</th>
                                <th>View Teacher</th>
                                <th>View HomeWork</th>
                                <th>Status</th>
                                <th>View HomeWork</th>
                            </Thead>
                            <tbody>
                                { studentPast_homework[student_id] !== undefined &&
                                    studentPast_homework[student_id].map((item,id) => {
                                        const {status} = item.homeworkcheck
                                        return <tr>
                                            <td>{id+1}</td>
                                            <td>{item.subject.subject_name}</td>
                                            <td>{item.title}</td>
                                            <td>{item.teacherwith_staff.teacher_name}</td>
                                            <td><Button primary sm>View</Button></td>
                                            <td><Button primary sm onClick={e => this.sendEvent("view",item)}>View</Button></td>
                                            <th>
                                                {homeWorkStatus(status)}
                                            </th>
                                            {
                                                status == 2 || status == 4 || status == 6 
                                            ?
                                                <td><Button primary sm onClick={e => this.sendEvent("view_submittion",item)}>View Submittion</Button></td>
                                            :
                                                <td></td>
                                            }
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </CardComponent>
                    {view && <AddEditHomeWork type="3" data={view}/>}
                    {submittion && <HomeWorkSubmittion disabled={false} submit={this.submitHomeWork}/> }
                    {view_submittion && <HomeWorkSubmittion data={view_submittion.homeworkcheck} disabled={true} />}
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        studentPast_homework:state.studentPast_homework
    };
}

export default connect(mapStateToProps,{setStudentPastHomeWorkDispatch,setStudentPastHomeWork})(StudentParentPastHomeWork);