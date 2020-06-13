import React,{Component} from "react"
import {Link} from "react-router-dom"
import { Button } from "./Components"
const CardComponent = ({title,back_link,children,add_object,custom_object,print,download}) => {
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
                    {print && <Button right sm primary>Print</Button>}
                    {download && <Button right sm neutral>Download</Button>}

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