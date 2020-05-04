import React,{Component} from "react"
import SelectIndividualStudent from "../form/SelectIndividualStudent"
import InstallmentUpdate from "../form/InstallmentUpdate";


export default class PayFeesHomePage extends Component{
	constructor(props){
	    super(props)
	    this.state = {
	      student_id:"",
	      select_year:"",
	      total_installment:[],
	      add_student_button_text_individual:"Fetch",
	      total_fees_type:[],
	      data_updated:""
	    }
	    this.fetchStudent = this.fetchStudent.bind(this)
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
                if(name == "current_paid"){
                  if(i['total_pending'] != 0){
                		i[name] = value
                  }
                }
              }           
          })
          temp_state[item] = updateInput
        }
      })
      this.setState({
        total_fees_type:temp_state  
      })
  }


	fetchStudent(id,select_year){
	    var self = this
	    self.setState({
	      student_id:id,
	      select_year:select_year,
	      add_student_button_text_individual:"Fetching Student ...",

	    })
	    if(id != ""){
	      axios({
	          url:"/api/v1/fee/get-individual-student-fees",
	          method:"post",
	          data:{
	            student_id: id,
	            select_year: select_year,
	            installments:this.state.total_installment
	          }
	      }).then(response=>{
	        self.setState({
	          total_fees_type:response.data.success.total_installments,
	          data_updated:response.data.success.message,
	      	  add_student_button_text_individual:"Fetch",
	        })
	      });

	      axios({
	      	url:"/api/v1/fee/get-student-receipts",
	      	method:"post",
	      	data:{
	            student_id: id,
	            select_year: select_year,
	      	}
	      }).then(response => {
	      	console.log(response.data)
	      })
	    }
	  }


  	onSubmit(e){
  		var self = this
	    axios({
	      url:"/api/v1/fee/pay-fees-individual",
	      method:"post",
	      data: self.state
	    }).then(response => {
	      console.log(response.data)
	   //    self.setState({
	   //        total_fees_type:response.data.success.total_installments
	   //    })


  		// console.log(this.state)
  			})
  	}
	render(){
		return(
			<div className="container-fluid mt--6">
        		<SelectIndividualStudent title="Select Student" add_student_button_text_individual={this.state.add_student_button_text_individual} submit={this.fetchStudent} />
        		{this.state.total_fees_type && Object.keys(this.state.total_fees_type).map(item =>{
		            return <InstallmentUpdate type="pay_fees" onChange={this.onChange} installment={item} total_fees_type={this.state.total_fees_type[item]}/>
		          })
		        }
				<button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Pay</button>		        
			</div>
		)
	}
}