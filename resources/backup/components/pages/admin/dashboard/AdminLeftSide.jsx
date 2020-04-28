import React from "react";
import {Link} from "react-router-dom";

const AdminLeftSide = () => (
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
              <a className="nav-link" href="#navbar-examples" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="navbar-examples">
                <i className="ni ni-ungroup text-orange"></i>
                <span className="nav-link-text">Examples</span>
              </a>
              <div className="collapse" id="navbar-examples">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="../examples/pricing.html" className="nav-link">
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal"> Pricing </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../examples/login.html" className="nav-link">
                      <span className="sidenav-mini-icon"> L </span>
                      <span className="sidenav-normal"> Login </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../examples/register.html" className="nav-link">
                      <span className="sidenav-mini-icon"> R </span>
                      <span className="sidenav-normal"> Register </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../examples/lock.html" className="nav-link">
                      <span className="sidenav-mini-icon"> L </span>
                      <span className="sidenav-normal"> Lock </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../examples/timeline.html" className="nav-link">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Timeline </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../examples/profile.html" className="nav-link">
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="sidenav-normal"> Profile </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../examples/rtl-support.html" className="nav-link">
                      <span className="sidenav-mini-icon"> RP </span>
                      <span className="sidenav-normal"> RTL Support </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#navbar-components" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="navbar-components">
                <i className="ni ni-ui-04 text-info"></i>
                <span className="nav-link-text">Components</span>
              </a>
              <div className="collapse" id="navbar-components">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="../components/buttons.html" className="nav-link">
                      <span className="sidenav-mini-icon"> B </span>
                      <span className="sidenav-normal"> Buttons </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../components/cards.html" className="nav-link">
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal"> Cards </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../components/grid.html" className="nav-link">
                      <span className="sidenav-mini-icon"> G </span>
                      <span className="sidenav-normal"> Grid </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../components/notifications.html" className="nav-link">
                      <span className="sidenav-mini-icon"> N </span>
                      <span className="sidenav-normal"> Notifications </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../components/icons.html" className="nav-link">
                      <span className="sidenav-mini-icon"> I </span>
                      <span className="sidenav-normal"> Icons </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../components/typography.html" className="nav-link">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Typography </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#navbar-multilevel" className="nav-link" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="navbar-multilevel">
                      <span className="sidenav-mini-icon"> M </span>
                      <span className="sidenav-normal"> Multi level </span>
                    </a>
                    <div className="collapse show" id="navbar-multilevel">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a href="#!" className="nav-link ">Third level menu</a>
                        </li>
                        <li className="nav-item">
                          <a href="#!" className="nav-link ">Just another link</a>
                        </li>
                        <li className="nav-item">
                          <a href="#!" className="nav-link ">One last link</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#navbar-forms" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="navbar-forms">
                <i className="ni ni-single-copy-04 text-pink"></i>
                <span className="nav-link-text">Forms</span>
              </a>
              <div className="collapse" id="navbar-forms">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="../forms/elements.html" className="nav-link">
                      <span className="sidenav-mini-icon"> E </span>
                      <span className="sidenav-normal"> Elements </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../forms/components.html" className="nav-link">
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal"> Components </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../forms/validation.html" className="nav-link">
                      <span className="sidenav-mini-icon"> V </span>
                      <span className="sidenav-normal"> Validation </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#navbar-tables" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="navbar-tables">
                <i className="ni ni-align-left-2 text-default"></i>
                <span className="nav-link-text">Tables</span>
              </a>
              <div className="collapse" id="navbar-tables">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="../tables/tables.html" className="nav-link">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Tables </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../tables/sortable.html" className="nav-link">
                      <span className="sidenav-mini-icon"> S </span>
                      <span className="sidenav-normal"> Sortable </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../tables/datatables.html" className="nav-link">
                      <span className="sidenav-mini-icon"> D </span>
                      <span className="sidenav-normal"> Datatables </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#navbar-maps" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="navbar-maps">
                <i className="ni ni-map-big text-primary"></i>
                <span className="nav-link-text">Maps</span>
              </a>
              <div className="collapse" id="navbar-maps">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="../maps/google.html" className="nav-link">
                      <span className="sidenav-mini-icon"> G </span>
                      <span className="sidenav-normal"> Google </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../maps/vector.html" className="nav-link">
                      <span className="sidenav-mini-icon"> V </span>
                      <span className="sidenav-normal"> Vector </span>
                    </a>
                  </li>
                </ul>
              </div>
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

export default AdminLeftSide;
