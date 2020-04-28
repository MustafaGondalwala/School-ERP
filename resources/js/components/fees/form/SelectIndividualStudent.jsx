import React,{Component} from "react"
import Select from 'react-select'

import {Link} from "react-router-dom"


export default class SelectIndividualStudent extends Component{
  constructor(props){
    super(props)
    this.state = {
      student_list: [],
      student_id:"",
      select_year:"20-21"
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
  }
  handleInputChange(e){
    this.setState({
      student_id:e.value
    })
  };

  onSubmit(){
    this.props.submit(this.state.student_id,this.state.select_year)
  }

  onChange(e){
    this.setState({
      select_year:e.target.value
    })
  }

  render(){
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

              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Select Year</label>
              <select name="select_year" value={this.state.select_year} onChange={(e)=>this.onChange(e)} class="form-control"><option value="17-18">2017-18</option><option value="18-19">2018-19</option><option value="19-20">2019-20</option><option value="20-21">2020-21</option><option value="21-22">2021-22</option><option value="22-23">2022-23</option><option value="23-24">2023-24</option></select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <button className="btn btn-primary" onClick={(e)=>this.onSubmit()}>Fetch</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}
