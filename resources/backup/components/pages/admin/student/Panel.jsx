import React from "react";
import {Link} from "react-router-dom";

const Panel = () => (
  <div>
    <div className="container-fluid mt--6">
      <div className="row card-wrapper">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-3">Registration</h3>
                  <p className="card-text mb-4">Add New Student in System</p>
                  <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-3">Profile Update</h3>
                  <p className="card-text mb-4">Update the Profile of Student</p>
                  <Link to="/admin/student/update-student-info" className="btn btn-primary">Enter</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-3">Student List</h3>
                  <p className="card-text mb-4">View Student in System</p>
                  <Link to="/admin/student/view-student" className="btn btn-primary">View</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-3">Admission</h3>
                  <p className="card-text mb-4">New Student Admission in System</p>
                  <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-3">Admission List</h3>
                  <p className="card-text mb-4">View Student Admission in System</p>
                  <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-3">One Click Info</h3>
                  <p className="card-text mb-4">View Particular Student</p>
                  <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title mb-3">Manage Student Login</h3>
                  <p className="card-text mb-4"></p>
                  <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                </div>
              </div>
            </div>
        </div>
        <div className="card-deck flex-column flex-xl-row">
          <div className="card">
            {/* Card header */}
            <div className="card-header">
              {/* Title */}
              <h5 className="h3 mb-0">Report</h5>
            </div>
            {/* Card body */}
            <div className="card-body">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title mb-3">Student Class and Section Wise</h3>
                    <p className="card-text mb-4"></p>
                    <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title mb-3">Student Caste Wise</h3>
                    <p className="card-text mb-4"></p>
                    <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title mb-3">View Graph</h3>
                    <p className="card-text mb-4"></p>
                    <Link to="/admin/student/add-new-student" className="btn btn-primary">Enter</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
    </div>
)

export default Panel
