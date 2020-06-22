import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import * as XLSX from 'xlsx';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { FormGroup, FormLabel, UploadFile, Button, Table, Thead, ButtonGroup } from "../../utils/Components"
import Swal from "sweetalert2"
import api from "../../api"
class BulkStudentAdmission extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:"",
            loading:false
        }
        
        this.fileChange = this.fileChange.bind(this)
        this.uploadData = this.uploadData.bind(this)
    }
    uploadData(){
        const {data,loading} = this.state
        if(data.length == 0){
            Swal.fire("Error","Invalid Data","error")
            return
        }
        api.adminclerk.student.admission.bulk_add(data).then(data => {
          this.setState({
            data:data.notDone,
          })
          Swal.fire("Success","Data Insert. Total "+data.notDone.length+" Error Occured","success");
        })
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
            })
        };
        reader.readAsBinaryString(f);
    }

    render(){
        const {loading,data} = this.state
    return(
        <div>
            <TopBreadCrumb mainHeader="Student" header="Admission" sub_header="Bulk">
                <AdminStudentHeader/>
            </TopBreadCrumb>
            <BodyComponent>
                <CardComponent title="Bulk Admission Student" back_link="/admin/student">
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <FormLabel>Select Csv</FormLabel>
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
                {data && <ViewaAdmissionable data={data}/>}
            </BodyComponent>
        </div>
    )
}
}
class ViewaAdmissionable extends Component{
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
      }
      componentDidMount(){
        console.log(this.props.data)
      }
      render() {
        const { data } = this.props;
        const columnDefs = [
            {
              headerName: "Roll No",
              field: "Roll No",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Class",
              field: "Class",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Section",
              field: "Section",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Student Name",
              field: "Student Name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Father Name",
              field: "Father Name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Mother Name",
              field: "Mother Name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Father C.No 1",
              field: "Father C.No 1",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Father C.No 2",
              field: "Father C.No 2",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Father Email",
              field: "Father Email",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Father Occupation",
              field: "Father Occupation",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Mother Occupation",
              field: "Mother Occupation",
              sortable: true,
              filter: true,
            },
      
            {
              headerName: "Guardian Name",
              field: "Guardian Name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Guardian Occupation",
              field: "Guardian Occupation",
              sortable: true,
              filter: true,
            },
      
            { headerName: "Gender", field: "Gender", sortable: true, filter: true },
            { headerName: "DOB", field: "DOB", sortable: true, filter: true },
            { headerName: "Age", field: "Age", sortable: true, filter: true },
            { headerName: "Gender", field: "Gender", sortable: true, filter: true },
            { headerName: "Handicapped", field: "Handicapped", sortable: true, filter: true },
            { headerName: "Religion", field: "Religion", sortable: true, filter: true },
            { headerName: "Caste", field: "Caste", sortable: true, filter: true },
            {
              headerName: "Father AadharCard",
              field: "Father AadharCard",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Father Bank Name",
              field: "Father Bank Name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Father Bank Number",
              field: "Father Bank Number",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Student AadharCard",
              field: "Student AadharCard",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Student Bank Name",
              field: "Student Bank Name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Student Bank Number",
              field: "Student Bank Number",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Student Address",
              field: "Student Address",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Place",
              field: "Place",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Landmark",
              field: "Landmark",
              sortable: true,
              filter: true,
            },
            {
              headerName: "District",
              field: "District",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Pincode",
              field: "Pincode",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Block",
              field: "Block",
              sortable: true,
              filter: true,
            },
            {
              headerName: "State",
              field: "State",
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




export default BulkStudentAdmission