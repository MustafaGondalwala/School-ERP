import React from "react"
import { Link } from "react-router-dom"
import { AddEditHomeWork } from "./utils/utils"
const TeacherHomeWorkHeader = (props) => {
  return(
      <div className="header bg-primary pb-6">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h2 text-white d-inline-block mb-0">{props.mainHeader}</h6>
                <nav
                  aria-label="breadcrumb"
                  className="d-none d-md-inline-block ml-md-4"
                >
                  <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <i className="fas fa-home" />
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">{props.header}</a>
                    </li>
                    {props.sub_header && (
                      <li className="breadcrumb-item active" aria-current="page">
                        {props.sub_header}
                      </li>
                    )}
                  </ol>
                </nav>
              </div>
              <div className="col-lg-6 col-5 text-right">
                <a href="#" className="btn btn-sm btn-neutral">
                  New
                </a>
                <a href="#" className="btn btn-sm btn-neutral">
                  Filters
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Total Home Work OnGoing
                        </h5>
                        <span className="h2 font-weight-bold mb-0">350,897</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Total Home Work Completed
                        </h5>
                        <span className="h2 font-weight-bold mb-0">2,356</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                         Total Student Completed the Home Work
                        </h5>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

const ColComponent = ({title,description,link,button_text}) => (
    <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-3">{title}</h3>
              <p className="card-text mb-4">{description}</p>
              <Link to={link} className="btn btn-primary">{button_text}</Link>
            </div>
        </div>
    </div>
)

export const TeacherHomeWorkHome = (props) => {
	return(
		<div>
			<TeacherHomeWorkHeader mainHeader="Home Work" header="Home"/>
			    <div className="container-fluid mt--6">
			      <div className="row card-wrapper">
			      <ColComponent title="Add/Edit HomeWork" description="Add/Edit Home Work given to Student" button_text="Add/Edit" link={`/homework/add-edit-homework/${props.match.params.class_id}`}/>
			      <ColComponent title="View Student Completed HomeWork" description="Attend Student Completed Request" button_text="View Completed Request" link={`/homework/view-student-request/${props.match.params.class_id}`}/>
			      <ColComponent title="View HomeWork" description="View HomeWork Related to Class" button_text="View" link={`/homework/view-homework/${props.match.params.class_id}`}/>
			      </div>
			    </div>
		</div>
	)
}


export class TeacherAddEditHomeWork extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			class_id:""
		}
	}

	componentDidMount(){
		if(this.props.match.params.class_id){
			this.setState({
				class_id:this.props.match.params.class_id
			})
		}
	}
	render(){
		const {props} = this
		const { class_id } = this.state
		return(
			<div>
				<TeacherHomeWorkHeader mainHeader="HomeWork" header="Add/Edit" />
			    <div className="container-fluid mt--6">
					{class_id &&
						<AddEditHomeWork title="Add/Edit HomeWork" back_link={`/homework/${class_id}`} class_id={ class_id }/>
					}
				</div>
			</div>
		)		
	}
}
