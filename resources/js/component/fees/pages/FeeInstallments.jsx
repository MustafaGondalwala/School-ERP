import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import {Link} from "react-router-dom"
import api from "../../api"
import SetInstallments from "../form/SetInstallments"
import Swal from "sweetalert2";

export default class FeeInstallments extends Component{
    constructor(props){
        super(props)
        this.state = {
            button_text : "Update"
        }
    }
    submit(total_installments){
        return api.admin.fee.update_installments(total_installments).then(data => {
            Swal.fire("Success","Fee Installments Updated!!","success");
        })
    }
    render(){
        const {button_text} = this.state
        return(
            <div>
                <AdminHeader mainHeader="Fee" header="Set Fee Installments"/>
                <div className="container-fluid mt--6">
                    <SetInstallments submit={this.submit} button_text={button_text}/>
                </div>
            </div>
        )
    }
}