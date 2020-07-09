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
                link="/clerk/student/register-student"
                button_text="Add"
              />
              <ColComponent
                title="Register List"
                description="View Student in System"
                link="/clerk/student/register-student-list"
                button_text="View"
              />
              <ColComponent
                title="Bulk Register Student"
                description="View Student in System"
                link="/clerk/student/register-student-bulk"
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
                link="/clerk/student/admission-student"
                button_text="Add"
              />
              <ColComponent
                title="Admission List"
                description="View Student in System"
                link="/clerk/student/student-admission-list"
                button_text="View"
              />
              <ColComponent
                title="Bulk Admission Student"
                description="View Student in System"
                link="/clerk/student/student-admission-bulk"
                button_text="View"
              />
            </div>
          </CardComponent>
        </div>

        <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Profile Update">
            <div className="row card-wrapper">
              <ColComponent
                title="Profile Update"
                description="Student Profile Update in System"
                link="/clerk/student/student-profile-update"
                button_text="Enter"
              />
              <ColComponent
                title="Profile Images"
                description="Image Update of Student in System"
                link="/clerk/student/student-profile-image"
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
                link="/clerk/student/student-advanced-search"
                button_text="View"
              />
              <ColComponent
                title="Student ColumnWise"
                description="Download Csv ColumnsWise in System"
                link="/clerk/student/register-student-bulk"
                button_text="View"
              />
              <ColComponent
                title="One Click Info"
                description="Student Info by One Click"
                link="/clerk/student/student-oneclick-info"
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
                link="/clerk/student/medical-info"
                button_text="View"
              />
              <ColComponent
                title="Physical Fitness"
                description="Add Physical Fitness about Student"
                link="/clerk/student/student-physical-fitness"
                button_text="View"
              />
              <ColComponent
                title="Student Promotion"
                description="Promote/De-Promote Student"
                link="/clerk/student/promote-student"
                button_text="View"
              />
              <ColComponent
                title="Generate ID Card"
                description="Generate ID in System"
                link="/clerk/student/student-generate-id-card"
                button_text="View"
              />  
              <ColComponent
                title="Set Roll No"
                description="Set Roll No"
                link="/clerk/student/set-roll_no"
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
