import React,{Component} from "react"
import SelectIndividualStudent from "../form/SelectIndividualStudent"

export default class ViewFeeReceipt extends Component{
	constructor(props){
	    super(props)
	    this.state = {
	      add_student_button_text_individual:"Fetch",
	    }
	}

	componentDidMount(){
		this.fetchStudent(2,'20-21','Installment1')
	}

	fetchStudent(student_id,select_year,installment){
		axios({
			url:"/api/v1/fee/get-receipt",
			method:"post",
			data: {
				student_id,select_year,installment				
			}
		}).then(response => {
			console.log(response.data)
		})
		this.setState({
				student_id,select_year,installment
		})
	}
	render(){
		return(
			<div className="container-fluid mt--6">
        		<SelectIndividualStudent title="Select Student" add_student_button_text_individual={this.state.add_student_button_text_individual} get_installment={true} submit={this.fetchStudent} />
        		
				<button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Pay</button>		        
			</div>
		)
	}
}