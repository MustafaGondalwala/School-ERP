import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import {setFeeType,setFeeTypeDispatch} from "../../actions/fee"
import { connect } from "react-redux";
import Swal from 'sweetalert2'


class AddFeeType extends Component{
    constructor(props){
        super(props)
        this.state = {
            add_button:"Add",
            fee_type:"",
            error:""
        }
    }
    componentDidMount(){
        const {feeType,setFeeType} = this.props
        if(Object.keys(feeType).length == 0)
            setFeeType();
    }
    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    submit(){
        const {fee_type} = this.state
        if(fee_type == "")
            this.setState({
                error:"Cannot be Blank"
            })
        else{
            this.setState({
                add_button:"Adding ..."
            })
            api.adminclerk.fee.add_fee_type(fee_type).then(data => {
                this.props.setFeeTypeDispatch(data.fee_types)
                this.setState({
                    add_button:"Add"
                })
                Swal.fire("Success","Fee Type Added!","success");
            })
        }
    }
    removeFeeType(fee_type){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              api.adminclerk.fee.remove_fee_type(fee_type).then(data => {
                Swal.fire(
                    'Deleted!',
                    'Fee Type has been deleted.',
                    'success'
                  )
                 this.props.setFeeTypeDispatch(data.fee_types);
              }).catch(error => {
                  Swal.fire("Error","Error Occured in Proccess","error");
              });
              
            }
          })
    }
    render(){
        const {add_button,fee_type,error} = this.state
        const {feeType} = this.props
        return(
            <div className="col-md-6">
                <CardComponent title="Add Fee Type" col_type="col-md-4">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="form-group">
                             <label className="form-control-label">Add Fee Type</label>
                            <input type="text" name="fee_type" value={fee_type} onChange={e => this.onChange(e)} className="form-control"/>
                            {error && <InlineError text={error}/>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={e => this.submit()}>{add_button}</button>
                            </div>
                        </div>
                        <div className="row">
                            <table className="table">
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Fee Type</th>
                                    <th>Remove</th>
                                </tr>
                                <tbody>
                                    {Object.keys(feeType).length > 1 && feeType.map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.fee_type}</td>
                                        <td><button onClick={e => this.removeFeeType(item.id)} className="btn btn-danger btn-sm">Remove</button></td>
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
        feeType:state.feeType
    };
}

export default connect(mapStateToProps,{setFeeType,setFeeTypeDispatch})(AddFeeType);
