import React, { Component } from "react"

import {setTeacherwiseHomeWorkDispatch} from "../../actions/homework"
import { connect } from "react-redux";

class ViewTeacherWisePanelCheck extends Component{
    componentDidMount(){
        const {teacherwise_homework,setTeacherwiseHomeWorkDispatch} = this.props
        console.log(teacherwise_homework)
        if(Object.keys(teacherwise_homework).length == 0)
            setTeacherwiseHomeWorkDispatch()
    }
    render(){
        return(
            <Table>
            <Thead>
                <th>Sr no.</th>
                <th>Class/Section</th>
                <th>Title</th>
                <th>View</th>
                {type == "editdelete" && [ <th>Edit</th>,<th>Delete</th>]}
                {type == "check" && [ <th>Check</th>]}
            </Thead>
            <tbody>
                {Object.keys(teacherwise_homework).length > 0 && teacherwise_homework.map((item,id) => {
                    return <tr>
                        <td>{id+1}</td>
                        <td>{item.classes.class_title} {item.classes.section}</td>
                        <td>{item.title}</td>
                        <td><Button primary sm onClick={e => sendEventType("view",item)}>View</Button></td>
                        {type == "editdelete" && [<td><Button warning sm onClick={e => sendEventType("edit",item) }>Edit</Button></td>,<td><Button onClick={e => sendEventType("delete",item) } danger sm>Delete</Button></td>]}
                    </tr> 
                })}
            </tbody>
        </Table>
        )
    }
}

function mapStateToProps(state) {
    return {
        teacherwise_homework:state.teacherwise_homework
    };
}

export default connect(mapStateToProps,{setTeacherwiseHomeWorkDispatch})(ViewTeacherWisePanelCheck);