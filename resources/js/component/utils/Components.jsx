import React, { Component } from "react"
import InlineError from "./InlineError"
import Row from "./Row"
import { render } from "react-dom"
import { Player } from 'video-react';


export const Button = ({primary,disabled,success,warning,danger,neutral,sm,lg,children,onClick,right,left,...rest}) => {
    var className=""
    if(primary)
        className="btn btn-primary"
    else if(success)
        className="btn btn-success"
    else if(warning)
        className="btn btn-warning"
    else if(danger)
        className="btn btn-danger"
    else if(neutral)
        className="btn btn-neutral"

    if(sm)
        className+=" btn-sm"
    else if(lg)
        className+=" btn-lg"
    if(right)
        className+=" float-right"
    else if(left)
        className+=" float-left"
    
    return(
        <button disabled={disabled} onClick={e => onClick(e)} className={className} {...rest}>{children}</button>
    )
}



const getFileType = (name) => {
    var fileSplit = name.split('.');
    var fileExt = '';
    if (fileSplit.length > 1) {
    fileExt = fileSplit[fileSplit.length - 1];
    } 
    return fileExt;
}

export const PreviewWithDeleteDownload = ({url,type,deleteFunction}) => {
    return(
        <Col md={3} sm={3} lg={3}>
            {type == 1 &&
                <span>
                    <img src={url} width="220" height="200" className="img-thumbnail img"/>
                </span>
            }
            {type == 2 &&
                <span>
                    <i class="fas fa-file-csv fa-7x"></i>
                </span>
            }
            {
                type == 3 && <i class="far fa-file-excel fa-7x"></i>
            }
            {
                type == 4 && <i class="far fa-file-pdf fa-7x"></i>
            }
            {
                type == 5 && <i class="fas fa-file-archive fa-7x"></i>
            }
            {
                type == 6 && <i class="fas fa-file-word fa-7x"></i>
            }
            {
                type == 7 && <i class="fab fa-html5 fa-7x"></i>
            }
            <br />
            <Button danger sm><i class="fas fa-trash-alt"></i></Button>
            <Button primary sm><i class="fas fa-cloud-download-alt"></i></Button>
            <br />
        </Col>
    )
}

export const PreviewAttachmentFile = ({attachments}) => {
    return(
        <Row>
            {
                 attachments && attachments.map((item,id) => {
                    var url = item.file_url
                    switch(item.extension){
                        case "jpg":
                        case "png":
                        case "jpeg":
                            return <PreviewWithDeleteDownload url={url} type={1}/>
                        case "csv":
                            return <PreviewWithDeleteDownload url={url} type={2}/>
                        case "xlsx":
                        case "xls":
                            return <PreviewWithDeleteDownload url={url} type={3} />
                        case "pdf":
                            return <PreviewWithDeleteDownload url={url} type={4}/>
                        case "zip":
                        case "rar":
                            return <PreviewWithDeleteDownload url={url} type={5}/>
                        case "doc":
                        case "txt":
                            return <PreviewWithDeleteDownload url={url} type={6}/>
                        case "htm":
                            return <PreviewWithDeleteDownload url={url} type={7}/>
                    }
                })
            }
        </Row>
    )
}
export const PreviewAttachment = ({attachments}) => {
    return(
        <div>
            {
                 attachments && attachments.map((item,id) => {
                    var extension = getFileType(item.name)
                    var url =  URL.createObjectURL(item)
                    switch(extension){
                        case "jpg":
                        case "png":
                        case "jpeg":
                            return <img src={url} className="img img-thumbnail"/>
                        case "csv":
                            return <p><i class="fas fa-file-csv"></i></p>
                        case "xlsx":
                        case "xls":
                            return <p><i class="far fa-file-excel fa-5x"></i></p>
                        case "pdf":
                            return <p><i class="far fa-file-pdf fa-5x"></i></p>
                        case "zip":
                        case "rar":
                            return <p><i class="far fa-file-archive fa-5x"></i></p>
                        case "doc":
                        case "txt":
                            return <p><i class="far fa-file-word fa-5x"></i></p>
                        case "mp4":
                        case "avi":
                        case "mov":
                        case "wmv":
                        case "flv":
                        case "webm":
                        case "mkv":
                        case "ogv":
                        case "3gp":
                            return <div>
                            <video width="620" height="440" controls>
                                <source src={url} type={"video/"+extension} />
                                Your browser does not support the video tag.
                                </video>
                            </div>
                    }
                })
            }

        </div>
    )
}
export const UploadInput = () => (
    <input type="file" className="form-control" />
)

export const UploadFile = ({name,onChange}) => (
    <input type="file" name={name} onChange={onChange} className="form-control" />
)
export const PreviewServerFiles = ({files}) => {
    return(
        <Row>
            {files && files.map(item => {
                return <Col md="3" sm="3">
                <img src={item.file_url} className="img img-fluid img-thumbnail"/></Col>
            })}
        </Row>
    )
}

export class UploadImage extends Component{
    constructor(props){
        super(props)
        this.state = {
            url:"",
            file:""
        }
        this.changeData = this.changeData.bind(this)
    }
    componentDidMount(){
        const {value,name} = this.props
        this.setState({
            url:value
        })
    }
  
    changeData(e){
        const file = e.target.files[0]
        var url = URL.createObjectURL(e.target.files[0])
        this.setState({url})
        this.props.onChange(e)
    }
    

    render(){
        const {onChange,name} = this.props
        const {url} = this.state
        return(
            <span>
                <input type="file" {... this.props} name={name} onChange={e => this.changeData(e)} accept='image/*' className="form-control" />
                {url  && 
                    <img src={url} className="img img-fluid img-thumbnail"/>
                }
            </span>
        )
    }
}

export const FormGroup = ({children}) => (
    <div className="form-group">
        {children}
    </div>
)

export const ButtonGroup = ({children}) => (
    <div className="btn-group" role="group">
        {children}
    </div>
)

export const UploadMutitpleMutiples = ({type="file",name,onChange,disabled,errors={}}) => {
    return(
        <input type={type} disabled={disabled} multiple name={name} onChange={e => onChange(e)} className="form-control"/>
    )
}

export const PreviewSingleImage = ({url}) => (
    <span>
        {(typeof url == "string" && url != "" && url != "null") && <img src={url} className="img img-thumbnail img-fluid"/>}
    </span>
)
export const PreviewFiles = ({download=false,files}) => {
    return(
        <Row>
            {files && files.map(item => {
                return  <Col md="6" sm="6" lg="3">
                <img src={item} className="img img-thumbnail img-fluid"/>
            </Col>
            })}
           
        </Row>
    )
}

export const Input = ({type="text",name,placeholder,value,onChange,disabled,errors={},...props}) => {
    return(
        <span>
        <input type={type} disabled={disabled} value={value} name={name} placeholder={placeholder} onChange={e => onChange(e)} className="form-control"/>
        {errors[name] && <InlineError text={errors[name]}/>}
        </span>
    )
}
export const Select = ({errors={},children,onChange,name,value,...rest}) => (
    <span>
        <select className="form-control" name={name} value={value} onChange={e => onChange(e)} {...rest}>
        {children}
    </select>
    {errors[name] && <InlineError text={errors[name]} />}
    </span>
)

export const SelectOption = ({children,selected,value, ...rest}) => (
    <option selected={selected} value={value} {...rest}>
        {children}
    </option>
)


export const FormLabel = ({children}) => (
    <label className="form-control-label">{children}</label>
)

export const RedLabel = ({children}) => {
    return(
        <h3 style={{color:"red"}}>
            {children}
        </h3>
    )
}
export const Col = ({md="",lg="",sm="",children}) => {
    var class_name = ""
    if(md != ""){
        class_name+="col-md-"+md
    }
    if(lg != ""){
        class_name+=" col-lg-"+lg
    }
    if(sm != ""){
        class_name+=" col-sm-"+sm
    }
    return(
        <div className={class_name}>
                {children}
        </div>
    )    
}

export const Table = ({children}) => (
    <div className="table-responsive">
            <table className="table">
                {children}
            </table>
    </div>
)

export const Thead = ({children}) => (
    <thead>
        <tr>
            {children}
        </tr>
    </thead>
)
