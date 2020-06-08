import React, { Component } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import api from "../../api";

export default class ViewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
      teacher_info:""
    };
  }

  componentDidMount() {
    api.admin.student.view_all_student().then((data) => {
      this.setState({
        rows: data.students,
      });
    });
  }
  
  render() {
    const {teacher_info} = this.state
    const columns = [
      {
        name: "Roll No.",
        selector: "roll_no",
        sortable: true,
        width: 150,
      },
      {
        name: "Student Name",
        selector: "student_name",
        sortable: true,
      },
      {
        name: "Father Name",
        selector: "father_name",
        sortable: true,
      },
      {
        name: "Father Contact No",
        selector: "father_contact_no1",
        sortable: true,
      },
      {
        name: "View Info",
        cell: (row) => (
          <div>
            <button
              onClick={e => this.viewInfo(row.id)}
              className="btn btn-sm btn-primary"
            >
              View
            </button>
          </div>
        ),
      },
    ];

    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h3 className="mb-0">
                  View Student Info{" "}
                  <Link
                    to="/admin/student"
                    class="btn btn-neutral float-right"
                    type="submit"
                  >
                    Back
                  </Link>
                </h3>
                <div class="table-responsive py-4">
                  <DataTable
                    title="Student List"
                    columns={columns}
                    pagination
                    data={this.state.rows}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
