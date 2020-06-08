import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import Swal from "sweetalert2";
import api from "../../api"
import StudentReceipt from "../utils/StudentReceipt"

export default class PayFeesForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            fee_individual:"",
            send_message:true,
            payment_type:"1",
            fee_receipts:""
        }
        this.changeAmountData = this.changeAmountData.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
        const {fee_individual} = this.props
        this.setState({
            fee_individual
        })
        const {student_id,year_id} = this.props
        api.admin.fee.get_receipts(student_id,year_id).then(data => {
            this.setState({
                fee_receipts:data.fee_receipts
            })
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
            case "current_paid":
                if(value > individual_installment[index].total_pending){
                    Swal.fire('Current Paid is Greater than Total Pending',"Please Check Data","warning");
                }else{
                    individual_installment[index].current_paid = value;
                }
                break
            break
        }
        temp_state[installment_label] = individual_installment
        this.setState({
            fee_individual:temp_state
        })
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        const {fee_individual,send_message,payment_type,fee_receipts} = this.state
        return(
            <div>
                {fee_receipts && <StudentReceipt fee_receipts={fee_receipts}/>}
                {fee_individual && Object.keys(fee_individual).map((item,key) => {
                    return <PayInstallmentFeesForm onChange={this.changeAmountData} key={key} individual={fee_individual[item]} individual_label={item}/>
                })}
                
            </div>
        )
    }
}

const PayInstallmentFeesForm = ({individual_label,individual,onChange}) =>{
    var total_amount = 0;
    var amount = 0;
    var total_pending = 0;
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
                            <th>Total Pending</th>
                            <th>Current Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        individual.map((item,id) => {
                            total_amount += item.total_amount
                            amount += item.amount
                            total_pending += item.total_pending
                            return <tr key={id}>
                                <td>
                                    {id + 1}
                                </td>
                                <td>
                                    {item.fee_type_id}
                                </td>
                                <td>
                                    <input type="number" min="0" disabled data-index={id} name="amount"  className="form-control" value={item.amount}/>
                                </td>
                                <td>
                                    <input type="number" min="0" disabled data-index={id} name="waiver_amount" className="form-control"   value={item.waiver_amount}/>
                                </td>
                                <td>
                                    <input type="number" min="0"  disabled data-index={id} name="total_amount" className="form-control"  value={item.total_amount}/>
                                </td>
                                <td>
                                    <input type="number" min="0"  disabled data-index={id} name="total_pending" className="form-control"  value={item.total_pending}/>
                                </td>
                                <td>
                                    <input type="number" min="0" data-index={id} onChange={e => onChange(e,individual_label)} name="current_paid" className="form-control"  value={item.current_paid} />
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
                        <td><input className="form-control" value={total_pending} type="number" disabled /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </CardComponent>
    )
}