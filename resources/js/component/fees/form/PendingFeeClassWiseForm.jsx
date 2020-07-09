import React, { Component } from "react"
import api from "../../api"
import { Table, Thead, Button } from "../../utils/Components"
import CardComponent from "../../utils/CardComponent"
import DataTable, { createTheme } from 'react-data-table-component';


export default class PendingFeeClassWiseForm extends Component{
    componentDidMount(){
        const {installment} = this.props
    }
    getTotalPendingAmount(fees){
        var total_pending = 0;
        const {installment_id} = this.props
        fees.map(item => {
            if(item.fee_installment_id == installment_id){
                total_pending += item.total_pending
            }
        })
        return total_pending
    }
    getTotalAmount(fees){
        var total_amount = 0;
        const {installment_id} = this.props
        fees.map(item => {
            if(item.fee_installment_id == installment_id){
                total_amount += item.total_amount
            }
        })
        return total_amount
    }
    render(){
        const columns = [
            {
                name: 'Student Roll No',
                sortable: true,
                cell: row => <span>{row.roll_no}</span>,
            },
            {
                name: 'Student Name',
                sortable: true,
                cell: row => <span>{row.student_name}</span>,
            },
            {
                name: 'Father Name',
                sortable: true,
                cell: row => <span>{row.father_name}</span>,
            },
            {
                name: 'Total Fees',
                sortable: true,
                cell: row => 
                <span>{this.getTotalAmount(row.fees)}</span>,
            },
            {
                name: 'Pending Fees',
                sortable: true,
                cell: row => 
                <span>{this.getTotalPendingAmount(row.fees)}</span>,
            },
            {
                name: 'View Receipts',
                sortable: true,
                cell: row => 
                <span><Button primary sm>View</Button></span>,
            },
            {
                name: 'Print Slip',
                sortable: true,
                cell: row => 
                <span><Button success sm>Print Slip</Button></span>,
            },
        ]

        const {installment} = this.props
        return(
            <p>
                    {installment && 
                        <DataTable
                            title="Pending Fee Info"
                            columns={columns}
                            data={installment}
                            pagination={true}
                            paginationPerPage={10}
                            theme="solarized"
                        />
                    }
            </p>
        )
    }
}