import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"

import {setGradeType,setGradeTypeDispatch} from "../../actions/grade"
import { connect } from "react-redux";
import { getKey, Table, Thead } from "../../utils/Components"

class AdminGradeType extends Component{
    componentDidMount(){
        const {gradeType} = this.props
        if(Object.keys(gradeType).length == 0)
            this.props.setGradeTypeDispatch();
    }
    render(){
        const {gradeType} = this.props
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="Grade Type"/>
                <BodyComponent>
                    <CardComponent title="Grade Type">
                        {Object.keys(gradeType).length != 0 ? <div>
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Percentage</th>
                                <th>Grade</th>
                            </Thead>
                            <tbody>
                            {
                                gradeType.map((item,id) => {
                                    return <tr key={getKey()}>
                                        <td>{id+1}</td>
                                        <td>
                                            {item.percentage}</td>
                                        <td>{item.grade}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </Table>
                        
                        </div> : <h3>Loading ...</h3>}
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gradeType:state.gradeType
    };
}

export default connect(mapStateToProps,{setGradeType,setGradeTypeDispatch})(AdminGradeType);