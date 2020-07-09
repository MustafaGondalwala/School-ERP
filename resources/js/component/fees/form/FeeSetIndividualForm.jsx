import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import Swal from "sweetalert2";

export default class FeeSetIndividualForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            fee_individual:"",
            send_message:true
        }
        this.changeAmountData = this.changeAmountData.bind(this)
    }
    componentDidMount(){
        const {fee_individual} = this.props
        this.setState({
            fee_individual
        })
    }

    changeAmountData(e,installment_label){
        const name = e.target.name;
        var value = parseInt(e.target.value);
        if(isNaN(value))
            value = 0
        const index = e.target.getAttribute('data-index');
        const temp_state = this.state.fee_individual
        const  individual_installment = temp_state[installment_label];
        switch(name){
            case "amount":
                individual_installment[index].amount = value;
                individual_installment[index].total_amount = parseInt(individual_installment[index].amount) - parseInt(individual_installment[index].waiver_amount);
                individual_installment[index].total_pending =  parseInt(individual_installment[index].total_amount) - individual_installment[index].current_paid
                break
            case "waiver_amount":
                if(value > individual_installment[index].amount){
                    Swal.fire('Waiver Amount Greater than Fee Amount',"Please Check Data","warning");
                }else{
                    individual_installment[index].waiver_amount = value;
                    individual_installment[index].total_amount = parseInt(individual_installment[index].amount) - parseInt(individual_installment[index].waiver_amount);
                }
            break
        }
        temp_state[installment_label] = individual_installment
        this.setState({
            fee_individual:temp_state
        })
    }

    render(){
        const {fee_individual,send_message} = this.state
        return(
            <div>
            {fee_individual && 
                Object.keys(fee_individual).map((item,key) => {
                    return <EditInstallment onChange={this.changeAmountData} key={key} individual={fee_individual[item]} individual_label={item} />
                })
            }
            {fee_individual &&  
            <CardComponent title="Update Fees Individual">
                <div className="row">
                    <div className="form-group">
                        <label className="checkbox-inline">
                        <input type="checkbox" checked={send_message} onChange={(e) => { this.setState({ [e.target.name]:e.target.checked })}} name="send_message"/> 
                            &nbsp;&nbsp;Send Message to Parents
                        </label>
                    </div>
                </div>
                <div className="row">
                    <button onClick={e => this.props.updateFees(fee_individual,send_message)} className="btn btn-primary">{this.props.update_button}</button>
                </div>
            </CardComponent>
            }
            </div>
        )
    }
}

const EditInstallment = ({individual_label,individual,onChange}) => {
    var total_amount = 0;
    var amount = 0;
    return(
        <CardComponent title={`${individual_label} Fees`}>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Fee Type</th>
                            <th>Amount</th>
                            <th>Waiver Amount</th>
                            <th>Total Amount</th>
                            <th>Current Paid</th>
                            <th>Total Pending</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                        individual.map((item,id) => {
                            total_amount += item.total_amount
                            amount += item.amount
                            return <tr key={id}>
                                <td>
                                    {id + 1}
                                </td>
                                <td>
                                    {item.fee_type.fee_type}
                                </td>
                                <td>
                                    <input type="number" min="0" data-index={id} name="amount" onChange={e =>onChange(e,individual_label)} className="form-control" value={item.amount}/>
                                </td>
                                <td>
                                    <input type="number" min="0" data-index={id} name="waiver_amount" className="form-control" onChange={e =>onChange(e,individual_label)}  value={item.waiver_amount}/>
                                </td>
                                <td>
                                    <input type="number"min="0"  disabled data-index={id} name="total_amount" className="form-control" onChange={e =>onChange(e,individual_label)} value={item.total_amount}/>
                                </td>
                                <td>
                                    <input type="number"min="0" className="form-control"  disabled  value={item.current_paid}/>
                                </td>
                                <td>
                                    <input type="number"min="0" className="form-control"  disabled data-index={id} name="total_pending" className="form-control" onChange={e =>onChange(e,individual_label)}  value={item.total_pending}/>
                                </td>

                            </tr>
                        })
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td><input className="form-control" value={amount} type="number" disabled /></td>
                        <td></td>
                        <td><input className="form-control" value={total_amount} type="number" disabled /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </CardComponent>
    )
}