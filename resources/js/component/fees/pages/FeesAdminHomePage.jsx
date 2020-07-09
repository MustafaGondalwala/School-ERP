import React, { Component } from "react";
import AdminHeader from "../header/AdminHeader";
import CardComponent from "../../utils/CardComponent";
import ColComponent from "../../utils/ColComponent";
export default class FeesAdminHomePage extends Component {
  render() {
    return (
      <div>
        <AdminHeader mainHeader="Home" header="Fees" />
        <div className="container-fluid mt--6">
          <div className="card-deck flex-column flex-xl-row">
            <CardComponent title="Update Fees Type">
            <div className="row card-wrapper">
              <ColComponent
                title="Set Fee Installments"
                description="Set the Total Numbe of Fee Installments"
                link="/admin/fees/set-installments"
                button_text="Set"
              />
              <ColComponent
              title="Set Fee Type per Classes"
              description="Set Fee Type"
              link="/admin/fees/fee-type"
              button_text="Set"
            />
            </div>
            </CardComponent>
          </div>
          <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Pay Fees">
          <div className="row card-wrapper">
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
          </div>
          </CardComponent>>
          </div>
          <div className="card-deck flex-column flex-xl-row">
            <CardComponent title="Pending Fees">
          <div className="row card-wrapper">
                <ColComponent
                title="Pending Fees"
                description="Check Total Pending Fees"
                link="/admin/fees/pending-fees"
                button_text="View"
                />
                <ColComponent
                title="Set Fee Due Date"
                description="Set the Due date for Fee Payments."
                link="/admin/fees/set-due-dates"
                button_text="Set"
              />  
            </div>

            </CardComponent>

          </div>
          <div className="card-deck flex-column flex-xl-row">
            <CardComponent title="Set Fees">
              <div className="row card-wrapper">
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
              </div>
            </CardComponent>
          </div>
          <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Manage Clerk">
            <div className="row card-wrapper">
              <ColComponent
                title="Add/Edit/View Clerk"
                description="Add/Edit/View Clerk"
                link="/admin/student/clerk"
                button_text="Manage"
              />
              <ColComponent
                title="Change Password"
                description="Update Password of Clerk"
                link="/admin/clerk/changepassword"
                button_text="View"
              />
            </div>
          </CardComponent>
        </div>
          <div className="card-deck flex-column flex-xl-row">
            <CardComponent title="Report">
              <div className="row card-wrapper">
                <ColComponent
                  title="Daily/Weekly/Monthly Fee Collection"
                  link="/admin/fees/collection"
                  button_text="Add"
                />
                <ColComponent
                  title="Login Wise Collection"
                  link="/admin/student/collection/loginwise"
                  button_text="View"
                />
                <ColComponent
                  title="ClassWise Collection"
                  link="/admin/student/collection/classwise"
                  button_text="View"
                />
                <ColComponent
                  title="Pending Fees"
                  link="/admin/student/collection/classwise"
                  button_text="View"
                />
              </div>
            </CardComponent>
          </div>
        </div>
      </div>
    );
  }
}
