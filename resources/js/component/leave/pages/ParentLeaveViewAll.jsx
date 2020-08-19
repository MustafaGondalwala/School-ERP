import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import {setParentLeavesDispatch} from "../../actions/leave"
import { connect } from "react-redux";
import { Table, Thead, getKey, getLeaveStatus, Button, FormGroup, FormLabel, PreviewAttachmentFile } from "../../utils/Components"
import Row from "../../utils/Row"
import Col from "../../utils/Col"

class ParentLeaveViewAll extends Component{
    constructor(props){
        super(props)
        this.state = {
            viewReason:""
        }
    }
    componentDidMount(){
        const {student_id} = this.props.match.params 
        const {studentleaves} = this.props
        if(studentleaves[student_id] == undefined)
          this.props.setParentLeavesDispatch(student_id)
    }
    view(item){
        this.setState({
            viewReason:item
        })
    }
    render(){
        const {student_id} = this.props.match.params 
        const {studentleaves} = this.props
        const {viewReason} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="Leave" header="View All"/>
                <BodyComponent>
                    <CardComponent title="Student Leave" back_link={"/parent/leave/"+student_id}>
                        {
                            studentleaves[student_id] == undefined ? <h3>Loading ...</h3> : 
                            <Table>
                                <Thead>
                                        <th>Sr no.</th>
                                        <th>Leave Date</th>
                                        <th>Status</th>
                                        <th>Applied At.</th>
                                        <th>View Reason</th>
                                </Thead>
                                <tbody>
                                    {
                                        studentleaves[student_id].map((item,id) => {
                                            return <tr key={getKey()}>
                                                <td>{id+1}</td>
                                                <td>{item.date}</td>
                                                <td>{getLeaveStatus(item.status)}</td>
                                                <td>{item.applied_date.toString()}</td>
                                                <td><Button primary sm onClick={e => this.view(item)}>View</Button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        }
                    </CardComponent>
                
                
                    {viewReason && 
                        <CardComponent title="Leave Status">
                            <Row>
                                <Col md={6} lg={6}>
                                    <FormGroup>
                                        <FormLabel>Date: </FormLabel>
                                        {viewReason.date}
                                    </FormGroup>
                                </Col>
                                <Col md={6} lg={6}>
                                    <FormGroup>
                                        <FormLabel>Reason: </FormLabel>
                                {viewReason.reason}
                                    </FormGroup>
                                </Col>
                                {viewReason.attachment &&
                                    <Col md={6} lg={6}>
                                        <FormGroup>
                                            <FormLabel>Attachment: </FormLabel>
                                            <a download href={viewReason.attachment}>Download</a>
                                        </FormGroup>
                                    </Col>
                                }
                                <Col md={6} lg={6}>
                                        <FormGroup>
                                            <FormLabel>Status: </FormLabel>
                                            {getLeaveStatus(viewReason.status)}
                                        </FormGroup>
                                </Col>
                            </Row>
                        </CardComponent>
                    }
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        studentleaves:state.studentleaves
    };
}

export default connect(mapStateToProps,{setParentLeavesDispatch})(ParentLeaveViewAll);