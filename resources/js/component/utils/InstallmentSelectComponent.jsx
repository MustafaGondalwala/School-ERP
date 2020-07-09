import React,{Component} from "react"
import {setFeeInstallmentsDispatch} from "../actions/fee"
import { connect } from "react-redux";
import InlineError from "./InlineError"


class InstallmentSelectComponent extends Component{
    componentDidMount(){
        if(Object.keys(this.props.installments).length == 0)
            this.props.setFeeInstallmentsDispatch()
    }
    render(){
        const {label,installments,onChange,name,colType,errors} = this.props
        return(
            <div clasName={colType}>
                <div className="form-group">
                    <label className="form-control-label">{label}</label>
                    <select name={name} onChange={onChange} className="form-control">
                        <option value="">-- Select --</option>
                        {Object.keys(installments).length > 1 && installments.map((item,key) => {
                            return <option key={key} value={item.id}>{item.installment}</option>
                        })}
                    </select>
                    {errors[name] && <InlineError text={errors[name]}/>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      installments:state.installments
    };
}

export default connect(mapStateToProps,{setFeeInstallmentsDispatch})(InstallmentSelectComponent);