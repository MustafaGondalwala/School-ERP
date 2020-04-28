import React,{Component} from "react"
import InlineError from "../messages/InlineError"

export default class UpdatePeriodModel extends Component{
	constructor(props){
		super(props)
		this.state = {
			data : {
				period_id:"",
				start_time:"",
				end_time:""
			},
			errors:{}
		}
		this.onSubmit = this.onSubmit.bind(this)
	}
	onChange(e){
	    this.setState({
	      data: {...this.state.data,[e.target.name]:e.target.value}
	    });
	  }
	validate(data){
	    const errors = {};
	    if (!data.start_time) errors.start_time = "Can't be blank";
	    if (!data.end_time) errors.end_time = "Can't be blank";
	    if (!data.period_id) errors.period_id = "Can't be blank";
	    return errors
	}
	onSubmit(){
		const errors = this.validate(this.state.data)
		console.log(this.state.data)
		this.setState({errors})
		this.props.submit(this.state.data)
	}
	render(){
		const {data,errors} = this.state
		return(
        		<div className="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal- modal-dialog-centered modal-sm" role="document">
                    <div className="modal-content">
                      <div className="modal-body p-0">
                        <div className="card bg-secondary border-0 mb-0">
                          <div className="card-header bg-transparent pb-5">
                            <div className=" text-center mt-2 mb-3">Add Class Period</div>
                          </div>
                          <div className="card-body">
                            <form role="form">
                              <div className="form-group mb-3">
                                <label>Period ID</label>
                                <select onChange={(e) => this.onChange(e)} name="period_id" value={data.period_id} className="form-control">
                                    <option value="lunch">Lunch</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                </select>
                       			{errors.period_id && <InlineError text={errors.period_id} />}

                              </div>
                              <div className="form-group">
                                <label>Start Time</label>
                                <input onChange={(e) => this.onChange(e)} name="start_time" value={data.start_time} type="time" className="form-control"/>
                       			{errors.start_time && <InlineError text={errors.start_time} />}
                              	
                              </div>
                              <div className="form-group">
                                <label>End Time</label>
                                <input onChange={(e) => this.onChange(e)} name="end_time" value={data.end_time} type="time" className="form-control"/>
                       			{errors.end_time && <InlineError text={errors.end_time} />}
                              </div>
                              <div className="text-center">
                                <button onClick={(e)=> this.onSubmit()} type="button" className="btn btn-primary">Add Period</button>
                                <button onClick={(e)=> this.onSubmit()} type="button" className="btn btn-warning" data-dismiss="modal">Close Panel</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

        )
	}

}