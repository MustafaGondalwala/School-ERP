import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import Row from "../../utils/Row"
import { Col, Button, Table, Thead } from "../../utils/Components"
import InlineError from "../../utils/InlineError"
import api from "../../api"
import DataTable, { createTheme } from 'react-data-table-component';


class StudentGenerateIdCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_id:"",
            errors:"",
            students:"",
            button_text:"Fetch"
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.submit = this.submit.bind(this)

    }
    submit(){
        const {class_id} = this.state
        if(class_id == ""){
            this.setState({
                errors:"Can't be Blank"
            })
        }else{
            this.setState({
                errors:"",
                button_text:"Fetching ..."
            })
            api.adminclerk.student.listByClassId(class_id).then(data => {
                const {students} = data
                this.setState({
                    students,            
                    button_text:"Fetch"
                })
            })

        }
    }
    sendClassId(class_id){
        this.setState({
            class_id
        })
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
                name: 'Download',
                sortable: true,
                cell: row => <span><a href={"/print/get-id-card/"+row.id} target="_blank" className="btn btn-primary btn-sm">Download</a></span>,
            },
        ]
        const {class_id,errors,students,button_text} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Generate ID Card">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Generate ID Card" back_link="/admin/student">
                        <Row>
                            <Col sm="6" md="6">
                            <GetClassId class_id={class_id}  sendClassId={this.sendClassId}errors=""/>
                            {errors && <InlineError text={errors}/>}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col sm="6" md="6">
                            <Button primary sm onClick={this.submit}>{button_text}</Button>
                            </Col>
                        </Row>
                    </CardComponent>
                        {students && 
                        <DataTable
                            title="Download ID Card"
                            columns={columns}
                            data={students}
                            pagination={true}
                            paginationPerPage={10}
                            theme="solarized"
                        />
                    }
                </BodyComponent>
            </div>
        )
    }
}
export default StudentGenerateIdCard