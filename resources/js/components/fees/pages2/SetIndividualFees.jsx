import React,{Component} from "react"
import SelectIndividualStudent from "../form/SelectIndividualStudent"
import ChangeFees from "../form/ChangeFees";
import InstallmentUpdate from "../form/InstallmentUpdate";


export default class SetIndividualFees extends Component{
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
      add_button_text:"Updating Fees ..."
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
    )
  }
}
