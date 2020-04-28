import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AdmissionStudentForm from "../forms/AdmissionStudentForm"

export default class AdmissionStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
          register_user_message:"",
          server_error:""
        };
    this.submit = this.submit.bind(this)
  };
  submit(data){
        var self  = this
        axios({
          url:"/api/v1/student/add-admission-student",
          method:"post",
          data:data,
        }).then(response => {
            self.setState({
              register_user_message:response.data.success.message
            });
        }).catch(error => {
          self.setState({
            server_error:error.response.data.message
          })
        })
    }
     render () {
       return (
        <div>

          <AdmissionStudentForm submit={this.submit} server_error={this.state.server_error} register_user_message={this.state.register_user_message} />
        </div>
       )
     }
};
