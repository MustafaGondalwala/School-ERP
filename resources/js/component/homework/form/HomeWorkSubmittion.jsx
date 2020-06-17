import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import api from "../../api";
import DataTable, { createTheme } from "react-data-table-component";
import { Table, Thead, Button } from "../../utils/Components";
import Row from "../../utils/Row";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2"
import {
  Col,
  PreviewFiles,
  FormGroup,
  FormLabel,
  PreviewServerFiles,
} from "../../utils/Components";

class HomeWorkSubmittion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homework_submission: "",
      check: "",
    };
    this.updateHomeWorkSubmission = this.updateHomeWorkSubmission.bind(this)
 }
  fetchSubmission(homework_id) {
    api.teacher.homework.get_submission(homework_id).then((data) => {
      const { homework_submission } = data;
      this.setState({
        homework_submission,
      });
    });
  }
  componentDidMount() {
    const { homework_id } = this.props;
    this.fetchSubmission(homework_id);
  }
  componentWillReceiveProps() {
    const { homework_id } = this.props;
    this.fetchSubmission(homework_id);
  }
  viewSubmition(data) {
    this.setState({
      check: data,
    });
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
  updateHomeWorkSubmission(type,student_homework_id){
    return api.teacher.homework.homework_check(type,student_homework_id).then(data => {
        this.setState({
            check:""
        })
    }).catch(error => {
        Swal.fire("Error Occured","Error Occured in Process. Try again Later","error")
    })
  }
  render() {
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
        name: "Check",
        cell: (row) => (
          <div>
            <Button onClick={(e) => this.viewSubmition(row)} primary sm>
              Check
            </Button>
          </div>
        ),
      },
    ];
    const { homework_submission, check } = this.state;
    return (
      <div>
        <CardComponent title="HomeWork Submission">
          <DataTable
            title={null}
            columns={columns}
            data={homework_submission}
          />
        </CardComponent>
        {check && <ViewStudentSubmition updateHomeWorkSubmission={this.updateHomeWorkSubmission} data={check} />}
      </div>
    );
  }
}

class ViewStudentSubmition extends Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this)
    }
    submit(type){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                const { data } = this.props;
                this.props.updateHomeWorkSubmission(type,data.id).then(data => {
                    console.log(data)
                    Swal.fire("Success","Student HomeWork Updated !!","success")
                })
            }
          })
    }
    render() {
    const { data } = this.props;
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
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({
                    description: data,
                  });
                }}
                onInit={(editor) => {
                  editor.setData(description);
                }}
              />
            </FormGroup>
            <FormGroup>
            <PreviewServerFiles files={files}/>
            </FormGroup>
            <FormGroup>
                <Button success onClick={e => this.submit(1)}>Correct</Button>
                <Button danger onClick={e => this.submit(2)}>Reject</Button>
            </FormGroup>
          </Col>
        </Row>
      </CardComponent>
    );
  }
}
export default HomeWorkSubmittion;
