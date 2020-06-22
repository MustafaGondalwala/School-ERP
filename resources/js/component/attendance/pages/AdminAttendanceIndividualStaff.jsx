import React, { Component, Suspense } from "react";
import AdminHeader from "../header/AdminHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import SelectStaff from "../../utils/SelectStaff";
import InlineError from "../../utils/InlineError";
const StaffIndividualReport = React.lazy(() => import("../utils/StaffIndividualReport"))

export default class AdminAttendanceIndividualStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        select_month: "",
        staff_id: ''
      },
      button_text: "Fetch",
      errors: {},
      open_panel:false
    };
    this.fetchStaff = this.fetchStaff.bind(this)
    this.sendStaffId = this.sendStaffId.bind(this)
  }
  sendStaffId(staff_id) {
    console.log(staff_id)
    this.setState({
      data: { ...this.state.data, ["staff_id"]: staff_id },
    });
  }
  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }
  validate(data){
    const errors = {};
    if (!data.staff_id) errors.staff_id = "Can't be blank";
    if(!data.select_month) errors.select_month = "Can't be blank";
    return errors
  }
  fetchStaff(){
    const {data} = this.state
    const errors = this.validate(data);
    console.log(errors,data)
    this.setState({
        open_panel:false
    })
    this.setState({ errors })
    if(Object.keys(errors).length == 0){
        this.setState({
            open_panel:true
        })
    }
  }

  render() {
    const { button_text, data, errors,open_panel } = this.state;
    return (
      <div>
        <AdminHeader
          mainHeader="Attendance"
          header="Staff"
          sub_header="Individual Staff"
        />
        <BodyComponent>
          <CardComponent title="Select Staff" back_link="/admin/attendance">
            <div className="row">
              <div className="col">
                <label>Select Staff:</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectStaff sendStaffId={this.sendStaffId}/>
                {errors.staff_id && (
                    <InlineError text={errors.staff_id} />
                  )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label
                    className="form-control-label"
                    htmlFor="example3cols1Input"
                  >
                    Select Month
                  </label>
                  <input
                    value={data.select_month}
                    onChange={(e) => this.onChange(e)}
                    className="form-control"
                    type="month"
                    name="select_month"
                  />
                  {errors.select_month && (
                    <InlineError text={errors.select_month} />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-primary" onClick={this.fetchStaff}>{button_text}</button>
              </div>
            </div>
          </CardComponent>
          {open_panel && 
          <Suspense fallback={<h1>Loading ...</h1>}>
            <StaffIndividualReport data={data}/>
          </Suspense>
        } 
        </BodyComponent>
      </div>
    );
  }
}
