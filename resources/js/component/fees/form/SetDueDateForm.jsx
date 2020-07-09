import React,{Component} from "react"
import api from "../../api"
import Swal from "sweetalert2";
import { connect } from "react-redux";
import GetInstallmentYear from "./GetInstallmentYear"
import CardComponent from "../../utils/CardComponent"
import { Input } from "../../utils/Components";

export default class SetDueDateForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            due_date:"",
            update_button:"Update"
        }
        this.getDueDate = this.getDueDate.bind(this)
        this.onChange = this.onChange.bind(this)
        this.updateDueDate = this.updateDueDate.bind(this)
    }
    getDueDate(data){
        api.admin.fee.get_due_date(data).then(data => {
            const {due_date} = data
            this.setState({
                due_date
            })
        })
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            due_date: {...this.state.due_date,[name]: value}
        })
    }
    updateDueDate(){
        const {due_date} = this.state
        this.setState({
            update_button:"Updating ..."
        })
        api.admin.fee.update_due_date(due_date).then(data => {
            console.log(data)
            Swal.fire("Success","Due Date is Updated!","success");
        })
    }

    render(){
        const {due_date,update_button} = this.state
        return(
           <div>
            <GetInstallmentYear submit={this.getDueDate} />
                { due_date &&  
                    <CardComponent title="Update Due Date">
                    <div className="form-group row">
                        <div className="col">
                            <Input type="date" name="last_due_date" value={due_date.last_due_date || ''} onChange={this.onChange} />
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={e =>  this.updateDueDate()}>{update_button}</button>
                        </div>
                    </div>
                    </CardComponent>
                }
           </div>
        )
    }
}
