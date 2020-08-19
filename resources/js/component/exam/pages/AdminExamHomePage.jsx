import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import CardComponent from "../../utils/CardComponent"

const AdminHomePage = () => (
    <div>
        <AdminHeader mainHeader="Exam" header="Home"/>
        <BodyComponent>
            <div className="row">
                
                <ColComponent title="Fill Exam Marksheet" description="Fill Marksheet for Exam" link="/admin/fillmarksheet/exam" button_text="Enter"/>
                <ColComponent title="View/Print Report" description="Fill Marksheet for Monthly Tets" link="/admin/fillmarksheet/test" button_text="Enter"/>
            </div>
            <div className="card-deck flex-column flex-xl-row">
                <CardComponent title="Exam HallTicket">
                    <div className="row card-wrapper">
                        <ColComponent title="Class Hall Ticket" description="Add/Edit/Print Exam Hall Ticket" link="/admin/hallticket/class" button_text="Enter"/>
                        <ColComponent title="Individual Hall Ticket" description="View/Print Hall Ticket" link="/admin/hallticket/individual" button_text="Enter"/>
                    </div>
                </CardComponent>
            </div>
            <div className="card-deck flex-column flex-xl-row">
                <CardComponent title="Settings">
                    <div className="row card-wrapper">
                        <ColComponent title="Allocate Subjects to Class" description="Add/Edit/View Subject to Class" link="/admin/exam/allocate-subject" button_text="Enter"/>
                        <ColComponent title="Exam Type" description="View/Add/Edit Exam Type" link="/admin/exam/exam-type" button_text="Enter"/>
                        <ColComponent title="Grade Type" description="Update Grade Type" link="/admin/exam/grade-type" button_text="Enter"/>
                    
                    </div>
                </CardComponent>
            </div>
        </BodyComponent>
    </div>
)
export default AdminHomePage