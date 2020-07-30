import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import AddClass from "../utils/AddClass"
import AddSection from "../utils/AddSection"
import AddSubject from "../utils/AddSubject"
import UpdateEmpID from "../utils/UpdateEmpID"


export default class AdminHomePage extends Component{
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Setting"/>
                <div className="container-fluid mt--6">
                <div className="row">
                    <UpdateEmpID />
                    <AddSubject />
                    <AddClass />
                    <AddSection />
                </div>
                </div>
            </div>
        )
    }
}
