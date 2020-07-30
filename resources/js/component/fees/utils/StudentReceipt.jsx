import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import { render } from "react-dom"
import Row from "../../utils/Row"
import { Col, Table, Thead } from "../../utils/Components"

export default class StudentReceipt extends Component{
    constructor(props){
        super(props)
        this.state = {
            receiptDetails:"",
            rowInfo:""
        }
        this.viewReceipt = this.viewReceipt.bind(this)
    }
    viewReceipt(receipt_id,index){
        const {fee_receipts} = this.props
        this.setState({
            rowInfo:fee_receipts[index],
            receiptDetails:""
        })
        api.adminclerk.fee.view_receipt(receipt_id).then(data => {
            const {receiptDetails} = data
            this.setState({
                receiptDetails,
            })
        })
    }
    render(){
        const {fee_receipts} = this.props
        const {receiptDetails,rowInfo} = this.state
        return(
            <span>
                {fee_receipts.length > 0 &&
                    <CardComponent title="Fee Receipts" back_link={this.props.back_link}>
                        <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sr no.</th>
                                    <th>Receipts ID:</th>
                                    <th>View</th>
                                    <th>Print</th>
                                    <th>Created By</th>
                                </tr>
                            </thead>
                            <tbody>
                            {fee_receipts.map((item,id) => {
                                return <tr key={id}>
                                <td>{id+1}</td>
                                <td>{item.id}</td>
                                <td><button className="btn btn-primary"  onClick={e => this.viewReceipt(item.id,id)}>View</button></td>
                                <td><button className="btn btn-success">Print</button></td>
                                <td>{item.amount_name}</td>
                                </tr>
                            })}
                            </tbody>
                            </table>
                        </div>
                        </CardComponent>
                }
                {receiptDetails && <ViewReceipt rowInfo={rowInfo} receipt={receiptDetails}/>}
            </span>
           )
    }
}

const ViewReceipt = ({receipt,rowInfo}) => {
    const {payment_type,id,amount_name,created_at} = rowInfo
    const title = "Receipt ID: "+rowInfo.id
    var current_paid = 0;
    var new_pending = 0;
    var old_pending = 0;
    var total_amount = 0;
    return(
        <CardComponent title={title} >
            <Row>
                <Col md="6" sm="6">
                    <h4>Payment Type: {payment_type}</h4>
                    <h4>Created By: {amount_name}</h4>
                    <h4>Publish At: {new Date(created_at).toLocaleDateString()}</h4>
                </Col>
            </Row>
            <br />
            <Row>
            <Table>
                <Thead>
                    <th>Sr no.</th>
                    <th>Fee Type</th>
                    <th>Total Amount</th>
                    <th>Waiver Amount</th>
                    <th>Old Total Pending</th>
                    <th>Total Paid</th>
                    <th>Current Paid</th>
                    <th>New Total Pending</th>
                </Thead>
                <tbody>
                {receipt.map((item,id) => {
                    current_paid += item.current_paid
                    old_pending += item.total_pending
                    total_amount += item.total_amount
                    new_pending += (item.total_pending-item.current_paid)
                    return <tr>
                        <td>{id+1}</td>
                        <td>{item.fee_type}</td>
                        <td>{item.total_amount}</td>
                        <td>{item.waiver_amount}</td>
                        <td>{item.total_pending}</td>
                        <td>{item.total_paid}</td>
                        <td>{item.current_paid}</td>
                        <td>{item.total_pending-item.current_paid}</td>
                    </tr>
                })}
                <tr>
                    <td></td>
                    <td></td>
                    <td>{total_amount}</td>
                    <td></td>
                    <td>{old_pending}</td>
                    <td></td>
                    <td>{current_paid}</td>
                    <td>{new_pending}</td>
                </tr>
                </tbody>
                </Table>
            </Row>
        </CardComponent>
    )
}