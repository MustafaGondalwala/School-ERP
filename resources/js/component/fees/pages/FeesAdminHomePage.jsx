import React, {Component} from "react"
import AdminHeader from "../header/AdminHeader"
import ColComponent from "../../utils/ColComponent"
export default class FeesAdminHomePage extends Component{
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Home" header="Fees"/>
                <div className="container-fluid mt--6">
                    <div className="row">
                        <ColComponent
                        title="Set Fee Installments"
                        description="Set the Total Numbe of Fee Installments"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                        />
                        <ColComponent
                        title="Set Fee Due Date"
                        description="Set the Due date for Fee Payments."
                        link="/admin/fees/set-due-dates"
                        button_text="Set"
                        />
                        <ColComponent
                        title="Set Fee"
                        description="Set Fees For Individual"
                        link="/admin/fees/set-fees-individual"
                        button_text="Set"
                        />
                        <ColComponent
                        title="Set Fee Class Wise"
                        description="Set Fees For Class Wise"
                        link="/admin/fees/set-fees-class-wise"
                        button_text="Set"
                        />
                        <ColComponent
                        title="Pay Fees"
                        description="Pay Fees for Individual Student"
                        link="/admin/fees/pay-fees"
                        button_text="Pay"
                        />
                        <ColComponent
                        title="View/Print Receipt"
                        description="View/Print The Fees Receipt for Student"
                        link="/admin/fees/view-receipt"
                        button_text="View"
                        />
                        <ColComponent
                        title="Manage Login"
                        description="Manage Clerk Login"
                        link="/admin/fees/manage-clerk-login"
                        button_text="Manage"
                        />
                    </div>
                </div>
            </div>
        )
    }
}