import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import SelectStudent from "../../utils/SelectStudent"
import CardComponent from "../../utils/CardComponent"
import YearComponent from "../../utils/YearSelectComponent"
import InlineError from "../../utils/InlineError"
import PayFeesForm from "../form/PayFeesForm"
import api from "../../api"
import Swal from "sweetalert2";

export default class FeePayFees extends Component{
    constructor(props){
        super(props)
        this.state = {
            student_id:"",
            year_id:"",
            fetch_button:"Fetch",
            pay_button:"Pay Fees",
            error:{},
        }
        this.getStudentId = this.getStudentId.bind(this)
        this.onFetch = this.onFetch.bind(this)
        this.payFees = this.payFees.bind(this)
    }  

    componentDidMount(){
        this.setState({
            student_id:"13"
        },()=>{
            this.onFetch()
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
        const {student_id} = this.state
        if(student_id == ""){
            this.setState({
                error:{"student_id":"Can't be Blank"}
            })
        }else{
            this.setState({
                fetch_button:"Fetching ...",
                error:{}
            })

            api.admin.fee.get_individual_feesRead(this.state).then(data => {
                this.setState({
                    fetch_button:"Fetch",
                    fee_individual:data.fee_individual
                })
            }).catch(error => {
                console.log(error)
                // if(error.response.status == 422){
                //     const message = error.response.data.error.message
                //     Swal.fire("Fees not Set",message,"warning");
                //     this.setState({
                //         fetch_button:"Fetch",
                //     })
                // }
            })
        }
    }

    payFees(fee_individual,send_message,payment_type){
        const {student_id,year_id} = this.state
        this.setState({
            pay_button:"Paying ... Fees"   
        })
        api.admin.fee.pay_fees(fee_individual,send_message,payment_type,student_id,year_id).then(data => {
            console.log(data)
        })
    }

    render(){
        const {fetch_button,error,fee_individual,pay_button,year_id,student_id} = this.state
        return(
            <div>
                <AdminHeader mainHeader="Fee" header="Pay Fees" />
                <div className="container-fluid mt--6">
                    <CardComponent title="Select Student" back_link="/admin/fees">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-control-label">Select Student</label>
                                    <SelectStudent  sendStudentId={this.getStudentId}/>
                                    {error.student_id && <InlineError  text={error.student_id}/>}
                                </div>
                                <YearComponent onChange={this.getYear}  label="Select Year" name="year" errors=""/>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary" onClick={e => this.onFetch()}>{fetch_button}</button>
                        </div>
                    </CardComponent>  
                    
                    {fee_individual &&
                        <PayFeesForm pay_button={pay_button} year_id={year_id} student_id={student_id}  payFees={this.payFees} fee_individual={fee_individual}/>
                    }
                </div>
            </div>
        )
    }
}