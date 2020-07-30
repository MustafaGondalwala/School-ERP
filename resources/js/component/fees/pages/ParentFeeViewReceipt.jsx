import React, { Component,Suspense } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import api from "../../api";
import CardComponent from "../../utils/CardComponent";
const StudentReceipt = React.lazy(() => import("../utils/StudentReceipt"))

class ParentFeeViewReceipt extends Component{
    constructor(props){
        super(props)
        this.state = {
            fee_receipts : ""
        }
    }
    componentDidMount(){
        const {student_id} = this.props.match.params
        api.parent.fee.get_receipts(student_id).then(data => {
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
        const {student_id} = this.props.match.params
        var back_link = "/parent/fees/"+student_id
        return(
            <div>
                <EmptyHeader mainHeader="Fee" header="View Receipts"/>
                <BodyComponent>
                    {fee_receipts ?
                        <Suspense fallback={<h1>Loading ...</h1>}>
                            <StudentReceipt back_link={back_link} fee_receipts={fee_receipts}/>
                        </Suspense>
                        :
                        <CardComponent title={"Fee Receipts"}>
                            <h3>Loading ...</h3>
                        </CardComponent>
                    }
                </BodyComponent>
            </div>
        )
    }
}

export default ParentFeeViewReceipt