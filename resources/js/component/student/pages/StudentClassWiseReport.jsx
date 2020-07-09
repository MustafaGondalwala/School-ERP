import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import EmptyHeader from "../../utils/EmptyHeader"
import Chart from "../../utils/Chart"

import BodyComponent from "../../utils/BodyComponent"
import api from "../../api"
import { Table, Thead, Select, SelectOption } from "../../utils/Components"

class StudentClassWiseReport extends Component{
    constructor(props){
        super(props)
        this.state = {
            students:"",
            datapoints:"",
            type:"pie"
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        api.admin.report.classwise().then(data => {
            const {students} = data
            var datapoints = []
            students.map(item => {
                var sections = item.class.section || ''
                datapoints.push({"y":item.total,"label":item.class.class_title+ ' '+ sections})
            })
            this.setState({
                students,
                datapoints
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
        const {students,datapoints,type} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="Student" header="Clerk" sub_header="Class/Wise Report"/>
                <BodyComponent>
                    <CardComponent title="Class/Wise Report" back_link={"/admin/student"}>
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Total Students</th>
                            </Thead>
                            <tbody>  
                            {students  && students.map((item,id) => {
                                return <tr>
                                    <td>{id+1}</td>
                                    <td>{item.class.class_title || ''}</td>
                                    <td>{item.class.section || ''}</td>
                                    <td>{item.total}</td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </CardComponent>
                    <CardComponent>
                        <Select name="type" value={type} onChange={this.onChange}>
                            <SelectOption value="pie">Pie</SelectOption>
                            <SelectOption value="line">Line</SelectOption>
                            <SelectOption value="doughnut">Doughnut</SelectOption>
                            <SelectOption value="bar">Bar</SelectOption>
                            <SelectOption value="scatter">Scatter</SelectOption>
                            <SelectOption value="area">Area</SelectOption>
                        </Select>
                        <br />
                        <Chart filename="ClassWiseStudents" title="Class-Wise Students"  dataPoints={datapoints} type={type || 'pie'}/>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

export default StudentClassWiseReport