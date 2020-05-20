import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856" }}>{text}</span>
);

export class FillExamMarksheetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam_type_type: "1",
      exam_type: "5",
      selected_year: "",
      subject: [1, 2, 3],
      class_id: 3,
      student_id: "2",
      errors: {},
      exam_marksheet: "",
      marks_total: {
        total_max_marks: 0,
        total_min_marks: 0,
        total_marks: 0,
      },
      data_fetch_button: "Fetch",
      update_button_text:"Update Exam Marks"
    };
    this.getExamTypeChange = this.getExamTypeChange.bind(this);
    this.getClassId = this.getClassId.bind(this);
    this.sendStudentID = this.sendStudentID.bind(this);
    this.sendClassID = this.sendClassID.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.ChangeExamMarkSheetValue = this.ChangeExamMarkSheetValue.bind(this);
    this.updateExamMarks = this.updateExamMarks.bind(this)
  }
  getExamTypeChange(type, data) {
    this.setState({
      [type]: data,
    });
  }

  getClassId(class_id) {
    this.setState({
      class_id,
    });
  }

  validate(data) {
    const errors = {};
    if (!data.class_id) errors.class_id = "Can't be blank";
    if (!data.exam_type) errors.exam_type = "Can't be blank";
    if (!data.subject) errors.subject = "Can't be blank";
    if (!data.student_id) errors.student_id = "Can't be blank";
    return errors;
  }
  sendClassID(class_id) {
    this.setState({
      class_id: class_id,
    });
  }
  updateStateForExamMarksheet(exam_marksheet){
        var self = this
        self.setState({
          exam_marksheet: exam_marksheet,
          data_fetch_button: "Fetch",
        });

        const temp = exam_marksheet;
        var total_marks = 0;
        var total_min_marks = 0;
        var total_max_marks = 0;
        Object.keys(temp).map((item) => {
          total_max_marks += parseInt(temp[item].max_marks);
          total_min_marks += parseInt(temp[item].min_marks);
          total_marks += parseInt(temp[item].marks);
        });
        const marks_total = {
          total_max_marks: total_max_marks,
          total_min_marks: total_min_marks,
          total_marks: total_marks,
        };
        self.setState({
          marks_total,
        });
  }
  refreshData() {
    var self = this;
    self.setState({
      data_fetch_button: "Fetching ...",
    });
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      var url = "/api/v1/exam/exam_marksheet";
      const { access_user_type } = this.props;
      if (access_user_type == "teacher") {
        url = "/api/v1/teacher/exam/exam_marksheet";
      }
      axios({
        url: url,
        method: "post",
        data: this.state,
      }).then((response) => {
          this.updateStateForExamMarksheet(response.data.success.exam_marksheet)
      });
    } else {
      this.setState({
        data_fetch_button: "Fetch",
      });
    }
  }
  sendStudentID(student_id) {
    this.setState(
      {
        student_id: student_id,
      },
      () => {
        this.refreshData();
      }
    );
  }
  componentDidMount() {
    this.refreshData();
  }
  ChangeExamMarkSheetValue(e, subject_name) {
    const temp = this.state.exam_marksheet;
    var total_marks = 0;
    var total_min_marks = 0;
    var total_max_marks = 0;

    Object.keys(temp).map((item) => {
      if (item == subject_name) {
        temp[item][e.target.name] = e.target.value;
      }
      total_max_marks += parseInt(temp[item].max_marks);
      total_min_marks += parseInt(temp[item].min_marks);
      total_marks += parseInt(temp[item].marks);
    });
    const marks_total = {
      total_max_marks: total_max_marks,
      total_min_marks: total_min_marks,
      total_marks: total_marks,
    };
    this.setState({
      exam_marksheet: temp,
      marks_total,
    });
  }
  updateExamMarks(){
    var self = this
    self.setState({
      update_button_text:"Updating Exam Marks ..."
    })
    var url = "/api/v1/exam/exam_marksheet";
    const { access_user_type } = this.props;
    if (access_user_type == "teacher") {
      url = "/api/v1/teacher/exam/exam_marksheet";
    }
    axios({
      url:url,
      method:"put",
      data:{exam_marksheet:this.state.exam_marksheet}
    }).then(response => {
          this.updateStateForExamMarksheet(response.data.success.exam_marksheet)
          self.setState({
            update_button_text:"Update Exam Marks"
          })
    })
  }
  render() {
    const { access_user_type, access_type } = this.props;
    const { exam_marksheet, marks_total } = this.state;
    return (
      <div>
        <SelectExamType
          getExamTypeChange={this.getExamTypeChange}
          title="Select Exam"
          back_link="/admin/exam"
          access_user_type={this.props.access_user_type}
          errors={this.state.errors}
        />
        {access_user_type == "admin" ? (
          <SelectStudentClass
            data_fetch_button={this.state.data_fetch_button}
            errors={this.state.errors}
            title="Select Student By Class"
            getClassId={this.getClassId}
            access_type="by_class"
            user_type="admin"
            sendStudentID={this.sendStudentID}
            sendClassID={this.sendClassID}
          />
        ) : (
          <SelectStudentClass
            data_fetch_button={this.state.data_fetch_button}
            errors={this.state.errors}
            title="Select Student"
            class_id={this.props.class_id}
            access_type="by_class"
            user_type="teacher"
            sendStudentID={this.sendStudentID}
            sendClassID={this.sendClassID}
          />
        )}
        {exam_marksheet && (
          <ExamMarksheet
            marks_total={marks_total}
            onChange={this.ChangeExamMarkSheetValue}
            access_type={access_type}
            access_user_type={access_user_type}
            exam_marksheet={exam_marksheet}
            updateExamMarks={this.updateExamMarks}
            update_button_text={this.state.update_button_text}
          />
        )}
      </div>
    );
  }
}

class ExamMarksheet extends Component {
  render() {
    const {
      access_type,
      access_user_type,
      exam_marksheet,
      onChange,
      marks_total,
      updateExamMarks
    } = this.props;
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">
            {access_type == "fill" ? (
              <span>Fill MarkSheet</span>
            ) : (
              <span>View MarkSheet</span>
            )}
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <th>Sr. no</th>
                  <th>Subject Name</th>
                  <th>Max. Marks</th>
                  <th>Min. Marks</th>
                  <th>Grace Marks</th>
                  <th>Marks</th>
                </thead>
                <tbody>
                  {Object.keys(exam_marksheet).map((item, id) => {
                    return (
                      <tr>
                        <td>{id + 1}</td>
                        <td>{item}</td>
                        <td>
                          <input
                            className="form-control"
                            onChange={(e) => onChange(e, item)}
                            name="max_marks"
                            type="number"
                            value={exam_marksheet[item].max_marks}
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            onChange={(e) => onChange(e, item)}
                            name="min_marks"
                            type="number"
                            value={exam_marksheet[item].min_marks}
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            onChange={(e) => onChange(e, item)}
                            name="grace_marks"
                            type="number"
                            value={exam_marksheet[item].grace_marks}
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            onChange={(e) => onChange(e, item)}
                            name="marks"
                            type="number"
                            value={exam_marksheet[item].marks}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        disabled
                        value={marks_total.total_max_marks}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        disabled
                        value={marks_total.total_min_marks}
                      />
                    </td>
                    <td></td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        disabled
                        value={marks_total.total_marks}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary" onClick={updateExamMarks}>{this.props.update_button_text}</button>
          </div>
        </div>
      </div>
    );
  }
}
class SelectStudentClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_id: "",
    };
    this.getClassIDFromGetClassId = this.getClassIDFromGetClassId.bind(this);
    this.sendStudentID = this.sendStudentID.bind(this);
  }

  componentDidMount() {
    const { user_type, class_id } = this.props;
    if (user_type == "teacher") {
      this.setState({
        class_id: class_id,
      });
    }
  }
  getClassIDFromGetClassId(class_id) {
    var self = this;
    this.setState(
      {
        class_id,
      },
      () => {
        self.props.sendClassID(class_id);
      }
    );
  }

  sendStudentID(student_id) {
    this.props.sendStudentID(student_id);
  }
  render() {
    const { user_type, title, back_link } = this.props;
    const { class_id } = this.state;
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">
            {title}
            <Link
              to={back_link}
              class="btn btn-neutral float-right"
              type="submit"
            >
              Back
            </Link>
          </h3>
        </div>
        <div className="card-body">
          {user_type == "admin" && (
            <GetClassId
              errors={this.props.errors}
              sendClassId={this.getClassIDFromGetClassId}
            />
          )}

          {class_id && (
            <GetSelectedStudentID
              data_fetch_button={this.props.data_fetch_button}
              errors={this.props.errors}
              sendStudentID={this.sendStudentID}
              user_type={user_type}
              class_id={class_id}
            />
          )}
        </div>
      </div>
    );
  }
}
class GetSelectedStudentID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_list: [],
      student_id: "",
    };
    this.updateStudentSearch = this.updateStudentSearch.bind(this);
  }
  updateStudentSearch(class_id) {
    const { user_type } = this.props;
    var url = "/api/v1/student/" + class_id;
    this.setState({
      student_list: [],
    });
    var self = this;
    if (user_type == "teacher") {
      url = "/api/v1/student/searchable/" + class_id;
    }
    axios({
      url: url,
    }).then((response) => {
      var student_list = response.data.success.student;
      self.setState({
        student_list,
      });
    });
  }
  componentDidMount() {
    this.updateStudentSearch(this.props.class_id);
  }
  componentWillReceiveProps() {
    this.updateStudentSearch(this.props.class_id);
  }

  handleInputChange(e) {
    this.setState({
      student_id: e.value,
    });
  }
  onSubmit() {
    this.props.sendStudentID(this.state.student_id);
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <label>Select Student:</label>
          <Select
            options={this.state.student_list}
            onChange={(e) => this.handleInputChange(e)}
          />
          {errors.student_id && <InlineError text={errors.student_id} />}
        </div>
        <div className="col-md-4">
          <br />
          <button className="btn btn-primary" onClick={() => this.onSubmit()}>
            {this.props.data_fetch_button}
          </button>
        </div>
      </div>
    );
  }
}
class GetClassId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: [],
      distinct_classes: [],
      classes: [],
      class_: "",
      section_: "",
    };
    this.onChange = this.onChange.bind(this);
    this.getClassSection = this.getClassSection.bind(this);
  }
  componentDidMount() {
    var self = this;
    axios({
      method: "post",
      url: "/api/v1/class/get-all-classes",
    }).then((response) => {
      const uniqueClasses = [];
      response.data.success.classes.map((item) => {
        if (uniqueClasses.indexOf(item.class_title) === -1) {
          uniqueClasses.push(item.class_title);
        }
      });
      self.setState({
        classes: response.data.success.classes,
        distinct_classes: uniqueClasses,
      });
    });
  }

  getClassSection(class_name, section) {
    this.state.classes.map((item) => {
      if ((item.class_title == class_name) & (item.section == section)) {
        this.props.sendClassId(item.id);
      }
    });
  }

  onChangeClasses(e) {
    var value = e.target.value;
    var value_by = [];
    this.state.classes.map((item) => {
      if (item.class_title == value) {
        value_by.push(item.section);
      }
    });
    this.setState({
      section: value_by,
    });
    this.setState({
      class_: e.target.value,
    });
    if (value_by.length > 0) {
      this.setState(
        {
          section_: value_by[0],
        },
        () => {
          this.getClassSection(this.state.class_, this.state.section_);
        }
      );
    } else {
      this.setState({
        section_: "",
        section: [],
      });
    }
  }

  onChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        this.getClassSection(this.state.class_, this.state.section_);
      }
    );
  }
  render() {
    const { errors } = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-control-label" htmlFor="example3cols3Input">
              Class
            </label>
            <select
              class="form-control"
              name="class"
              onChange={(e) => this.onChangeClasses(e)}
            >
              <option value="">Select Class</option>
              {this.state.distinct_classes.map(function (item) {
                return <option value={item}>{item}</option>;
              })}
              {errors.class_id && <InlineError text={errors.class_id} />}
            </select>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label className="form-control-label" htmlFor="example3cols3Input">
              Section
            </label>
            <select
              class="form-control"
              value={this.section_}
              name="section_"
              onChange={(e) => this.onChange(e)}
            >
              {this.state.section &&
                this.state.section.map((item) => {
                  if (item != null) return <option value={item}>{item}</option>;
                })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
class SelectExamType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam_type: "",
      years: "",
      subject: "",
      subject_: "",
    };
  }

  componentDidMount() {
    var self = this;
    const { access_user_type } = this.props;
    var exam_type_url = "/api/v1/exam/get-exam-type";
    var year_type_url = "/api/v1/year";
    var subject_type_url = "/api/v1/subject/get-all-subjects";

    if (access_user_type == "teacher") {
      exam_type_url = "/api/v1/teacher/get-exam-type";
      year_type_url = "/api/v1/teacher/year";
      subject_type_url = "/api/v1/teacher/subject/get-all-subjects";
    }

    axios({
      url: exam_type_url,
    }).then((response) => {
      self.setState({
        exam_type: response.data.success.exam_type,
      });
    });
    axios({
      url: year_type_url,
    }).then((response) => {
      self.setState({
        years: response.data.success.year,
      });
    });

    axios({
      url: subject_type_url,
      method: "post",
    }).then((response) => {
      const temp_subjects = [];
      response.data.success.subjects.map((item) => {
        temp_subjects.push({ value: item.id, label: item.subject_name });
      });

      self.setState({
        subject: temp_subjects,
      });
    });
  }

  handleInputChange(e) {
    var selected_subject = [];
    e.map((item) => {
      selected_subject.push(item.value);
    });
    this.props.getExamTypeChange("subject", selected_subject);
  }

  onChange(e) {
    this.props.getExamTypeChange(e.target.name, e.target.value);
  }
  render() {
    const { title, back_link, errors } = this.props;
    const { years, exam_type, subject } = this.state;
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">
            {title}
            <Link
              to={back_link}
              class="btn btn-neutral float-right"
              type="submit"
            >
              Back
            </Link>
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label>Exam Type:</label>
              <select
                className="form-control"
                name="exam_type"
                onChange={(e) => this.onChange(e)}
              >
                <option value="">-- Select --</option>
                {exam_type &&
                  exam_type.map((item) => {
                    return <option value={item.id}>{item.exam_type}</option>;
                  })}
              </select>
              {errors.exam_type && <InlineError text={errors.exam_type} />}
            </div>
            <div className="col-md-4">
              <label>Select Year:</label>
              <select
                className="form-control"
                name="selected_year"
                onChange={(e) => this.onChange(e)}
              >
                <option value="">-- Select --</option>
                {years &&
                  years.map((item) => {
                    return (
                      <option
                        value={item.id}
                        selected={item.selected_year == "1" && "selected"}
                      >
                        {item.string_year}
                      </option>
                    );
                  })}
              </select>
              {errors.selected_year && (
                <InlineError text={errors.selected_year} />
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <br />
              <label>Select Subject:</label>
              <Select
                isMulti
                options={subject}
                onChange={(e) => this.handleInputChange(e)}
              />
              {errors.subject && <InlineError text={errors.subject} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
