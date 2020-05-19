import React,{Component} from "react"
import { Link } from "react-router-dom"
import Select from "react-select"
import InlineError from "./messages/InlineError"

export class SetDueDateForm extends  Component{
  constructor(props){
    super(props)
    this.state = {
      total_installment_input: "",
      errors:""
    }
    this.onChange = this.onChange.bind(this)
    this.fetchYearandInstallments = this.fetchYearandInstallments.bind(this)
  }

  fetchYearandInstallments(){
    var self = this
    axios({
      method:"post",
      url:'/api/v1/fee/get-total-installments',
      data:self.props
    }).then(response=>{
      var main = []
      response.data.success.total_installment.map(function(item){
        if(item.due_date == null){
          item.due_date = ""
        }
          var data = {"installments":item.installments,"input_data":item.due_date}
          main.push(data)
      })
      self.setState({
        total_installment_input: main
      })
    })
  }
  componentDidMount(){
    this.setState({
      total_installment_input:""
    })
    this.fetchYearandInstallments()
  }
  componentWillReceiveProps(){
    this.setState({
      total_installment_input:""
    })
    this.fetchYearandInstallments()
  }
  onChange(e){
    var total_installment_input = this.state.total_installment_input
    total_installment_input.map(item=>{
      if(e.target.name == item.installments){
        item.input_data = e.target.value
      }
    })
    this.setState({
      total_installment_input:total_installment_input
    })
  }
  onSubmit(e){
    e.preventDefault()
    this.props.submit(this.state.total_installment_input)
  }
  render(){
    const {installments,data} = this.state
    const self = this
    return(
      <form>
        {this.state.errors && <InlineError text={this.state.error} />}
        {this.state.total_installment_input ? this.state.total_installment_input.map(function(item){
          return <div className="form-group">
            <label>{item.installments} Due Date</label>
            <input type="date" defaultValue={item.input_data} data={item.input_data}  onChange={(e) => self.onChange(e)} name={item.installments} className="form-control"/>
          </div>
        })
         : <h2>Loading ...</h2>
        }
        <button onClick={(e)=>self.onSubmit(e)} className="btn btn-primary">{this.props.add_text_button}</button>
      </form>
    )
  }
}

export  class SetInstallmentsForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      total : ["Installment1","Installment2","Installment3",
              "Installment4","Installment5","Installment6",
              "Installment7","Installment8","Installment9",
              "Installment10","Installment11","Installment12"
            ],
      total_installment : [],
      errors:{}
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount(){
    var self = this
  axios({
      url:'/api/v1/fee/get-total-installments-only-installments',
    }).then(response=>{
      self.setState({
        total_installment: response.data.success.total_installment
      })
    })
  }
  onChange(e){
    var getCurrent = this.state.total_installment
    if(e.target.checked){
      getCurrent.push(e.target.name)
    }else{
      var new_current = []
      getCurrent.map(item => {
          if(item !==  e.target.name)
            new_current.push(item)
      })
      getCurrent = new_current
    }
    this.setState({
      total_installment:getCurrent,
      errors:{}
    })
    console.log(this.state.total_installment)

  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state.total_installment)
    if(this.state.total_installment.length != 0){
      this.props.submit(this.state.total_installment)
    }else{
      var errors = {}
      errors.total_installment = "Please Enter aleast 1 Fees Installments";
      this.setState({errors})
    }
  }
  render(){
    return(
      <form>
          {this.state.errors.total_installment && <div className="alert alert-warning alert-dismissible fade show" role="alert">
	          <span className="alert-icon"><i className="ni ni-like-2" /></span>
	          <span className="alert-text"><strong>Warning!</strong> {this.state.errors.total_installment}</span>
	          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
	            <span aria-hidden="true">×</span>
	          </button>
	          </div>
          }
          {this.state.total_installment && this.state.total.map(item => {
            if(this.state.total_installment.indexOf(item) > -1)
            return  <div class="form-group col-md-1">
                      <label className="form-control-label">{item}</label>
                      <input type="checkbox" value={item} checked={true} onChange={(e)=>this.onChange(e)} name={item} />
                    </div>
            else
              return  <div class="form-group col-md-1">
                        <label className="form-control-label">{item}</label>
                        <input type="checkbox" value={item} onChange={(e)=>this.onChange(e)} name={item} />
                      </div>
          })}
          <button className="btn btn-primary" onClick={ (e) => this.onSubmit(e)}>{this.props.add_text_message}</button>
      </form>
    )
  }
}


export const GetYear = ({title,back_link,onChange}) => {
  return(
     <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">{title} <Link  to={back_link} class="btn btn-neutral float-right" type="submit">Back</Link></h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="form-group">
              <label>Select Year: </label>
              <select name="select_year" name="select_year" onChange={(e) => onChange(e)} className="form-control">
                  <option value="17-18">2017-18</option>
                  <option value="18-19">2018-19</option>
                  <option value="19-20">2019-20</option>
                  <option selected value="20-21">2020-21</option>
                  <option value="21-22">2021-22</option>
                  <option value="22-23">2022-23</option>
                  <option value="23-24">2023-24</option>
                </select>
            </div>
          </div>
        </div>
    </div>
  )
}

export class SelectIndividualStudent extends Component{
  constructor(props){
    super(props)
    this.state = {
      student_list: [],
      installments:[],
      student_id:"",
      select_year:"20-21",
      select_installments:"",
      errors_student_list:""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    var self = this
    axios({
      url:"/api/v1/student/get-all-searable-student"
    }).then(response=>{
      self.setState({
        student_list:response.data.success.student
      })
    })

    axios({
      url:"/api/v1/fee/get-total-installments-only-installments",
    }).then(response => {
      self.setState({
        installments: response.data.success.total_installment
      })
    })

  }
  handleInputChange(e){
    this.setState({
      student_id:e.value
    })
  };

  onSubmit(){
    if(this.state.student_id){
      this.setState({
          errors_student_list:""
      })

      if(this.props.get_installment){
        this.props.submit(this.state.student_id,this.state.select_year,this.state.select_installments)
      }else{
        this.props.submit(this.state.student_id,this.state.select_year)
      }
    }else{
      this.setState({
        errors_student_list:"Please Select Student"
      })
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render(){
    const {errors_student_list} = this.state
    return(
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">{this.props.title} <Link  to="/admin/fees" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Select Student</label>
                <Select options={this.state.student_list}  onChange={(e) =>this.handleInputChange(e)} />
                {errors_student_list && <InlineError  text={errors_student_list}/>}
              </div>
            </div>

            {this.props.hide_year ? 
              <div className="col-md-4"></div>
              :<div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" name="select_year" htmlFor="example3cols1Input">Select Year</label>
              <select name="select_year"  value={this.state.select_year} onChange={(e)=>this.onChange(e)} class="form-control"><option value="17-18">2017-18</option><option value="18-19">2018-19</option><option value="19-20">2019-20</option><option value="20-21">2020-21</option><option value="21-22">2021-22</option><option value="22-23">2022-23</option><option value="23-24">2023-24</option></select>
              </div>
            </div>}

            {this.props.get_installment && <div className="col-md-4">
                 <div className="form-group">
                  <label className="form-control-label" htmlFor="example3cols1Input">Select Installment</label>
                  <select name="select_installments" value={this.state.select_installments} onChange={(e)=>this.onChange(e)} class="form-control">
                  <option value="">-- Select Installment --</option>
                  {this.state.installments && this.state.installments.map(item => {
                    return <option value={item}>{item}</option>
                  })}
                  </select>
                </div>
              </div>
            }


            

          </div>
          <div className="row">
          <div className="col-md-4">
              <div className="form-group">
                <button className="btn btn-primary" onClick={(e)=>this.onSubmit()}>
                {this.props.add_student_button_text_individual
                  ? <span>{this.props.add_student_button_text_individual}</span>
                  : <span>Fetch</span>
                }
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export class InstallmentUpdate extends Component{
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
    var total_discount = 0;
    var total_afterdiscount = 0;
    var total_total_pending = 0;
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
                  if(this.props.type == "pay_fees"){
                      return <tr>
                            <td> {type.fees_type} </td>
                            <td> <input min="0" type="number" disabled value={type.amount} data-fee_type={type.fees_type}  name="amount" className="form-control disabled"  /> </td>
                            <td> <input min="0" type="number" disabled value={type.discount_amount} className="form-control disabled" data-fee_type={type.fees_type} name="discount_amount"   />  </td>
                            <td> <input min="0" type="number" disabled value={type.after_discount} className="form-control disabled" data-fee_type={type.fees_type} name="after_discount"  /> </td>
                            <td> <input min="0" type="number"  disabled value={type.total_pending} className="form-control disabled" data-fee_type={type.fees_type} name="total_paid" max={type.after_discount}  /> </td>
                          <td> <input min="0" type="number" value={type.current_paid} className="form-control" data-fee_type={type.fees_type} name="current_paid" max={type.after_discount} onChange={(e)=>this.props.onChange(e,this.props.installment)} /> </td>
                       </tr>
                  }else if (this.props.type == "view_fees"){
                      return <tr>
                            <td> {type.fees_type} </td>
                            <td> <input min="0" type="number" disabled value={type.amount} data-fee_type={type.fees_type}  name="amount" className="form-control disabled"  /> </td>
                            <td> <input min="0" type="number" disabled value={type.discount_amount} className="form-control disabled" data-fee_type={type.fees_type} name="discount_amount"   />  </td>
                            <td> <input min="0" type="number" disabled value={type.after_discount} className="form-control disabled" data-fee_type={type.fees_type} name="after_discount"  /> </td>
                            <td> <input min="0" type="number"  disabled value={type.total_pending} className="form-control disabled" data-fee_type={type.fees_type} name="total_paid" max={type.after_discount}  /> </td>
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

export class PayFeesPanel extends Component{
  constructor(props){
    super(props)
    this.state = {
      "payment_type":"cash"
    }
    this.changePaymentType = this.changePaymentType.bind(this)
    this.payDetailsSend = this.payDetailsSend.bind(this)
  }

  changePaymentType(e){
    this.setState({
      payment_type:e.target.value
    })
  }

  payDetailsSend(e){
    this.props.onSubmit(this.state)
  }
  render(){
    return(
        <div className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">Pay Fee Details</h3>
            </div>
            <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <label>Account Name: <input value={this.props.user.name} type="text" disabled className="form-control" /></label>
                  </div>
                  <div className="col-md-2">
                    <label>Payment Type: <select value={this.state.payment_type} onChange={this.changePaymentType} class="form-control">
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select></label>
                  </div>
                  <div className="col-md-2">
                  </div>
                </div>
                <div className="row">
                  <button className="btn btn-primary" onClick={this.payDetailsSend}>{this.props.button_text}</button>
                </div>
            </div>
        </div>
    )
  }
}



export class ManageClerkForm extends Component{
  render(){
    return(
      <form>
        <div className="row">
          <div className="col-md-4">
            <label>EmpId:</label>
            <input value="" className="form-control" />
          </div>
          <div className="col-md-4">
            <label>Name:</label>
            <input value="" className="form-control" />
          </div>
        </div>
      </form>
    )
  }
}
export class ManageLoginForm extends Component{
  render(){
    return(
      <div className="card">
              <div className="card-header border-0">
                <div className="row">
                  <div className="col-6">
                    <h3 className="mb-0">Manage Clerk Login</h3>
                  </div>
                  <div className="col-6 text-right">
                    <a href="#" className="btn btn-sm btn-primary btn-round btn-icon" data-toggle="tooltip" data-original-title="Edit User" data-toggle="modal" data-target="#modal-form">
                      <span className="btn-inner--icon"><i className="fas fa-user-edit" /></span>
                      <span className="btn-inner--text">Add</span>
                    </a>
                  </div>
                </div>
              </div>
        
                <div className="modal fade show" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                  <div className="modal-dialog modal- modal-dialog-top modal-lg col-md-12" role="document">
                    <div className="modal-content">
                      <div className="modal-body p-0 col-md-12">
                        <div className="card bg-secondary border-0 mb-0">
                          <div className="card-header bg-transparent pb-5">
                            <div className=" text-center mt-2 mb-3">Edit Clerk Login</div>
                          </div>
                          <div className="card-body">
                            <ManageClerkForm />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </div>

    )
  }
}