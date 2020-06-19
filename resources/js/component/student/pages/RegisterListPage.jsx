import React, { Component } from "react";
import { render } from "react-dom";
import TopBreadCrumb from "../../utils/TopBreadcrumb";
import AdminStudentHeader from "../../header/admin/AdminStudentHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import Col from "../../utils/Col";
import Row from "../../utils/Row";
import SelectStudent from "../../utils/SelectStudent";
import { CSVLink } from 'react-csv'

import {
  FormGroup,
  FormLabel,
  Table,
  Thead,
  Select,
  SelectOption,
  Button,
} from "../../utils/Components";
import { getClassSection } from "../../actions/classes";
import { connect } from "react-redux";
import api from "../../api";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
// import "ag-grid-enterprise"
import { Link } from "react-router-dom";
class RegisterListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_string: "",
      errors: {},
      register_students: "",
      button_text: "Fetch",
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const { classes, getClassSection } = this.props;
    this.submit();
    if (Object.keys(classes).length == 0) {
      getClassSection();
    }
  }
  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  submit() {
    const { class_string } = this.state;
    this.setState({
      button_text: "Fetching ...",
      register_students:""
    });
    api.adminclerk.student.register.list(class_string).then((data) => {
      const { register_students } = data;
      this.setState({
        register_students,
        button_text: "Fetch",
      });
    });
  }

  render() {
    const { errors, class_string, register_students, button_text } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <TopBreadCrumb
          mainHeader="Student"
          header="Register"
          sub_header="Register List"
        >
          <AdminStudentHeader />
        </TopBreadCrumb>
        <BodyComponent>
          <CardComponent title="Register List" back_link="/admin/student">
            <Row>
              <Col md="4">
                <FormGroup>
                  <FormLabel>Select Class</FormLabel>
                  <Select
                    errors={errors}
                    name="class_string"
                    value={class_string}
                    onChange={this.onChange}
                  >
                    <SelectOption>-- Select --</SelectOption>
                    {Object.keys(classes).length > 0 &&
                      classes.map((data) => {
                        return <SelectOption value={data}>{data}</SelectOption>;
                      })}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Button primary onClick={this.submit}>
                    {button_text}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </CardComponent>
          {register_students && (
            <ViewRegisterTable register_students={register_students} />
          )}
        </BodyComponent>
      </div>
    );
  }
}

class ViewRegisterTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }
  handleClick(e){
    console.log(e.target)
  }
  render() {
    
    const { register_students } = this.props;
    const columnDefs =  [
      {
        headerName: "Register No",
        field: "register_no",
        sortable: true,
        filter: true,
      },
      { headerName: "Class", field: "class", sortable: true, filter: true },
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
      { headerName: "Gender", field: "gender", sortable: true, filter: true },
      { headerName: "DOB", field: "dob", sortable: true, filter: true },
      {
        headerName: "Date of Admission",
        field: "doA",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Student Address",
        field: "student_address",
        sortable: true,
        filter: true,
      },
      {
        headerName: "District",
        field: "district",
        sortable: true,
        filter: true,
      },
      { headerName: "Block", field: "block", sortable: true, filter: true },
      { headerName: "State", field: "state", sortable: true, filter: true },
      {
        headerName: "Created At",
        field: "created_at",
        sortable: true,
        filter: true,
      },
      {
        headerName: "View",
        field: "id",
        colId: "view",
        cellRendererFramework: function(params) {
          return <Button primary sm onClick={(e,row) => {
            console.log(e,row)
          }}>Make Admission</Button>
        }
      }
    ]
    return (
      <CardComponent title="List" print download={<CSVLink
        data={register_students}
        filename='RegisterStudent.csv'
        target='_self'
        className="btn btn-sm float-right"
      >
        Download
      </CSVLink>}>
        <div
          className="ag-theme-balham"
          style={{ height: "800px", width: "100%" }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            columnDefs={columnDefs}
            pagination={true}
            paginationAutoPageSize={true}
            rowData={register_students}
          ></AgGridReact>
        </div>
      </CardComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
    classes: state.distinct_classes,
  };
}

export default connect(mapStateToProps, { getClassSection })(RegisterListPage);
