import React,{Component,Suspense} from "react"
const AdminHeader = React.lazy(() => import("../header/AdminHeader"))
const CardComponent = React.lazy(() => import("../../utils/CardComponent"))
const GetClassId = React.lazy(() => import("../../utils/GetClassId"))
const YearSelectComponent = React.lazy(() => import("../../utils/YearSelectComponent"))
const FeeClassWiseForm = React.lazy(() => import("../form/FeeClassWiseForm"))

import api from "../../api"
import {setFeeType} from "../../actions/fee"
import { connect } from "react-redux";
import { Button } from "../../utils/Components"
import Row from "../../utils/Row"
import Swal from "sweetalert2"

class FeeSetClassWise extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_id:"",
            year_id:"",
            fetch_button:"Fetch",
            errors:{},
            fee_class_wise:""
        }
        this.changeClassId = this.changeClassId.bind(this)
    }
    
    changeClassId(class_id){
        this.setState({
            class_id
        })
    }
    fetchClass(){
        const {class_id} = this.state
        if(class_id == ""){
            const errors = {}
            errors.class_id = "Can't be Blank"
            this.setState({
                errors
            })   
            return false
        }
        this.setState({
            fetch_button:"Fetching ...",
            fee_class_wise:""
        })   

        api.adminclerk.fee.get_classwise_fees(class_id).then(data => {
            this.setState({
                fee_class_wise:data.fee_class_wise,
                fetch_button:"Fetch",
            })
        }).catch(error => {
            const {data,status} = error.response
            if(status == 400){
                Swal.fire("Invalid Data",data.error.message,"warning");
                this.setState({
                    fetch_button:"Fetch",
                })
            }
        })
    }
    render(){
        const {fetch_button,fee_class_wise,class_id,year_id,errors} = this.state
        return(
            <div>
                <Suspense fallback={<h1>Still Loading…</h1>}>
                    <AdminHeader mainHeader="Fee" header="Set Class Wise"/>
                </Suspense>
                <div className="container-fluid mt--6">
                    <Suspense fallback={<h1>Still Loading…</h1>}>
                        <CardComponent title="Select Class and Section" back_link="/admin/fees">
                                <Suspense fallback={<h1>Still Loading…</h1>}>
                                    <GetClassId  class_id={class_id} errors={errors} name="class_id" sendClassId={this.changeClassId}/>
                                </Suspense>
                                <br />
                                <Row>
                                    <Button primary onClick={() => this.fetchClass()}>{fetch_button}</Button>
                                </Row>
                        </CardComponent>
                    </Suspense>
                    {fee_class_wise &&
                        <Suspense fallback={<h1>Still Loading…</h1>}>
                        <FeeClassWiseForm class_id={class_id} year_id={year_id} fee_class_wise={fee_class_wise}/>
                        </Suspense>
                    }


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      feeType:state.feeType
    };
}

export default connect(mapStateToProps,{setFeeType})(FeeSetClassWise);
