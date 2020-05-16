import React, { Component } from "react";
import { ColComponent, RequestPant } from "../AdminLeaveComponent";
import TeacherLeaveHeader from "./TeacherLeaveHeader"
export class TeacherLeaveAttendRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leave_request: "",
    };
    this.updateAttendRequest = this.updateAttendRequest.bind(this);
    this.ChangeLeaveStatus = this.ChangeLeaveStatus.bind(this);
  }
  updateAttendRequest() {
    var self = this;
    axios({
      url:
        "/api/v1/leave/attend-leave-request/teacher/" +
        this.props.match.params.class_id,
    }).then((respone) => {
      self.setState({
        leave_request: respone.data.success.leave_request,
      });
    });
  }

  ChangeLeaveStatus(e) {
    var self = this;
    var id = e.target.getAttribute("data-id");
    var status = e.target.getAttribute("data-status");
    var actiontoTaken = e.target.getAttribute("data-action-type");
    var user_type = e.target.getAttribute("data-user-type");
    axios({
      url: "/api/v1/leave/update/teacher/" + this.props.match.params.class_id,
      method: "patch",
      data: {
        id,
        status,
        user_type,
        actiontoTaken,
      },
    }).then((response) => {
      self.setState({
        leave_request: response.data.success.leave_request,
      });
    });
  }
  componentDidMount() {
    this.updateAttendRequest();
  }
  render() {
    return (
      <div>
        <TeacherLeaveHeader mainHeader="Leave" header="Attend Request" />
        <div className="container-fluid mt--6">
          <div className="row card-wrapper">
            {this.state.leave_request ? (
              <RequestPant
                back_link={`/teacher/leave/${this.props.match.params.class_id}`}
                title={"Assigned Class Leave Request"}
                ChangeLeaveStatus={this.ChangeLeaveStatus}
                student_request={this.state.leave_request}
              />
            ) : (
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0">Loading ...</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export class TeacherLeaveViewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leave_request: "",
    };
    this.updateViewRequest = this.updateViewRequest.bind(this);
  }

  updateViewRequest() {
    var self = this;
    axios({
      url: "/api/v1/leave/teacher/all/" + this.props.match.params.class_id,
    }).then((respone) => {
      self.setState({
        leave_request: respone.data.success.leave_request,
      });
    });
  }
  componentDidMount() {
    this.updateViewRequest();
  }
  componentWillReceiveProps() {
    this.updateViewRequest();
  }
  render() {
    return (
      <div>
        <TeacherLeaveHeader mainHeader="Leave" header="View Leave Request" />
        <div className="container-fluid mt--6">
          <div className="row card-wrapper">
            {this.state.leave_request ? (
              <RequestPant
                title={"View Class Leave Request"}
                view={true}
                back_link={`/teacher/leave/${this.props.match.params.class_id}`}
                student_request={this.state.leave_request}
              />
            ) : (
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0">Loading ...</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export class TeacherLeaveHome extends Component {
  render() {
    return (
      <div>
        <TeacherLeaveHeader mainHeader="Leave" header="Home" />
        <div className="container-fluid mt--6">
          <div className="row card-wrapper">
            <ColComponent
              title="Attend Request"
              description="Attend Leave Request from Parent"
              link={`/teacher/attend-request/${this.props.match.params.class_id}`}
              button_text={"Attend Request"}
            />
            <ColComponent
              title="View Leave Requests"
              description="View All Leave Request from Parent"
              link={`/teacher/view-request/${this.props.match.params.class_id}`}
              button_text={"View Requests	"}
            />
          </div>
        </div>
      </div>
    );
  }
}
