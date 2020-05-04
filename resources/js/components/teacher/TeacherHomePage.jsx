import React from "react";
import {Link} from "react-router-dom";

const TeacherHomePage = () => (
  <div className="container-fluid mt--6">
    <div className="row card-wrapper">
      <div className="col-lg-4">
        <div className="card">
          {/* Card header */}
          <div className="card-header">
            {/* Title */}
            <h5 className="h3 mb-0">Add Teacher</h5>
          </div>
          {/* Card image */}
          {/* List group */}
          {/* Card body */}
          <div className="card-body">
            <p className="card-text mb-4">
                Add Teacherr in System.
            </p>
            <Link to={"/admin/teacher/add-teacher"} className="btn btn-primary" >
            Add
            </Link>
          </div>
        </div>
      </div>
        <div className="col-lg-4">

        <div className="card">
          <div className="card-header">
            <h5 className="h3 mb-0">Assign Teacher</h5>
          </div>
          <div className="card-body">
            <p className="card-text mb-4">
                Assign Teacher to Class
            </p>
            <Link to={"/admin/teacher/assign-teacher"} className="btn btn-primary" >
            Assign
            </Link>
          </div>
        </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="h3 mb-0">Teacher List</h5>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">
                  View Teacher List
              </p>
              <Link to={"/admin/teacher/view-all-teacher"} className="btn btn-primary" >
              View
              </Link>
            </div>
          </div>
        </div>


        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="h3 mb-0">Profile Update</h5>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">
                  Update Profile
              </p>
              <Link to={"/admin/teacher/update-profile"} className="btn btn-primary" >
              Update
              </Link>
            </div>
          </div>
        </div>
    </div>
  </div>

)

export default TeacherHomePage
