import React,{ Component } from "react"
import SelectClass from "../../fees/form/SelectClass"
import EveryPeriod from "../form/EveryPeriod"

export default class GenerateTimeTable extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:"",
			section:"",
			time_table: null,
			subjects:[],
			teachers:[]
		}

		this.getClass = this.getClass.bind(this)
		this.onChange = this.onChange.bind(this)
	}
	componentDidMount(){
		var self = this
		axios({
			method:"post",
			url:"/api/v1/subject/get-all-subjects"
		}).then(response => {
			self.setState({
				'subjects':response.data.success.subjects
			})
		})

		axios({
			url:"/api/v1/teacher/view-all-teacher"
		}).then(response => {
			self.setState({
				'teachers':response.data
			})
		})
	}
	getClass(classes,section,select_year){
		var self = this
		self.setState({
			classes:classes,
			section:section
		})
		axios({
			url:"/api/v1/time-table/get-time-table-class-wise",
			method:"post",
			data:{
				"classes":classes,
				"section":section
			}
		}).then(response => {
			self.setState({
				time_table:response.data.success.time_table
			})
		})

	}

	onChange(e,period_id){
		const UpdateState = this.state.time_table
		
		Object.keys(UpdateState).map(item => {
			const updateInput = UpdateState[item];
			if(item == period_id){
				updateInput[e.target.name] = e.target.value;
			}
			UpdateState[item] = updateInput
		})

		this.setState({
			time_table:UpdateState
		})
	}

	onSubmit(e){
		axios({
			method:"post",
			url:"/api/v1/time-table/update-time-table",
			data: this.state
		}).then(response => {

			self.setState({
				time_table:response.data.success.time_table
			})
		})
	}
	render(){
		return(
			<div className="container-fluid mt--6">
				<SelectClass back_router="/admin/time-table" submit={this.getClass} hide_year="true" />
				  
				    { this.state.time_table  && 

							  <div className="card mb-12">
							    <div className="card-header">

							      <h3 className="mb-0"> Time Table</h3>
							    </div>
							   <div className="card-body">

								   <div className="table-responsive">
								   	<table className="table table-hover table-bordered">
								   		<thead >
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
								   				return <EveryPeriod onChange={this.onChange} teachers={this.state.teachers} subjects={this.state.subjects} period={this.state.time_table[item]} period_name={item}/>
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
		)
	}
}