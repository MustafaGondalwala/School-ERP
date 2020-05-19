import React,{Component} from "react"
import moment from "moment"
import {ViewAttendanceStudentModule} from "../attendence/ParentStudentAttendanceComponent"

export const StudentHomePage = () => (
	<div>
		<h1>Mustafa</h1>
	</div>
)

const EmptyHeader = ({ mainHeader, header, sub_header }) => (
  <div className="header bg-primary pb-6">
    <div className="container-fluid">
      <div className="header-body">
        <div className="row align-items-center py-4">
          <div className="col-lg-6 col-7">
            <h6 className="h2 text-white d-inline-block mb-0">{mainHeader}</h6>
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
                  <a href="#">{header}</a>
                </li>
                {sub_header && (
                  <li className="breadcrumb-item active" aria-current="page">
                    {sub_header}
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
      </div>
    </div>
  </div>
);

export class StudentTimeTable extends Component{
	constructor(props){
		super(props)
		this.state = {
			time_table:""
		}
	}
	componentDidMount(){
		var self = this;
		axios({
			url:"/api/v1/student/time-table"
		}).then(respone => {
			self.setState({
				time_table:respone.data.success.time_table
			})
		})
	}
	render(){
		return(
			<div>
				<EmptyHeader mainHeader="Time Table" header="View" />
				<div className="container-fluid mt--6">
					{ this.state.time_table  && 

								  <div className="card mb-12">
								    <div className="card-header">
								      <h3 className="mb-0"> Time Table <a target="_blank"  href={`/admin/time-table/print-time-table/${this.state.classes}/${this.state.section}`} class="btn btn-neutral float-right" type="submit">Print</a></h3>
								    </div>
								   <div className="card-body">
									   <div className="table-responsive">
									   	<table className="table table-hover table-bordered">
									   		<thead>
									   			<tr>
												  <th></th>
								                  <th></th>
												  <th></th>
												  <th scope="row" colspan="2"><center>Monday</center></th>
												  <th  scope="row" colspan="2"><center>Tuesday</center></th>
												  <th colspan="2"  scope="row" ><center>Wednesday</center></th>
												  <th colspan="2"  scope="row" ><center>Thursday</center></th>
												  <th colspan="2"  scope="row" ><center>Friday</center></th>
												  <th colspan="2"  scope="row" ><center>Saturday</center></th>
								                  </tr>
									   			<tr>
									   				<th scope="row">Period Name</th>
									   				<th scope="row">Time From</th>
									   				<th scope="row">Time To</th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   			</tr>
									   		</thead>
									   		<tbody>
									   		{
									   			this.state.time_table && Object.keys(this.state.time_table).map(item => {
									   				return <EveryPeriod view_mode={true} teachers={this.state.teachers} subjects={this.state.subjects} period={this.state.time_table[item]} period_name={item}/>
									   			})
									   		}
									   		</tbody>
									   	</table>
									   </div>
								   <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Update</button>
								   </div>
								  </div>
						}
				</div>
			</div>
		)
	}
}
class EveryPeriod extends Component{
	

	render(){
		const select_array = ["monday_subject_name","monday_teacher_name",
							  "tuesday_teacher_name","tuesday_subject_name",
							  "wednesday_teacher_name","wednesday_subject_name",
							  "thursday_teacher_name","thursday_subject_name",
							  "friday_teacher_name","friday_subject_name",
							  "saturday_teacher_name","saturday_subject_name",
							  ]
		const teacher_array = ["monday_teacher_name","tuesday_teacher_name","wednesday_teacher_name","thursday_teacher_name","friday_teacher_name","saturday_teacher_name"]
		const subject_array = ["monday_subject_name","tuesday_subject_name","wednesday_subject_name","thursday_subject_name","friday_subject_name","saturday_subject_name"]
		return(


			<tr>
					<th scope="row">

						{this.props.period.period_id}
						
					</th>
					<td>
						{this.props.view_mode ? <h5>{this.props.period.start_time} </h5> : 
							<input type="time" disabled class="form-control" value={this.props.period.start_time	}/>
						}

					</td>
					<td>
						{this.props.view_mode ? <h5>{this.props.period.end_time} </h5> : 
						<input type="time" disabled class="form-control" value={this.props.period.end_time	}/>
							
						}
					</td>
						{
							this.props.period && Object.keys(this.props.period).map(i => {
								
								if(this.props.period_name != "lunch")
								{	
									if(select_array.indexOf(i) !== -1 ){
										if(subject_array.indexOf(i) !== -1 ){
											  return <td width="20%"> 
											  			<div class="form-group">

											  			{this.props.view_mode ? <h5>{this.props.period[i]} </h5> : 
																<select onChange={(e) => this.props.onChange(e,this.props.period_name)} className="form-control" value={this.props.period[i]} name={i}>
																	<option value="---">---</option>
																	{this.props.subjects &&

																		this.props.subjects.map(item => {
																			return <option value={item.subject_name}>{item.subject_name}</option>
																		})
																	}
																</select>
															}
														</div>
												</td>
										}else if(teacher_array.indexOf(i) !== -1 ){
											return <td width="20%"> 

														<div className="form-group">
											  			{this.props.view_mode ? <h5>{this.props.period[i]} </h5> : 
											  				<select onChange={(e) => this.props.onChange(e,this.props.period_name)} className="form-control" name={i} value={this.props.period[i]}>
																	<option value="---">---</option>
																
																{this.props.teachers &&
																	this.props.teachers.map(item => {
																		return <option value={item.teacher_name}>{item.teacher_name}</option>
																	})
																}
															</select>
														 }

														</div>

														
												</td>
										}
									}
								}
							})
						}

				</tr>
			
		)
	}
}

export const StudentAttendance = () => (
	<div>
		<EmptyHeader mainHeader="Attendance" header="View" />
		<div className="container-fluid mt--6">
			<ViewAttendanceStudentModule />
		</div>
	</div>
)

