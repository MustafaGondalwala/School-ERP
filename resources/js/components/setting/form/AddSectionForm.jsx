import React,{Component} from "react"
import InlineError from "../messages/InlineError"

export default class AddSectionForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {
        class_id:"",
        section_name:""
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
        data: {...this.state.data,["section_name"]:""}
      });
      this.setState({
        data: {...this.state.data,["class_id"]:""}
      });
    }
  }

  validate(data){
    const errors = {};
    if (!data.class_id) errors.class_id = "Can't be blank";
    if (!data.section_name) errors.section_name = "Can't be blank";

    return errors;
  }
  render(){
    const {data,errors} = this.state
    return(
      <form>
          <div className="form-group">
            <label>Class:</label>
            <select name="class_id"  onChange={(e) =>this.onChange(e)}  className="form-control">
            <option value="">-Select-</option>

              {this.props.classes.length>1 &&
                this.props.classes.map((item,id)=>{
                  return <option value={item.id}>{item.class_title}</option>
                })
              }
            </select>
            {errors.class_id && <InlineError text={errors.class_id} />}

          </div>
          <div className="form-group">
          <label>Section: </label>
          <select className="form-control"  onChange={(e) =>this.onChange(e)} name="section_name">
            <option value="">-Select-</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>

          </select>
          {errors.section_name && <InlineError text={errors.section_name} />}

          </div>
          <button onClick={(e)=> this.onSubmit(e)} className="btn btn-primary">Add Class</button>
      </form>
    )
  }
}
