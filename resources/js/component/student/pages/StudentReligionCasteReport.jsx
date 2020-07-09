import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import api from "../../api"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, Select, SelectOption } from "../../utils/Components"
import Chart,{ReactChartCard} from "../../utils/Chart"


class StudentReligionCasteReport extends Component{
    constructor(props){
        super(props)
        this.state = {
            caste_report:"",
            religion_report:"",
            only_caste_wise_report:"",
            datapoints:"",
            type:"pie",
            type2:"pie"

        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        api.admin.report.religion_castewise().then(data => {
            const {caste_report,religion_report,only_caste_wise_report} = data
            this.setState({
                caste_report,
                religion_report,
                only_caste_wise_report
            })
        })
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }

    render(){
        const {caste_report} = this.state
        const {religion_report,type,type2,only_caste_wise_report} = this.state
        console.log(only_caste_wise_report)
        const Capitalize = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        var mainTotal = 0, general_total = 0, obc_total = 0, SC_total = 0, ST_total = 0;
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Report" sub_header="Religion-Caste Wise">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                <CardComponent title="Religion Caste Wise">
                    <Table>
                        <Thead>
                            <th>Sr no.</th>
                            <th>Religion</th>
                            <th>General</th>
                            <th>Obc</th>
                            <th>SC</th>
                            <th>ST</th>
                            <th>Total</th>
                        </Thead>
                        <tbody>
                                {caste_report && Object.keys(caste_report).map((item,id) => {
                                    var caste = caste_report[item]
                                    var total = 0;
                                    caste.map(item => {
                                        total += item.total
                                    })
                                    general_total += caste[0].total;
                                    obc_total += caste[1].total;
                                    SC_total += caste[2].total;
                                    ST_total += caste[3].total;
                                    mainTotal += total;
                                    return <tr>
                                        <td>{id+1}</td>
                                        <td>{Capitalize(item)}</td>
                                        <td>{caste[0].total}</td>
                                        <td>{caste[1].total}</td>
                                        <td>{caste[2].total}</td>
                                        <td>{caste[3].total}</td>
                                        <td>{total}</td>
                                    </tr>
                                })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>{general_total}</td>
                                <td>{obc_total}</td>
                                <td>{SC_total}</td>
                                <td>{ST_total}</td>
                                <td>{mainTotal}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </CardComponent>
                    <ReactChartCard title="ReligionWise Students" filename="ReligionWise" dataPoints={religion_report}/>
                    <ReactChartCard title="CasteWise Students" filename="CasteWise" dataPoints={only_caste_wise_report}/>
                </BodyComponent>
            </div>
        )
    }
}

export default StudentReligionCasteReport
