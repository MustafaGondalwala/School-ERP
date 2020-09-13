import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { getExamTypeDispatch,getExamType } from "../../actions/exam";
import { connect } from "react-redux";
import { Table, Thead, Button } from "../../utils/Components";
import api from "../../api";
import Swal from "sweetalert2"

class TeacherExamMarksheetPublish extends Component{
    async componentDidMount() {
        const { examType } = this.props;
        if (Object.keys(examType).length == 0) this.props.getExamTypeDispatch();
    }
    changeStatus(status,exam_id){
        const {class_id} = this.props.match.params
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update Status!'
          }).then((result) => {
            if (result.value) {
                api.adminteacher.exam.marksheet.changePublisStatus(status,exam_id)
                .then(data => {
                    this.props.getExamType(data.exam_types)
                    Swal.fire("Success","Data Updated!!","success")
                })
            }
          })

        
    }
    render(){
        const {class_id} = this.props.match.params
        const {examType} = this.props
        return(
            <div>
            <EmptyHeader mainHeader="Exam" header="Publish/Unpublish"/>
            <BodyComponent>
                <CardComponent title="Publish/Unplish" back_link={"/teacher/exam/class/"+class_id}>
                    <Table>
                        <Thead>
                            <td>Sr no.</td>
                            <td>Exam Name</td>
                            <td>Status</td>
                            <td>Created At</td>
                        </Thead>
                        <tbody>
                        {
                            Object.keys(examType).length > 0 && 
                            examType.map((item,id) => {
                                return <tr>
                                    <td>{id+1}</td>
                                    <td>{item.exam_type}</td>
                                    <td>
                                        {item.publish == 0 ?  <Button onClick={e => this.changeStatus(1,item.id)} primary sm >Publish</Button> : <Button onClick={e => this.changeStatus(0,item.id)} danger sm>Unpublish</Button>}
                                    </td>
                                    <td>
                                        {item.publish_at != null && <span>{item.publish_at}</span>}
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>

                </CardComponent>
            </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      examType: state.examType,
    };
  }
  
  export default connect(mapStateToProps, { getExamType,getExamTypeDispatch })(
    TeacherExamMarksheetPublish
  );