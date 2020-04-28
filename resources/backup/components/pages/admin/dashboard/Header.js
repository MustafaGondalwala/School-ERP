import React from "react";
const Header = (props) => (
  <div className="header bg-primary pb-6">
  <div className="container-fluid">
    <div className="header-body">
      <div className="row align-items-center py-4">
        <div className="col-lg-6 col-7">
          <h6 className="h2 text-white d-inline-block mb-0">{props.main_header}</h6>
          <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
              <li className="breadcrumb-item"><a href="#"><i className="fas fa-home" /></a></li>
              <li className="breadcrumb-item"><a href="#">{props.header}</a></li>
              {props.subheader &&
              <li className="breadcrumb-item active" aria-current="page">{props.subheader}</li>
            }
            </ol>
          </nav>
        </div>
        <div className="col-lg-6 col-5 text-right">
          <a href="#" className="btn btn-sm btn-neutral" >Back</a>
          <a href="#" className="btn btn-sm btn-neutral">Filters</a>
        </div>
      </div>

    </div>
  </div>
</div>

)

export default Header
