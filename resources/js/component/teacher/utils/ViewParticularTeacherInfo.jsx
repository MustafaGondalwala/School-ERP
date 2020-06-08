import React, { Component } from "react";

const LabelDisableInput = ({label,col_type="col-md-2",value}) => {
  return (
    <div className={col_type}>
      <div className="form-group">
        <label className="form-control-label">
            {label}
        </label>
          <input
            type="integer"
            className="form-control"
            disabled
            value={value}
            placeholder={label}
          />
      </div>
    </div>
  );
};

export default class ViewParticularTeacherInfo extends Component {
  render() {
    const { teacher_info } = this.props;
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">View Info</h3>
            </div>
            <div className="card-body">
              <div className="row">
                  <LabelDisableInput value={teacher_info.empid} label="EmpId"/>
                  <LabelDisableInput value={teacher_info.teacher_name} label="Teacher Name"/>
                  <LabelDisableInput value={teacher_info.user.gender} label="Gender"/>
                  <LabelDisableInput value={teacher_info.user.relative_name} label="Husband/Father Name"/>
                  <LabelDisableInput value={teacher_info.user.email} label="Email"/>
                  <LabelDisableInput value={teacher_info.user.contact_no} label="Contact No"/>
                  <LabelDisableInput value={teacher_info.user.address} label="Address"/>
                  <LabelDisableInput value={teacher_info.user.qualification} label="Qualification"/>
                  <LabelDisableInput value={teacher_info.user.dob} label="Dob"/>
                  <LabelDisableInput value={teacher_info.user.blood_group} label="Blood Group"/>
                  <LabelDisableInput value={teacher_info.user.qualification} label="Qualification"/>
                  <LabelDisableInput value={teacher_info.user.date_of_join} label="Date of Joining"/>
                  <LabelDisableInput value={teacher_info.user.qualification} label="Qualification"/>
                  >
                 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
