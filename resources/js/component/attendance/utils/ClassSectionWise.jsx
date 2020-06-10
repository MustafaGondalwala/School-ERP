import React, { Component } from "react";
import api from "../../api";
import CardComponent from "../../utils/CardComponent";
import Chart from "../../utils/Chart"

class ClassSectionWise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_id: "",
      select_month: "",
      total_present: 0,
      total_absent: 0,
      total_leave: 0,
      total_half_leave: 0,
      total_none: 0,
      chart_type:"pie"
    };
  }
  fetchData(class_id, select_month) {
    api.admin.student_attendance
      .get_classwise(class_id, select_month)
      .then((data) => {
        const { attendance_details } = data;
        var total_present = 0;
        var total_absent = 0;
        var total_leave = 0;
        var total_half_leave = 0;
        var total_none = 0;

        attendance_details.map((item) => {
          switch (item.status) {
            case 1:
              total_present = item.total;
              break;
            case 2:
              total_absent = item.total;
              break;
            case 3:
              total_leave = item.total;
              break;
            case 4:
              total_half_leave = item.total;
              break;
            case 5:
              total_none = item.total;
              break;
          }
        });
        this.setState({
          total_leave,
          total_present,
          total_absent,
          total_none,
        });
      });
  }
  updateClassWise() {
    const { data } = this.props;
    const { class_id, select_month } = data;
    this.setState({
      class_id,
      select_month,
    });
    this.fetchData(class_id, select_month);
  }
  componentDidMount() {
    this.updateClassWise();
  }
  componentWillReceiveProps() {
    this.updateClassWise();
  }
  render() {
    const { class_id,select_month,chart_type } = this.state;
    const {
      total_present,
      total_absent,
      total_leave,
      total_none,
      total_half_leave,
    } = this.state;
    const dataPoints = [
      { y: total_present, label: "Total Present" },
      { y: total_absent, label: "Total Absent" },
      { y: total_leave, label: "Total Leave" },
      { y: total_half_leave, label: "Total Half Leave" },
      { y: total_none, label: "Total None Entry" },
    ];
    return (
      <CardComponent title="ClassWise Details" >
        <div className="row">
          <div className="col">
            <label>
              <h5>Present Student:</h5>
            </label>
            <input
              type="text"
              disabled
              value={total_present}
              className="form-control"
            />
          </div>
          <div className="col">
            <label>
              <h5>Leave Student:</h5>
            </label>
            <input
              type="text"
              disabled
              value={total_leave}
              className="form-control"
            />
          </div>
          <div className="col">
            <label>
              <h5>Absent Student:</h5>
            </label>
            <input
              type="text"
              disabled
              value={total_absent}
              className="form-control"
            />
          </div>
          <div className="col">
            <label>
              <h5>Attendance Half Leave:</h5>
            </label>
            <input
              type="text"
              disabled
              value={total_half_leave}
              className="form-control"
            />
          </div>
          <div className="col">
            <label>
              <h5>Attendance Pending:</h5>
            </label>
            <input
              type="text"
              disabled
              value={total_none}
              className="form-control"
            />
          </div>
        </div>
        <br />
        <br />
        <div className="row">
            <label className="form-control-label">Chart Type</label>
            <select defaultValue="pie" onChange={e => {
                this.setState({
                    "chart_type":e.target.value
                })
            }} className="form-control">
                <option value="pie">Pie</option>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="area">Area</option>
                <option value="doughnut">Doughnut</option>
                <option value="scatter">Scatter</option>
            </select>
        </div>
        <br />
        <br />
        <div className="row">
            <Chart title={`Class/Section Wise Attendance for ${select_month}`} filename={`classwise_attendance`} type={chart_type} dataPoints={dataPoints}/>
        </div>
      </CardComponent>
    );
  }
}

export default ClassSectionWise;
