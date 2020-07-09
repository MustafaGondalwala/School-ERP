import React, { Suspense } from "react"
import AdminFeeHeader from "../../header/admin/AdminFeeHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import Row from "../../utils/Row"
import GetClassId from "../../utils/GetClassId"
import { render } from "react-dom"
import { Button, Col, RedLabel } from "../../utils/Components"
const FeeTypeShow =  React.lazy(() => import("../utils/FeeTypeShow"))
import api from "../../api"
import Swal from "sweetalert2"

class FeeUpdateType extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            class_id:"",
            fee_type:""
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.submitNewFeeType = this.submitNewFeeType.bind(this)
        this.submitUpdateFeeType = this.submitUpdateFeeType.bind(this)
        this.getCurrentFeeType = this.getCurrentFeeType.bind(this)
        this.submitDeleteFeeType = this.submitDeleteFeeType.bind(this)
    }
    getCurrentFeeType(class_id){
        this.setState({
            fee_type:""
        })
        api.admin.fee.fee_type.get(class_id).then(data => {
            const {fee_type} = data
            this.setState({
                fee_type
            })  
        })
    }

    sendClassId(class_id){
        this.setState({
            ['class_id']:class_id,
        })
        this.getCurrentFeeType(class_id)
    }
    submitUpdateFeeType(class_id,fee_type,id){
        return api.admin.fee.fee_type.update(class_id,fee_type,id).then(data => {
            const {fee_type,message} = data
            Swal.fire("Success",message,"success")
            this.setState({
                fee_type: ""
            },() => {
                this.setState({
                    fee_type
                })
            })
        })
    }
    submitNewFeeType(class_id,fee_type){
        return api.admin.fee.fee_type.new(class_id,fee_type).then(data => {
            const {fee_type} = data
              Swal.fire("Success","Data Updated !!","success")
            this.setState({
                fee_type: ""
            },() => {
                this.setState({
                    fee_type
                })
            })
        })
    }
    submitDeleteFeeType(class_id,row_id){
        return api.admin.fee.fee_type.delete(class_id,row_id).then(data => {
            const {fee_type,message} = data
              Swal.fire("Success",message,"success")
            this.setState({
                fee_type: ""
            },() => {
                this.setState({
                    fee_type
                })
            })
        })
    }
    render(){
        const {class_id,fee_type} = this.state
        return(
            <div>
                <TopBreadCrumb  mainHeader="Fee" header="Update Fees Type">
                    <AdminFeeHeader />
                </TopBreadCrumb>
                <BodyComponent>
        
                    <CardComponent title="Update Fee Type" back_link={"/admin/fees"} >
                            <GetClassId errors="" class_id={class_id} sendClassId={this.sendClassId}/>
                            <br />
                    </CardComponent>
                    {fee_type &&
                     <Suspense fallback={<h1>Loading ...</h1>}>
                         <FeeTypeShow submitDeleteFeeType={this.submitDeleteFeeType} submitUpdateFeeType={this.submitUpdateFeeType} submitNewFeeType={this.submitNewFeeType} class_id={class_id} fee_type={fee_type} />
                     </Suspense>
                    }
                </BodyComponent>
            </div>
        )
    }
}

export default FeeUpdateType