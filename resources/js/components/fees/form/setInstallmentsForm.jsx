import React,{Component} from "react"

export default class SetInstallmentsForm extends Component{
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
