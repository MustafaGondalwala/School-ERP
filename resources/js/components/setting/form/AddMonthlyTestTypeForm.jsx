import React,{ Component } from "react"

export default class AddMonthlyTestTypeForm extends Component{
 	 constructor(props){
	    super(props)
	    this.state = {
	      data: {
	        monthly_test:""
	      },
	      errors:""
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
	    if (!data.monthly_test) errors.monthly_test = "Can't be blank";
	    return errors;
	  }

	  onSubmit(e){
    	e.preventDefault();
	    const errors = this.validate(this.state.data);
	    this.setState({ errors });
	    console.log(this.state.data)
	    if (Object.keys(errors).length === 0) {
	      this.props.submit(this.state.data)
	      this.setState({
	        data: {...this.state.data,["monthly_test"]:""}
	      });
	    }
	  }

	render(){
		const {data,errors} = this.state

		return(
			 <form>
		          {this.state.errors.monthly_test && <div className="alert alert-warning alert-dismissible fade show" role="alert">
		          <span className="alert-icon"><i className="ni ni-like-2" /></span>
		          <span className="alert-text"><strong>Warning!</strong> {this.state.errors.monthly_test}</span>
		          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
		            <span aria-hidden="true">×</span>
		          </button>
		          </div>
		          }
		          <div className="form-group">
		            <label className="form-control-label" htmlFor="exampleFormControlInput1">Monthly Test Type</label>
		            <input type="text" name="monthly_test" onChange={(e) =>this.onChange(e)} value={this.state.data.monthly_test} className="form-control" id="exampleFormControlInput1" placeholder="Exam Type" />
		            {errors.monthly_test && <InlineError text={errors.monthly_test} />}
		          </div>
		          <button onClick={(e)=> this.onSubmit(e)} className="btn btn-primary">Add Monthly Test Type</button>
		      </form>
		)
	}
}