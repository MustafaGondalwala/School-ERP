import React, { Component } from 'react'
import AddTeacherForm from "../form/AddTeacherForm"

class AddTeacherPage extends Component{
  submit(data){
    self  = this
    const formData = new FormData();
    Object.keys(data).map((item)=>{
      formData.append(item,data[item])
    })
    axios({
      url:"/api/v1/teacher/add-teacher",
      method:"post",
      data:formData,
    }).then((response)=>{
        console.log(response)
    }).catch((error) => {
      console.log(error)
    })
    console.log(data)
  }
  render(){
    return(
      <div>
          <AddTeacherForm submit={this.submit} />
      </div>
    )
  }
}

export default AddTeacherPage;
