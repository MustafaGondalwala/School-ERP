import React,{Component} from "react"
import InlineError from "../messages/InlineError"

export default class AddClassForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {
        subject_name:""
      },
      errors:""
    }
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
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data)
      this.setState({
        data: {...this.state.data,["subject_name"]:""}
      });
    }
  }

  validate(data){
    const errors = {};
    if (!data.subject_name) errors.subject_name = "Can't be blank";
    if (data.subject_name.length < 3) errors.subject_name = "Min. Length 3 char.";
    return errors;
  }
  render(){
    const {data,errors} = this.state
    return(
      <form>
          <div className="form-group">
            <label className="form-control-label" htmlFor="exampleFormControlInput1">Subject Name</label>
            <input type="string" name="subject_name" onChange={(e) =>this.onChange(e)} value={this.state.data.subject_name} className="form-control" id="exampleFormControlInput1" placeholder="Subject Name" />
            {errors.subject_name && <InlineError text={errors.subject_name} />}

          </div>
          <button onClick={(e)=> this.onSubmit(e)} className="btn btn-primary">Add Subject</button>
      </form>
    )
  }
}
