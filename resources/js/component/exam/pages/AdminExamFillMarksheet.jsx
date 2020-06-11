import React, { Component } from "react";
import AdminHeader from "../header/AdminHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import GetClassId from "../../utils/GetClassId";
import { connect } from "react-redux";
import { getExamTypeDispatch } from "../../actions/exam";
import MutipleSelectSubject from "../../utils/MultipleSelectSubject";
import YearSelectComponent from "../../utils/YearSelectComponent";
import InlineError from "../../utils/InlineError";
import FillExamMarksheet from "../form/FillExamMarksheet"


import api from "../../api";
import Swal from "sweetalert2";

class AdminExamFillMarksheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        class_id: "",
        exam_type: "",
        subjects: "",
        year: "",
      },
      button_text: "Fetch Students",
      students: "",
      fill_marksheet_view:false,
      exam_marksheet:"",
      class_info:"",
      student_info:"",
      errors: {},
    };
    this.setStateData = this.setStateData.bind(this);
    this.sendClassId = this.sendClassId.bind(this);
    this.sendSubjects = this.sendSubjects.bind(this);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchMarksheet = this.fetchMarksheet.bind(this)
    this.updateStudentMarksheet = this.updateStudentMarksheet.bind(this)
  }
  async componentDidMount() {
    const { examType } = this.props;
    if (Object.keys(examType).length == 0) this.props.getExamTypeDispatch();
  }
  async setStateData(name, value) {
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  async sendClassId(class_id) {
    this.setStateData("class_id", class_id);
  }
  async sendSubjects(subjects) {
    this.setStateData("subjects", subjects);
  }
  async onChange(e) {
    this.setStateData(e.target.name, e.target.value);
  }
  validate(data) {
    const errors = {};
    if (!data.class_id) errors.class_id = "Can't be blank";
    if (!data.exam_type) errors.exam_type = "Can't be blank";
    if (!data.subjects) errors.subjects = "Can't be blank";
    return errors;
  }
  submit() {
    const errors = this.validate(this.state.data);
    const { data } = this.state;
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      this.setState({
        class_hallticket: "",
        button_text: "Fetchinging Students ...",
        exam_marksheet:"",
        fill_marksheet_view:false,
        students:"",
      });

      api.admin.exam.marksheet
        .classwise(data)
        .then((data) => {
          const { students } = data;
          this.setState({
            students,
            button_text: "Fetch Students",
          });
        })
        .catch((error) => {
          this.setState({
            button_text: "Fetch Students",
          });
          Swal.fire(
            "Error Occured",
            "Error Occured in Process.Please Try Later ...",
            "error"
          );
        });
    }
  }
  fetchMarksheet(student_id){
    const { data } = this.state;
    data.student_id = student_id
    this.setState({
      exam_marksheet:"",
      fill_marksheet_view:false
    })
    api.admin.exam.marksheet.student(data,student_id).then((data) => {
        const {student_info,class_info,exam_marksheet} = data
        this.setState({
          student_info,class_info,exam_marksheet,fill_marksheet_view:true
        });
    })
    .catch((error) => {
      this.setState({
        button_text: "Fetch Students",
      });
      Swal.fire(
        "Error Occured",
        "Error Occured in Process.Please Try Later ...",
        "error"
      );
    });
  }
  updateStudentMarksheet(exam_marksheet){
    api.admin.exam.marksheet.update(exam_marksheet).then(data => {
      this.setState({
        exam_marksheet:"",
      })
      this.setState({
        exam_marksheet:data.exam_marksheet,
        fill_marksheet_view:true
      })
    }).catch(error => {
      Swal.fire("Error Ocurred","Error Occured in Process, Please try again Later","error")
    })
  }
  render() {
    const { examType } = this.props;
    const { data, button_text, errors, students,fill_marksheet_view } = this.state;
    const {student_info,class_info,exam_marksheet} = this.state

    return (
      <div>
        <AdminHeader
          mainHeader="Exam"
          header="Hall Ticket"
          sub_header="Class/Section Wise"
        />
        <BodyComponent>
          <CardComponent title="Select Class" back_link="/admin/exam">
            <GetClassId sendClassId={this.sendClassId} errors={errors} />
            <div className="row">
              <div className="col-md-4">
                <label className="form-control-label">Exam Type</label>
                <select
                  onChange={(e) => this.onChange(e)}
                  name="exam_type"
                  className="form-control"
                >
                  <option value="">-- Select --</option>
                  {Object.keys(examType).length > 0 &&
                    examType.map((item, id) => {
                      return <option value={item.id}>{item.exam_type}</option>;
                    })}
                </select>
                {errors.exam_type && <InlineError text={errors.exam_type} />}
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-control-label">Subject</label>
                  <MutipleSelectSubject sendSubjects={this.sendSubjects} />
                  {errors.subjects && <InlineError text={errors.subjects} />}
                </div>
              </div>
              <div className="col-md-4">
                <YearSelectComponent
                  value={data.year}
                  label="Select Year"
                  name="year"
                  onChange={this.onChange}
                  errors=""
                />
              </div>
            </div>
            <div className="row">
              <button
                onClick={(e) => this.submit()}
                className="btn btn-primary"
              >
                {button_text}
              </button>
            </div>
          </CardComponent>

          {(students && !fill_marksheet_view) && <ViewStudentTable sendStudentId={this.fetchMarksheet} students={students} />}
          {fill_marksheet_view && <FillExamMarksheet updateStudentMarksheet={this.updateStudentMarksheet} type="fill" student_info={student_info} class_info={class_info} exam_marksheet={exam_marksheet}/>}
        </BodyComponent>
      </div>
    );
  }
}

const ViewStudentTable = ({ students,sendStudentId }) => (
  <CardComponent title="Select Marksheet Students">
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <td>Sr.no</td>
            <td>Student Name</td>
            <td>Parent Name</td>
            <td>Fill Marksheet</td>
            <td>Status</td>
            <td>Created By</td>
            <td>Publish At</td>
          </tr>
        </thead>
        <tbody>
          {students.map((item, id) => {
            return (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{item.student_name}</td>
                <td>{item.father_name}</td>
                <td>
                  <button onClick={e => sendStudentId(item.id)} className="btn btn-primary">Fill</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </CardComponent>
);

function mapStateToProps(state) {
  return {
    examType: state.examType,
  };
}

export default connect(mapStateToProps, { getExamTypeDispatch })(
  AdminExamFillMarksheet
);
