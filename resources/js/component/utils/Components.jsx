import React from "react"

export const Button = ({primary,success,warning,danger,neutral,sm,lg,children,onClick,right,left}) => {
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
        <button onClick={e => onClick(e)} className={className}>{children}</button>
    )
}
export const UploadInput = () => (
    <input type="file" className="form-control" />
)

export const UploadFile = () => (
    <input type="file" className="form-control" />
)


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

export const Input = ({type="text",name,placeholder,value,onChange,disabled}) => {
    
    return(
        <input type={type} disabled={disabled} value={value} name={name} placeholder={placeholder} onChange={e => onChange(e)} className="form-control"/>
    )
}
export const Select = ({children,onChange,name,value}) => (
    <select className="form-control" name={name} value={value} onChange={e => onChange}>
        {children}
    </select>
)

export const SelectOption = ({children,selected,value}) => (
    <option selected={selected} value={value}>
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
