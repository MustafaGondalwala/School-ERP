import React,{Component} from "react"

import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import Swal from "sweetalert2";
import shortid from "shortid";

export default class FeeClassWiseForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            fee_class_wise:"",
            updateClassWise:[],
            update_button:"Update Fees"
        }
        this.feeTypeAmount = this.feeTypeAmount.bind(this)
        this.updateClassWiseFee = this.updateClassWiseFee.bind(this)
    }
    componentDidMount(){
        const {fee_class_wise,class_id,year_id} = this.props
        this.setState({
            fee_class_wise,
            class_id,
            year_id
        })
    }
    
    feeTypeAmount(e,label,index){
        const value = e.target.value;
        const temp_state = this.state.fee_class_wise
        temp_state[label][index].amount = value
        this.setState({
            fee_class_wise:temp_state
        })
    }

    updateClassWiseFee(data){
        data['fee_class_wise'] = this.state.fee_class_wise
        data['class_id'] = this.state.class_id
        data['year_id'] = this.state.year_id
        
        api.adminclerk.fee.update_class_wise_fees(data).then(data => {
            this.setState({
                fee_class_wise:data.fee_class_wise,
                update_button:"Updating Fees ..."
            })
            Swal.fire("Done","Fee Class Wise Updated !!","success");
        }).catch(error => {
            Swal.fire("Error Occured","Error Occured while processing the data.","error");
            this.setState({
                update_button:"Update Fees"
            })
        })
    }
    render(){
        const {fee_class_wise} = this.state
        return(
               <div>
                    {fee_class_wise && 
                        Object.keys(fee_class_wise).map((item,key) => {
                            return <ViewInstallmentForm installment_label={item} feeTypeAmount={this.feeTypeAmount} installment_wise={fee_class_wise[item]}/>
                        })
                    }

                    {fee_class_wise &&
                        <SubmitForm update_button={this.state.update_button} updateClassWiseFee={this.updateClassWiseFee}/>
                    }
               </div>
            )
        }
}


const ViewInstallmentForm = ({installment_label,installment_wise,feeTypeAmount}) => {
    return(
        <CardComponent key={shortid.generate()} title={`${installment_label} Fees:`}>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Fee Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {installment_wise.map((item,id) => {
                            return <tr key={shortid.generate()}>
                                <td>{id+1}</td>
                                <td>{item.fee_type.fee_type}</td>
                                <td><input type="number" min="0" data-fee_type_id={item.fee_type_id} className="form-control" onChange={e => feeTypeAmount(e,installment_label,id)} value={item.amount}/>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </CardComponent>
    )
}

class SubmitForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            overwrite:false,
            send_message:true
        }
    }
    handleChange(e){
        this.setState({
          [e.target.name]: e.target.checked,
        });
    }

    render(){
        const {overwrite,send_message} = this.state
        const {update_button} = this.props
        return(
            <CardComponent title="Update Class Wise Fees">
                <div className="row">
                    <div className="form-group">
                        <label className="checkbox-inline">
                        <input type="checkbox"  checked={overwrite} onChange={(e) => this.handleChange(e)} name="overwrite"/> 
                            &nbsp;&nbsp;Overwrite Existing Indivitual Student Fee
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label className="checkbox-inline">
                        <input type="checkbox"  checked={send_message} onChange={(e) => this.handleChange(e)} name="send_message"/> 
                            &nbsp;&nbsp;Send Message to Parents
                        </label>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={e => this.props.updateClassWiseFee({overwrite,send_message})}>{update_button}</button>
                </div>
            </CardComponent>
        )
    }
}
