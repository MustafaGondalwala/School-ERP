import React, { Component } from "react"
import InlineError from "./InlineError"
import Row from "./Row"

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
                <input type="file" name={name} onChange={e => this.changeData(e)} accept='image/*' className="form-control" />
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
        {(typeof url == "string" && url != "") && <img src={url} className="img img-thumbnail img-fluid"/>}
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

export const Input = ({type="text",name,placeholder,value,onChange,disabled,errors={}}) => {
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

export const SelectOption = ({children,selected,value}) => (
    <option selected={selected} key={Math.random()} value={value}>
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
