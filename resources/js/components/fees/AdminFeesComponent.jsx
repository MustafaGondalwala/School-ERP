import React,{ Component } from "react"
import { Link } from "react-router-dom"
import { SetInstallmentsForm , SetDueDateForm, InstallmentUpdate, PayFeesPanel, SelectIndividualStudent, ManageLoginForm } from "./utils"
import { connect } from "react-redux"; 
import Moment from 'moment';
import * as S from "react-select"



export const ColComponent = ({title,description,link,button_text}) => (
					<div className="col-lg-4">
			              <div className="card">
			                <div className="card-body">
			                  <h3 className="card-title mb-3">{title}</h3>
			                  <p className="card-text mb-4">{description}</p>
			                  <Link to={link} className="btn btn-primary">{button_text}</Link>
			                </div>
			              </div>
		            </div>
)

export const AdminFeeHeader =  ({mainHeader,header,sub_header}) => (
		<div className="header bg-primary pb-6">
		  <div className="container-fluid">
		    <div className="header-body">
		      <div className="row align-items-center py-4">
		        <div className="col-lg-6 col-7">
		          <h6 className="h2 text-white d-inline-block mb-0">{mainHeader}</h6>
		          <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
		            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
		              <li className="breadcrumb-item"><a href="#"><i className="fas fa-home" /></a></li>
		              <li className="breadcrumb-item"><a href="#">{header}</a></li>
		              {sub_header && 
		              	<li className="breadcrumb-item active" aria-current="page">{sub_header}</li>
		          	  }
		            </ol>
		          </nav>
		        </div>
		        <div className="col-lg-6 col-5 text-right">
		          <a href="#" className="btn btn-sm btn-neutral">New</a>
		          <a href="#" className="btn btn-sm btn-neutral">Filters</a>
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Fee Collected Today</h5>
		                  <span className="h2 font-weight-bold mb-0">350</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
		                    <i className="ni ni-active-40" />
		                  </div>
		                </div>
		              </div>
		              
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Today Student Paid</h5>
		                  <span className="h2 font-weight-bold mb-0">2,356</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
		                    <i className="ni ni-chart-pie-35" />
		                  </div>
		                </div>
		              </div>
		             
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Student Fees Set</h5>
		                  <span className="h2 font-weight-bold mb-0">924</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
		                    <i className="ni ni-money-coins" />
		                  </div>
		                </div>
		              </div>
		           
		            </div>
		          </div>
		        </div>
		        <div className="col-xl-3 col-md-6">
		          <div className="card card-stats">
		            <div className="card-body">
		              <div className="row">
		                <div className="col">
		                  <h5 className="card-title text-uppercase text-muted mb-0">Total Receipt</h5>
		                  <span className="h2 font-weight-bold mb-0">924</span>
		                </div>
		                <div className="col-auto">
		                  <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
		                    <i className="ni ni-money-coins" />
		                  </div>
		                </div>
		              </div>
		           
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
)

export const FeesHomePage = () => (
	<div>
		<AdminFeeHeader mainHeader="Fee" header="Home"/>
		<div className="container-fluid mt--6">
	        <div className="row">
	        	<ColComponent title="Set Fee Installments" description="Set the Total Numbe of Fee Installments" link="/admin/fees/set-installments" button_text="Set"/>
	        	<ColComponent title="Set Fee Due Date" description="Set the Due date for Fee Payments." link="/admin/fees/set-due-dates" button_text="Set"/>
	        	<ColComponent title="Set Fee" description="Set Fees For Individual" link="/admin/fees/set-fees-individual" button_text="Set"/>
	        	<ColComponent title="Set Fee Class Wise" description="Set Fees For Class Wise" link="/admin/fees/set-fees-class-wise" button_text="Set"/>
	        	<ColComponent title="Pay Fees" description="Pay Fees for Individual Student" link="/admin/fees/pay-fees" button_text="Pay"/>
	        	<ColComponent title="View/Print Receipt" description="View/Print The Fees Receipt for Student" link="/admin/fees/view-receipt" button_text="View"/>
	        	<ColComponent title="Manage Login" description="Manage Clerk Login" link="/admin/fees/manage-clerk-login" button_text="Manage"/>
	        	
	        </div>
	    </div>
    </div>
)


export const ManageClerkLogin = () => (
	<div>
		<AdminFeeHeader mainHeader="Fee" header="Manage Logins"/>
		<div className="container-fluid mt--6">
				<ManageLoginForm />
	    </div>
	</div>
)

export class SetFeesInstallments extends Component{
  constructor(props){
    super(props)
    this.state = {
      updateinstallment_message:"",
      add_text_message:"Save Installments"
    }
    this.updateFeesInstallment = this.updateFeesInstallment.bind(this)
  }
  updateFeesInstallment(data){
    var self = this
    self.setState({
      add_text_message:"Updating Installments ..."
    })
    const update_data = {"installments":data}
    axios({
      url:"/api/v1/fee/update-fees-installement",
      method:"post",
      data:update_data
    }).then(response=>{
        self.setState({
          updateinstallment_message:response.data.success.message,
          add_text_message:"Save Installments"
        })
    }).catch(error=>{
      console.log(error)
    })
  }
  render(){
    return(
      <div>
	  <AdminFeeHeader mainHeader="Fee" header="Set Installments"/>
      <div className="container-fluid mt--6">
        <div className="row card-wrapper">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title mb-3">Set Fees Installments  <Link  to="/admin/fees" class="btn btn-neutral float-right" type="submit">Back</Link></h3>

                  {this.state.updateinstallment_message && <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <span className="alert-icon"><i className="ni ni-like-2" /></span>
                    <span className="alert-text"><strong>Success!</strong> {this.state.updateinstallment_message}</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  }
                  <SetInstallmentsForm add_text_message={this.state.add_text_message} submit={this.updateFeesInstallment}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}


export class SetFeesDueDate extends Component{

  constructor(props){
    super(props)
    this.state = {
      select_year:"20-21",
      success:"",
      add_text_button:"Update Date"
    }
    this.change_year = this.change_year.bind(this)
    this.updateDueDate = this.updateDueDate.bind(this)
  }

  change_year(e){
    this.setState({
      select_year:e.target.value
    })
    console.log(e.target.value,this.state.select_year)
  }

  updateDueDate(data){
    var self = this
    this.setState({
      add_text_button:"Updating ...",
      success:"",
    })
    axios({
      method:"post",
      url:"/api/v1/fee/update-due-date",
      data:{"data":data,"select_year":self.state.select_year}
    }).then(response => {
      self.setState({
        success:"Data Updated Successfully",
        add_text_button:"Update Date"
      })
    })
  }

  render(){
    return(
      <div>
	  <AdminFeeHeader mainHeader="Fee" header="Set Fees Due Date"/>
      <div className="container-fluid mt--6">
        <div className="card mb-4">
          <div className="card-header">
            <div className="col-sm-3">
                <h2 className="mb-0">Set Due Date <Link to="/admin/fees" className="btn btn-neutral float-right" type="submit">Back</Link>
          		</h2>
              
            </div>
            </div>
          <div className="card-body">
          	    <select name="select_year" name="select_year" onChange={(e) => this.change_year(e)} className="form-control">
                  <option value="17-18">2017-18</option>
                  <option value="18-19">2018-19</option>
                  <option value="19-20">2019-20</option>
                  <option selected value="20-21">2020-21</option>
                  <option value="21-22">2021-22</option>
                  <option value="22-23">2022-23</option>
                  <option value="23-24">2023-24</option>
                </select>
                <br />
                <br />
	          {this.state.success && <div className="alert alert-success alert-dismissible fade show" role="alert">
	            <span className="alert-icon"><i className="ni ni-like-2" /></span>
	            <span className="alert-text"><strong>Success!</strong> {this.state.success}</span>
	            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
	              <span aria-hidden="true">×</span>
	            </button>
	          </div>
	          }
              <SetDueDateForm add_text_button={this.state.add_text_button}  select_year={this.state.select_year} submit={this.updateDueDate}  />
          </div>
        </div>
      </div>
      </div>
    )
  }
}


export class ViewFeeReceipt extends Component{
	constructor(props){
	    super(props)
	    this.state = {
	     add_student_button_text_individual:"Fetch",
	     receipts:"",
	     selectedReceiptId:"",
	     receiptDetails:"",
	     studentDetail:"",
		 view_receipt_button_text:"View",
		 print_receipt_button_text:"Print"
	    }
	    this.fetchStudent = this.fetchStudent.bind(this)
	    this.receiptClick = this.receiptClick.bind(this)
	}

	componentDidMount(){
		this.fetchStudent(1,'20-21')
	}

	fetchStudent(student_id,select_year){
		var self = this
		this.setState({
			student_id,select_year,
			add_student_button_text_individual:"Fetching ...",
			receiptDetails:"",
			receipts:"",
		})
		axios({
			url:"/api/v1/fee/receipt",
			method:"post",
			data: {
				student_id,select_year				
			}
		}).then(response => {
			self.setState({
				receipts:response.data.success.receipts,
			})
		})
		
	}
	receiptClick(e){
		var self = this
		this.setState({
		 view_receipt_button_text:"Loading ...",
		 print_receipt_button_text:"Loading ..."
		})
		var actionType = e.target.getAttribute("data-action") 
		var receipt_id = e.target.getAttribute("data-receipt-id")
		axios({
			url:"/api/v1/fee/receipt/"+receipt_id
		}).then(response => {
			self.setState({
				"receiptDetails":response.data.success.receiptDetails,
				"studentDetail":response.data.success.studenDetails,
				"selectedReceiptId": receipt_id,
				view_receipt_button_text:"View",
		 		print_receipt_button_text:"Print"
			})
		})
	}
	render(){
		return(
			<div>
			<AdminFeeHeader mainHeader="Fees" header="View Receipt"/>
			<div className="container-fluid mt--6">
        		<SelectIndividualStudent title="Select Student" add_student_button_text_individual={this.state.add_student_button_text_individual} submit={this.fetchStudent} />
				{this.state.receipts && <ShowReceiptList Receipts={this.state.receipts} receiptClick={this.receiptClick} view_receipt_button_text={this.state.view_receipt_button_text} print_receipt_button_text={this.state.print_receipt_button_text}/>}
				{this.state.receiptDetails && <ShowReceipt receiptDetails={this.state.receiptDetails} studentDetail={this.state.studentDetail} selectedReceiptId={this.state.selectedReceiptId}/>}
			</div>
			</div>
		)
	}
}

const ShowReceipt = ({receiptDetails,selectedReceiptId,studentDetail}) => (
	<div className="card mb-4">
		<div className="card-header">
			<h3 className="mb-0">Receipt: {selectedReceiptId}</h3>
		</div>
		<div className="card-body">
				{studentDetail && 
					<div className="row">
						<div className="col-md-4">
							<label>Roll No: { studentDetail.roll_no}</label></div>
						<div className="col-md-4">
							<label>Student Name: {studentDetail.student_name}</label>
						</div>
						<div className="col-md-4">
							<label>Father Name: {studentDetail.father_name}</label>
						</div>
					</div>
				}
			<br />
			<br />
      		{receiptDetails && Object.keys(receiptDetails).map(item => {
      			return <div className="row">
	      				<div className="col-md-4"><h3>{item}</h3></div>

	      				<div className="col-md-12">
	      				<div className="table-responsive">
	      					<table className="table">
	      						<thead>
									<th>ID</th>
									<th>Fee Type</th>
									<th>Amount</th>
									<th>Total Pending</th>
									<th>Current Paid</th>      							
	      						</thead>
	      						{receiptDetails && Object.keys(receiptDetails[item]).map((feeItem,id) => {
	      								if(feeItem != "total_amount" && feeItem!="total_pending" && feeItem != "current_paid")
		      								return <tr>
				      									<td>{id+1}</td>
				      									<td>{receiptDetails[item][feeItem].fee.fees_type}</td>
				      									<td>{receiptDetails[item][feeItem].fee.after_discount}</td>
				      									<td>{receiptDetails[item][feeItem].fee.total_pending}</td>
				      									<td>{receiptDetails[item][feeItem].reciept.current_paid}</td>
		      										</tr>
	      						})}
	      						{receiptDetails && <tr>
	      							<td></td>
	      							<td></td>
	      							<td>{receiptDetails[item].total_amount}</td>
	      							<td>{receiptDetails[item].total_pending}</td>
	      							<td>{receiptDetails[item].current_paid}</td>
	      						</tr>}
	      					</table>
	      					
	      				</div>
      				</div>
      				<br />
      				<br />
      			</div>
      		})}

		</div>
	</div>
)

const ShowReceiptList = ({Receipts,receiptClick,view_receipt_button_text,print_receipt_button_text}) => (
      <div className="card mb-4">
        <div className="card-header">
        	<h3 className="mb-0">Students Receipts</h3>
      	</div>
      	<div className="card-body">
      		<div className="table-responsive">
      			<table className="datatable table">
      				<thead>
      					<th>ID</th>
      					<th>Receipt ID</th>
      					<th>View</th>
      					<th>Print</th>
      					<th>Created at</th>
      					<th>Created By</th>
      				</thead>
      				<tbody>
      					{Receipts && Receipts.map( (item,id) => {
      						return <tr>
      							<td>{id+1}</td>
      							<td>{item.reciept}</td>
      							<td><button data-receipt-id={item.reciept} data-action={"view"} onClick={(e)=>receiptClick(e)} className="btn btn-primary">{view_receipt_button_text}</button></td>
      							<td><button data-receipt-id={item.reciept} data-action={"print"} onClick={(e)=>receiptClick(e)} className="btn btn-success">{print_receipt_button_text}</button></td>
      							<td>
      							{Moment(item.created_at).format('YYYY-MM-DD HH:MM')}</td>
      							<td>{item.account_name}</td>
      						</tr>
      					})}
      				</tbody>
      			</table>
      		</div>
      	</div>
      </div>
)

export class PayFeesHomePage extends Component{
	constructor(props){
	    super(props)
	    this.state = {
	      student_id:"",
	      select_year:"",
	      total_installment:[],
	      add_student_button_text_individual:"Fetch",
	      total_fees_type:"",
	      data_updated:"",
	      receiptDetails:"",
		  receipts:"",
		  view_receipt_button_text:"View",
		  print_receipt_button_text:"Print",
		  button_text:"Pay"
	    }
	    this.fetchStudent = this.fetchStudent.bind(this)
	    this.onChange = this.onChange.bind(this)
	    this.onSubmit = this.onSubmit.bind(this)
	    this.receiptClick = this.receiptClick.bind(this)

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

  	receiptClick(e){
		var self = this
		this.setState({
		 view_receipt_button_text:"Loading ...",
		 print_receipt_button_text:"Loading ..."
		})
		var actionType = e.target.getAttribute("data-action") 
		var receipt_id = e.target.getAttribute("data-receipt-id")
		axios({
			url:"/api/v1/fee/receipt/"+receipt_id
		}).then(response => {
			self.setState({
				"receiptDetails":response.data.success.receiptDetails,
				"studentDetail":response.data.success.studenDetails,
				"selectedReceiptId": receipt_id,
				view_receipt_button_text:"View",
		 		print_receipt_button_text:"Print",

			})
		})
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
	      receipts:""
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
					url:"/api/v1/fee/receipt",
					method:"post",
					data: {
						student_id:id,select_year				
					}
				}).then(response => {
					self.setState({
						receipts:response.data.success.receipts,
					})
				})
	    }
	  }


  	onSubmit(data){
  		var self = this
  		this.setState({
  			button_text:"Creating Receipt ...",
  		})
	    axios({
	      url:"/api/v1/fee/pay",
	      method:"post",
	      data: {
	      	"total_fees_type":self.state.total_fees_type,
	      	"total_installment":self.state.total_installment,
	      	"select_year":self.state.select_year,
	      	"student_id":self.state.student_id,
	      	"payDetails":data
	      }
	    }).then(response => {
	    	self.setState({
	    		total_fees_type:response.data.success.total_installments,
				receipts:response.data.success.receipts,
		      	receiptDetails:"",
	  			button_text:"Pay"
	    	})
  		})
  	}
	render(){
		return(
			<div>
				<AdminFeeHeader mainHeader="Fee" header="Pay Fees"/>
				<div className="container-fluid mt--6">
	        		<SelectIndividualStudent title="Select Student" add_student_button_text_individual={this.state.add_student_button_text_individual} submit={this.fetchStudent} />
					{this.state.receipts && <ShowReceiptList Receipts={this.state.receipts} receiptClick={this.receiptClick} view_receipt_button_text={this.state.view_receipt_button_text} print_receipt_button_text={this.state.print_receipt_button_text}/>}
					{this.state.receiptDetails && <ShowReceipt receiptDetails={this.state.receiptDetails} studentDetail={this.state.studentDetail} selectedReceiptId={this.state.selectedReceiptId}/>}
	        		
	        		{this.state.total_fees_type && Object.keys(this.state.total_fees_type).map(item =>{
			            return <InstallmentUpdate type="pay_fees" onChange={this.onChange} installment={item} total_fees_type={this.state.total_fees_type[item]}/>
			          })
			        }
			        {this.state.total_fees_type && 
			        	<PayFeesPanel user={this.props.user} button_text={this.state.button_text} onSubmit={this.onSubmit} />
					}
				</div>
			</div>
		)
	}
}

export  class SetIndividualFees extends Component{
  constructor(props){
    super(props)
    this.state = {
      student_id:"",
      select_year:"",
      total_installment:[],
      total_fees_type:[],
      data_updated:"",
      add_student_button_text_individual:"Fetch Student",
      add_button_text:"Save"
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
  fetchStudent(id,select_year){
    var self = this
    self.setState({
      student_id:id,
      select_year:select_year,
      add_student_button_text_individual:"Fetching Student ...",
      total_fees_type:[],
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
          add_student_button_text_individual:"Fetch Student"
        })
      });
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
                if(value == "" || value == NaN){
                  value = 0
                }

                if(name == "amount"){

                  if(i['discount_amount'] > 0){
                    i['amount'] = value;
                    i['after_discount'] = value - i['after_discount'] - 1;
                    i['total_pending'] = i['after_discount'] - value - 1; 
                  }else{
                    i["amount"] = value;
                    i['after_discount'] = value;
                    i['total_pending'] = value;  
                  }
                  
                }
                if(name == "discount_amount"){
                    if(value < 0 ){
                      i['discount_amount'] = 0;
                      i['after_discount'] = i['amount']
                      i['total_pending'] = i['amount'];  
                    }else{
                      i['discount_amount'] = value;
                      i['after_discount'] = i['amount'] - value
                      i['total_pending'] = i['amount'] - value;  
                    }
                    
                }
                if(name == "total_pending"){
                  i["total_pending"] = value
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

  onSubmit(e){
    var self = this
    self.setState({
      add_button_text:"Updating Fees ...",
      total_fees_type:""
    })
    axios({
      url:"/api/v1/fee/update-fee-individual",
      method:"post",
      data: self.state
    }).then(response => {
      self.setState({
          total_fees_type:response.data.success.total_installments,
          add_button_text:"Save"
      })
    })
  }
  render(){
    return(
    	<div>
    	<AdminFeeHeader header="Set Fee Individual" mainHeader="Hom"/>
	      <div className="container-fluid mt--6">
	         {this.state.data_updated && <div className="alert alert-success alert-dismissible fade show" role="alert">
	                <span className="alert-icon"><i className="ni ni-like-2" /></span>
	                <span className="alert-text"><strong>Success!</strong> {this.state.data_updated}</span>
	                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
	                  <span aria-hidden="true">×</span>
	                </button>
	              </div>
	              }
	        <SelectIndividualStudent add_student_button_text_individual={this.state.add_student_button_text_individual}  title="Select Individual" submit={this.fetchStudent} />
	        {this.state.total_fees_type && Object.keys(this.state.total_fees_type).map(item =>{
	            return <InstallmentUpdate onChange={this.onChange} installment={item} total_fees_type={this.state.total_fees_type[item]}/>
	          })
	        }
	        <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>
	        {this.state.add_button_text ? <span>{this.state.add_button_text}</span> : <span>
	          Save
	        </span>}
	        </button>
	      </div>
	     </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(PayFeesHomePage);
