import React, { Component } from "react";
import { Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import moment from "moment";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import { withSwalInstance } from "sweetalert2-react";
import Swal from "sweetalert2";

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856" }}>{text}</span>
);

export class AddEditHomeWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_add: false,
      class_id: "",
      button_text: "Add HomeWork",
      insert_success: false,
      homework: [],
      editHomeWork: "",
      view_homework:"",
      subjects:[]
    };

    this.submit = this.submit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.editSave = this.editSave.bind(this);
  }

  componentDidMount() {
    if (this.props.class_id) {
      this.setState({
        class_id: this.props.class_id,
      });
    }
    var self = this;
    axios({
      url: "/api/v1/homework/"+this.props.class_id,
    }).then((response) => {
      self.setState({
        homework: response.data.success.homework,
      });
    });

     axios({
      url: "/api/v1/teacher/subject",
    }).then((response) => {
      self.setState({
        subjects: response.data.success.subjects,
      });
    });
  }

  submit(data) {
    var self = this;
   
    this.setState({
        button_text: "Adding HomeWork ...",
    });
    data["class_id"] = this.props.class_id;
    var method = "post";
    if (data.id) {
      method = "patch";
    }

    axios({
      url: "/api/v1/homework",
      method: method,
      data: data,
    }).then((response) => {
      if (response.data.success.homework) {
        var homework = response.data.success.homework;
        self.setState({
          button_text: "Add HomeWork",
          insert_success: true,
          homework: homework,
          editHomeWork: "",
        });
      }
    });
  }

  onDelete(e) {
    var homework_id = e.target.getAttribute("data-id");
    var self = this;
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this HomeWork!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        axios({
          url: "/api/v1/homework/" + homework_id,
          method: "delete",
        }).then((response) => {
          self.setState({
            homework: response.data.success.homework,
          });
          Swal.fire("Deleted!", "Your HomeWork has been deleted.", "success");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your HomeWork is safe :)", "error");
      }
    });
  }
  onEdit(e) {
    var homework_id = e.target.getAttribute("data-id");
    this.state.homework.map((item) => {
      if (homework_id == item.id) {
        item.view_date = new Date(item.submition_date);
        this.setState({
          editHomeWork: item,
          display_add: false,
          button_text: "Update HomeWork",
          view_homework:""
        });
      }
    });
  }
  editSave(data) {
    if(data.id){
      var self = this;
      self.setState({
        button_text:"Edit HomeWork"
      });
      Swal.fire({
        title: "Are you sure?",
        text: "Edit Changes will be applied everywhere.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, edit it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if(result.value){
          axios({
            url: "/api/v1/homework",
            method: "patch",
            data: data,
          }).then((response) => {
            if (response.data.success.homework) {
              var homework = response.data.success.homework;
              self.setState({
                button_text: "Add HomeWork",
                homework: homework,
                editHomeWork: "",
              });
              Swal.fire("Home Edited", "HomeWork is Edited", "success");
            }
          });
        }else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Edit Cancelled", "Your HomeWork is safe :)", "info");
        }
      })
    }
  }

  render() {
    const columns = [
      {
        name: "Sr.no",
        sortable: true,
        place: "id",
      },
      {
        name: "Title",
        selector: "title",
        sortable: true,
      },
      {
        name: "Sub Title",
        selector: "subtitle",
        sortable: true,
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
        cell: (row) => (
          <div>
            <button
              className="btn btn-primary btn-sm"
              data-id={row.id}
              data-description={row.description}
              onClick={(e) =>  {
                  this.setState({
                  view_homework:row,
                  display_add:false,
                  editHomeWork:""
                })
              }}
            >
              View
            </button>
          </div>
        ),
      },
      {
        name: "Total Pending",
        sortable: true,
        cell: (row) => <div>{row.total.total_pending}</div>,
      },
      {
        name: "Total Completed",
        sortable: true,
        cell: (row) => <div>{row.total.total_completed}</div>,
      },
      {
        name: "Total Raise Issue",
        sortable: true,
        cell: (row) => <div>{row.total.total_raise_issue}</div>,
      },
      {
        name: "Action",
        sortable: true,
        cell: (row) => (
          <div>
            <a
              className="table-action"
              data-id={row.id}
              onClick={(e) => this.onEdit(e)}
              data-toggle="tooltip"
              data-original-title="Edit HomeWork"
            >
              <i className="fas fa-user-edit" data-id={row.id} />
            </a>
            <a
              data-id={row.id}
              onClick={(e) => this.onDelete(e)}
              className="table-action table-action-delete"
              data-toggle="tooltip"
              data-original-title="Delete product"
            >
              <i className="fas fa-trash" data-id={row.id} />
            </a>
          </div>
        ),
      },
    ];
    const { display_add, class_id, button_text, editHomeWork, view_homework } = this.state;
    return (
      <div>
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="mb-0">
              {this.props.title}
              <Link
                to={this.props.back_link}
                class="btn btn-neutral float-right"
                type="submit"
              >
                Back
              </Link>
              <button
                onClick={(e) =>
                  this.setState({ display_add: true, editHomeWork: "",view_homework:"" })
                }
                className="btn btn-primary float-right"
              >
                Add
              </button>
            </h3>
          </div>
          <div className="card-body">
            <DataTable
              title="Current HomeWork"
              columns={columns}
              data={this.state.homework}
            />
          </div>
        </div>
        {view_homework &&
          <ViewHomeWork 
            data={view_homework}
            subjects={this.state.subjects}
            title="View HomeWork"
          />
        }
        
        {editHomeWork && (
          <AddFormHomeWork
            class_id={class_id}
            data={editHomeWork}
            editSave={this.editSave}
            button_text={button_text}
            title={"Edit HomeWork"}
            submit={this.submit}
            subjects={this.state.subjects}
          />
        )}
        {display_add && (
          <AddFormHomeWork
            subjects={this.state.subjects}
            insert_success={this.state.insert_success}
            button_text={button_text}
            submit={this.submit}
            title="Add HomeWork"
            class_id={class_id}
          />
        )}
      </div>
    );
  }
}


const ViewHomeWorkForm = ({data,subjects}) => {
  return (
  <form>
            <div className="form-group">
              <label>Title: </label>
              <input
              disabled
                type="text"
                name="title"
                value={data.title}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Sub Title: </label>
              <input
                type="text"
              disabled
                name="subtitle"
                value={data.subtitle}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Subject:</label>
              <select
                disabled
                className="form-control"
                value={data.subject}
                onChange={(e) => this.onChange(e)}
                name="subject"
              >
                {Object.keys(subjects).length > 1 &&
                  subjects.map((item) => {
                    return <option value={item.id}>{item.subject_name}</option>;
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Description: </label>
              <CKEditor
                editor={ClassicEditor}
                data={data.description}
                disabled
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({
                    data: { ...this.state.data, ["description"]: data },
                  });
                }}
                onInit={(editor) => {
                  editor.setData(data.description);
                }}
              />
            </div>

            <div className="form-group">
              <label>Update Files: </label>
              <ImageAudioVideo />
            </div>
            <div className="form-group">
              <label>Submition Date:</label>
              <input type="date" disabled className="form-control" value={data.submition_date}/>
            </div>
          </form>
  
    )
  }

const ViewHomeWork = ({data,title,subjects}) => {
 
  return (
  <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">{title}</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Title: </label>
              <input
              disabled
                type="text"
                name="title"
                value={data.title}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Sub Title: </label>
              <input
                type="text"
              disabled
                name="subtitle"
                value={data.subtitle}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Subject:</label>
              <select
                disabled
                className="form-control"
                value={data.subject}
                onChange={(e) => this.onChange(e)}
                name="subject"
              >
                {Object.keys(subjects).length > 1 &&
                  subjects.map((item) => {
                    return <option value={item.id}>{item.subject_name}</option>;
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Description: </label>
              <CKEditor
                editor={ClassicEditor}
                data={data.description}
                disabled
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({
                    data: { ...this.state.data, ["description"]: data },
                  });
                }}
                onInit={(editor) => {
                  editor.setData(data.description);
                }}
              />
            </div>

            <div className="form-group">
              <label>Update Files: </label>
              <ImageAudioVideo />
            </div>
            <div className="form-group">
              <label>Submition Date:</label>
              <input type="date" disabled className="form-control" value={data.submition_date}/>
            </div>
          </form>
        </div>
      </div>
  )
}
class AddFormHomeWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "Science HomeWork",
        subtitle: "Science",
        description: "<p>Science HomeWork</p>",
        submition_date: moment(new Date()).format("YYYY-MM-DD"),
        view_date: new Date(),
        images_url: [],
        subject: "",
      },
      subjects: [],
      errors: {},
    };
    this.DatePickerChange = this.DatePickerChange.bind(this);
    this.makeInputNull = this.makeInputNull.bind(this);
  }

  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  componentDidMount() {
    var self = this;

    if (this.props.data) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.makeInputNull();
    }
  }
  componentWillReceiveProps() {
    if (this.props.data) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.makeInputNull();
    }
  }
  DatePickerChange(data) {
    this.setState({
      data: {
        ...this.state.data,
        ["submition_date"]: moment(data).format("YYYY-MM-DD"),
      },
      data: { ...this.state.data, ["view_date"]: new Date(data) },
    });
  }
  validate(data) {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.subtitle) errors.subtitle = "Can't be blank";
    if (!data.description) errors.description = "Can't be blank";
    if (!data.submition_date) errors.submition_date = "Can't be blank";

    if (data.title.length < 3) errors.title = "Min. Length 3 char.";
    if (data.description.length < 3)
      errors.student_address = "Min. Length 5 char.";
    return errors;
  }
  onSubmit(e) {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      if (this.state.data.id) this.props.editSave(this.state.data);
      else this.props.submit(this.state.data);
      this.makeInputNull();
    }
  }

  makeInputNull() {
    const data = {
      title: "",
      subtitle: "",
      description: "",
      submition_date: moment(new Date()).format("YYYY-MM-DD"),
      view_date: new Date(),
      images_url: [],
      subject: "",
    };
    this.setState({
      data: data,
    });
  }
  render() {
    const { data, errors,  } = this.state;
    const { insert_success,subjects } = this.props;
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">{this.props.title}</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              {insert_success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <span className="alert-icon">
                    <i className="ni ni-like-2" />
                  </span>
                  <span className="alert-text">
                    <div>HomeWork Add Successfully.</div>
                  </span>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Title: </label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={(e) => this.onChange(e)}
                className="form-control"
              />
              {errors.title && <InlineError text={errors.title} />}
            </div>
            <div className="form-group">
              <label>Sub Title: </label>
              <input
                type="text"
                name="subtitle"
                value={data.subtitle}
                onChange={(e) => this.onChange(e)}
                className="form-control"
              />
              {errors.subtitle && <InlineError text={errors.subtitle} />}
            </div>
            <div className="form-group">
              <label>Subject:</label>
              <select
                className="form-control"
                value={data.subject}
                onChange={(e) => this.onChange(e)}
                name="subject"
              >
                <option value="">-- Select --</option>
                {subjects &&
                  subjects.map((item) => {
                    return <option value={item.id}>{item.subject_name}</option>;
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Description: </label>
              <CKEditor
                editor={ClassicEditor}
                data={data.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({
                    data: { ...this.state.data, ["description"]: data },
                  });
                }}
                onInit={(editor) => {
                  editor.setData(data.description);
                }}
              />
              {errors.description && <InlineError text={errors.description} />}
            </div>

            <div className="form-group">
              <label>Update Files: </label>
              <ImageAudioVideo />
            </div>
            <div className="form-group">
              <label>Submition Date:</label>
              <DatePicker
                className="form-control"
                selected={data.view_date}
                onSelect={this.DatePickerChange}
                onChange={this.DatePickerChange}
              />
              {errors.submition_date && (
                <InlineError text={errors.submition_date} />
              )}
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary"
                onClick={(e) => this.onSubmit(e)}
              >
                {this.props.button_text}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const ImageAudioVideo = () => {
  const getUploadParams = ({ meta }) => {
    const url = "https://httpbin.org/post";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (e, files, allFiles) => {
    console.log(e);
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={(e) => handleSubmit}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) =>
        extra.reject ? "Image, audio and video files only" : "Drag Files"
      }
      styles={{
        dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
        inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
      }}
    />
  );
};


export class ViewPendingRaiseIssue extends Component{
  constructor(props){
    super(props)
    this.state = {
      homework:[],
      subjects:[],
      view_homework:""
    }
  }

  updateGetPendingHomeWork(student_id){
    var self = this;
    axios({
      url:"/api/v1/homework/student/"+student_id,
    }).then(response => {
      self.setState({
        homework:response.data.success.homework
      })
    })
  }

  componentDidMount(){
    var self = this;
    this.updateGetPendingHomeWork(this.props.student_id)
    axios({
      url: "/api/v1/parent/subjects",
    }).then((response) => {
      self.setState({
        subjects: response.data.success.subjects,
      });
    });
  }
  componentWillReceiveProps(){
    this.updateGetPendingHomeWork(this.props.student_id)
  }
  render(){
     const columns = [
      {
        name: "Sr.no",
        sortable: true,
        place: "id",
      },
      {
        name: "Title",
        sortable: true,
        cell: row => (
          <div>
            {row.homework.title}
          </div>
          )
      },
      {
        name: "Sub Title",
        selector: "subtitle",
        sortable: true,
        cell:row => (
            <div>
              {row.homework.subtitle}
            </div>
          )
      },
      {
        name:"Submition Date",
        sortable:true,
        selector:"submition_date"
      },
      {
        name: "View",
        cell: (row) => (
          <div>
            <button
              className="btn btn-primary btn-sm"
              data-id={row.id}
              onClick={(e) =>  {
                this.setState({
                  view_homework:row
                })
              }}
            >
              View
            </button>
          </div>
        ),
      },
      {
        name:"Teacher Details",
        cell: row => (
            <div>
              <button className="btn btn-primary btn-sm" onClick={(e)=> {
                this.setState({
                  teacher_details:row.teacher
                })
              }}>View Details</button>
            </div>
          )
      },
      {
        name: "Raise Issue",
        sortable: true,
        cell: (row) => (
          <div>
           No
          </div>
        ),
      },
    ];
    const { view_homework } = this.state
    return(
      <div>
      <div className="card mb-4">
          <div className="card-header">
            <h3 className="mb-0">
              {this.props.title}
              <Link
                to={this.props.back_link}
                class="btn btn-neutral float-right"
                type="submit"
              >
                Back
              </Link>
            </h3>
          </div>
          <div className="card-body">
           <DataTable
              title="Current Pending HomeWork"
              columns={columns}
              data={this.state.homework}
              
            />
          </div>
        </div>
        {view_homework && <ViewStudentParentHomeWork student_id={this.props.student_id} subjects={this.state.subjects} title="View Home work" data={view_homework}/>}
      </div>
    )
  }
}

class RaiseIssueHandleParentStudent extends Component{
  constructor(props){
    super(props) 
    this.state = {
      new_issue:{
        title:"",
        description:""
      },
      errors:{},
    }
    this.newRaiseIssueFun = this.newRaiseIssueFun.bind(this)
    this.getAllRaiseIssue = this.getAllRaiseIssue.bind(this)
  }
  onChange(e){
    this.setState({
      new_issue: { ...this.state.new_issue, [e.target.name]: e.target.value },
    })
  }

  getAllRaiseIssue(){
      console.log("get riase issue");
      // var user_type = localStorage.getItem("user_type") 
      // var url = ""
      // if(user_type == "parent")
      //     url = "/api/v1/homework/raise-issue/parent/ongoing"
      // else if(user_type == "student")
      //     url = "/api/v1/homework/raise-issue/student/ongoing"
      // axios({
      //   url:url,
      //   method:"post",
      //   data: {
      //     "homework_id":this.props.data.homework_id,
      //     "student_id":this.props.student_id,
      //     "teacher_id":this.props.data.teacher.id,
      //     "class_id":this.props.data.homework.class_id
      //   }
      // }).then(response => {
      //   console.log(response.data)
      // })
  }
  componentWillReceiveProps(){
    const new_issue = {
        title:"",
        description:""
      }
    this.setState({
        new_issue
    })
    this.getAllRaiseIssue();
  }
  validate(data){
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.description) errors.description = "Can't be blank";

    if (data.title.length < 3) errors.title = "Min. Length 3 char.";
    if (data.description.length < 3)
      errors.description = "Min. Length 5 char.";
    return errors;
  }
  componentDidMount(){
    console.log(this.props)
    this.getAllRaiseIssue();
  }
  newRaiseIssueFun(e){
    const errors = this.validate(this.state.new_issue)
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      var user_type = localStorage.getItem("user_type") 
      var url = ""
      if(user_type == "parent")
          url = "/api/v1/homework/raise-issue/parent"
      else if(user_type == "student")
          url = "/api/v1/homework/raise-issue/student"
      const new_issue = this.state.new_issue;
      axios({
        url:url,
        method:"post",
        data: {
          "new_issue":new_issue,
          "homework_id":this.props.data.homework_id,
          "student_id":this.props.student_id,
          "teacher_id":this.props.data.teacher.id,
          "class_id":this.props.data.homework.class_id
        },
      }).then(response => {
        console.log(response.data)
      })
    }
  }
  makeInputNull(){
    const new_issue = {
        title:"",
        description:""
      }
    this.setState({
      new_issue
    })
  }
  render(){
    const {new_issue,errors} = this.state
    return(
      <div>
          <div>
          <button type="button" data-toggle="modal" data-target="#raiseIssue" className="btn btn-warning btn-sm">Raise Issue</button>
            <div class="modal fade" id="raiseIssue" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Raise Issue</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Issue Title:</label>
                      <input type="text" onChange={(e)=> this.onChange(e)} value={new_issue.title} name="title" className="form-control"/>
                      {errors.title && <InlineError text={errors.title} />}
                    </div>
                    <div className="form-group">
                      <label>Issue Description:</label>
                      <CKEditor
                      editor={ClassicEditor}
                      data={new_issue.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({
                          new_issue: { ...this.state.new_issue, ["description"]: data },
                        });
                      }}
                      onInit={(editor) => {
                        editor.setData(new_issue.description);
                      }}
                    />
                      {errors.description && <InlineError text={errors.description} />}
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" onClick={(e) => this.newRaiseIssueFun(e)} class="btn btn-warning">Raise Issue</button>
                </div>
              </div>
            </div>
          </div>
          </div>
          <form>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title:</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                </table>
              </div>      
          </form> 
      </div>
    )
  }
}
const ViewStudentParentHomeWork = (props) => {
  return(
     <div className="card mb-4">
          <div className="card-header">
            <h3 className="mb-0">
              {props.title}
            </h3>
          </div>
          <div className="card-body">
              <ViewHomeWorkForm data={props.data.homework} subjects={props.subjects}/>
              <RaiseIssueHandleParentStudent data={props.data} student_id={props.student_id} />
          </div>
      </div>
  )
}