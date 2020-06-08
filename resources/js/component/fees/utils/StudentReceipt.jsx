import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"

export default class StudentReceipt extends Component{
    viewReceipt(receipt_id){
        api.admin.fee.view_receipt(receipt_id).then(data => {
            console.log(data)
        })
    }
    render(){
        const {fee_receipts} = this.props
        return(
            <CardComponent title="Fee Receipts">
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
                {fee_receipts && fee_receipts.map((item,id) => {
                    return <tr key={id}>
                    <td>{id+1}</td>
                    <td>{item.id}</td>
                    <td><button className="btn btn-primary" onClick={e => this.viewReceipt(item.id)}>View</button></td>
                    <td><button className="btn btn-success">Print</button></td>
                    <td>{item.amount_name}</td>
                    </tr>
                })}
                </tbody>
                </table>
            </div>
            </CardComponent>
        )
    }
}