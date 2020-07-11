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
import { setGroup } from "../../actions/study_material";


class AddEditMaterial extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {
          title: "",
          subtitle: "",
          description: "",
          group: "",
          attachments: [],
        },
        errors: "",
      };
      this.onFileChange = this.onFileChange.bind(this);
      this.submit = this.submit.bind(this);
      this.onChange = this.onChange.bind(this);
    }
  
    componentDidMount(){
        console.log("this New")
        const {data} = this.props
        if(data){
            console.log(data)
            this.setState({
                data
            })
        }
    }
    onFileChange(e) {
      const files = e.currentTarget.files;
      const { attachments } = this.state.data;
      Array.from(files).forEach((file) => attachments.push(file));
      this.setState({
        attachments,
      });
    }
    validate(data) {
      const errors = {};
      if (!data.title) errors.title = "Can't be blank";
      if (!data.group) errors.group = "Can't be blank";
      return errors;
    }
  
    submit() {
      const { data } = this.state;
      const errors = this.validate(data);
      this.setState({ errors });
      const { class_id,setGroup } = this.props;
  
      if (Object.keys(errors).length == 0) {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("subtitle", data.subtitle);
        formData.append("description", data.description);
        formData.append("group", data.group);
        data.attachments.map((file, id) => {
          formData.append(`attachments[${id}]`, file);
        });
        api.adminteacher.study_material.material.add(class_id, formData).then(data => {
            console.log(data)
            const {message,groups} = data
            setGroup(groups,class_id)
        })
      }
    }
  
    onChange(e) {
      const { name, value } = e.target;
      this.setState({
        data: { ...this.state.data, [name]: value },
      });
    }
    render() {
      const { groups,class_id,title,type } = this.props;
      const { data, errors } = this.state;
      console.log(data.attachments)
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
          
          {type == 1 &&
            <Row>
            <Col md={6} sm={6}>
              <FormGroup>
                <FormLabel>Select Group</FormLabel>
                <Select
                  errors={errors}
                  value={data.group}
                  onChange={this.onChange}
                  name="group"
                >
                  <SelectOption>-- Select --</SelectOption>
                  {groups[class_id] !== undefined &&
                    groups[class_id].map((item, id) => {
                      return (
                        <SelectOption key={id} value={item.id}>
                          {item.group_name}
                        </SelectOption>
                      );
                    })}
                </Select>
              </FormGroup>
            </Col>
          </Row>
        }

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
            {type != 2 && 
              <PreviewAttachment attachments={data.attachments} />
            }
            {type == 2 && 
              <PreviewAttachmentFile attachments={data.attachments} />
            }
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Button primary onClick={this.submit}>
                  Submit
                </Button>
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
  
  export default connect(mapStateToProps,{setGroup})(AddEditMaterial);
  