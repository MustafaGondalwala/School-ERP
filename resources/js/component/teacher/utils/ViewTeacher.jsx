import React, { Component, Suspense } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import api from "../../api";
import CardComponent from "../../utils/CardComponent"
const ViewTeacherTable = React.lazy(() => import("../form/ViewTeacherTable")) 

export default class ViewTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
    };
  }

  componentDidMount() {
    api.admin.teacher.view_all().then((data) => {
      console.log(data.teachers)
        this.setState({
          rows: data.teachers,
        });
      });
    }
  render() {
    const {rows} = this.state
    return (
      <div>
         <CardComponent title="View All Teachers" back_link="/admin/teachers">
          {rows ?
            <Suspense fallback={<h1>Loading ...</h1>}>
              <ViewTeacherTable teachers={rows}/>
            </Suspense>
          : <h1>Loading ...</h1>}
         </CardComponent>
      </div>
    );
  }
}


