import React,{Component, Suspense} from "react"
import AdminHeader from "../header/AdminHeader"
import CardComponent from "../../utils/CardComponent"
import SelectStudent from "../../utils/SelectStudent"
import YearComponent from "../../utils/YearSelectComponent"
import api from "../../api"
import Swal from "sweetalert2";
import Row from "../../utils/Row"
import { Col, FormGroup, FormLabel, Button } from "../../utils/Components"
const FeeSetIndividualForm = React.lazy(() => import("../form/FeeSetIndividualForm"))

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
    getStudentId(student_id){
        this.setState({
            student_id
        })
    }
    onFetch(){
        this.setState({
            fetch_button:"Fetching ...",
            fee_individual:""
        })
        const {student_id,year_id} = this.state
        api.adminclerk.fee.get_individual_fees({student_id,year_id}).then(data => {
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
        api.adminclerk.fee.update_individual_fees(fee_individual,send_message).then(data => {
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
                       <Row>
                           <Col md="6" sm="6">
                                <FormGroup>
                                    <FormLabel>Select Student</FormLabel>
                                    <SelectStudent  sendStudentId={this.getStudentId}/>
                                </FormGroup>
                           </Col>
                       </Row> 
                       <Row>
                           <Button primary onClick={e => this.onFetch()}>{fetch_button}</Button>
                       </Row>
                    </CardComponent>                
                    {fee_individual && <Suspense fallback={<h1>Loading ...</h1>}>
                        <FeeSetIndividualForm  update_button={this.state.update_button} updateFees={this.updateFees} fee_individual={fee_individual}/>
                    </Suspense>}
                </div>
            </div>
        )
    }
}