import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import SetDueDateForm from "../form/SetDueDateForm"

export default class FeeSetDueDate extends Component{
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Fee" header="Set Dute Date"/>
                <div className="container-fluid mt--6">
                    <SetDueDateForm />
                </div>
            </div>
        )
    }
}