import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"

const AdminHomePage = () => (
    <div>
        <AdminHeader mainHeader="Exam" header="Home"/>
        <BodyComponent>
            <div className="row">
            <ColComponent title="Class Hall Ticket" description="Add/Edit Hall Ticket" link="/admin/hallticket/class" button_text="Enter"/>
            <ColComponent title="Individual Hall Ticket" description="Add/Edit Hall Ticket" link="/admin/hallticket/individual" button_text="Enter"/>

            <ColComponent title="Fill Exam Marksheet" description="Fill Marksheet for Exam" link="/admin/fillmarksheet/exam" button_text="Enter"/>
            <ColComponent title="Fill Monthly Test Marksheet" description="Fill Marksheet for Monthly Tets" link="/admin/fillmarksheet/test" button_text="Enter"/>

            <ColComponent title="View/Print Report" description="Fill Marksheet for Monthly Tets" link="/admin/fillmarksheet/test" button_text="Enter"/>

            </div>
        </BodyComponent>
    </div>
)
export default AdminHomePage