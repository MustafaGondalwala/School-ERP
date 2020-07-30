import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import api from "../../api"
import Chart,{ReactChartCard} from "../../utils/Chart"

export default class FeeCollectionClasswise extends Component{
    constructor(props){
        super(props)
        this.state = {
            classwise:""
        }
    }
    componentDidMount(){
        api.admin.report.fee.get_classwise_report().then(data => {
            const {classwise} = data
            classwise.map(item => {
                item.y = parseInt(item.y)
            })
            this.setState({
                classwise
            })
        })
    }
    render(){
        const {classwise} = this.state
        return(
            <div>
                <AdminHeader main_header="Fee" header="Report" sub_header="Classwise Collection" />
                <BodyComponent>
                    <ReactChartCard title="Class Wise" filename="ClasswiseCollection" type="column" dataPoints={classwise}/>
                </BodyComponent>
            </div>
        )
    }
}