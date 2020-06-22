import React, { Component } from "react";
import { setTeachersNameDispatch } from "../../actions/teacher";
import { connect } from "react-redux";
import { SelectOption, Select } from "../../utils/Components";

class SelectTeacher extends Component {
  componentDidMount() {
    const { teachers_name, setTeachersNameDispatch } = this.props;
    if (Object.keys(teachers_name).length == 0) {
      setTeachersNameDispatch();
    }
  }
  render() {
    const { teachers_name,value,onChange } = this.props;
    return (
      <Select
        name="assigned_teacher"
        onChange={onChange}
        value={value || ""}
      >
        <SelectOption> -- Select -- </SelectOption>
        {Object.keys(teachers_name).length > 0 &&
          teachers_name.map((teacher, index) => {
            return (
              <SelectOption key={index} value={teacher.id}>
                {teacher.teacher_name}
              </SelectOption>
            );
          })}
      </Select>
    );
  }
}

function mapStateToProps(state) {
  return {
    teachers_name: state.teachers_name,
  };
}

export default connect(mapStateToProps, { setTeachersNameDispatch })(
  SelectTeacher
);
