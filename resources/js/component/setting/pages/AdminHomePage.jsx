import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import AddClass from "../utils/AddClass"
import AddSection from "../utils/AddSection"
import AddSubject from "../utils/AddSubject"
import UpdateEmpID from "../utils/UpdateEmpID"
import EmptyHeader from "../../utils/EmptyHeader"
import ChangeYear from "../utils/ChangeYear"


export default class AdminHomePage extends Component{
    render(){
        return(
            <div>
             <EmptyHeader mainHeader="Setting"/>
                <div className="container-fluid mt--6">
                <div className="row">
                    <ChangeYear />
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
