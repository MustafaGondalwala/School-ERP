import React, { Component } from "react"
import InlineError from "./InlineError"
import Row from "./Row"
import { render } from "react-dom"
import { Player } from 'video-react';
import shortid from "shortid";


export const userTypeString = (userTypeInt) => {
    switch(userTypeInt){
        case "3":
        case 3:
            return "parent";            
    }
}

export const getOnlineTestStatusText = (status) => {
    switch(status){
        case 1:
            return "Attended";
            break;
    }
}

export const getLeaveStatus = (status) => {
    switch(status){
        case 1:
            return "Pending ...";
            break;
        case 2:
            return "Accepted";
        case 3:
            return "Rejected";
    }
}


export const getGrade = (gradeType,total_marks,max_marks) => {
    var percentage = (total_marks / max_marks) * 100
    var grade = ""
    gradeType.map(item => {
        if(item.percentage >= percentage && item.percentage <= percentage){
            grade = item.grade
        }
    })
    return grade;
}

export const homeWorkStatus = (status) => {
    switch(status){
        case 1:
            return "Pending"
            break;
        case 2:
            return "Completed"
            break;
        case 4:
            return "Submitted"
            break;
        case 5:
            return "Rejected"
            break;
        case 6:
            return "Closed"
            break;
    }
}

export const getKey = () => {
    return shortid.generate()
}

export const TR = ({children}) => (
    <tr key={shortid.generate()}>
        {children}
    </tr>
)

export const convert24hrto12hr = (timeString) => {
    return new Date('1970-01-01T' + timeString + 'Z')
    .toLocaleTimeString({},
      {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
    );
}


export const getQuestionType = (question_type) => {
    switch(question_type){
        case 1:
            return "Mutitple Choice Question"
            break;
        case 2:
            return "True or False"
            break;
        case 3:
            return "Fill in Blanks"
            break;
        case 4:
            return "Short Question"
            break;
        case 5:
            return "Long Question"
            break
    }
}
export const checkExamDateTime = (examDate,startTime,endTime) => {
    var isToday = new Date().toDateString() == new Date(examDate).toDateString();
    if(isToday == true){
        var startTime = startTime.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
        var endTime = endTime.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
        if(startTime[1] == new Date().getHours()){
            if(parseInt(startTime[3]) <= new Date().getMinutes()){
                return true
            }
            // console.log(new Date().getMinutes(),parseInt(startTime[3]));
            // console.log(new Date().getMinutes(),startTime[3])
        }
    }
    return false
}
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

export const PreviewWithDeleteDownload = ({url,showDelete,type,deleteFunction}) => {
    return(
        <Col md={3} sm={6} lg={6} key={getKey()}>
            {type == 1 &&
                <span>
                    <img src={url} width="220" height="200" className="img-thumbnail img"/>
                </span>
            }
            {type == 2 &&
                <span>
                    <i className="fas fa-file-csv fa-7x"></i>
                </span>
            }
            {
                type == 3 && <i className="far fa-file-excel fa-7x"></i>
            }
            {
                type == 4 && <i className="far fa-file-pdf fa-7x"></i>
            }
            {
                type == 5 && <i className="fas fa-file-archive fa-7x"></i>
            }
            {
                type == 6 && <i className="fas fa-file-word fa-7x"></i>
            }
            {
                type == 7 && <i className="fab fa-html5 fa-7x"></i>
            }
            {   type == 8 && <video width="500" height="350" controls>
                            <source src={url} type={"video/mp4"} />
                            Your browser does not support the video tag.
                            </video>
            }
                <span>
                <br />
                {showDelete && 
                    <Button danger sm onClick={deleteFunction}><i className="fas fa-trash-alt"></i></Button>
                }
                
                <a className="btn btn-primary btn-sm" download target="_blank" href={url}><i className="fas fa-cloud-download-alt"></i></a>
                <br />
                </span>
        </Col>
    )
}

export const PreviewAttachmentFile = ({attachments,deleteFunc,showDelete=false}) => {
    return(
        <Row>
            {
                 attachments && attachments.map((item,id) => {
                    var url = item.file_url
                    var extension = item.extension
                    var delete_text = item.id
                    var delete_type = 2
                     if(item.lastModified){
                        extension = getFileType(item.name)
                        url =  URL.createObjectURL(item)
                        delete_text = item.name
                        delete_type = 1
                     }
                    switch(extension){
                        case "jpg":
                        case "png":
                        case "jpeg":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(delete_text,delete_type)} type={1}/>
                        case "csv":
                            return <PreviewWithDeleteDownload showDelete={showDelete} deleteFunction={() => deleteFunc(delete_text,delete_type)} url={url} type={2}/>
                        case "xlsx":
                        case "xls":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(delete_text,delete_type)} type={3} />
                        case "pdf":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(delete_text,delete_type)} type={4}/>
                        case "zip":
                        case "rar":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(delete_text,delete_type)} type={5}/>
                        case "doc":
                        case "txt":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(delete_text,delete_type)} type={6}/>
                        case "htm":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(delete_text,delete_type)} type={7}/>
                            break
                        case "mp3":
                        case "mp4":
                        case "avi":
                        case "mov":
                        case "mpg":
                        case "wmv":
                        case "3g2":
                        case "3gp":
                        case "ogv":
                        case "mkv":
                        case "webm":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(delete_text,delete_type)} type={8}/>
                            break
                    }
                })
            }
        </Row>
    )
}
export const PreviewAttachment = ({attachments,showDelete,deleteFunc}) => {
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
                            return <PreviewWithDeleteDownload showDelete={showDelete} deleteFunction={() => deleteFunc(item.name,1)} url={url} type={1}/>
                        case "csv":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(item.name,1)} type={2}/>
                        case "xlsx":
                        case "xls":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(item.name,1)} type={3} />
                        case "pdf":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(item.name,1)} type={4}/>
                        case "zip":
                        case "rar":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(item.name,1)}  type={5}/>
                        case "doc":
                        case "txt":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(item.name,1)} type={6}/>
                        case "htm":
                            return <PreviewWithDeleteDownload showDelete={showDelete} url={url} deleteFunction={() => deleteFunc(item.name,1)} type={7}/>
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
        <input type={type} disabled={disabled} value={value} name={name} placeholder={placeholder} onChange={e => onChange(e)} className="form-control" {...props}/>
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
