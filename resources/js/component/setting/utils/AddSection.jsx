import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import InlineError from "../../utils/InlineError"
import Swal from 'sweetalert2'
import api from "../../api"
import { connect } from "react-redux";
import {setClassSection} from "../../actions/classes"

class AddSection extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                class:"",
                section:""
            },
            errors:{},
            add_section:"Add Section"
        }
    }
    onChange(e){
        this.setState({
          data: {...this.state.data,[e.target.name]:e.target.value}
        });
      }


    validate(data){
        const errors = {};
        if (!data.class) errors.class = "Can't be blank";
        if (!data.section) errors.section = "Can't be blank";
        return errors
    }     
    submit(){
        const errors = this.validate(this.state.data);
        const {setClassSection} = this.props
        this.setState({
            errors
        })
        if(Object.keys(errors).length == 0){
            this.setState({
                add_section:"Adding Section ..."
            })
            api.admin.add_section(this.state.data).then(data => {
                setClassSection(data.classes)
                Swal.fire("Success",data.message,"success")
            }).catch(error =>{
                if(error.response){
                    if(error.response.status == 422){
                        var message = error.response.data.error.message
                        Swal.fire("Vlidation Occured",message,"warning")
                        this.setState({
                            add_section:"Add Section"
                        })
                    }
                }
                
            })
        }
    }
    render(){
        const {distinct_classes,classes} = this.props
        const {add_section,errors} = this.state
        return(
            <div className="col-md-6">
                <CardComponent title="Add Section">
                        <div className="row">
                            <div className="form-group col">
                             <label className="form-control-label">Select Class</label>
                             <select name='class' onChange={e => this.onChange(e)} className="form-control">
                                 <option value="">-- Select Section --</option>
                                {Object.keys(distinct_classes).length > 0 && distinct_classes.map((item,key) => {
                                    return <option value={item} key={key}>{item}</option>
                                })}
                             </select>
                             {errors.class && <InlineError text={errors.class} />}
                            </div>
                            <div className="form-group col">
                             <label className="form-control-label">Select Class</label>
                             <select onChange={e => this.onChange(e)} name="section" className="form-control">
                                <option value="">-- Select Section --</option>
                               <option value="A">A</option>
                               <option value="B">B</option>
                               <option value="C">C</option>
                               <option value="D">D</option>
                               <option value="E">E</option>
                               <option value="F">F</option>
                               <option value="G">G</option>
                             </select>
                             {errors.section && <InlineError text={errors.section} />}
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary" onClick={e => this.submit()}>{add_section}</button>
                        </div>
                        <br />
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Sr no.</td>
                                            <td>Class</td>
                                            <td>Section</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(classes).length > 0 && classes.map((item,id) => {
                                            return <tr key={id}>
                                                <td>{id+1}</td>
                                                <td>{item.class_title}</td>
                                                <td>{item.section}</td>
                                                <td  className="table-actions">
                                                    <a href="#!" onClick={e => this.removeClass(item)} className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete product">
                                                        <i className="fas fa-trash" />
                                                    </a>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </CardComponent>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        classes:state.classes,
        distinct_classes:state.distinct_classes
    };
}

export default connect(mapStateToProps,{setClassSection})(AddSection);