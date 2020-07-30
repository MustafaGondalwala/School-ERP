import React,{Component, Suspense} from "react"
import AdminHeader from "../header/AdminHeader"
const SelectStudent = React.lazy(() => import("../../utils/SelectStudent")) 

const PayFeesForm = React.lazy(() => import("../form/PayFeesForm"))

import CardComponent from "../../utils/CardComponent"
import InlineError from "../../utils/InlineError"
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
            fee_individual:""
        }
        this.getStudentId = this.getStudentId.bind(this)
        this.onFetch = this.onFetch.bind(this)
        this.payFees = this.payFees.bind(this)
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
                error:{},
                fee_individual:""
            })

            api.adminclerk.fee.get_individual_feesRead(this.state).then(data => {
                this.setState({
                    fetch_button:"Fetch",
                    fee_individual:data.fee_individual
                })
            }).catch(error => {
                const {data,status} = error.response
                console.log(data,status)
                if(status == 400){
                    Swal.fire("Invalid Data",data.error.message,"warning")
                    this.setState({
                        fetch_button:"Fetch"
                    })
                }
            })
        }
    }

    payFees(fee_individual,payment_type){
        const {student_id} = this.state
        this.setState({
            pay_button:"Paying ... Fees",
            fee_individual:""
        })
        return api.adminclerk.fee.pay_fees(fee_individual,payment_type,student_id).then(data => {
            const {fee_receipts,fee_individual} = data
            this.setState({
                fee_individual
            })
            Swal.fire("Success","Fees Payment Done!!","success")
        }).catch(error => {
            Swal.fire("Error Occurred","Error Occurred in Process. Please try again Later..","error")
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
                                    <Suspense fallback={<h1>Loading ...</h1>}>
                                        <SelectStudent  sendStudentId={this.getStudentId}/>
                                    </Suspense>
                                    {error.student_id && <InlineError  text={error.student_id}/>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary" onClick={e => this.onFetch()}>{fetch_button}</button>
                        </div>
                    </CardComponent>  
                    
                    {fee_individual &&
                        <Suspense fallback={<h1>Loading ...</h1>}>
                            <PayFeesForm  pay_button={pay_button} year_id={year_id} student_id={student_id}  payFees={this.payFees} fee_individual={fee_individual}/>
                        </Suspense>
                    }
                </div>
            </div>
        )
    }
}