import React from "react"

const Col = ({md="",lg="",sm="",children}) => {
    var class_name = ""
    if(md != undefined){
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
export default Col