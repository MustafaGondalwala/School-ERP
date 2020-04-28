import React,{Component} from "react"
import Select from 'react-select';


export default class SetTeacherSubjectClassWiseForm extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		total_teacher:[],
    		subjects:[],
    		classes:[]
    	}
	}
	componentDidMount(){
		var self = this
		axios({
			method:"post",
			url:"/api/v1/teacher/view-preferend-data"
		}).then(response=>{
			
			self.setState({
				total_teacher:response.data.success.teacher
			})
		});

		axios({
			url:"/api/v1/subject/get-all-subjects",
			method:"post"
		}).then(response => {

			  var preferend = [];
		      response.data.success.subjects.map(item => {
		        preferend.push({value:item.id,label:item.subject_name})
		      })
		      self.setState({subjects : preferend})
		})

		axios({
			url:"/api/v1/class/get-all-classes",
			method:"post"
		}).then(response => {
			  var preferend = [];
		      response.data.success.classes.map(item => {
		        if(item.section == null)
		         preferend.push({value:item.id,label:item.class_title})
		        else
		         preferend.push({value:item.id,label:item.class_title+" ["+item.section+"]"})
		      })
		      console.log([preferend])

		      self.setState({classes : preferend})
		})
	}
	render(){
		return(
			<form>
			<div className="table-responsive">
			<table className="table">
				<thead>
					<td>ID</td>
					<td>Teacher Name</td>
					<td>Preferend Subject</td>
					<td>Preferend Classes</td>
				</thead>
				<tbody>
					{this.state.classes && this.state.total_teacher.map((item,id)=>{
						return <tr>
								<td>{id+1}</td>
								<td>{item.teacher_name}</td>
								<td>
								{this.state.subjects.map(i => {
									return <span> , {i['label']} </span>
								})
							}
								</td>
						</tr>

					})}

				</tbody>
			</table>
			</div>
			</form>
		)
	}
}
