import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import AdminHeader from "../header/AdminHeader"
import BodyComponent from "../../utils/BodyComponent"
import api from "../../api"
import Chart,{ReactChartCard} from "../../utils/Chart"


class FeeCollection extends Component{
    constructor(props){
        super(props)
        this.state = {
            daywise:"",
            weekwise:"",
            monthwise:""
        }
    }
    componentDidMount(){
        api.admin.report.fee.get_daywise().then(data => {
            const {daywise} = data
            daywise.map(item => {
               item.y = parseInt(item.y)
            })
            this.setState({
                daywise
            })
        })

        api.admin.report.fee.get_weekwise().then(data => {
            const {weekwise} = data
            const weekwise_test = [];
            Object.keys(weekwise).map(item => {
                weekwise_test.push({"y":weekwise[item],"label":item})
            })
            this.setState({
                weekwise:weekwise_test
            })
        })
        api.admin.report.fee.get_monthwise().then(data => {
            const {monthwise} = data
            const monthwise_test = [];
            Object.keys(monthwise).map(item => {
                monthwise_test.push({"y":monthwise[item],"label":item})
            })
            this.setState({
                monthwise:monthwise_test
            })
        })

    }
    render(){
        const {daywise,weekwise,monthwise} = this.state
        return(
            <div>
                <AdminHeader main_header="Fee" header="Report" sub_header="Collection" />
                <BodyComponent>
                    <ReactChartCard title="Day Wise" filename="DaywiseCollection" type="column" dataPoints={daywise}/>
                    <ReactChartCard title="Week Wise" filename="WeekwiseCollection" type="column" dataPoints={weekwise}/>
                    <ReactChartCard title="Month Wise" filename="MonthwiseCollection" type="column" dataPoints={monthwise}/>
                
                </BodyComponent>
            </div>
        )
    }
}

export default FeeCollection