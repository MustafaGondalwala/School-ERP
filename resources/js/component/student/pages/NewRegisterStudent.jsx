import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import RegisterForm from "../form/RegisterForm"
import api from "../../api/student"
import Swal from 'sweetalert2'

class NewRegisterStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            button_text : "Add"
        }
        this.submit = this.submit.bind(this)
    }
    submit(data){
        this.setState({
            button_text:"Adding ..."
        })
        return api.user.add_student(data).then(data => {
                Swal.fire("Success",data.message,"success");
                this.setState({
                    button_text:"Add"
                })
            })
    }
    render(){
        return(
            <div>
                <AdminHeader mainHeader="Student" header="Register Student"/>
                <RegisterForm button_text={this.state.button_text} submit={this.submit}/>
            </div>
        )
    }
}

export default NewRegisterStudent