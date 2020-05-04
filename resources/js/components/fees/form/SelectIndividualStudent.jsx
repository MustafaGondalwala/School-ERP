import React,{Component} from "react"
import Select from 'react-select'
import InlineError from "../messages/InlineError"

import {Link} from "react-router-dom"


export default class SelectIndividualStudent extends Component{
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

    console.log(this.state.select_year)
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
