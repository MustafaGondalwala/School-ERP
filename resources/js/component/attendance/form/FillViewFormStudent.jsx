import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import Swal from "sweetalert2"
import Chart from "../../utils/Chart"

export default class FillViewFormStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      student_attendance: "",
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
    this.updateTotalInputs = this.updateTotalInputs.bind(this)
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
  componentDidMount() {
    var title = "";
    const {view_type,student_attendance} = this.props
    if (view_type == "fill") title = "Fill Attendance";
    else title = "View Attendance";
    this.stateChange("title", title);
    this.stateChange("student_attendance", student_attendance);
    this.stateChange("view_type",view_type)
    this.updateTotalInputs(student_attendance)
  }

  changeSelectStatus(e,index){
      const temp = this.state.student_attendance;
      const value = e.target.value
      temp[index].status = value
      this.stateChange("student_attendance",temp)
    
      const update_temp = this.state.update_attendance
      update_temp[index] = [temp[index].id,temp[index].status]
      this.stateChange("update_attendance",update_temp)
  }
  onSubmit(){
      const {update_attendance} = this.state
      this.stateChange("update_button","Updating ...")
      this.props.updateStudentAttendance(this.state.update_attendance).then(data => {
        this.stateChange("update_button","Update Attendance")
        this.stateChange("update_attendance",[])
        console.log(data)
        Swal.fire("Done","Student Attendance Updated !!","success")
      }).catch(error =>{
          if(error.response){
            if(error.response.status == 422){
                Swal.fire("Validation Error","Please update Aleast One Student Attendance","warning")
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
    const { title,student_attendance,view_type,update_button } = this.state;
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
		    		<div className="col">
		    		<label><h5>Present Student:</h5></label>
		    		<input type="text" disabled value={total_present} className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Leave Student:</h5></label>
		    		<input type="text" disabled value={total_leave} className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Absent Student:</h5></label>
		    		<input type="text" disabled value={total_absent} className="form-control" />
		    		</div>
            <div className="col">
		    		<label><h5>Attendance Half Leave:</h5></label>
		    		<input type="text" disabled value={total_half_leave} className="form-control" />
		    		</div>
		    		<div className="col">
		    		<label><h5>Attendance Pending:</h5></label>
		    		<input type="text" disabled value={total_none} className="form-control" />
		    		</div>
		    	</div>
		    <br />
        <div className="row">
          <div className="table-responsive">
            <table className="table datatable">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Father Name</th>
                  <th>Attendance</th>
                  <th>Checkbox</th>
                </tr>
              </thead>
              <tbody>
                {student_attendance && student_attendance.map((item,id) => {
                    return <EachAttendanceRow key={id} view_type={view_type} onChange={this.changeSelectStatus} view_type={view_type} index={id} row={item}/>
                })}
              </tbody>
            </table>
                {view_type == "fill" &&
                <button className="btn btn-primary" onClick={e => this.onSubmit()}>{update_button}</button>
              }
          </div>
        </div>
       
        <div className="row">
          <br />
          <br />
          {view_type == "view" && <Chart title={`Student Attendance for ${select_date}`} filename={`student_attendance`} type="pie" dataPoints={dataPoints}/>}
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
            <td>{row.student_info.roll_no}</td>
            <td>{row.student_info.student_name}</td>
            <td>{row.student_info.father_name}</td>
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