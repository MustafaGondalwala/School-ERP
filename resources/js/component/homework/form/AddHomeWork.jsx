import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InlineError from "../../utils/InlineError"
import {setSubjectDispatch} from "../../actions/subjects"
import { connect } from "react-redux";
import Swal from 'sweetalert2'

class AddFormHomeWork extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {
          title: "Science HomeWork",
          subtitle: "Science",
          description: "<p>Science HomeWork</p>",
          submition_date: "2020-03-03",
          images_url: [],
          subject: "1",
          class_id:""
        },
        errors: {},
        add_button:"Add HomeWork"
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.makeInputNull = this.makeInputNull.bind(this);
    }
  
    onChange(e) {
      this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value },
      });
    }
  
    componentDidMount() {
      var self = this;
      const {subject,setSubjectDispatch} = this.props
      
      if(Object.keys(subject).length == 0){
        setSubjectDispatch()
      }
      this.setState({
        data: { ...this.state.data, ["class_id"]: this.props.class_id },
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
        this.setState({
          add_button:"Adding HomeWork ..."
        })
        this.props.submit(this.state.data).then(() => {
          this.setState({
            add_button:"Add HomeWork"
          })
        }).catch(error => {
          console.log("error occured")
        })
        // if (this.state.data.id) 
        // {
        //   this.props.editSave(this.state.data);
        // }else{
        //   this.props.submit(this.state.data);
        // }
        // this.makeInputNull();
      }
    }
  
    makeInputNull() {
      const data = {
        title: "",
        subtitle: "",
        description: "",
        submition_date:"",
        images_url: [],
        subject: "",
      };
      this.setState({
        data: data,
      });
    }
    render() {
      const { data, errors,add_button  } = this.state;
      const { insert_success,subject } = this.props;
      return (
        <CardComponent title="Add HomeWork">
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
                  {Object.keys(subject).length > 0 &&
                    subject.map((item) => {
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
              </div>
              <div className="form-group">
                <label>Submition Date:</label>
                <input type="date" className="form-control" name="submition_date" onChange={e => this.onChange(e)} value={data.submition_date}/>
                {errors.submition_date && (
                  <InlineError text={errors.submition_date} />
                )}
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.onSubmit(e)}
                >
                  {add_button}
                </button>
              </div>
            </form>
        </CardComponent>
      );
    }
  }


  function mapStateToProps(state) {
    return {
        subject:state.subjects
    };
}
export default connect(mapStateToProps,{setSubjectDispatch})(AddFormHomeWork);