import React, { Component } from "react";
import ColComponent from "../../utils/ColComponent";
import CardComponent from "../../utils/CardComponent";
import BodyComponent from "../../utils/BodyComponent";
import TopBreadCrumb from "../../utils/TopBreadcrumb";
import AdminStudentHeader from "../../header/admin/AdminStudentHeader";

const StudentHomePage = () => {
  return (
    <div>
    <TopBreadCrumb mainHeader="Student" header="Home">
    <AdminStudentHeader />
    </TopBreadCrumb>
      <BodyComponent>
        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Register">
            <div className="row card-wrapper">
              <ColComponent
                title="Registration"
                description="Add New Student in System"
                link="/admin/student/register-student"
                button_text="Add"
              />
              <ColComponent
                title="Register List"
                description="View Student in System"
                link="/admin/student/register-student-list"
                button_text="View"
              />
              <ColComponent
                title="Bulk Register Student"
                description="View Student in System"
                link="/admin/student/register-student-bulk"
                button_text="View"
              />
            </div>
          </CardComponent>
        </div>

        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Admission">
            <div className="row card-wrapper">
              <ColComponent
                title="Admission"
                description="Add New Admission in System"
                link="/admin/student/admission-student"
                button_text="Add"
              />
              <ColComponent
                title="Admission List"
                description="View Student in System"
                link="/admin/student/student-admission-list"
                button_text="View"
              />
              <ColComponent
                title="Bulk Admission Student"
                description="View Student in System"
                link="/admin/student/student-admission-bulk"
                button_text="View"
              />
            </div>
          </CardComponent>
        </div>

        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Profile Update">
            <div className="row card-wrapper">
              {/* <ColComponent
                title="Profile Update"
                description="Student Profile Update in System"
                link="/admin/student/student-profile-update"
                button_text="Enter"
              /> */}
              <ColComponent
                title="Profile Images"
                description="Image Update of Student in System"
                link="/admin/student/student-profile-image"
                button_text="View"
              />
            </div>
          </CardComponent>
        </div>

        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="View">
            <div className="row card-wrapper">
              <ColComponent
                title="Student Advanced Search"
                description="Filter Student in System"
                link="/admin/student/student-advanced-search"
                button_text="View"
              />
              <ColComponent
                title="Student ColumnWise"
                description="Download Csv ColumnsWise in System"
                link="/admin/student/register-student-bulk"
                button_text="View"
              />
              {/* <ColComponent
                title="One Click Info"
                description="Student Info by One Click"
                link="/admin/student/student-oneclick-info"
                button_text="View"
              /> */}
            </div>
          </CardComponent>
        </div>
        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Report">
            <div className="row card-wrapper">
              <ColComponent
                title="Class/Section Wise"
                description="View Class/Section Wise Report"
                link="/admin/student/report/class-section"
                button_text="View"
              />
              <ColComponent
                title="Religion-Caste Wise"
                description="View Religion-Caste Wise Report"
                link="/admin/student/report/religion-caste"
                button_text="View"
              />
              <ColComponent
                title="Admission Report"
                description="View Admission Report"
                link="/admin/student/register-student-bulk"
                button_text="View"
              />
              <ColComponent
                title="Register Report"
                description="View Register Report"
                link="/admin/student/register-student-bulk"
                button_text="View"
              />
              <ColComponent
                title="Dynamic Report"
                description="View Dynamic Report"
                link="/admin/student/register-student-bulk"
                button_text="View"
              />
              {/* <ColComponent
                title="Parent Annual Income"
                description="View Income Report"
                link="/admin/student/register-student-bulk"
                button_text="View"
              /> */}
            </div>
          </CardComponent>
        </div>

        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Manage Login">
            <div className="row card-wrapper">
              <ColComponent
                title="Add/Edit/View Clerk"
                description="Add/Edit/View Clerk"
                link="/admin/student/clerk"
                button_text="Manage"
              />
              <ColComponent
                title="Change Password"
                description="Profile Update of Clerk"
                link="/admin/student/register-student-bulk"
                button_text="View"
              />
              
            </div>
          </CardComponent>
        </div>

        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="More">
            <div className="row card-wrapper">
              <ColComponent
                title="Medical Info"
                description="Add Info About Medical"
                link="/admin/student/medical-info"
                button_text="View"
              />
              <ColComponent
                title="Physical Fitness"
                description="Add Physical Fitness about Student"
                link="/admin/student/student-physical-fitness"
                button_text="View"
              />
              <ColComponent
                title="Student Promotion"
                description="Promote/De-Promote Student"
                link="/admin/student/promote-student"
                button_text="View"
              />
              <ColComponent
                title="Generate ID Card"
                description="Generate ID in System"
                link="/admin/student/student-generate-id-card"
                button_text="View"
              />  
              <ColComponent
                title="Set Roll No"
                description="Set Roll No"
                link="/admin/student/set-roll_no"
                button_text="Set"
              />
              <ColComponent
                title="Set Register ID"
                description="Set Register ID"
                link="/admin/student/set-register"
                button_text="Set"
              />
            </div>
          </CardComponent>
        </div>
      </BodyComponent>
    </div>
  );
};

export default StudentHomePage;
