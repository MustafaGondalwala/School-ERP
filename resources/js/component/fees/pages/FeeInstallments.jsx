import React,{Component,Suspense} from "react"
const AdminFeeHeader  =  React.lazy(() => import("../../header/admin/AdminFeeHeader"))
import {Link} from "react-router-dom"
import api from "../../api"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
const SetInstallments = React.lazy(() => import("../form/SetInstallments"))
import Swal from "sweetalert2";

export default class FeeInstallments extends Component{
    render(){
        return(
            <div>
                <TopBreadCrumb mainHeader="Fee" header="Installments">
                    <Suspense fallback={<h1>Loading ...</h1>}>
                        <AdminFeeHeader />
                    </Suspense>
                </TopBreadCrumb>
                <div className="container-fluid mt--6">
                    <Suspense fallback={<h1>Loading ...</h1>}>
                        <SetInstallments />
                    </Suspense>
                </div>
            </div>
        )
    }
}