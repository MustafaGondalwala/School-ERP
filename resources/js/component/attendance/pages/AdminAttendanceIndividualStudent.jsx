import React, { Component, Suspense } from "react";
const TeacherHeader = React.lazy(() => import("../../header/teacher/AttendanceHeader")) 
import TopBreadCrumb from "../../utils/TopBreadcrumb"

import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import SelectStudent from "../../utils/SelectStudent";
import InlineError from "../../utils/InlineError";
import EmptyHeader from "../../utils/EmptyHeader";
const StudentIndividualReport = React.lazy(() => import("../utils/StudentIndividualReport"))

export default class AdminAttendanceIndividualStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        select_month: "",
        student_id: ''
      },
      notshow_student:false,
      button_text: "Fetch",
      errors: {},
      open_panel:false
    };
    this.fetchStudent = this.fetchStudent.bind(this)
    this.sendStudentId = this.sendStudentId.bind(this)
  }
  componentDidMount(){
    var {student_id} = this.props.match.params
    if(student_id != undefined){
      this.setState({
        data: { ...this.state.data, ["student_id"]: student_id },
        notshow_student:true
      })
    }
  }
  sendStudentId(student_id) {
    this.setState({
      data: { ...this.state.data, ["student_id"]: student_id },
    });
  }
  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }
  validate(data){
    const errors = {};
    if (!data.student_id) errors.student_id = "Can't be blank";
    if(!data.select_month) errors.select_month = "Can't be blank";
    return errors
  }
  fetchStudent(){
    const {data} = this.state
    const errors = this.validate(data);
    this.setState({
        open_panel:false
    })
    console.log(this.state.data)
    this.setState({ errors })
    if(Object.keys(errors).length == 0){
        this.setState({
            open_panel:true
        })
    }
  }

  render() {
    const { button_text, data, errors,open_panel,notshow_student } = this.state;

    return (
      <div>
        <Suspense fallback={<h1>Loading ...</h1>}>
                <EmptyHeader mainHeader="Attendance" header="Student" sub_header="Student Attendance" />
            </Suspense>
        <BodyComponent>
          <CardComponent title="Select Student" back_link="/admin/attendance">
            {
              notshow_student != true &&
              <div className="row">
                <div className="col">
                  <label>Select Student:</label>
                </div>
              </div>
            }
            {
              notshow_student != true &&
              <div className="row">
              <div className="col-md-6">
                <SelectStudent sendStudentId={this.sendStudentId} />
                {errors.student_id && (
                    <InlineError text={errors.student_id} />
                  )}
              </div>
            </div>
              }
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label
                    className="form-control-label"
                    htmlFor="example3cols1Input"
                  >
                    Select Month
                  </label>
                  <input
                    value={data.select_month}
                    onChange={(e) => this.onChange(e)}
                    className="form-control"
                    type="month"
                    name="select_month"
                  />
                  {errors.select_month && (
                    <InlineError text={errors.select_month} />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-primary" onClick={this.fetchStudent}>{button_text}</button>
              </div>
            </div>
          </CardComponent>
          {open_panel && 
          <Suspense fallback={<h1>Loading ...</h1>}>
            <StudentIndividualReport data={data}/>
          </Suspense>
        } 
        </BodyComponent>
      </div>
    );
  }
}
