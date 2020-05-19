import React,{Component} from "react"
import {Link} from  "react-router-dom"
import {InstallmentUpdate,GetYear} from "./utils";
import {ShowReceiptList,ShowReceipt} from "./AdminFeesComponent";

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

export const ParentFeesHeader =  ({mainHeader,header,sub_header}) => (
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
        </div>
      </div>
    </div>
)
export class ParentFeesHomePage extends Component{
  render(){
    return(
      <div>
        <ParentFeesHeader mainHeader="Fee" header="Home"/>
          <div className="container-fluid mt--6">
          	<div className="row">
          		<ColComponent title="View Pending Fees" description="View Pending Fees by Installment" link={`/parent/pending-fees/${this.props.match.params.student_id}`} button_text="View"/>
          		<ColComponent title="View/Print Receipt" description="View/Print Receipt" link={`/parent/view-receipts/${this.props.match.params.student_id}`} button_text="View"/>
          	</div>
          </div>
      </div>
    )
  }
}

export class ParentPendingFees extends Component{
	constructor(props){
      super(props)
      this.state = {
        student_id:"",
        select_year:"20-21",
        total_installment:[],
        total_fees_type:"",
        receiptDetails:"",
        receipts:"",
        view_receipt_button_text:"View",
        print_receipt_button_text:"Print",
      }
      this.fetchPending = this.fetchPending.bind(this)
      this.receiptClick = this.receiptClick.bind(this)
      this.onChange = this.onChange.bind(this)
  }

  fetchPending(student_id){
    var self = this;
    this.setState({
        total_installment:[],
        total_fees_type:"",
        receiptDetails:"",
        receipts:"",
        view_receipt_button_text:"View",
        print_receipt_button_text:"Print",
    })
    var select_year = this.state.select_year;
    axios({
      url:"/api/v1/parent/view-pending-fees",
      method:"post",
      data: {
        "student_id":student_id,
        "total_installment":this.state.total_installment,
        "select_year":select_year
      }
    }).then(response=>{
       self.setState({
            total_fees_type:response.data.success.total_installments,
        })
    })
    axios({
          url:"/api/v1/parent/fee/receipt",
          method:"post",
          data: {
            student_id:student_id,select_year 
          }
    }).then(response => {
          self.setState({
            receipts:response.data.success.receipts,
          })
        })
  }
  componentDidMount(){
    this.fetchPending(this.props.match.params.student_id)
  }
  componentWillReceiveProps(){
    this.fetchPending(this.props.match.params.student_id)
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
        url:"/api/v1/parent/fee/receipt/"+receipt_id
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

  onChange(e){
    this.setState({
      select_year:e.target.value
    })
    this.fetchPending(this.props.match.params.student_id)
  }
  render(){
		return(
			<div>
				<ParentFeesHeader mainHeader="Fees" header="Pending Fees"/>
				<div className="container-fluid mt--6">
                <div className="row">
                    <div style={{padding:"20px"}}>
                    <GetYear onChange={this.onChange} title="View Fees " back_link={`/parent/fees/${this.props.match.params.student_id}`}/>
                    </div>
                    {this.state.receipts && <ShowReceiptList Receipts={this.state.receipts} receiptClick={this.receiptClick} view_receipt_button_text={this.state.view_receipt_button_text} print_receipt_button_text={this.state.print_receipt_button_text}/>}
                    {this.state.receiptDetails && <ShowReceipt receiptDetails={this.state.receiptDetails} studentDetail={this.state.studentDetail} selectedReceiptId={this.state.selectedReceiptId}/>}
                    {this.state.total_fees_type ? Object.keys(this.state.total_fees_type).map(item =>{
                        return <InstallmentUpdate type="view_fees" onChange={this.onChange} installment={item} total_fees_type={this.state.total_fees_type[item]}/>
                      })
                    : <p>Loading ...</p>
                    }
	          		</div>
	          	</div>
			</div>
		)
	}
}



export class ParentViewReceipts extends Component{
  constructor(props){
      super(props)
      this.state = {
        student_id:"",
        select_year:"20-21",
        total_fees_type:"",
        receiptDetails:"",
        receipts:"",
        view_receipt_button_text:"View",
        print_receipt_button_text:"Print",
      }
      this.fetchPending = this.fetchPending.bind(this)
      this.receiptClick = this.receiptClick.bind(this)
      this.onChange = this.onChange.bind(this)
  }

  fetchPending(student_id){
    var self = this;
    this.setState({
        total_installment:[],
        total_fees_type:"",
        receiptDetails:"",
        receipts:"",
        view_receipt_button_text:"View",
        print_receipt_button_text:"Print",
    })
    var select_year = this.state.select_year;
    axios({
          url:"/api/v1/parent/fee/receipt",
          method:"post",
          data: {
            student_id:student_id,select_year 
          }
    }).then(response => {
          self.setState({
            receipts:response.data.success.receipts,
          })
        })
  }
  componentDidMount(){
    this.fetchPending(this.props.match.params.student_id)
  }
  componentWillReceiveProps(){
    this.fetchPending(this.props.match.params.student_id)
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
        url:"/api/v1/parent/fee/receipt/"+receipt_id
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

  onChange(e){
    this.setState({
      select_year:e.target.value
    })
    this.fetchPending(this.props.match.params.student_id)
  }
  render(){
    return(
      <div>
        <ParentFeesHeader mainHeader="Fees" header="Pending Fees"/>
        <div className="container-fluid mt--6">
                <div className="row">
                    <div style={{padding:"20px"}}>
                    <GetYear onChange={this.onChange} title="View Fees " back_link={`/parent/fees/${this.props.match.params.student_id}`}/>

                    </div>
                </div>
                <div className="row">
                    {this.state.receipts && <ShowReceiptList Receipts={this.state.receipts} receiptClick={this.receiptClick} view_receipt_button_text={this.state.view_receipt_button_text} print_receipt_button_text={this.state.print_receipt_button_text}/>}
                    {this.state.receiptDetails && <ShowReceipt receiptDetails={this.state.receiptDetails} studentDetail={this.state.studentDetail} selectedReceiptId={this.state.selectedReceiptId}/>}
                   
                </div>
              </div>
      </div>
    )
  }
}
