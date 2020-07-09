import React, { Component,Suspense } from "react"
import CardComponent from "../../utils/CardComponent"
const CkEditor = React.lazy(() => import("../../utils/CkEditor")) 
import Row from "../../utils/Row"
import { FormGroup, FormLabel, Input, Col,UploadImage, Button, Select, SelectOption, Table, PreviewFiles, PreviewSingleImage } from "../../utils/Components"
import InlineError from "../../utils/InlineError"

export default class AdminAddForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                title:"",
                body:"",
                image:"",
                checked:{
                    parent:false,
                    staff:false,
                    student:false
                },
                publish:false,
            },
            errors:"",
            button_text:"",
        }
        this.bodyChange = this.bodyChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
    }
    onCheckboxChange(e){
        const {name,value} = e.target
        if(name == "publish"){
            this.setState({
                data: {...this.state.data,["publish"]: !this.state.data.publish}
            })
            return
        }
        const current = this.state.data.checked
        current[name] = !current[name]
        this.setState({
            data: {...this.state.data,["checked"]: current}
        })
    }
    componentDidMount(){
        const {type,data} = this.props
        if(type == 1){
            this.setState({
                button_text:"Add"
            })
        }else{
            this.setState({
                button_text:"Update"
            })
        }
        if(data){
            this.setState({
                data
            })
        }

    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    onFileChange(e){
      const {name,files} = e.target
      this.setState({
        data: {...this.state.data,["image"]: files[0]}
      })
    }
    bodyChange(data){
        this.setState({
            data: {...this.state.data,["body"]: data}
        })
    }
    validate(data){
        const errors = {};
        if (!data.title) errors.title = "Can't be blank";
        if (!data.body) errors.body = "Can't be blank";
        const {parent,staff,student} = data.checked
        if(parent == false && staff == false && student == false){
            errors.check = "Can't be blank";   
        }
        return errors;
    }
    submit(){
       const {data} = this.state
       const errors = this.validate(data)
       this.setState({ errors })
       if(Object.keys(errors).length == 0){
           
            const {type} = this.props
            if(type == 1){
                this.setState({
                    button_text:"Adding .."
                })
            }else{
                this.setState({
                    button_text:"Updating .."
                })
            }
            
            this.props.submit(data).then(data => {
                if(type == 1)
                {
                    const new_data = {
                        title:"",
                        body:"",
                        image:"",
                        checked:{
                            parent:false,
                            staff:false,
                            student:false
                        },
                        publish:false,
                    } 
                    this.setState({
                        button_text:"Add",
                        data:new_data
                    })
                }else if(type == 2){
                    this.setState({
                        button_text:"Update"
                    })
                }

            })
       }
    }
    render(){
        const {data,button_text,errors} = this.state
        const {title,back_link,type} = this.props
        var disabled = false
        if(type == 3){
            disabled = true
        }
        return(
            <CardComponent title={title} back_link={back_link}>
                        <Row>
                            <Col md="6" sm="6">
                                <FormGroup>
                                    <FormLabel>Title</FormLabel>
                                    <Input name="title" disabled={disabled} errors={errors} placeholder="Title" onChange={this.onChange}  value={data.title}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="8" sm="8">
                                <FormGroup>
                                    <FormLabel>Body</FormLabel>
                                    {type != 3 ? <Suspense fallback={<h1>Loading ...</h1>}>
                                        <CkEditor disabled={disabled} onChange={this.bodyChange}  value={data.body}/>
                                        {errors.body && <InlineError text={errors.body}/>}
                                    </Suspense> : <div dangerouslySetInnerHTML={{ __html: data.body}} /> }
                                </FormGroup>
                            </Col>  
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormLabel>Attachment (Image)</FormLabel>
                                {type != 3 && <UploadImage name="image" onChange={this.onFileChange}/>}
                                {typeof data.image_url == "string" && <PreviewSingleImage url={data.image_url}/>}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="8" sm="8">
                            <FormGroup>
                                <FormLabel>Send To: </FormLabel>
                                <br />
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>Staff</td>
                                            <td>
                                                <input disabled={disabled} type="checkbox" name="staff" onChange={this.onCheckboxChange} checked={data.checked.staff} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Parents</td>
                                            <td>
                                                <input disabled={disabled} type="checkbox" name="parent" onChange={this.onCheckboxChange} checked={data.checked.parent} />
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>Student</td>
                                        <td>
                                            <input disabled={disabled} type="checkbox" name="student" onChange={this.onCheckboxChange} checked={data.checked.student} />
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                                {errors.check && <InlineError text={errors.check} />}
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <FormGroup>
                                <FormLabel>Publish </FormLabel>
                                <br />
                                <Table>
                                    <tbody>
                                        <tr>
                                           <td>
                                            <input disabled={disabled} type="checkbox" name="publish" onChange={this.onCheckboxChange} checked={data.publish} />
                                           </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <InlineError text={"Note: Notice will send by SMS and seen in Each Panel"}/>
                            </FormGroup>
                        </Row>
                        {type != 3 &&
                            <Row>
                                <Col md="6" sm="6">
                                    <Button primary onClick={this.submit}>{button_text}</Button>
                                </Col>
                            </Row>
                        }
                    </CardComponent>
        )
    }
}