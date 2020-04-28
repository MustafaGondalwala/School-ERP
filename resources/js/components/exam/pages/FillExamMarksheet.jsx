import React,{Component} from "react"
import {Link } from "react-router-dom"
import SelectClass from "../form/SelectClass"
export default class FillExamMarksheet extends Component{
	constructor(props){
		super(props)

		this.state = {
			exam_entrys:[]
		}
		this.get_class = this.get_class.bind(this)
	}
	componentDidMount(){
		this.get_class("10th",null,"20-21","1",[1,2,3])
	}
	get_class(classes,section,select_year,exam_type,subject){
		var self = this
		this.setState({
			classes,section,select_year,exam_type,subject
		})
		console.log(classes,section,select_year,exam_type,subject)
		axios({
			url:"/api/v1/exam/get-exam-marksheet",
			method:"post",
			data:{
				classes,section,select_year,exam_type,subject	
			}
		})
	}
	render(){
		return(
			<div className="container-fluid">
					<SelectClass  submit={this.get_class}/>
			</div>
		)
	}
}