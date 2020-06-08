import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import AddFeeType from "../utils/AddFeeType"
import AddClass from "../utils/AddClass"
import AddSection from "../utils/AddSection"
import AddClassPeriod from "../utils/AddClassPeriod"



export default class AdminHomePage extends Component{
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Setting"/>
                <div className="container-fluid mt--6">
                <div className="row">
                    <AddFeeType />
                    <AddClass />
                    <AddSection />
                    <AddClassPeriod />

                </div>

                </div>
            </div>
        )
    }
}
