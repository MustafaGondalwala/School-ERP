import React,{Component} from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

class AdminAttendanceHeader extends Component{
    constructor(props){
      super(props)
      this.state = {
        total_students:"Loading ...",
        total_admission:"Loading ..."
      }
    }
   
    render(){
      return(
        <div></div>
      )
    }
  }

  export default AdminAttendanceHeader;