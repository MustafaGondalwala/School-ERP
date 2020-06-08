import React, { Component } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import api from "../../api";
import ViewParticularTeacherInfo from "../utils/ViewParticularTeacherInfo";

export default class ViewTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
      teacher_info:""
    };
  }

  componentDidMount() {
    api.admin.view_all_teacher().then((data) => {
      this.setState({
        rows: data.teachers,
      });
    });
  }
  viewInfo(teacher_id) {
    api.admin.view_particular_teacher(teacher_id).then((data) => {
        console.log(data.teacher_info)
        this.setState({
            teacher_info:data.teacher_info
        })
    });
  }
  render() {
    const {teacher_info} = this.state
    const columns = [
      {
        name: "Emp Id.",
        selector: "empid",
        sortable: true,
        width: 150,
      },
      {
        name: "Teacher Name",
        selector: "teacher_name",
        sortable: true,
      },
      {
        name: "Preferenced Subject",
        selector: "teacher_subject",
        sortable: true,
      },
      {
        name: "Preferenced Class",
        selector: "teacher_class",
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
                  View Teacher Info{" "}
                  <Link
                    to="/admin/teacher"
                    class="btn btn-neutral float-right"
                    type="submit"
                  >
                    Back
                  </Link>
                </h3>
                <div class="table-responsive py-4">
                  <DataTable
                    title="Teacher List"
                    columns={columns}
                    pagination
                    data={this.state.rows}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {teacher_info &&
            <ViewParticularTeacherInfo teacher_info={teacher_info}/>
        }
      </div>
    );
  }
}
