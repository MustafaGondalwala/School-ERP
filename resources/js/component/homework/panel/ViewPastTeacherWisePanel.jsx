import React from "react"

import { connect } from "react-redux";
import {setPastHomeWorksDispatch} from "../../actions/homework"
import { Table, Thead, Button } from "../../utils/Components";



const ViewTeacherWisePanel = ({teacherwise_past_homework,setPastHomeWorksDispatch,type,sendEventType}) => {
    if(Object.keys(teacherwise_past_homework).length == 0)
    setPastHomeWorksDispatch()
    return(
        <Table>
            <Thead>
                <th>Sr no.</th>
                <th>Class/Section</th>
                <th>Title</th>
                <th>View</th>
                {type == "check" && [ <th>Check</th>]}
            </Thead>
            <tbody>
                {Object.keys(teacherwise_past_homework).length > 0 && teacherwise_past_homework.map((item,id) => {
                    return <tr>
                        <td>{id+1}</td>
                        <td>{item.classes.class_title} {item.classes.section}</td>
                        <td>{item.title}</td>
                        <td><Button primary sm onClick={e => sendEventType("view",item)}>View</Button></td>
                    </tr> 
                })}
            </tbody>
        </Table>
    )
}



function mapStateToProps(state) {
    return {
        teacherwise_past_homework:state.teacherwise_past_homework
    };
}

export default connect(mapStateToProps,{setPastHomeWorksDispatch})(ViewTeacherWisePanel);