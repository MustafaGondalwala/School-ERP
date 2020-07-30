import React, { Component, Suspense } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import api from "../../api";
import CardComponent from "../../utils/CardComponent"
const ViewTeacherTable = React.lazy(() => import("../form/ViewTeacherTable")) 

export default class ViewTeacher extends Component {
  
  render() {
    const {rows} = this.state
    return (
      <div>
         
      </div>
    );
  }
}


