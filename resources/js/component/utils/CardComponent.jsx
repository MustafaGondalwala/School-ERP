import React,{Component} from "react"
import {Link} from "react-router-dom"
const CardComponent = ({title,back_link,children,add_object,custom_object}) => {
    return(
        <div className="card">
            <div className="card-header">
                <h3 className="card-title mb-3">
                    {title}
                    {back_link && 
                        <Link
                        to={back_link}
                        className="btn btn-neutral float-right"
                        type="submit"
                        >
                        Back
                        </Link>
                    }
                    {custom_object && {custom_object}}
                    {add_object && <button className="btn btn-neutral float-right" onClick={add_object.clickFunction}>{add_object.text}</button>}
                </h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default CardComponent