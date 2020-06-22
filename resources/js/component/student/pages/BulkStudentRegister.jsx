import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import readXlsxFile from 'read-excel-file'
import { FormGroup, FormLabel, UploadFile, Button, Table, Thead, ButtonGroup, Input } from "../../utils/Components"
import * as XLSX from 'xlsx';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Swal from "sweetalert2"
import api from "../../api"

class BulkStudentRegister extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:"",
            headers:["student_name","father_name","mother_name","father_contact_no1","dob","gender","student_address","doA","block","district","state","student_photo","mother_photo","father_photo","father_contact_no2","class","register_no"],
            loading:false
        }
        this.fileChange = this.fileChange.bind(this)
        this.uploadData = this.uploadData.bind(this)
    }
    fileChange(e){
        const {name,files} = e.target
        var f = files[0];
        this.setState({
            loading:true
        })
            const rABS = true;
            const reader = new FileReader();
            reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            this.setState({
                data,
            loading:false
            },() => {
                console.log(this.state)
            })
        };
        reader.readAsBinaryString(f);
    }
    uploadData(){
        const {data,loading,headers} = this.state
        if(data.length == 0){
            Swal.fire("Error","Invalid Data","error")
            return
        }
        api.adminclerk.student.register.bulk_add(data).then(data => {
          const {message,not_done} = data
          Swal.fire("Success",message,"success");
          this.setState({
              data:not_done
          })
        }).catch(error => {
          console.log(error.response)
        })
    }   
    render(){
    
    const {data,loading} = this.state
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Register" sub_header="Bulk">
                <AdminStudentHeader/>
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Bulk Register Student" back_link="/admin/student">
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <FormLabel>Select Excel File</FormLabel>
                                <UploadFile name="file" onChange={this.fileChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <ButtonGroup>
                                <Button onClick={this.uploadData} primary sm>Upload</Button>
                                <Button success sm>Download</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardComponent>
                {loading && <CardComponent>Loading ...</CardComponent>}
                {data && <ViewRegisterTable data={data}/>}
            </BodyComponent>
        </div>
    )
}
}


class ViewRegisterTable extends Component {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    }
    render() {
      
      const { data } = this.props;
      const columnDefs = [
        {
          headerName: "Roll No",
          field: "roll_no",
          sortable: true,
          filter: true,
          checkboxSelection: true,
        },
        {
          headerName: "Class",
          field: "class_title",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Section",
          field: "section",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Student Name",
          field: "student_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father Name",
          field: "father_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Mother Name",
          field: "mother_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father C.No 1",
          field: "father_contact_no1",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father C.No 2",
          field: "father_contact_no2",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father Email",
          field: "father_email",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father Occupation",
          field: "father_occupation",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Mother Occupation",
          field: "mother_occupation",
          sortable: true,
          filter: true,
        },
  
        {
          headerName: "Guardian Name",
          field: "guardian_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Guardian Occupation",
          field: "guardian_occupation",
          sortable: true,
          filter: true,
        },
  
        { headerName: "Gender", field: "gender", sortable: true, filter: true },
        { headerName: "DOB", field: "dob", sortable: true, filter: true },
        { headerName: "Age", field: "age", sortable: true, filter: true },
        { headerName: "Gender", field: "gender", sortable: true, filter: true },
        { headerName: "Handicapped", field: "handicapped", sortable: true, filter: true },
  
        {
          headerName: "Father AadharCard",
          field: "father_aadhar_card",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father Bank Name",
          field: "father_bank_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father Bank Number",
          field: "father_bank_number",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Student AadharCard",
          field: "student_aadhar_card",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Student Bank Name",
          field: "student_bank_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Student Bank Number",
          field: "student_bank_number",
          sortable: true,
          filter: true,
        },
        { headerName: "Gender", field: "gender", sortable: true, filter: true },
        {
          headerName: "Student Address",
          field: "student_address",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Place",
          field: "place",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Landmark",
          field: "landmark",
          sortable: true,
          filter: true,
        },
        {
          headerName: "District",
          field: "district",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Pincode",
          field: "pincode",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Block",
          field: "block",
          sortable: true,
          filter: true,
        },
        {
          headerName: "State",
          field: "state",
          sortable: true,
          filter: true,
        },
      ];
      return (
        <CardComponent title="List" >
          <div
            className="ag-theme-balham"
            style={{ height: "800px", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.onGridReady}
              columnDefs={columnDefs}
              pagination={true}
              paginationAutoPageSize={true}
              rowData={data}
            ></AgGridReact>
          </div>
        </CardComponent>
      );
    }
  }

export default BulkStudentRegister