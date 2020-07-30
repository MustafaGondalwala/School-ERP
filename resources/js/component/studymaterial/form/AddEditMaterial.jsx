import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import Row from "../../utils/Row";
import Col from "../../utils/Col";
import {
  Input,
  FormGroup,
  FormLabel,
  SelectOption,
  Button,
  Table,
  Thead,
  Select,
  PreviewAttachment,
  PreviewAttachmentFile
} from "../../utils/Components";
import InlineError from "../../utils/InlineError";
import api from "../../api";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import CkEditor from "../../utils/CkEditor";
import { setTeacherGroup } from "../../actions/study_material";


class AddEditMaterial extends Component {
    constructor(props) {
      super(props);
      this.initialData = {
        title: "",
        subtitle: "",
        description: "",
        group_id: "",
        attachments: [],
      }
      this.state = {
        data: this.initialData,
        errors: "",
      };
      this.onFileChange = this.onFileChange.bind(this);
      this.submit = this.submit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.deleteFunc = this.deleteFunc.bind(this);
      this.update = this.update.bind(this);
    }
  
    componentDidMount(){
        const {data,group_id} = this.props
        if(group_id){
          this.setState({
            data: { ...this.state.data, ["group_id"]: group_id },
          });
        }
        if(data){
            this.setState({
                data
            })
        }
    }
    onFileChange(e) {
      const files = e.currentTarget.files;
      const { attachments } = this.state.data;
      Array.from(files).forEach((file) => attachments.push(file));
      console.log(attachments)
      this.setState({
        attachments,
      });
    }
    validate(data) {
      const errors = {};
      if (!data.title) errors.title = "Can't be blank";
      if (!data.group_id) errors.group_id = "Can't be blank";
      return errors;
    }
    
    update(){
      const { data } = this.state;
      const errors = this.validate(data);
      this.setState({ errors });
      const { setTeacherGroup } = this.props;
      if (Object.keys(errors).length == 0) {
        const formData = new FormData();
        formData.append("id",data.id);
        formData.append("title", data.title);
        formData.append("subtitle", data.subtitle);
        formData.append("description", data.description);
        formData.append("group_id", data.group_id);

        //check for files ids
        data.attachments.map((file, id) => {
          if(file.id){
            formData.append(`attachments[${id}]`, JSON.stringify(file));
          }else
            formData.append(`attachments[${id}]`, file);
        });
        return api.adminteacher.study_material.teacher.material.update(formData)
        .then(data => {
            const {message,groups} = data
            setTeacherGroup(groups)
            Swal.fire("Success",message,"success")
        })
      }
    }



    submit() {
      const { data } = this.state;
      const errors = this.validate(data);
      this.setState({ errors });
      const { setTeacherGroup } = this.props;
      if (Object.keys(errors).length == 0) {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("subtitle", data.subtitle);
        formData.append("description", data.description);
        formData.append("group_id", data.group_id);
        data.attachments.map((file, id) => {
          formData.append(`attachments[${id}]`, file);
        });
        return api.adminteacher.study_material.teacher.material.add(formData)
        .then(data => {
            const {message,groups} = data
            this.setState({
              data:this.initialData
            })
            setTeacherGroup(groups)
            Swal.fire("Success",message,"success")
        })
      }
    }
  
    onChange(e) {
      const { name, value } = e.target;
      console.log(this.state.data.attachments)
      this.setState({
        data: { ...this.state.data, [name]: value },
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
    render() {
      const { groups,class_id,title,type } = this.props;
      const { data, errors } = this.state;
      var disabled = false
      if(type == 2)
        disabled = true
      return (
        <CardComponent title={title}>
          <Row>
            <Col md={4} sm={6}>
              <FormGroup>
                <FormLabel>Title*</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  value={data.title || ''}
                  onChange={this.onChange}
                  name="title"
                  placeholder="Title"
                />
              </FormGroup>
            </Col>
            <Col md={4} sm={6}>
              <FormGroup>
                <FormLabel>Sub-Title</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  value={data.subtitle || ''}
                  onChange={this.onChange}
                  name="subtitle"
                  placeholder="Sub-Title"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12}>
              <FormGroup>
                <FormLabel>Descriptions</FormLabel>
                <CkEditor
                value={data.description || ''}
                  disabled={disabled}
                  onChange={(data) => {
                    this.setState({
                      data: { ...this.state.data, ["description"]: data },
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
            <Row>
            <Col md={4} sm={4}>
              <FormGroup>
                <FormLabel>Attachment:</FormLabel>
               {type != 2 && 
                  <input
                    type="file"
                    onChange={(e) => this.onFileChange(e)}
                    className="form-control"
                    multiple
                  />
                }
              </FormGroup>
            </Col>
            <Col md={12} sm={12}>
              {(type == 1 && data.attachments)  && 
                <PreviewAttachment showDelete={true} deleteFunc={this.deleteFunc} attachments={data.attachments} />
              }
              {(type == 2  && data.attachments) && 
                <PreviewAttachmentFile showDelete={false} deleteFunc={this.deleteFunc} attachments={data.attachments} />
              }
              {(type == 3  && data.attachments) && 
                <PreviewAttachmentFile showDelete={true} deleteFunc={this.deleteFunc} attachments={data.attachments} />
              }
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormGroup>
          {type == 1 && 
                <Button primary onClick={this.submit}>
                  Add
                </Button>
          }
          {type == 3 && 
                <Button warning onClick={this.update}>
                  Update
                </Button>
          }
              </FormGroup>
            </Col>
          </Row>
        </CardComponent>
      );
    }
}



function mapStateToProps(state) {
    return {
      groups: state.studyMaterialGroup,
    };
  }
  
  export default connect(mapStateToProps,{setTeacherGroup})(AddEditMaterial);
  