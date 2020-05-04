import React,{Component} from "react"


export default class InstallmentUpdate extends Component{
	constructor(props){
		super(props)
		this.state = {
			total_amount:0,
			total_discount:0,
			total_afterdiscount:0,
			total_total_pending:0
		}
		this.changeInputs = this.changeInputs.bind(this)
	}
	changeInputs(){
		var total_amount = 0;
		var	total_discount = 0;
		var	total_afterdiscount = 0;
		var	total_total_pending = 0;
		this.props.total_fees_type.map(item => {
			total_amount += parseInt(item.amount);
			total_discount += parseInt(item.discount_amount);
			total_afterdiscount += parseInt(item.after_discount);
			total_total_pending += parseInt(item.total_pending);
		})
		this.setState({
			total_amount,total_discount,total_afterdiscount,total_total_pending
		})
	}
	componentWillReceiveProps(){
		this.changeInputs()
	}
	componentDidMount(){
		this.changeInputs()
	}

	render(){
		return(
			<div>

			<div className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">{this.props.installment} Fee Set</h3>
            </div>
              <div className="card-body">


		      <div className="table-responsive">
		        <table className="table">
		        <thead>
		          <tr>
		              <td> Fee Type </td>
		              <td width="50%"> Amount </td>
		              <td> Discount  </td>
		              <td> Total Amount After Discount</td>
		              <td> Total Pending</td>
		              {this.props.type =="pay_fees" && <td>Current Paid</td>}
		          </tr>
		          </thead>
		          <tbody>
		           {this.props.total_fees_type && this.props.total_fees_type.map(type=>{
		           	 // var total_balance = 0;
		           	 // if(type.after_discount  == type.total_pending){
		           	 // 	total_balance = type.after_discount 
		           	 // }else if((type.total_pending - type.after_discount) < 0)
		           	 // 	total_balance = type.total_pending 
		           	 // else{
		           	 // 	total_balance = type.after_discount - type.total_pending
		           	 // }
		           	 // console.log(type.after_discount - type.total_pending,type.total_pending - type.after_discount)


		              if(this.props.type == "pay_fees"){
		              	  return <tr>
					                  <td> {type.fees_type} </td>
					                  <td> <input min="0" type="number" disabled value={type.amount} data-fee_type={type.fees_type}  name="amount" className="form-control disabled"  /> </td>
					                  <td> <input min="0" type="number" disabled value={type.discount_amount} className="form-control disabled" data-fee_type={type.fees_type} name="discount_amount"   />  </td>
					                  <td> <input min="0" type="number" disabled value={type.after_discount} className="form-control disabled" data-fee_type={type.fees_type} name="after_discount"  /> </td>
					                  <td> <input min="0" type="number"  disabled value={type.total_pending} className="form-control disabled" data-fee_type={type.fees_type} name="total_paid" max={type.after_discount}  /> </td>
					                 

					                 {/* <td> <input min="0" type="number"  disabled value={total_balance} className="form-control disabled" data-fee_type={type.fees_type} name="total_paid" max={type.after_discount}  /> </td> */}
					          		 


					          		  <td> <input min="0" type="number" value={type.current_paid} className="form-control" data-fee_type={type.fees_type} name="current_paid" max={type.after_discount} onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
					             		
					             </tr>
		              }else{
			              return <tr>
			                  <td> {type.fees_type} </td>
			                  <td> <input min="0" type="number" value={type.amount} data-fee_type={type.fees_type}  name="amount" className="form-control" onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
			                  <td> <input min="0" type="number" value={type.discount_amount} className="form-control" data-fee_type={type.fees_type} name="discount_amount"  onChange={(e)=>this.props.onChange(e,this.props.installment)} />  </td>
			                  <td> <input min="0" type="number" disabled value={type.after_discount} className="form-control" data-fee_type={type.fees_type} name="after_discount" onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
			                  <td> <input min="0" type="number"  value={type.total_pending} className="form-control" data-fee_type={type.fees_type} name="total_pending" onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
			              </tr>
		              }
		          		

		          })}
		         
		          <tr>
		            <td> Total </td>
		            <td><input type="number" value={this.state.total_amount} disabled className="form-control"/> </td>
		            <td> <input type="number" value={this.state.total_discount} disabled className="form-control"/> </td>
		            <td><input type="number" value={this.state.total_afterdiscount} disabled className="form-control"/> </td>
		            <td><input type="number" value={this.state.total_total_pending} disabled className="form-control"/> </td>
		          </tr>
		          </tbody>
		        </table>
		      </div>		  
		  </div>
		  </div>
		  </div>

		)
	}
}