import React,{Component} from "react"
import InlineError from "../messages/InlineError"

export default class AddClassForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {
        add_class_input:""
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
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data)
      this.setState({
        data: {...this.state.data,["class_title"]:""}
      });
    }
  }


  validate(data){
    const errors = {};
    if (!data.class_title) errors.class_title = "Can't be blank";
    return errors;
  }
  render(){
    const {data,errors} = this.state
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
          <div className="form-group">
            <label className="form-control-label" htmlFor="exampleFormControlInput1">Class Name</label>
            <input type="string" name="class_title" onChange={(e) =>this.onChange(e)} value={this.state.data.class_title} className="form-control" id="exampleFormControlInput1" placeholder="Class Name" />
            {errors.class_title && <InlineError text={errors.class_title} />}

          </div>
          <button onClick={(e)=> this.onSubmit(e)} className="btn btn-primary">Add Class</button>
      </form>
    )
  }
}
