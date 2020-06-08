import React,{Component} from "react"
import api from "../../api"
import Swal from "sweetalert2";
import { connect } from "react-redux";
import GetInstallmentYear from "./GetInstallmentYear"
import CardComponent from "../../utils/CardComponent"

export default class SetDueDateForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            last_due_date:"",
            update_button:"Update"
        }
        this.getDueDate = this.getDueDate.bind(this)
    }
    getDueDate(data){
        api.admin.fee.get_due_date(data).then(data => {
            this.setState({
                last_due_date:data.due_date.last_due_date,
                id:data.due_date.id
            })
        })
    }
    onChange(e){
        this.setState({
          [e.target.name]:e.target.value
        });
    }
    updateDueDate(){
        var last_due_date = this.state.last_due_date
        var id = this.state.id
        this.setState({
            update_button:"Updating ..."
        })
        api.admin.fee.update_due_date({"last_due_date":last_due_date,"id":id}).then(data => {
            this.setState({
                last_due_date:data.due_date.last_due_date,
                id:data.due_date.id,
                update_button:"Update"
            })
            Swal.fire("Success","Due Date is Updated!","success");
        })
    }

    render(){
        const {last_due_date,update_button} = this.state
        return(
           <div>
                <GetInstallmentYear submit={this.getDueDate} />
                { (last_due_date == null || last_due_date) &&  
                    <CardComponent title="Update Due Date">
                    <div className="form-group row">
                        <div className="col">
                            {last_due_date == null ? <input type="date" value={last_due_date}  name="last_due_date" onChange={e => this.onChange(e)}  className="form-control"/>
                            : <input type="date" name="last_due_date" value={last_due_date} onChange={e => this.onChange(e)} className="form-control" value={last_due_date}/>}
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
