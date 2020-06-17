import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { FormGroup, FormLabel, Input, Col, UploadMutitpleMutiples, PreviewFiles, Button, Select } from "../../utils/Components"
import { connect } from "react-redux";
import {setSubjectDispatch} from "../../actions/subjects"
import InlineError from "../../utils/InlineError";


import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class EditHomeWork extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{},
            errors:{},
            update_button:"Update"
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    fetchData(data){
        this.setState({
            data:{},
            files:""
        },() => {
            const image_url = []
            data.files.map(each => {
                image_url.push(each.file_url)
            })
            data.image_url = image_url
            this.setState({
                data
            })
        })
    }
    componentDidMount(){
        const {data} = this.props
        const {subject,setSubjectDispatch} = this.props
        if(Object.keys(subject).length == 0){
            setSubjectDispatch()
        }
        this.fetchData(data)
    }
    componentWillReceiveProps(){
        const {data} = this.props
        console.log(data)
        this.fetchData(data)
    }
    onFileChange(e){
        const {name,files} = e.target
        var files_array = []
        Object.keys(files).map(item => {
          files_array.push(files[item])
        })
        this.setState({
          files:files_array
        })
        const image_url = []
        if(Object.keys(files).length > 0){
          Object.keys(files).map(item => {
            image_url.push(URL.createObjectURL(files[item]))
          })
        }

        this.setState({
          data: { ...this.state.data, ["image_url"]: image_url },
        });
      }
    submit(){
        const {data,files} = this.state
        console.log(data,files)
            this.setState({
            update_button:"Updating HomeWork ..."
          })
          let formData = new FormData();    //formdata object
          Object.keys(data).map(item => {
            formData.append(item,data[item])
          })
          for (let i = 0; i < files.length; i++) {
            formData.append(`files[${i}]`, files[i])
          }
          console.log(formData)
    }
    onChange(e) {
        this.setState({
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
    }
    
    render(){
        const { subject } = this.props;
        const {data,errors,update_button} = this.state
        return(
            <CardComponent title="Edit HomeWork">
            {Object.keys(data).length > 0 ? 
                <Row>
                    <Col md="12" sm="12">
                        <FormGroup>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <Input name="title" onChange={(e) => this.onChange(e)} value={data.title}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Subtitle
                            </FormLabel>
                            <Input onChange={(e) => this.onChange(e)} name="subtitle" value={data.subtitle}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Subject</FormLabel>
                            <select
                                className="form-control"
                                value={data.subject}
                                onChange={(e) => this.onChange(e)}
                                name="subject"
                                >
                                            {Object.keys(subject).length > 0 &&
                                            subject.map((item,key) => {
                                            return <option key={key} value={item.id}>{item.subject_name}</option>;
                                            })}
                                </select>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Description
                            </FormLabel>
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
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Upload Files</FormLabel>
                        <UploadMutitpleMutiples onChange={this.onFileChange} name="files"/>
                            <PreviewFiles files={data.image_url}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Submission Date</FormLabel>
                            <Input type="date" name="submition_date" value={data.submition_date} onChange={(e) => this.onChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Status</FormLabel>
                            <Select name="status" value={data.status} onChange={(e) => this.onChange(e)}>
                                <option value="1">Open</option>
                                <option value="2">Closed</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Button warning onClick={e => this.submit()}>{update_button}</Button>
                        </FormGroup>
                    </Col>
                    
                </Row>
            : <h2>Loading ...</h2>}
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        subject:state.subjects
    };
}
export default connect(mapStateToProps,{setSubjectDispatch})(EditHomeWork);