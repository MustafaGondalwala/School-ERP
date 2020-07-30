import React,{Component} from "react"
import { connect } from "react-redux";
import {setStudentCurrentHomeWorkDispatch} from "../../actions/homework"
import ParentHeader from "../header/ParentHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import { Table, Thead, Button } from "../../utils/Components";
import AddEditHomeWork from "../form/AddEditHomeWork";

class StudentParentCurrentHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            view:""
        }
    }
    componentDidMount(){
        const {student_id} = this.props.match.params
        const {studentCurrent_homework} = this.props
        if(studentCurrent_homework[student_id] == undefined)
            this.props.setStudentCurrentHomeWorkDispatch(student_id)
    }
    sendEvent(type,value){
        switch(type){
            case "view":
                this.setState({
                    view:""
                }, () => {
                    this.setState({
                        view:value
                    })
                })
            break
        }
    }
    render(){
        const {student_id} = this.props.match.params
        const {studentCurrent_homework} = this.props
        const {view} = this.state
        return(
            <div>
                <ParentHeader mainHeader="HomeWork" header="Current"/>
                <BodyComponent>
                    <CardComponent title="Current HomeWork">
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Subject</th>
                                <th>Title</th>
                                <th>Teacher Name</th>
                                <th>View Teacher</th>
                                <th>View HomeWork</th>
                            </Thead>
                            <tbody>
                                { studentCurrent_homework[student_id] !== undefined &&
                                    studentCurrent_homework[student_id].map((item,id) => {
                                        return <tr>
                                            <td>{id+1}</td>
                                            <td>{item.subject.subject_name}</td>
                                            <td>{item.title}</td>
                                            <td>{item.teacherwith_staff.teacher_name}</td>
                                            <td><Button primary sm>View</Button></td>
                                            <td><Button primary sm onClick={e => this.sendEvent("view",item)}>View</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </CardComponent>
                    {view && <AddEditHomeWork type="3" data={view}/>}
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        studentCurrent_homework:state.studentCurrent_homework
    };
}

export default connect(mapStateToProps,{setStudentCurrentHomeWorkDispatch})(StudentParentCurrentHomeWork);