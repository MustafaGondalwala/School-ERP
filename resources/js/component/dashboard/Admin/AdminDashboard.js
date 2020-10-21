import React, { Component } from "react"
import api from "../../api"
import CardComponent from "../../utils/CardComponent"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import { getKey, Table, Thead } from "../../utils/Components"
import { Tab } from "@material-ui/core"


export default class AdminDashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : undefined
        }
    }
    async componentDidMount(){
        await api.admin.dashboard().then(data => {
            this.setState({
                data
            })
            console.log(data)
        })
    }
    render(){
        const {data} = this.state
        return(
            <div>
                <EmptyHeader header="Dashboard" />
                    {
                        data != undefined &&    <BodyComponent>
                            <div className="row">

                            <div className="col-md-6">
                                <CardComponent title="Total Students">
                                    <h5>Registered Students: {data.registered_students}</h5>
                                    <h5>Admission Students: {data.admission_students}</h5>
                                </CardComponent>
                            </div>
                            <div className="col-md-6">
                            <CardComponent title="Total Subject">
                                <Table>
                                    <Thead>
                                        <th>Sr no.</th>
                                        <th>Subject Name</th>
                                    </Thead>
                                    <tbody>
                                    {
                                        data.subjects && data.subjects.map((item,id) => {
                                            return <tr key={getKey()}>
                                                <td>{id+1}</td>
                                                <td>{item.subject_name}</td>
                                           </tr>
                                        })
                                    }
                                    </tbody>
                                </Table>
                                
                            </CardComponent>
                            </div>
                            <div className="col-md-6">
                                <CardComponent title="Classes">
                                <Table>
                                    <Thead>
                                        <th>Sr no.</th>
                                        <th>Class</th>
                                        <th>Section</th>
                                    </Thead>
                                    <tbody>
                                        {
                                            data.classes != null && data.classes.map((item,id) => {
                                                    return <tr key={getKey()}>
                                                        <td>{id+1}</td>
                                                        <td>{item.class_title}</td>
                                                        <td>{item.section}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </CardComponent>
                            </div>
                            <div className="col-md-6">
                                <CardComponent title="Teachers">
                                    <Table>
                                        <Thead>
                                            <th>Sr no.</th>
                                            <th>Emp ID</th>
                                            <th>Teacher Name</th>
                                        </Thead>
                                        <tbody>
                                            {
                                                data.teacher && data.teacher.map((item,id) => {
                                                    console.log(item)
                                                    return <tr key={getKey()}>
                                                        <td>{id+1}</td>
                                                        <td>{item.empid}</td>
                                                        <td>{item.teacher_name}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </CardComponent>
                            </div>
                            </div>
                        </BodyComponent>
                    }
                
            </div>
        )
    }
}