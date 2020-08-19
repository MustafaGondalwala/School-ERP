import React, { Component } from "react"
import {setTeacherwiseHomeWorkDispatch} from "../../actions/homework"
import { connect } from "react-redux";
import api from "../../api";
import CardComponent from "../../utils/CardComponent";
import EmptyHeader from "../../utils/EmptyHeader";
import BodyComponent from "../../utils/BodyComponent";
import { Table, Thead, Button } from "../../utils/Components";
import AddEditHomeWork from "../form/AddEditHomeWork";
import StudentHomeWorkView from "../form/StudentHomeWorkView";

export default class TeacherClassCurrentHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            homework_classwise:"",
            view:""
        }
    }
    componentDidMount(){
        const {class_id} = this.props.match.params
        api.adminteacher.homework.classwise.current(class_id).then(data => {
           const {homework_classwise} = data
           this.setState({
               homework_classwise
           })
        })
    }
    sendEvent(type,row){
        switch(type){
            case "view_homework":
                this.setState({
                    view:"",
                    check:""
                },() => {
                    this.setState({
                        view:row
                    })
                })
            break;
            case "check":
                this.setState({
                    view:"",
                    check:""
                },() => {
                    this.setState({
                        check:row
                    })
                })
            break;
        }
    }
    render(){
        const {class_id} = this.props.match.params
        const {homework_classwise,check,view} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="HomeWork"  header="Current Home Work"/>
                <BodyComponent>
                    <CardComponent title="Current Home Work" back_link={"/teacher/homework/class/"+class_id}>
                        {homework_classwise ?
                            <Table>
                                <Thead>
                                    <th>Sr no.</th>
                                    <th>Subject</th>
                                    <th>Teacher Name</th>
                                    <th>Submission Date</th>
                                    <th>View HomeWork</th>
                                    <th>Student HomeWork</th>
                                </Thead>
                                <tbody>
                                    {
                                        homework_classwise.map((item,id) => {
                                            return <tr>
                                                <td>{id+1}</td>
                                                <td>{item.subject.subject_name}</td>
                                                <td>{item.teacher.teacher_name}</td>
                                                <td>{item.submission_date}</td>
                                                <td><Button primary sm onClick={e => this.sendEvent("view_homework",item)}>View</Button></td>
                                                <td><Button primary sm onClick={e => this.sendEvent("check",item)}>View</Button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        : <h2>Loading ...</h2>
                        }
                    </CardComponent>
                    {view && <AddEditHomeWork data={view} type="3"/>}
                    {check && <StudentHomeWorkView view_type="1" data={check}/>}
                </BodyComponent>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         feeType:state.feeType
//     };
// }

// export default connect(mapStateToProps,{setTeacherwiseHomeWorkDispatch})(TeacherClassCurrentHomeWork);