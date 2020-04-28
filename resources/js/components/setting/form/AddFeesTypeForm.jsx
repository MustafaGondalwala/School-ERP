import React,{Component} from "react"
import InlineError from "../messages/InlineError"

export default class AddFeesTypeForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {
        fees_type:""
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

  onSubmit(e){
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    console.log(this.state.data)
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data)
      this.setState({
        data: {...this.state.data,["fees_type"]:""}
      });
    }
  }


  validate(data){
    const errors = {};
    if (!data.fees_type) errors.fees_type = "Can't be blank";
    return errors;
  }
  render(){
    const {data,errors} = this.state
    return(
      <form>
          {this.state.errors.fees_type && <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <span className="alert-icon"><i className="ni ni-like-2" /></span>
          <span className="alert-text"><strong>Warning!</strong> {this.state.errors.fees_type}</span>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          </div>
          }
          <div className="form-group">
            <label className="form-control-label" htmlFor="exampleFormControlInput1">Fees Type</label>
            <input type="string" name="fees_type" onChange={(e) =>this.onChange(e)} value={this.state.data.fees_type} className="form-control" id="exampleFormControlInput1" placeholder="Fees Type" />
            {errors.fees_type && <InlineError text={errors.fees_type} />}

          </div>
          <button onClick={(e)=> this.onSubmit(e)} className="btn btn-primary">Add Fees</button>
      </form>
    )
  }
}
