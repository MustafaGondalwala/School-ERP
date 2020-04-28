import React from "react";
import {Link} from "react-router-dom";

const LeftSide = () => (
  <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div className="scrollbar-inner">
      <div className="sidenav-header  d-flex  align-items-center">
        <a className="navbar-brand" href="dashboard.html">
          <img src="../../assets/img/brand/blue.png" className="navbar-brand-img" alt="..." />
        </a>
        <div className=" ml-auto ">
          <div className="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line"></i>
              <i className="sidenav-toggler-line"></i>
              <i className="sidenav-toggler-line"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/admin/student">
                <i className="ni ni-shop text-primary"></i>
                <span className="nav-link-text">Student</span>
              </Link>


            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/teacher" >
                <i className="ni ni-ungroup text-orange"></i>
                <span className="nav-link-text">Teacher</span>
              </Link>

            </li>
            <li className="nav-item">
              <Link to="/admin/fees" className="nav-link" href="#navbar-components" >
                <i className="ni ni-ui-04 text-info"></i>
                <span className="nav-link-text">Fees</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/time-table">
                <i className="ni ni-single-copy-04 text-pink"></i>
                <span className="nav-link-text">Timetable</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/attendance">
                <i className="ni ni-align-left-2 text-default"></i>
                <span className="nav-link-text">Attendance</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/exam" className="nav-link" href="#navbar-maps" >
                <i className="ni ni-map-big text-primary"></i>
                <span className="nav-link-text">Exam</span>
              </Link>
            
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../widgets.html">
                <i className="ni ni-archive-2 text-green"></i>
                <span className="nav-link-text">Widgets</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../charts.html">
                <i className="ni ni-chart-pie-35 text-info"></i>
                <span className="nav-link-text">Charts</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../calendar.html">
                <i className="ni ni-calendar-grid-58 text-red"></i>
                <span className="nav-link-text">Calendar</span>
              </a>
            </li>
          </ul>
          <hr className="my-3" />
          <h6 className="navbar-heading p-0 text-muted">
            <span className="docs-normal">Documentation</span>
            <span className="docs-mini">D</span>
          </h6>
          <ul className="navbar-nav mb-md-3">
            <li className="nav-item">
              <a className="nav-link" href="../../docs/getting-started/overview.html" target="_blank">
                <i className="ni ni-spaceship"></i>
                <span className="nav-link-text">Getting started</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../../docs/foundation/colors.html" target="_blank">
                <i className="ni ni-palette"></i>
                <span className="nav-link-text">Foundation</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../../docs/components/alerts.html" target="_blank">
                <i className="ni ni-ui-04"></i>
                <span className="nav-link-text">Components</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../../docs/plugins/charts.html" target="_blank">
                <i className="ni ni-chart-pie-35"></i>
                <span className="nav-link-text">Plugins</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default LeftSide;
