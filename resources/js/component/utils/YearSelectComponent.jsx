import React,{Component} from "react"
import {setYearDispatch} from "../actions/fee"
import { connect } from "react-redux";
import InlineError from "./InlineError"

class YearSelectComponent extends Component{
    componentDidMount(){
        if(Object.keys(this.props.years).length == 0){
            this.props.setYearDispatch();
        }
    }
    render(){
        const {label,years,onChange,name,colType,errors,value} = this.props
        return(
                <div className="form-group">
                    <label className="form-control-label">{label}</label>
                    <select name={name} onChange={onChange} className="form-control">
                        <option value="">-- Select --</option>
                        {Object.keys(years).length > 0 && years.map((item,key) => {
                            return <option key={key} selected={item.selected} value={item.id}>{item.year}</option>
                        })}
                    </select>
                    {errors[name] && <InlineError text={errors[name]}/>}
                </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      years:state.year
    };
}

export default connect(mapStateToProps,{setYearDispatch})(YearSelectComponent);