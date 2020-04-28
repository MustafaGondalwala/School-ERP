import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RegisterStudentForm from "../forms/RegisterStudentForm"

export default class RegisterStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
          register_user_message:"",
          server_error:""
        };
    this.submit = this.submit.bind(this)
  };
  submit(data){
    self  = this
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
        console.log(response.status)
        if(data.success.another_type == 1){
          var student_link = data.success.student_link;
          var father_link = data.success.father_link;
          var message = "<strong>Student Created</strong>    "+"<a href="+student_link+">Student Link</a>   <a href="+father_link+">Father Link</a>";
          this.setState({
            register_user_message:message
          })
        }
        if( data.success.another_type == 0){
          var message = "<strong>Student Created</strong> ";
          this.setState({
            register_user_message:message
          })
        }
        if(data.success.another_type == 2 ){
          var message = "<strong>Student Created</strong> ";
          this.setState({
            register_user_message:message
          })
        }
    }).catch(error=>{
      self.setState({
        'server_error':error.response.data.errors
      })
    })

  }
     render () {

       return (
        <div>
          <RegisterStudentForm submit={this.submit} server_error={this.state.server_error} register_user_message={this.state.register_user_message} />
        </div>
       )
     }
};
