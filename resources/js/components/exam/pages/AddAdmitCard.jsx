import React, { Component } from "react"
import SelectClass from "../form/SelectClass"

export default class AddAdmitCard extends Component{
	constructor(props){
		super(props)

		this.state = {
			exam_entrys:[]
		}
		this.onChange = this.onChange.bind(this)
		this.get_class = this.get_class.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}
	componentDidMount(){
		this.get_class("10th",null,"20-21","1",[1,2,3])
	}
	get_class(classes,section,select_year,exam_type,subject){
		var self = this
		this.setState({
			classes,section,select_year,exam_type,subject
		})
		axios({
			method:"post",
			url:"/api/v1/exam/get-admit-cards",
			data: {
				classes,section,select_year,exam_type,subject
			}
		}).then(response => {
			self.setState({
				"exam_entrys":response.data.success.admit_card
			})
		})
	}

	onChange(e,subject_name){
		const temp_state = this.state.exam_entrys
		Object.keys(temp_state).map(item => {
			if(temp_state[item][0] == subject_name){
				temp_state[item][1][e.target.name] = e.target.value
			}
		})
		this.setState({
			exam_entrys:temp_state
		})
	}
	onSubmit(e){
		var self = this
		axios({
			method:"post",
			url:"/api/v1/exam/update-admit-card",
			data : this.state
		}).then(response => {
			self.setState({
				"exam_entrys":response.data.success.admit_card
			})
		})
	}


	render(){
		const {exam_entrys} = this.state
		return(
			<div className="container-fluid mt--6">
				<SelectClass submit={this.get_class}/>

				{exam_entrys.length > 0 && 

					<div className="card mb-4">
					    <div className="card-header">
					      <h3 className="mb-0">Edit Admit Card</h3>
					    </div>
					    <div className="card-body">


							<div className="table-responsive">
								<table className="table">
								<thead>
									<tr>
										<th>Sr.no</th>
										<th>Subject Name</th>					
										<th>Start Time</th>					
										<th>End Time</th>					
										<th>Date</th>					
									</tr>
								</thead>
								<tbody>
									{Object.keys(exam_entrys).map((item,id) => {
										return <tr>
											<td>{id+1}</td>
											<td>{exam_entrys[item][0]}</td>
											<td><input className="form-control" onChange={(e) => this.onChange(e,exam_entrys[item][0])} name="start_time" type="time" value={exam_entrys[item][1].start_time} /></td>
											<td><input className="form-control" onChange={(e) => this.onChange(e,exam_entrys[item][0])} name="end_time" type="time" value={exam_entrys[item][1].end_time} /></td>
											<td><input className="form-control" onChange={(e) => this.onChange(e,exam_entrys[item][0])} name="exam_date" type="date" value={exam_entrys[item][1].exam_date} /></td>

										</tr>

										return <span></span>
									})}	
								</tbody>
								</table>
							

							</div>
							<div className="row">
								<button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Update</button>
							</div>
						</div>
					</div>

				}

				
			</div>

		)
	}
}