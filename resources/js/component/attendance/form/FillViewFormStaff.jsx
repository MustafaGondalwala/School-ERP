import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import Swal from "sweetalert2"

export default class FillViewFormStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      staff_attendance: "",
      view_type:"",
      update_attendance:[],
      update_button:"Update Attendance"
    };
    this.stateChange = this.stateChange.bind(this);
    this.changeSelectStatus = this.changeSelectStatus.bind(this)
  }
  stateChange(name, value,callback) {
    this.setState(
      {
        [name]: value,
      },
      callback
    );
  }
  componentDidMount() {
    var title = "";
    if (this.props.view_type == "fill") title = "Fill Attendance";
    else title = "View Attendance";
    this.stateChange("title", title);
    this.stateChange("staff_attendance", this.props.staff_attendance);
    this.stateChange("view_type",this.props.view_type)
  }

  changeSelectStatus(e,index){
      const temp = this.state.staff_attendance;
      const value = e.target.value
      temp[index].status = value
      this.stateChange("staff_attendance",temp)
    
      const update_temp = this.state.update_attendance
      update_temp[index] = [temp[index].id,temp[index].status]
      this.stateChange("update_attendance",update_temp)
  }
  onSubmit(){
      this.stateChange("update_button","Updating ...")
      this.props.updateStudentAttendance(this.state.update_attendance).then(data => {
        this.stateChange("update_button","Update Attendance")
        this.stateChange("update_attendance",[])
        Swal.fire("Done","Staff Attendance Updated !!","success")
      }).catch(error =>{
          if(error.response){
            if(error.response.status == 422){
                Swal.fire("Validation Error","Please update Aleast One Staff Attendance","warning")
            }else{
              Swal.fire("Error Occured","Error Occured. Please try later","error");
            }
          }else{
            Swal.fire("Error Occured","Error Occured. Please try later","error");
          }
          this.stateChange("update_button","Update Attendance")
      })
  }
  render() {
    const { title,staff_attendance,view_type,update_button } = this.state;
    return (
      <CardComponent title={title}>
        <div className="row">
          <div className="table-responsive">
            <table className="table datatable">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Empid</th>
                  <th>Staff Name</th>
                  <th>Staff Mobileno</th>
                  <th>Attendance</th>
                  <th>Checkbox</th>
                </tr>
              </thead>
              <tbody>
                {staff_attendance && staff_attendance.map((item,id) => {
                    return <EachAttendanceRow key={id} view_type={view_type} onChange={this.changeSelectStatus} view_type={view_type} index={id} row={item}/>
                })}
              </tbody>
            </table>
                {view_type == "fill" &&
                <button className="btn btn-primary" onClick={e => this.onSubmit()}>{update_button}</button>
              }
          </div>
        </div>
      </CardComponent>
    );
  }
}

const EachAttendanceRow = ({view_type,index,row,onChange}) => {
  const disable = view_type === "view" ? true: false   
  return(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{row.staff.empid}</td>
            <td>{row.staff.staff_name}</td>
            <td>{row.staff.contact_no}</td>
            <td>
                <select disabled={disable} onChange={e => onChange(e,index)} value={row.status} className="form-control">
                    <option value="1">Present</option>
                    <option value="2">Absent</option>
                    <option value="3">Leave</option>
                    <option value="4">Half Present</option>
                    <option value="5">None</option>
                </select>
            </td>
            <td>
              <input type="checkbox"/>
            </td>
        </tr>
    )
}