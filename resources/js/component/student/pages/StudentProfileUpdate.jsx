import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { FormLabel, Col, Table, Thead, Button } from "../../utils/Components"
import Row from "../../utils/Row"
import GetClassId from "../../utils/GetClassId"
import api from "../../api"

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { param } from "jquery"
import Swal from "sweetalert2"

class StudentProfileUpdate extends Component{
    constructor(props) {
        super(props);
        this.state = {
          rows: "",
          class_id: "",
          students: "",
          class_id:"",
          loading: false,
        };
        this.sendClassId = this.sendClassId.bind(this);
      }
    sendClassId(class_id){
        this.setState({
            loading: true,
            students: "",
            class_id
          });
          api.adminclerk.student.listByClassId(class_id).then((data) => {
            const { students } = data;
            this.setState({
              students,
              loading: false,
            });
          });
    }
    render(){
        const {class_id,loading,students} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Student" header="Profile Update">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Select Class" back_link="/admin/student">
                        <GetClassId class_id={class_id} sendClassId={this.sendClassId} errors="" />
                    </CardComponent>
                    {loading && <CardComponent><h1>Loading ...</h1></CardComponent>}
                    {students && <ViewRegisterTable students={students}/>}
                </BodyComponent>
            </div>
        )
    }
}

class ViewRegisterTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        row: "",
      };
      this.buttonClick = this.buttonClick.bind(this)
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    }
    
    buttonClick(params){
        
        Swal.fire({
            title: 'Are you sure?',
            text: "Particular Cell Will Updated",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showLoaderOnConfirm: true,
            confirmButtonText: 'Yes, Update it!',
            preConfirm: (login) => {
                const data = {
                    'id':params.data.id,
                    'oldValue': params.oldValue,
                    'newValue':params.newValue,
                    'field':params.colDef.field
                }
                return api.adminclerk.student.admission.update_student_cell(data).then(data => data).catch(error => {
                  return {error:true}
                })
              }
          }).then((result) => {
            if(result.hasOwnProperty('value')){
              if(result.value.hasOwnProperty('error')){
                Swal.fire("Error","Error Occured in Process. Please check the Data","error")
              }
              if(result.value.hasOwnProperty('message')){
                Swal.fire("Data Updated!!",result.value.message,"success")
              }
            }else if(result.dismiss == "cancel"){
                params.data[params.colDef.field] = params.oldValue
                params.node.setData(params.data);
            }
          })
    }
   
    render() {
      const { students } = this.props;
      const columnDefs = [
        {
          headerName: "Roll No",
          field: "roll_no",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Class",
          field: "class.class_title",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Section",
          field: "class.section",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Student Name",
          field: "student_name",
          sortable: true,
          filter: true,
          editable:true

        },
        {
          headerName: "Father Name",
          field: "father_name",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Mother Name",
          field: "mother_name",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Father C.No 1",
          field: "father_contact_no1",
          sortable: true,
          filter: true,
          editable:true

        },
        {
          headerName: "Father C.No 2",
          field: "father_contact_no2",
          sortable: true,
          filter: true,
          editable:true

        },
        {
          headerName: "Father Email",
          field: "father_email",
          sortable: true,
          filter: true,
          editable:true

        },
        {
          headerName: "Father Occupation",
          field: "father_occupation",
          sortable: true,
          filter: true,
          editable:true

        },
        {
          headerName: "Mother Occupation",
          field: "mother_occupation",
          sortable: true,
          filter: true,
          editable:true
        },
        
  
        {
          headerName: "Guardian Name",
          field: "guardian_name",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Guardian Occupation",
          field: "guardian_occupation",
          sortable: true,
          filter: true,
          editable:true
        },
  
          
        { headerName: "Gender", field: "gender", sortable: true, filter: true,editable:true },
        { headerName: "DOB", field: "dob", sortable: true, filter: true },
        { headerName: "Age", field: "age", sortable: true, filter: true,editable:true },
        { headerName: "Gender", field: "gender", sortable: true, filter: true},
        { headerName: "Handicapped", field: "handicapped", sortable: true, filter: true },
        { headerName: "Religion", field: "religion", sortable: true, filter: true, },
        { headerName: "Caste", field: "caste", sortable: true, filter: true },
  
        {
          headerName: "Father AadharCard",
          field: "documents.father_aadhar_card",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Father Bank Name",
          field: "documents.father_bank_name",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Father Bank Number",
          field: "documents.father_bank_number",
          sortable: true,
          filter: true,
          
        },
        {
          headerName: "Student AadharCard",
          field: "documents.student_aadhar_card",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Student Bank Name",
          field: "documents.student_bank_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Student Bank Number",
          field: "documents.student_bank_number",
          sortable: true,
          filter: true,
          editable:true
        },
        { headerName: "Gender", field: "gender", sortable: true, filter: true },
        {
          headerName: "Student Address",
          field: "address.student_address",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Place",
          field: "address.place",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Landmark",
          field: "address.landmark",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "District",
          field: "address.district",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Pincode",
          field: "address.pincode",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Block",
          field: "address.block",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "State",
          field: "address.state",
          sortable: true,
          filter: true,
          editable:true
        },
        {
          headerName: "Created At",
          field: "created_at",
          sortable: true,
          filter: true,
        },
      ];
      const { row } = this.state;
      return (
        <CardComponent
          title="Student List"
        >
          <div
            className="ag-theme-balham"
            style={{ height: "800px", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.onGridReady.bind(this)}
              columnDefs={columnDefs}
              rowSelection={true}
              enableFilter={true}
              pagination={true}
              paginationAutoPageSize={true}
              rowData={students}
              onCellValueChanged={this.buttonClick}
            ></AgGridReact>
          </div>
        </CardComponent>
      );
    }
  }
  
export default StudentProfileUpdate