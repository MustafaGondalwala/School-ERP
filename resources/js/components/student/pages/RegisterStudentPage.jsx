import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RegisterStudentForm from "../forms/RegisterStudentForm"

export default class RegisterStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
          register_user_message:"",
          server_error:"",
          "add_student_button_text":"Register Student",
          "show_success_message":false
        };
    this.submit = this.submit.bind(this)
  };
  submit(data){
    var self  = this
    this.setState({
      add_student_button_text:"Add Student ..."
    })
    const formData = new FormData();
    Object.keys(data).map((item)=>{
      formData.append(item,data[item])
    })
    axios({
      url:"/api/v1/student/add-register-student",
      method:"post",
      data:formData,
    }).then(response => {
          var data = response.data[0]
          self.setState({
            show_success_message:true
          })
          self.setState({
            add_student_button_text:"Register Student"
          })
    }).catch(error=>{
      self.setState({
          'server_error':error.response.data.errors,
      })
      self.setState({
          add_student_button_text:"Register Student"
      })
    })

  }
     render () {
       return (
        <div>
          <RegisterStudentForm errors={this.state.server_error} add_student_button_text={this.state.add_student_button_text} submit={this.submit} server_error={this.state.server_error} show_success_message={this.state.show_success_message} />
        </div>
       )
     }
};
