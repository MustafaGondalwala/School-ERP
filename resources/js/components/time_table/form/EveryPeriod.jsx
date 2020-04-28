import React,{Component} from "react"

export default class EveryPeriod extends Component{
	

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