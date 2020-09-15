import React, { Component, Suspense } from "react"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import StudyMatrialTeacherHeader from "../header/StudyMatrialTeacherHeader"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import ColComponent from "../../utils/ColComponent";

import {setGroupDispatch} from "../../actions/study_material"
import { connect } from "react-redux";


const ViewEditLessions = React.lazy(() => import("../form/ViewEditLessions")) 

import { Input, FormGroup, FormLabel, Button,Table, Thead } from "../../utils/Components"


class StudyMaterialHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            show_lession_id:""
        }
        this.showLessions = this.showLessions.bind(this)
    }
    componentWillReceiveProps(){
        this.setState({
            show_lessions:""
        })
    }
    showLessions(show_lession_id){
        this.setState({
            show_lession_id:"",
        }, () => {
            this.setState({
                show_lession_id
            })
        })  
    }

    render(){
        const {class_id} = this.props.match.params
        const {setGroupDispatch,groups} = this.props
        if(groups[class_id] == undefined)
            setGroupDispatch(class_id)
        const {show_lession_id} = this.state
        return(
            <div>
                <TopBreadCrumb  mainHeader="Student Matrial" header="Home">
                </TopBreadCrumb>
                <BodyComponent>
                        <CardComponent title="Chapter List">
                            <Table>
                                <Thead>
                                        <td>Sr no.</td>
                                        <td>Class</td>
                                        <td>Section</td>
                                        <td>Subject</td>
                                        <td>Chapter Name</td>
                                        <td>View Lessions</td>
                                </Thead>
                                <tbody>
                                {groups[class_id] && groups[class_id].map((item,id) => {
                                    return <tr key={id}>
                                            <td>{id+1}</td>
                                            <td>{item.class.class_title}</td>
                                            <td>{item.class.section}</td>
                                            <td>{item.subject.subject_name}</td>
                                            <td>{item.group_name}</td>
                                            <td><Button primary onClick={e => this.showLessions(item.id)} sm>View Lession</Button></td>
                                        </tr>
                                })}
                                </tbody>
                            </Table>
                        </CardComponent>
                        {show_lession_id && 
                            <Suspense fallback={<h1>Loading Component ... </h1>}>
                                <ViewEditLessions class_id={class_id} type={2} show_type={2} show_lession_id={show_lession_id}/>
                            </Suspense>
                        }
                    </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups:state.studyMaterialGroup
    };
}

export default connect(mapStateToProps,{setGroupDispatch})(StudyMaterialHome);