import React from "react"
import { AgGridReact } from "ag-grid-react";
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import {Col,Button} from "../../utils/Components"
import { Redirect } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


export default class ViewTeacherTable extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            row:"",
            redirect:""
        }
      this.onGridReady = this.onGridReady.bind(this)
      this.buttonClick = this.buttonClick.bind(this)
    }
  
    buttonClick(e){
        const type = e.target.getAttribute('type')
        const row_id = e.target.getAttribute('row_id')
        switch(type){
            case 'edit':
                this.setState({
                    redirect:"/admin/teacher/update/"+row_id
                })
                break
        }
    }
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    }
    checkboxSelect(e) {
        const row = this.gridApi.getSelectedRows()[0];
        this.setState({row})
    }
    render() {
      const { teachers } = this.props;
      const { row,redirect } = this.state;
      if (redirect) {
        return <Redirect to={redirect} />
      }

      const columnDefs = [
        {
          headerName: "Emp ID",
          field: "user.empid",
          sortable: true,
          filter: true,
          checkboxSelection: true,
        },
        { headerName: "Class", field: "class", sortable: true, filter: true },
        {
          headerName: "Teacher Name",
          field: "teacher_name",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Husband/Relative Name",
          field: "user.relative_name",
          sortable: true,
          filter: true,
        },
        {
            headerName: "Email",
            field: "user.email",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Contact No",
            field: "user.contact_no",
            sortable: true,
            filter: true,
        },
        {
          headerName: "Gender",
          field: "user.gender",
          sortable: true,
          filter: true,
        },
        
        {
          headerName: "Date of Joining",
          field: "user.date_of_joining",
          sortable: true,
          filter: true,
        },
        { headerName: "DOB", field: "user.dob", sortable: true, filter: true },
        { headerName: "Address", field: "user.address", sortable: true, filter: true },
        { headerName: "Blood Group", field: "user.blood_group", sortable: true, filter: true },
        { headerName: "Address", field: "user.address", sortable: true, filter: true },
    ];
      return (
          <div>
          <div>
            <Row>
                <Col md="12">
                <Button row_id={row.id} type="edit" onClick={this.buttonClick} disabled={!row} primary sm>Edit</Button>
                <Button row_id={row.id} type="drop" onClick={this.buttonClick} disabled={!row} danger sm>Drop</Button>
                </Col>
            </Row>
          </div>
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
              onRowSelected={this.checkboxSelect.bind(this)}
              rowData={teachers}
            ></AgGridReact>
          </div>
          </div>
      );
    }
  }