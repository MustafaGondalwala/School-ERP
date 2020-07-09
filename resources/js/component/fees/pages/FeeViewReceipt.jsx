import React, { Component,Suspense } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminFeeHeader from "../../header/admin/AdminFeeHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import SelectStudent from "../../utils/SelectStudent"
import { Col, FormLabel } from "../../utils/Components"
import Row from "../../utils/Row"
import Swal from "sweetalert2"
import api from "../../api"
const StudentReceipt = React.lazy(() => import("../utils/StudentReceipt"))


class FeeViewReceipt extends Component{
    constructor(props){
        super(props)
        this.state = {
            fee_receipts : ""
        }
        this.getStudentID = this.getStudentID.bind(this)
    }
    getStudentID(student_id){
        this.setState({
            fee_receipts:""
        })
        api.adminclerk.fee.get_receipts(student_id).then(data => {
            const {fee_receipts} = data
            this.setState({
                fee_receipts
            })
        }).catch(function (error) {
            if(error.response){
                if(error.response.status == 400){
                    const {message} = error.response.data.error
                    Swal.fire("Not Found",message,"error");
                }
            }
        });
    }
    render(){
        const {fee_receipts} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Fee" header="View Receipt">
                    <AdminFeeHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="View Student Receipt" back_link="/admin/fees">
                        <Row>
                            <Col md="6" sm="6">
                                <FormLabel>Select Student:</FormLabel>
                                <SelectStudent sendStudentId={this.getStudentID}/>
                            </Col>
                        </Row>
                    </CardComponent>
                    {fee_receipts && 
                        <Suspense fallback={<h1>Loading ...</h1>}>
                            <StudentReceipt fee_receipts={fee_receipts}/>
                        </Suspense>
                    }
                </BodyComponent>
            </div>
        )
    }
}
export default FeeViewReceipt