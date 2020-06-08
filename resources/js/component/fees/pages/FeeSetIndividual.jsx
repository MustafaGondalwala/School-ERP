import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import CardComponent from "../../utils/CardComponent"
import SelectStudent from "../../utils/SelectStudent"
import YearComponent from "../../utils/YearSelectComponent"
import api from "../../api"
import FeeSetIndividualForm from "../form/FeeSetIndividualForm"
import Swal from "sweetalert2";

export default class FeeSetIndividual extends Component{
    constructor(props){
        super(props)
        this.state = {
            student_id:"",
            year_id:"",
            fetch_button:"Fetch",
            fee_individual:"",
            update_button:"Update Fees"
        }
        this.getStudentId = this.getStudentId.bind(this)
        this.updateFees = this.updateFees.bind(this)
    }
    componentDidMount(){
        this.setState({
            student_id:13
        },() => {
            this.onFetch();
        })
    }
    getStudentId(student_id){
        this.setState({
            student_id
        })
    }
    getYear(e){
        this.setState({
            year_id:e.target.value
        })
    }
    onFetch(){
        this.setState({
            fetch_button:"Fetching ...",
            fee_individual:""
        })
        const {student_id,year_id} = this.state
        api.admin.fee.get_individual_fees({student_id,year_id}).then(data => {
            this.setState({
                fetch_button:"Fetch",
                fee_individual:data.fee_individual
            })
        }).catch(error => {
            Swal.fire("Error Ocurred","Error Occured in Process, Please try Later","error");
        })
    }

    updateFees(fee_individual,send_message){
        this.setState({
            fetch_button:"Updating Fees",
            fee_individual:"",
        })
        api.admin.fee.update_individual_fees(fee_individual,send_message).then(data => {
            this.setState({
                fetch_button:"Fetch",
                fee_individual:data.fee_individual
            })
            Swal.fire("Fee Updated !!","Fee Updated Successfully","success");
        }).catch(error => {
            Swal.fire("Error Ocurred","Error Occured in Process, Please try Later","error");
        })
    }
    render(){
        const {fetch_button,fee_individual} = this.state
        return(
            <div>
                <AdminHeader mainHeader="Fee" header="Set Individual Fees" />
                <div className="container-fluid mt--6">
                    <CardComponent title="Select Student" back_link="/admin/fees">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-control-label">Select Student</label>
                                    <SelectStudent  sendStudentId={this.getStudentId}/>
                                </div>
                                <YearComponent onChange={this.getYear}  label="Select Year" name="year" errors=""/>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary" onClick={e => this.onFetch()}>{fetch_button}</button>
                        </div>
                    </CardComponent>                
                    {fee_individual && <FeeSetIndividualForm  update_button={this.state.update_button} updateFees={this.updateFees} fee_individual={fee_individual}/>}
                </div>
            </div>
        )
    }
}