import React, { Component } from "react";
import { Link } from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

export class AddEditHomeWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_add: true,
      class_id: "",
    };
  }

  componentDidMount() {
    if (this.props.class_id) {
      class_id: this.props.class_id;
    }
  }

  render() {
    const { display_add, class_id } = this.state;
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
              onClick={(e) => this.setState({ display_add: true })}
              className="btn btn-primary float-right"
            >
              Add
            </button>
          </h3>
        </div>
        <div className="card-body">
        </div>
      </div>
      {display_add && (
            <AddFormHomeWork title="Add HomeWork" class_id={class_id} />
          )}
      </div>
    );
  }
}

class AddFormHomeWork extends Component {
  constructor(props){
  	super(props)
  	this.state = {
  		data: {
  			title:"",
  			subtitle:"",
  			description: ""
  		}
  	}
  }

  onChange(e){
  	this.setState({
  		data: {...this.state.data,[e.target.name]:e.target.value}
	});
  }
  
  onDrop(e, event) {
	    e.preventDefault();
	    this.handleChange(e.dataTransfer.files[0]);
	    let files = e.dataTransfer.files;
	    console.log("Files dropped: ", files);
	    // Upload files
	    console.log(this.state.file);
	    return false;
 }


  render() {
  	const {data} = this.state
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">{this.props.title}</h3>
        </div>
        <div className="card-body">
        	<form>
        		<div className="form-group">
        			<label>Title: </label>
        			<input type="text" name="title" value={data.title} onChange={(e) => this.onChange(e)} className="form-control"/>
        		</div>
        		<div className="form-group">
        		<label>Sub Title: </label>
        		<input type="text" name="subtitle"  value={data.subtitle} onChange={(e) => this.onChange(e)} className="form-control"/>
        		</div>
        		<div className="form-group">
        			<label>Description: </label>
        			 <CKEditor
	                    editor={ ClassicEditor }
	                    data={data.description}
	                    onChange={ ( event, editor ) => {
	                        const data = editor.getData();
							    this.setState({
							      data: {...this.state.data,["description"]:data}
							    });
	                    } }
                		/>
			    </div>

			    <div className="form-group">
			    	<label>Update Files: </label>
			    	 <Dropzone onDrop={onDrop}>
			            <div>Try dropping some files here, or click to select files to upload.</div>
			         </Dropzone>
			    </div>
        	</form>
        </div>
      </div>
    );
  }
}


const ImageAudioVideo = ({getFiles}) => {
  const getUploadParams = ({ meta }) => {
    const url ='https://httpbin.org/post'
    return { url,meta: { fileUrl:`${url}/${encodeURIComponent(meta.name)}`}}
  }
  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }
  const handleSubmit = (files, allFiles,e) => {
  	console.log(e)
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onDrop={getFiles}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />
  )
}
