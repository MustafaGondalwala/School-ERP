import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import api from "../../api"
import Chart,{ReactChartCard} from "../../utils/Chart"

export default class FeeCollectionInstallment extends Component{
    constructor(props){
        super(props)
        this.state = {
            installmentwise:""
        }
    }
    componentDidMount(){
        api.admin.report.fee.get_installment_report().then(data => {
            const {installmentwise} = data
            this.setState({
                installmentwise
            })
        })
    }
    render(){
        const {installmentwise} = this.state
        return(
            <div>
                <AdminHeader main_header="Fee" header="Report" sub_header="InstallmentWise Collection" />
                <BodyComponent>
                    <ReactChartCard title="Intallment Wise" filename="IntallmentwiseCollection" type="column" dataPoints={installmentwise}/>
                </BodyComponent>
            </div>
        )
    }
}