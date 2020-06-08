import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import { connect } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



class ViewParticularHomeWorkParent extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:"",
            errors:{}
        }
        this.fetchHomeWork = this.fetchHomeWork.bind(this)
    }
    findArrayElementByTitle(array, id) {
        return array.find((element) => {
          return element.id == id;
        })
    }
    fetchHomeWork(){
        const {parent_homework,student_id,view_id} = this.props
        const particular_homework = this.findArrayElementByTitle(parent_homework[student_id],view_id)
        this.setState({
            data:particular_homework
        },() => {
            console.log(this.state)
        })
    }
    componentDidMount(){
        this.fetchHomeWork()   
    }
    componentWillReceiveProps(){
        this.setState({
            data:""
        },() => {
        this.fetchHomeWork()   
        })
    }
    render(){
        const { data,errors } = this.state;
        const { subject } = this.props;
        return(
            <CardComponent title="View Particular HomeWork">
                {data ?
                <div>
            <div className="form-group">
          <label>Title: </label>
          <input
            disabled
            type="text"
            name="title"
            value={data.homework.title}
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
            value={data.homework.subtitle}
            onChange={(e) => this.onChange(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input
            disabled
            type="text"
            name="title"
            value={data.homework.subject.subject_name}
            onChange={(e) => this.onChange(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <CKEditor
            disabled
            editor={ClassicEditor}
            data={data.homework.description}
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
                <input type="date" disabled className="form-control" name="submition_date" onChange={e => this.onChange(e)} value={data.homework.submition_date}/>
                {errors.submition_date && (
                  <InlineError text={errors.submition_date} />
                )}
              </div>
            
        </div>
                : <div>Loading ...</div>}
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        parent_homework:state.parent_homework,
        subject:state.subjects
    };
}

export default connect(mapStateToProps)(ViewParticularHomeWorkParent);
