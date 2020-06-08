import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import { connect } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class ViewParticularHomeWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      errors:{}
    };
    this.updateData = this.updateData.bind(this)
  }
  updateData(view_id,class_homeworks){
    class_homeworks.map((item) => {
        if (item.id == view_id) {
          this.setState(
            {
              data: item,
            });
        }
      });
  }
  componentDidMount() {
    var view_id = this.props.view_id;
    var class_homeworks = this.props.class_homeworks;
    this.updateData(view_id,class_homeworks);
  }
  componentWillReceiveProps(){
    var view_id = this.props.view_id;
    var class_homeworks = this.props.class_homeworks;
    this.updateData(view_id,class_homeworks);
  }

  render() {
    const { data,errors } = this.state;
    const { subject } = this.props;

    return (
      <CardComponent title="View Particular HomeWork">
        {data && <div>
            <div className="form-group">
          <label>Title: </label>
          <input
            disabled
            type="text"
            name="title"
            value={data.title}
            onChange={(e) => this.onChange(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Sub Title: </label>
          <input
          disabled
            type="text"
            name="subtitle"
            value={data.subtitle}
            onChange={(e) => this.onChange(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <select
            disabled
            className="form-control"
            value={data.subject.id}
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
            disabled
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
                <label>Submition Date:</label>
                <input type="date" disabled className="form-control" name="submition_date" onChange={e => this.onChange(e)} value={data.submition_date}/>
                {errors.submition_date && (
                  <InlineError text={errors.submition_date} />
                )}
              </div>
            
        </div>} 
      </CardComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
    class_homeworks: state.class_homeworks,
    subject:state.subjects
  };
}

export default connect(mapStateToProps)(ViewParticularHomeWork);
