import React, { Component } from 'react'
import AddTeacherForm from "../form/AddTeacherForm"

class AddTeacherPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      add_student_button_text: "Register Teacher",
      server_error:{},
      register_user_message:false
    }
    this.submit = this.submit.bind(this)
  }
  submit(data){
    var self  = this
    self.setState({
            add_student_button_text:"Registering Teacher ...",
        })
    self.setState({
            register_user_message:false
    })
    const formData = new FormData();
    Object.keys(data).map((item)=>{
      formData.append(item,data[item])
    })
    axios({
      url:"/api/v1/teacher/add-teacher",
      method:"post",
      data:formData,
    }).then((response)=>{
      self.setState({
        add_student_button_text:"Register Teacher",
        server_error:{},
        register_user_message:true,

      })
    }).catch((error) => {
        self.setState({
            'server_error':error.response.data.errors,
        })
        self.setState({
            register_user_message:false
        })
        self.setState({
            add_student_button_text:"Register Teacher",
        })
    })
  }
  render(){
    return(
      <div>
          <AddTeacherForm register_user_message={this.state.register_user_message} server_error={this.state.server_error} add_student_button_text={this.state.add_student_button_text} title="Add Teacher Form" back_link={"/admin/teacher"} submit={this.submit} />
      </div>
    )
  }
}

export default AddTeacherPage;
