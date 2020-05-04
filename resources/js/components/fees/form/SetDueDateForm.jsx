import React,{Component} from "react"
import InlineError from "../messages/InlineError"

export default class SetDueDateForm extends  Component{
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
