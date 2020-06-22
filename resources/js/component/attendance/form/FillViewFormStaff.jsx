import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import Swal from "sweetalert2"
import Row from "../../utils/Row";
const Chart  = React.lazy(() => import("../../utils/Chart")) 

export default class FillViewFormStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      staff_attendance: "",
      view_type:"",
      update_attendance:[],
      update_button:"Update Attendance",
      total_present:0,
			total_absent:0,
      total_leave:0,
      total_half_leave:0,
			total_none:0
    };
    this.stateChange = this.stateChange.bind(this);
    this.changeSelectStatus = this.changeSelectStatus.bind(this)
    this.updateTotalInputs = this.updateTotalInputs.bind(this)
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
    const {view_type,staff_attendance} = this.props
    this.stateChange("title", title);
    this.stateChange("staff_attendance", staff_attendance);
    this.stateChange("view_type",view_type)
    this.updateTotalInputs(staff_attendance)
  }
  updateTotalInputs(data){
    var total_present = 0;
    var total_absent = 0;
    var total_leave = 0;
    var total_half_leave = 0;
    var total_none = 0;
    data.map(item => {
      switch(item.status){
        case 1:
          total_present += 1;
          break;
        case 2:
          total_absent += 1;
          break;
        case 3:
          total_leave += 1
          break
        case 4:
          total_half_leave +=1
          break
        case 5:
          total_none += 1;
          break;
      }
    })
    this.setState({
      total_leave,total_present,total_absent,total_none
    })
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
    const {total_present,total_absent,total_leave,total_none,total_half_leave} = this.state;
    const {select_date} = this.props
    const dataPoints = [{"y":total_present,label:"Total Present"},
							          {"y":total_absent,label:"Total Absent"},
                        {"y":total_leave,label:"Total Leave"},
                        {"y":total_half_leave,label:"Total Half Leave"},
							  				{"y":total_none,label:"Total None Entry"}
							  			];
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
        <br />
        <br />
        <Row>
        {view_type == "view" && <Chart title={`Staff Attendance for ${select_date}`} filename={`staff_attendance`} type="pie" dataPoints={dataPoints}/>}
        </Row>
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