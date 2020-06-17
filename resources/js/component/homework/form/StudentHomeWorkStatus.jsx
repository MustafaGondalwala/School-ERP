import React from "react"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import DataTable, { createTheme } from "react-data-table-component";
import {
    Col,
    PreviewFiles,
    FormGroup,
    FormLabel,
    Button,
    PreviewServerFiles,
  } from "../../utils/Components";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Row from "../../utils/Row";

class StudentHomeWork extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            student_status:"",
            check:""
        }
    }
    fetchData(homework_id){
        this.setState({
            student_status:""
        })
        api.teacher.homework.get_student_status(homework_id).then(data => {
            const {student_status} = data
            this.setState({
                student_status
            })
        })
    }
    componentDidMount(){
        const {homework_id} = this.props
        this.fetchData(homework_id)
    }
    componentWillReceiveProps(){
        const {homework_id} =   this.props
        this.fetchData(homework_id)
    }
    fetchStatus(status){
        switch(status){
          case 1:
            return "Pending";
          case 2:
            return "Completed";
          case 3:
            return "Issue Raised";
          case 4:
            return "Submitted";
          case 5:
            return "Rejected";
        }
      }
      viewSubmition(data) {
        this.setState({
          check: data,
        });
    }
    render(){
        const {student_status,check} = this.state
        const columns = [
            {
              name: "Sr no.",
              selector: "id",
              sortable: true,
            },
            {
              name: "Student Roll No",
              sortable: true,
              cell: (row) => <div>{row.student.roll_no}</div>,
            },
            {
              name: "Student Name",
              sortable: true,
              right: true,
              cell: (row) => <div>{row.student.student_name}</div>,
            },
            {
              name: "Status",
              sortable: true,
              right: true,
              cell: (row) => <div>{this.fetchStatus(row.status)}</div>,
            },
            {
              name: "View Submission",
              cell: (row) => (
                <div>
                {(row.status == 2 || row.status == 4) && 
                  <Button onClick={(e) => this.viewSubmition(row)}   primary sm>
                    Check
                  </Button>
                }
                </div>
              ),
            },
          ];
        return(
            <div>
            <CardComponent title="HomeWork Student Status">
                {student_status ? <div>
                    <DataTable
                    title={null}
                    columns={columns}
                    data={student_status}
                />
                </div> : <h2>Loading ...</h2>}
            </CardComponent>
            {check && <ViewStudentSubmition updateHomeWorkSubmission={this.updateHomeWorkSubmission} data={check} />}
            </div>
        )
    }
}
const ViewStudentSubmition = (props) =>{
    const { data } = props;
    const title = "Submission: " + data.student.student_name;
    const {description,files} = data
    return (
      <CardComponent title={title}>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <CKEditor
                disabled
                editor={ClassicEditor}
                data={description}
                onInit={(editor) => {
                  editor.setData(description);
                }}
              />
            </FormGroup>
            <FormGroup>
            <PreviewServerFiles files={files}/>
            </FormGroup>
          </Col>
        </Row>
      </CardComponent>
    );
}

export default StudentHomeWork