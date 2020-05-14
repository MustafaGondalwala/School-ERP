import React,{Component} from "react"
import {TeacherLeftSide, TeacherTopNavbar} from "./TeacherComponent"
import { logout, newAssignedTeacherClass } from "../../actions/auth"
import { connect } from "react-redux";

export class TeacherDashboard extends Component{
	constructor(props){
      super(props)
      this.state = {
        logout:false,
        assigned_class:""
      }
      this.logout = this.logout.bind(this)
    }

    componentDidMount(){
        if(Object.keys(this.props.assignTeacherClass).length == 0){
          axios({
            url:"/api/v1/teacher/assign/"+this.props.user.id
          }).then(response => {
            this.props.newAssignedTeacherClass(response.data.success.assigned_class)
            this.setState({
              assigned_class: response.data.success.assigned_class
            })
          })
        }else{
          this.setState({
            assigned_class:this.props.assignTeacherClass
          })
        }
    }
      

    logout(e){
    var self = this
      axios({
        method:"post",
        url:"/api/logout",
      }).then(function(response){
    	   self.props.logout()
        })
    }

	render(){
		return(
			<div>
            	<TeacherLeftSide assigned_class={this.state.assigned_class} /> 
            	<div className="main-content" id="panel">
	              <TeacherTopNavbar user={this.props.user} logout={this.logout}/>
	               {this.props.children}
	            </div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    assignTeacherClass: state.assignTeacherClass,
    user: state.user,
  };
}

export default connect(mapStateToProps,{ logout, newAssignedTeacherClass })(TeacherDashboard);