import React,{Component} from "react"
import SetInstallmentsForm from "../form/setInstallmentsForm"
import {Link} from "react-router-dom"
export default class SetFeesInstallments extends Component{
  constructor(props){
    super(props)
    this.state = {
      updateinstallment_message:""
    }
    this.updateFeesInstallment = this.updateFeesInstallment.bind(this)
  }
  updateFeesInstallment(data){
    var self = this
    const update_data = {"installments":data}
    axios({
      url:"/api/v1/fee/update-fees-installement",
      method:"post",
      data:update_data
    }).then(response=>{
        self.setState({
          updateinstallment_message:response.data.success.message
        })
    }).catch(error=>{
      console.log(error)
    })
  }
  render(){
    return(
      <div className="container-fluid mt--6">
        <div className="row card-wrapper">
          <div className="col-lg-4">
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

                  <SetInstallmentsForm  submit={this.updateFeesInstallment}/>
              </div>
            </div>


          </div>
        </div>
      </div>

    )
  }
}
