import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {
    Table,
    Thead,
    Col,
    FormLabel,
    Input,
    Button,
  } from "../../utils/Components";
import CardComponent from "../../utils/CardComponent"
import { CSVLink } from "react-csv";
import Row from "../../utils/Row";


class AdmissionList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        row: "",
        redirect: "",
      };
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    }
    checkboxSelect(e) {
      const row = this.gridApi.getSelectedRows()[0];
      this.setState({ row });
    }
    
    buttonClick(e) {
      var type = e.target.getAttribute("type");
      var row_id = e.target.getAttribute("row_id");
      var user_type = localStorage.user_type;
      var redirect = "";
      if (user_type == 1) {
        if (type == "edit") {
          redirect = "/admin/student/edit-student/" + row_id;
        } else {
          redirect = "/clerk/student/drop-student/" + row_id;
        }
      } else {
        if (type == "edit") {
          redirect = "/admin/student/edit-student/" + row_id;
        } else {
          redirect = "/clerk/student/drop-student/" + row_id;
        }
      }
      this.setState({
        redirect,
      });
    }
    render() {
      const { students } = this.props;
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
        { headerName: "Religion", field: "religion", sortable: true, filter: true },
        { headerName: "Caste", field: "caste", sortable: true, filter: true },
  
        {
          headerName: "Father AadharCard",
          field: "documents.father_aadhar_card",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Father Bank Name",
          field: "documents.father_bank_name",
          sortable: true,
          filter: true,
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
        },
        { headerName: "Gender", field: "gender", sortable: true, filter: true },
        {
          headerName: "Student Address",
          field: "address.student_address",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Place",
          field: "address.place",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Landmark",
          field: "address.landmark",
          sortable: true,
          filter: true,
        },
        {
          headerName: "District",
          field: "address.district",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Pincode",
          field: "address.pincode",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Block",
          field: "address.block",
          sortable: true,
          filter: true,
        },
        {
          headerName: "State",
          field: "address.state",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Created At",
          field: "created_at",
          sortable: true,
          filter: true,
        },
      ];
      const { row, redirect } = this.state;
      if (redirect) {
        return <Redirect to={redirect} />;
      }
      return (
        <CardComponent
          title="Student List"
          download={
            <CSVLink
              data={students}
              filename="AdmissionStudent.csv"
              target="_self"
              className="btn btn-neutral btn-sm float-right"
            >
              Download
            </CSVLink>
          }
        >
          <Row>
            <Col md="12">
              <Button
                row_id={row.id}
                type="edit"
                onClick={this.buttonClick.bind(this)}
                disabled={!row}
                primary
                sm
              >
                Edit
              </Button>
              <Button
                row_id={row.id}
                type="drop"
                onClick={this.buttonClick.bind(this)}
                disabled={!row}
                danger
                sm
              >
                Drop
              </Button>
            </Col>
          </Row>
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
              onRowSelected={this.checkboxSelect.bind(this)}
              paginationAutoPageSize={true}
              rowData={students}
            ></AgGridReact>
          </div>
        </CardComponent>
      );
    }
  }


  export default AdmissionList;