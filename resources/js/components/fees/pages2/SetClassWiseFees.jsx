import React,{Component} from "react"
import SelectClass from "../form/SelectClass"
import InstallmentUpdate from "../form/InstallmentUpdate";

export default class SetClassWiseFees extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:"",
			section:"",
			select_year:"",
			total_installment:[],
			total_fees_type:[]
		}

		this.getClasses = this.getClasses.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}


	componentDidMount(){		
	    var self = this
	    axios({
	      url:"/api/v1/fee/get-total-installments-only-installments",
	    }).then(response=>{
	      self.setState({
	        total_installment:response.data.success.total_installment
	      })
	    });

	}
	getClasses(classes,section,select_year){
		console.log(classes,section,select_year)
		var self = this;
		this.setState({
			classes:classes,
			section:section,
			select_year:select_year
		})
		if(classes!= ""){
			axios({
				url:"/api/v1/fee/get-class-wise-fees",
				method:"post",
				data : {
					"classes":classes,
					"section":section,
					"select_year": select_year,
					"total_installment": this.state.total_installment,
				}
			}).then(response => {
				console.log(response.data.success.total_installments)

				self.setState({
					total_fees_type:response.data.success.total_installments
				})
			})
		}
	}

	onChange(e,installment){
		var self = this;
	    var fee_type = e.target.getAttribute('data-fee_type');
	    var name = e.target.name;
	    var value = e.target.value;
	    const temp_state = self.state.total_fees_type
	    
	    Object.keys(temp_state).map(item => {

	    	if(item == installment){
	    		const updateInput = temp_state[item];
	    		updateInput.map(i => {
					if(i.fees_type == fee_type){
				        i[name] = value
				      }	    			
	    		})

	    		temp_state[item] = updateInput
	    	}	
	    })

	    this.setState({
	    	total_fees_type:temp_state	
	    })
	}

	onSubmit(e){
		var self = this
		axios({
			url:"/api/v1/fee/update-fees-class-wise",
			method:"post",
			data: self.state
		}).then(response => {
			self.setState({
					total_fees_type:response.data.success.total_installments
			})
		})
	}

	render(){
		return(
			<div className="container-fluid mt--6">
				<SelectClass  submit={this.getClasses}/>

				{this.state.total_fees_type && Object.keys(this.state.total_fees_type).map(item =>{
						return <InstallmentUpdate onChange={this.onChange} installment={item} total_fees_type={this.state.total_fees_type[item]}/>
					})
				}

				<button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Save</button>
			</div>
		)
	}
}