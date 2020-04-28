import React,{Component} from "react"


export default class InstallmentUpdate extends Component{
	
	// constructor(){

	// }

	componentWillReceiveProps(){
		console.log("Component Received props ",this.props)
	}
	componentDidMount(){
		console.log("Component Mount",this.props)
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
		              <td> Total Paid</td>
		          </tr>
		          </thead>
		          <tbody>
		           {this.props.total_fees_type && this.props.total_fees_type.map(type=>{
		              if(this.props.type == "pay_fees"){
		              	  return <tr>
					                  <td> {type.fees_type} </td>
					                  <td> <input type="number" disabled value={type.amount} data-fee_type={type.fees_type}  name="amount" className="form-control disabled"  /> </td>
					                  <td> <input type="number" disabled value={type.discount_amount} className="form-control disabled" data-fee_type={type.fees_type} name="discount_amount"   />  </td>
					                  <td> <input type="number" disabled value={type.after_discount} className="form-control disabled" data-fee_type={type.fees_type} name="after_discount"  /> </td>
					                  <td> <input type="number"  value={type.total_paid} className="form-control disabled" data-fee_type={type.fees_type} name="total_paid" max={type.after_discount} onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
					             </tr>
		              }else{
			              return <tr>
			                  <td> {type.fees_type} </td>
			                  <td> <input type="number" value={type.amount} data-fee_type={type.fees_type}  name="amount" className="form-control" onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
			                  <td> <input type="number" value={type.discount_amount} className="form-control" data-fee_type={type.fees_type} name="discount_amount"  onChange={(e)=>this.props.onChange(e,this.props.installment)} />  </td>
			                  <td> <input type="number" value={type.after_discount} className="form-control" data-fee_type={type.fees_type} name="after_discount" onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
			                  <td> <input type="number" value={type.total_paid} className="form-control" data-fee_type={type.fees_type} name="total_paid" onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
			              </tr>
		              }
		          		

		          })}
		         
		          <tr>
		            <td> Total </td>
		            <td> <input type="number" className="form-control"/> </td>
		            <td>  </td>
		            <td> <input type="number" className="form-control"/> </td>
		            <td> <input type="number" className="form-control"/> </td>
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