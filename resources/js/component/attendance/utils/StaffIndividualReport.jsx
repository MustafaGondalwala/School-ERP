import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import api from "../../api";
import Chart from "../../utils/Chart";

class StaffIndividualReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
        staff_id: "",
      select_month: "",
      total_present: 0,
      total_absent: 0,
      total_leave: 0,
      total_half_leave: 0,
      total_none: 0,
      chart_type: "pie",
      staff_details: "",
      details_fetch:""
    };
  }

   async updateDatapoints(attendance_details) {
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
  }
   async fetchData(staff_id, select_month) {
      await api.adminteacher.staff_attendance
      .get_individual(staff_id, select_month)
      .then((data) => {
        const { attendance_details, staff_details,details_fetch } = data;
        this.updateDatapoints(attendance_details);
        this.setState({
            staff_details,
          details_fetch
        });
      });
  }
   async updateStudentInfo() {
    const { data } = this.props;
    const { staff_id, select_month } = data;
    this.setState({
        staff_id,
      select_month,
    });
     this.fetchData(staff_id, select_month);
  }
  async componentWillMount() {
     this.updateStudentInfo();
  }
  async componentWillReceiveProps() {
    this.updateStudentInfo();
  }
  render() {
    const { staff_details,details_fetch } = this.state;
    const { staff_id, select_month, chart_type } = this.state;
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
      <div>
        {details_fetch && <StudentAttendancePanel  details_fetch={details_fetch}/> }
        <CardComponent title="Student Attendance Report">
        {staff_details && <StaffPanel staff_details={staff_details} />}
        <br />
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
        <div className="row">
          <label className="form-control-label">Chart Type</label>
          <select
            defaultValue="pie"
            onChange={(e) => {
              this.setState({
                chart_type: e.target.value,
              });
            }}
            className="form-control"
          >
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
          <Chart
            title={`Student Attendance for ${select_month}`}
            filename={`individual_student`}
            type={chart_type}
            dataPoints={dataPoints}
          />
        </div>
      </CardComponent>
   
      </div>
   
   );
  }
}



const StudentAttendancePanel = ({details_fetch}) => {
    console.log(details_fetch)
    function intToAttendanceStatus(status){
        switch(status){
            case 1:
                return "Present"
            case 2:
                return "Absent"
            case 3:
                return "Leave"
            case 4:
                return "Half Leave"
            case 5:
                return "None"
        }
    }
    return(
        <CardComponent title="Month Attendance">
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr.no </th>
                        <th>Date </th>
                        <th>Attendance Status </th>
                    </tr>
                </thead> 
                <tbody>
                    {details_fetch && details_fetch.map((item,id) => {
                        return <tr key={id}>
                            <td>{id+1}</td>
                            <td>{item.attendance_date}</td>
                            <td>{intToAttendanceStatus(item.status)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        </CardComponent>
    )
}
    

const StaffPanel = ({ staff_details }) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <label className="form-control-label">Staff Name: </label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={staff_details.staff_name}
          />
        </div>
        <div className="col-md-4">
          <label className="form-control-label">Relative Name </label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={staff_details.relative_name}
          />
        </div>
        <div className="col-md-4">
          <label className="form-control-label">Contact Number </label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={staff_details.contact_no}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffIndividualReport;
