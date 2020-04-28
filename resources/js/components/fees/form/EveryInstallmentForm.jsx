import React,{Component} from "react"

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class EveryInstallmentForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      total_fees_type_input: ""
    }
    this.onChange = this.onChange.bind(this);
    this.fetchProps = this.fetchProps.bind(this)

  }

  onChange(e){

    var self = this;
    var fee_type = e.target.getAttribute('data-fee_type');
    var name = e.target.name;
    var value = e.target.value;
    const updateState = this.state.total_fees_type_input
      updateState.map(function(item){
      if(item.fees_type == fee_type){
        item[name] = value
      }
    })
    this.setState({
      total_fees_type_input:updateState
    })
  }

  onSubmit(e){
      
    this.props.submit(this.state.total_fees_type_input,this.props.installments)
  }
  fetchProps(){

    }
    
  componentDidMount(){
    var self  = this
      if(self.props.total_fees_type){

        var main = []
        if(Object.keys(self.props.total_fees_type).length != 0 ){
          self.props.total_fees_type[this.props.installments].map(function(item){
              var data = {"fees_type":item.fees_type,"amount": item.amount,"discount_amount":item.discount_amount,"after_discount":item.after_discount,"total_paid":""}
              main.push(data)
          })
          self.setState({
            total_fees_type_input:main
          })
        }
      }
  }
 
  componentWillReceiveProps(){
    var self  = this
      if(self.props.total_fees_type){

        var main = []
        if(Object.keys(self.props.total_fees_type).length != 0 ){
          self.props.total_fees_type[this.props.installments].map(function(item){
              var data = {"fees_type":item.fees_type,"amount": item.amount,"discount_amount":item.discount_amount,"after_discount":item.after_discount,"total_paid":""}
              main.push(data)
          })
          self.setState({
            total_fees_type_input:main
          })
        }
      }
  }
  render(){
    return (
      <div>
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
           {this.state.total_fees_type_input && this.state.total_fees_type_input.map(type=>{
              

              return <tr>
                  <td> {type.fees_type} </td>
                  <td> <input type="integer" value={type.amount} data-fee_type={type.fees_type}  name="amount" className="form-control" onChange={(e)=>this.onChange(e)} /> </td>
                  <td> <input type="integer" value={type.dicount_amount} className="form-control" data-fee_type={type.fees_type} name="discount_amount"  onChange={(e)=>this.onChange(e)} />  </td>
                  <td> <input type="integer" value={type.after_discount} className="form-control" data-fee_type={type.fees_type} name="after_discount" onChange={(e)=>this.onChange(e)} /> </td>
                  <td> <input type="integer" value={type.total_paid} className="form-control" data-fee_type={type.fees_type} name="total_paid" onChange={(e)=>this.onChange(e)} /> </td>
              </tr>
          })}
         
          <tr>
            <td> Total </td>
            <td> <input type="integer" className="form-control"/> </td>
            <td>  </td>
            <td> <input type="integer" className="form-control"/> </td>
            <td> <input type="integer" className="form-control"/> </td>
          </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>Save</button>
      </div>
    )
  }
}
