import React,{ Component } from "react"
import Select from 'react-select'

export default class SelectTeachers extends Component{
	
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
	      url:"/api/v1/teacher//get-all-searable-teacher"
	    }).then(response=>{

	      self.setState({
	        teacher_list:response.data.success.teacher
	      })
	    })
	  }
	  handleInputChange(e){
	    this.setState({
	      teacher_id:e.value
	    })
	  };


	  onSubmit(){
	    this.props.submit(this.state.teacher_id)
	  }


	render(){
		return(
			 <div className="card mb-4">
		        <div className="card-header">
		          <h3 className="mb-0">Select Teacher </h3>
		        </div>
		        <div className="card-body">
		          <div className="row">
		            <div className="col-md-6">
		              <div className="form-group">
		                <label className="form-control-label" htmlFor="example3cols1Input">Select Teachers</label>
		                <Select options={this.state.teacher_list}  onChange={(e) =>this.handleInputChange(e)} />
		              </div>
		            </div>
		           

		          </div>
		          <div className="row">
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