import React,{Component} from "react"
import SetDueDateForm from "../form/SetDueDateForm"
import {Link} from "react-router-dom"

export default class SetFeesDueDate extends Component{

  constructor(props){
    super(props)
    this.state = {
      select_year:"20-21",
      success:""
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
    axios({
      method:"post",
      url:"/api/v1/fee/update-due-date",
      data:{"data":data,"select_year":self.state.select_year}
    }).then(response => {
      self.setState({
        success:"Data Updated Successfully"
      })
    })
  }

  render(){
    return(
      <div className="container-fluid mt--6">
        <div className="card mb-4">

          <div className="card-header">
            <div className="col-sm-3">

                <h2 className="mb-0">Set Due Date </h2>



                <select name="select_year" name="select_year" onChange={(e) => this.change_year(e)} className="form-control">
                  <option value="17-18">2017-18</option>
                  <option value="18-19">2018-19</option>
                  <option value="19-20">2019-20</option>
                  <option selected value="20-21">2020-21</option>
                  <option value="21-22">2021-22</option>
                  <option value="22-23">2022-23</option>
                  <option value="23-24">2023-24</option>
                </select>
            </div>
            <Link  to="/admin/fees" class="btn btn-neutral float-right" type="submit">Back</Link>
            
          </div>
          <div className="card-body">
          {this.state.success && <div className="alert alert-success alert-dismissible fade show" role="alert">
            <span className="alert-icon"><i className="ni ni-like-2" /></span>
            <span className="alert-text"><strong>Success!</strong> {this.state.success}</span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          }

              <SetDueDateForm select_year={this.state.select_year} submit={this.updateDueDate}  />
          </div>
        </div>
      </div>

    )
  }
}
