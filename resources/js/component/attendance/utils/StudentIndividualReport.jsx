import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import api from "../../api";
import Chart from "../../utils/Chart";

class StudentIndividualReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: "",
      select_month: "",
      total_present: 0,
      total_absent: 0,
      total_leave: 0,
      total_half_leave: 0,
      total_none: 0,
      chart_type: "pie",
      student_details: "",
      details_fetch:"",
      loading:true
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
  async fetchData(student_id, select_month) {
      await api.student_attendance.get_individual(student_id, select_month)
      .then((data) => {
        const { attendance_details, student_details,details_fetch } = data;
        this.updateDatapoints(attendance_details);
        this.setState({
          student_details,
          details_fetch,
          loading:false
        });
      });
  }
   async updateStudentInfo() {
    const { data } = this.props;
    const { student_id, select_month } = data;
    this.setState({
      student_id,
      select_month,
      loading:true
    });
     this.fetchData(student_id, select_month);
  }
  async componentWillMount() {
    this.updateStudentInfo();
  }
  async componentWillReceiveProps() {
    this.updateStudentInfo();
  }
  render() {
    const { student_details,details_fetch,loading } = this.state;
    const { student_id, select_month, chart_type } = this.state;
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
      {loading ? <CardComponent><h3>Loading Component ...</h3></CardComponent>
      :
      <div>
        {details_fetch && <StudentAttendancePanel  details_fetch={details_fetch}/> }
        <CardComponent title="Student Attendance Report">
        {student_details && <StudentInfoPanel student_details={student_details} />}
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
      }
     </div>
   );
  }
}



const StudentAttendancePanel = ({details_fetch}) => {
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
    

const StudentInfoPanel = ({ student_details }) => {
 var classes = ""
 var section = ""
  if (typeof student_details.class != "undefined") {
      Object.keys(student_details.class).map(item => {
          if(item === "class_title"){
              classes = student_details.class['class_title'];
          }
          if(item === "section"){
            section = student_details.class['section'];
          }
      })
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <label className="form-control-label">Student Name: </label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={student_details.student_name}
          />
        </div>
        <div className="col-md-4">
          <label className="form-control-label">Father Name </label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={student_details.father_name}
          />
        </div>
        <div className="col-md-4">
          <label className="form-control-label">Father Contact Number </label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={student_details.father_contact_no1}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <label className="form-control-label">Class</label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={classes}
          />
        </div>
        <div className="col-md-2">
          <label className="form-control-label">Section</label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            defaultValue={section}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentIndividualReport;
