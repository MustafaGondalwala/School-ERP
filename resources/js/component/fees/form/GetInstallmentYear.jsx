import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import { connect } from "react-redux";
import {setFeeInstallmentsDispatch} from "../../actions/fee"
import InstallmentSelectComponent from "../../utils/InstallmentSelectComponent"
import YearSelectComponent from "../../utils/YearSelectComponent"

class GetInstallmentYear extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                "installment":"",
                "select_year":""
            },
            errors:{},
            fetch_button:"Fetch"
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        this.setState({
            data: {...this.state.data,[e.target.name]:e.target.value}
          });
    }

    validate(data){
        const errors = {};
        if (!data.installment) errors.installment = "Can't be blank";
        if (!data.select_year) errors.select_year = "Can't be blank";
        return errors;
      };
    onSubmit(){
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length == 0){
            this.props.submit(this.state.data);
        }
    }

    render(){
        const {installments} = this.props
        const {fetch_button,errors} = this.state
        return(
            <CardComponent title="Set Fee Due Date" back_link="/admin/fees">
                    <InstallmentSelectComponent errors={errors} colType="col-md-4" name="installment" onChange={this.onChange} label="Select Installments"/>
                    <YearSelectComponent errors={errors} colType="col-md-4" name="select_year" onChange={this.onChange} label="Select Year"/>
                    <button onClick={e => this.onSubmit()} className="btn btn-primary">{fetch_button}</button>
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
      installments:state.installments
    };
}
  
export default connect(mapStateToProps,{setFeeInstallmentsDispatch})(GetInstallmentYear);
