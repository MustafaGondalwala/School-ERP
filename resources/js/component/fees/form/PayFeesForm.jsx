import React,{Component, Suspense} from "react"
import CardComponent from "../../utils/CardComponent"
import Swal from "sweetalert2";
import api from "../../api"
const StudentReceipt = React.lazy(() => import("../utils/StudentReceipt"))
import Row from "../../utils/Row";
import { Input, Col, FormGroup, FormLabel, Select, SelectOption, Button } from "../../utils/Components";

export default class PayFeesForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            fee_individual:"",
            send_message:true,
            payment_type:"1",
            fee_receipts:"",
            button_text:"Update",
        }
        this.changeAmountData = this.changeAmountData.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount(){
        const {fee_individual} = this.props
        this.setState({
            fee_individual
        })
        const {student_id,year_id} = this.props
        api.adminclerk.fee.get_receipts(student_id,year_id).then(data => {
            this.setState({
                fee_receipts:data.fee_receipts
            })
        })
    }
    submit(data){
        const {payment_type} = data
        const {fee_individual} = this.state
        this.setState({
            button_text:"Updating ..."
        })
        this.props.payFees(fee_individual,payment_type);
    }
    changeAmountData(e,installment_label){
        const name = e.target.name;
        var value = parseInt(e.target.value);
        
        const index = e.target.getAttribute('data-index');
        const {fee_individual} = this.state
        const  individual_installment = fee_individual[installment_label];
        switch(name){
            case "temp_paid":
                if(value >= individual_installment[index].total_pending+1){
                    Swal.fire('Current Paid is Greater than Total Pending',"Please Check Data","warning");
                }else{
                    individual_installment[index].temp_paid = value;
                }
                break
        }
        fee_individual[installment_label] = individual_installment
        this.setState({
            fee_individual
        })
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        const {button_text} = this.state
        const {fee_individual,send_message,payment_type,fee_receipts} = this.state
        return(
            <div>
                {fee_receipts && 
                    <Suspense fallback={<h1>Loading ...</h1>}>
                        <StudentReceipt fee_receipts={fee_receipts}/>
                    </Suspense>
                }
                {fee_individual && Object.keys(fee_individual).map((item,key) => {
                    return <PayInstallmentFeesForm onChange={this.changeAmountData} key={key} individual={fee_individual[item]} individual_label={item}/>
                })}
                <PayFeesPanel onSubmit={this.submit} button_text={button_text}/>
            </div>
        )
    }
}

export class PayFeesPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        payment_type: "1",
      };
      this.changePaymentType = this.changePaymentType.bind(this);
      this.payDetailsSend = this.payDetailsSend.bind(this);
    }
  
    changePaymentType(e) {
      this.setState({
        payment_type: e.target.value,
      });
    }
  
    payDetailsSend(e) {
      this.props.onSubmit(this.state);
    }
    render() {
      const {button_text,payment_type} = this.props
      return (
        <CardComponent title="Pay Fee Details">
            <Row>
                <Col md="6" sm="6">
                    <FormGroup>
                        <FormLabel>User Name</FormLabel>
                        <Input disabled value={JSON.parse(localStorage.getItem('userAccount')).name}/>
                    </FormGroup>
                </Col>
                <Col md="6" sm="6">
                    <FormGroup>
                        <FormLabel>Payment Type:</FormLabel>
                        <Select  value={payment_type} onChange={this.changePaymentType}>
                            <option value="1">Cash</option>
                            <option value="2">Cheque</option>
                            <option value="3">Bank Transfer</option>
                        </Select>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="6" sm="6">
                    <Button onClick={this.payDetailsSend} primary>{button_text}</Button>
                </Col>
            </Row>
        </CardComponent>
       );
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
                            <th>Total Paid</th>
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
                                    {item.fee_type.fee_type}
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
                                    <input type="number" min="0" disabled data-index={id} onChange={e => onChange(e,individual_label)} name="current_paid" className="form-control"  value={item.current_paid} />
                                </td>
                                <td>
                                    <input type="number" min="0"  data-index={id} onChange={e => onChange(e,individual_label)} name="temp_paid" className="form-control"  value={item.temp_paid} />
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