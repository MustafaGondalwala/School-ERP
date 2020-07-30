import React,{Component} from "react"
import {setYearDispatch} from "../actions/fee"
import { connect } from "react-redux";
import InlineError from "./InlineError"

class YearSelectComponent extends Component{
    constructor(props){
        super(props)
        const year_id = localStorage.year_id;
        this.state = {
            year_id:year_id
        }
        this.onChange = this.onChange.bind(this)
    }
    async componentWillMount(){
        if(Object.keys(this.props.years).length == 0){
            await this.props.setYearDispatch();
        }
    }
    onChange(e){
        const {value} = e.target
        this.setState({
            year_id:value
        })
        this.props.sendYearID(value)
    }
    render(){
        const {year_id} = this.state
        const {label,years,onChange,name,colType,errors,value} = this.props
        return(
                <div>
                    <select value={year_id} name={name} onChange={this.onChange} className="form-control">
                        <option value="">-- Select --</option>
                        {Object.keys(years).length > 0 && years.map((item,key) => {
                            return <option key={key} selected={item.selected} value={item.id}>{item.year}</option>
                        })}
                    </select>
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