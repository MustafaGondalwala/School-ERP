import React,{Component} from "react"
import EveryInstallmentForm from "./EveryInstallmentForm"

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class ChangeFees extends Component{

  constructor(props){
    super(props)
    this.state = {
      total_installment:[],
      total_fees_type:[]
    }

    this.Submit = this.Submit.bind(this)
  }


  fetchStartUpData(){
    var student_id = this.props.student_id
    var year = this.props.select_year;
    var self = this
    axios({
      url:"/api/v1/fee/get-available-fees",
      method:"post",
      data:{
        student_id: self.props.student_id,
        select_year:self.props.select_year,
        installments:self.props.total_installment
      }
    }).then(response=>{
      self.setState({
        total_fees_type:response.data.success.total_installments
      })       
    });
    console.log(this.state.total_fees_type)
  }

  Submit(total_fees_type,installments){

    axios({
      url:"/api/v1/fee/update-fee-individual",
      method:"post",
      data:{
        "total_fees_type":total_fees_type,
        "installments":installments,
        "select_year":this.props.select_year,
        "student_id":this.props.student_id,
      }
    }).then((response)=>{
      console.log(response.data)
    })
  }
  componentWillReceiveProps(){
    this.fetchStartUpData()
    // console.log("change fees in receive props",this.state.total_fees_type)
  }

  componentDidMount(){
    this.fetchStartUpData()
    // console.log("change fees in did mount",this.state.total_fees_type)
  }

 

  render(){
    return(
      <div>
        {this.props.total_installment && this.props.total_installment.map(item => {
          return <div className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">{item} Fee Set</h3>
            </div>
              <div className="card-body">
                <EveryInstallmentForm submit={this.Submit} installments={item} total_fees_type={this.state.total_fees_type} />
                
              </div>
          </div>
        })
      }
      </div>
    )
  }
}
