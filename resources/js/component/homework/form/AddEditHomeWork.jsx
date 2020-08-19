import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { Col, FormGroup, FormLabel, Input, PreviewAttachment, Button, Select, SelectOption, RedLabel, PreviewAttachmentFile } from "../../utils/Components"
import CkEditor from "../../utils/CkEditor"
import { error } from "jquery"
import InlineError from "../../utils/InlineError"
import GetClassId from "../../utils/GetClassId"
import { connect } from "react-redux";

import { setClasswiseSubjectsDispatch } from "../../actions/classwiseSubject";
import { upperFirst } from "lodash"

class AddEditHomeWork extends Component{
    constructor(props){
        super(props)
        this.initialData = {
            title:"",
            subtitle:"",
            subject:"",
            attachments:[],
            description:"",
            submission_date:"",
            class_id:""
        }

        this.state = {
            data: this.initialData,
            button_text : "Add",
            disabled:false,
            errors : {},
            title: "Add HomeWork"
        }
        this.onChange = this.onChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.deleteFunc = this.deleteFunc.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        const {type} = this.props
        if(type == 2){
            const {data} = this.props
            this.props.setClasswiseSubjectsDispatch(data.class_id)
            this.setState({
                button_text:"Update"
                ,data,
                title:"Edit HomeWork"
            })
        }
        if(type == 3){
            const {data} = this.props
            this.props.setClasswiseSubjectsDispatch(data.class_id)
            this.setState({
                data,
                title:"View HomeWork",
                disabled:true
            })
        }
    }
    onChange(e) {
        const {name,value} = e.target
        this.setState({
          data: { ...this.state.data, [name]: value },
        });
    }
    onFileChange(e) {
        const files = e.currentTarget.files;
        const { attachments } = this.state.data;
        Array.from(files).forEach((file) => attachments.push(file));
        this.setState({
          attachments,
        });
    }
    deleteFunc(nameOrId,type){
        const {attachments} = this.state.data
        var newAttachments = ""
        if(type == 1)
          newAttachments = attachments.filter(item => item.name != nameOrId)
        else
          newAttachments = attachments.filter(item => item.id != nameOrId)
        this.setState({
          data: { ...this.state.data, ["attachments"]: newAttachments },
        });
    }

    validate(data) {
        const errors = {};
        if (!data.title) errors.title = "Can't be blank";
        if (!data.subtitle) errors.subtitle = "Can't be blank";
        if (!data.description) errors.description = "Can't be blank";
        if (!data.submission_date) errors.submission_date = "Can't be blank";
        if (!data.subject_id) errors.subject_id = "Can't be blank";
        if (data.title.length < 3) errors.title = "Min. Length 3 char.";
        if (data.description.length < 3) errors.description = "Min. Length 5 char.";
        return errors;
      }

    submit(){
        const {type} = this.props
        const {data} = this.state 
        const errors = this.validate(data);
        this.setState({ errors });
        if(Object.keys(errors).length == 0){

            let formData = new FormData(); 
            console.log(data)
            Object.keys(data).map(item => {
            formData.append(item,data[item])
            })

            data.attachments.map((file, id) => {
                if(file.id){
                  formData.append(`attachments[${id}]`, JSON.stringify(file));
                }else
                  formData.append(`attachments[${id}]`, file);
              });
            if(type == 2)
                this.setState({
                    button_text:"Updating ..."
                })
            else
                this.setState({
                    button_text:"Adding ..."
                })
            this.props.submit(formData).then(data => {
                if(type == 2){
                    this.setState({
                        button_text:"Edit"
                    })
                }else{
                    this.setState({
                        data:this.initialData,
                        button_text:"Add"
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    render(){
        const {data,button_text,errors,disabled,title} = this.state
        const {back_link,type,classwiseSubject} = this.props
        return(
            <CardComponent title={title} back_link={back_link}>
                <Row>
                    <Col md={12} sm={12} lg={12}>
                                {disabled && <p>{data.class_id}</p>}
                                <GetClassId disabled={disabled} class_id={data.class_id} errors={errors} sendClassId={class_id => {
                                    this.setState({
                                        data: { ...this.state.data, ["class_id"]: class_id },
                                    },() => {
                                        if (classwiseSubject[class_id] == undefined) {
                                            this.props.setClasswiseSubjectsDispatch(class_id)
                                        }
                                    });
                                }} class_id={data.class_id}/>
                    </Col>
                    <br />
                    <br />
                    <Col md={12} sm={12} lg={12}>
                        <FormGroup>
                            <FormLabel>Title</FormLabel>
                            <Input disabled={disabled} errors={errors} name="title" placeholder="Title" onChange={this.onChange} value={data.title}/>
                        </FormGroup>
                    </Col>
                    <Col md={12} sm={12} lg={12}>
                        <FormGroup>
                            <FormLabel>Subtitle</FormLabel>
                            <Input disabled={disabled} errors={errors} name="subtitle" placeholder="Sub-Title" onChange={this.onChange} value={data.subtitle}/>
                        </FormGroup>
                    </Col>
                    <Col md={12} sm={12} lg={12}>
                        <FormGroup>
                            <FormLabel>Description:</FormLabel>
                            <CkEditor disabled={disabled} value={data.description} onChange={value => {
                                console.log(value)
                                    this.setState({
                                    data: { ...this.state.data, ["description"]: value },
                                    });
                                  
                            }}/>
                            {errors.description && <InlineError text={errors.description}/>}
                        </FormGroup>
                    </Col>
                    <Col md={12} sm={12} lg={12}>
                        <FormGroup>
                            <FormLabel>Upload Files:</FormLabel>
                            
                            {(type == 1 || type == 2) &&
                                <Input disabled={disabled} multiple name="upload_files" type="file" onChange={this.onFileChange} value={data.upload_files}/>
                            }
                            {  type == 3 && 
                                <PreviewAttachmentFile showDelete={false} deleteFunc={this.deleteFunc} attachments={data.attachments} />
                            }
                            { (type == 2 || type == 1)  && 
                                <PreviewAttachmentFile showDelete={true} deleteFunc={this.deleteFunc} attachments={data.attachments} />
                            }
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={6}>
                                    <FormGroup>
                                        <FormLabel>Select Subject</FormLabel>
                                        {data.class_id ?
                                        <Select disabled={disabled} errors={errors} name="subject_id" value={data.subject_id} onChange={this.onChange}>
                                            <SelectOption value=''> -- Select --</SelectOption>
                                            {classwiseSubject[data.class_id] !== undefined &&
                                                classwiseSubject[data.class_id].map((item, id) => {
                                                    return (
                                                    <SelectOption key={id} value={item.id}>
                                                        {item.subject.subject_name}
                                                    </SelectOption>
                                                    );
                                            })}
                                        </Select>
                                        : <RedLabel>Please Select Class</RedLabel>}
                                    </FormGroup>
                                </Col> 
                    <Col md={12} sm={12} lg={12}>
                        <FormGroup>
                            <FormLabel>Submission Date:</FormLabel>
                            <Input disabled={disabled} errors={errors} type="date" name="submission_date" placeholder="Submission Date" onChange={this.onChange} value={data.submission_date}/>
                        </FormGroup>
                    </Col>
                    <Col md={12} sm={12} lg={12}>
                        <FormGroup>
                            {type == 1 && <Button primary onClick={this.submit}>{ button_text }</Button> }
                            {type == 2 && <Button warning onClick={this.submit}>{ button_text }</Button> }
                        </FormGroup>
                    </Col>
                    
                </Row>
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
      classwiseSubject:state.classwiseSubject
    };
  }
  
export default connect(mapStateToProps, {
    setClasswiseSubjectsDispatch,
})(AddEditHomeWork);
