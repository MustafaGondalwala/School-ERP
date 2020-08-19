import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { Col, FormGroup, FormLabel, PreviewAttachment,Input, Button, PreviewAttachmentFile } from "../../utils/Components"
import CkEditor from "../../utils/CkEditor"
import { connect } from "react-redux";
import InlineError from "../../utils/InlineError"
import {setStudentCurrentHomeWorkDispatch,setStudentCurrentHomeWork} from "../../actions/homework"

class HomeWorkSubmittion extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                description:"",
                attachments:[]
            },
            errror:""
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.deleteFunc = this.deleteFunc.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount(){
        const {data,disabled} = this.props
        if(disabled == true)
            this.setState({
                data
            })
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
    onFileChange(e) {
        const files = e.currentTarget.files;
        const attachments = []
        Array.from(files).forEach((file) => attachments.push(file));
        this.setState({
          data: { ...this.state.data, ["attachments"]: attachments },
        });
    }
    submit(){
        const {data} = this.state
        var error = ""
        if(data.description == ""){
            error = "Cannot be Empty"
        }
        this.setState({error})
        if(error == ""){
            this.props.submit(data).then(data => {
                console.log(data)
            })
        }
    }
    render(){
        const {data,error} = this.state
        const {disabled} = this.props
        return(
            <CardComponent title="HomeWork Submittion">
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <CkEditor disabled={disabled} value={data.description} onChange={value => {
                                    this.setState({
                                    data: { ...this.state.data, ["description"]: value },
                                    });
                            }}/>
                            {error && <InlineError text={error}/>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Upload Documents</FormLabel>
                            {
                                disabled == false &&
                                <Input multiple name="upload_files" type="file" onChange={this.onFileChange}/>
                            }
                            {disabled == true ? <PreviewAttachmentFile showDelete={false} attachments={data.attachments} /> :
                                <PreviewAttachment showDelete={true} deleteFunc={this.deleteFunc} attachments={data.attachments} />
                            }
                        </FormGroup>
                    </Col>
                </Row>
                {
                    disabled == false &&
                    <Row>
                        <Col>
                            <Button onClick={this.submit} primary sm>Sumit</Button>
                        </Col>
                    </Row>
                }

            </CardComponent>
        )
    }
}
function mapStateToProps(state) {
    return {
        studentCurrent_homework:state.studentCurrent_homework
    };
}

export default connect(mapStateToProps,{setStudentCurrentHomeWorkDispatch,setStudentCurrentHomeWork})(HomeWorkSubmittion);
// export default HomeWorkSubmittion