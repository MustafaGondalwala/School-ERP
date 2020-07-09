import React, { Suspense } from "react"
import AdminDashboardRoutes from "../../routes/AdminDashboardRoutes"
import FeesAdminHomePage from "../../fees/pages/FeesAdminHomePage"
import FeeInstallments from "../../fees/pages/FeeInstallments"
import FeeSetDueDate from "../../fees/pages/FeeSetDueDate"
import FeeSetClassWise from "../../fees/pages/FeeSetClassWise"
import FeeSetIndividual from "../../fees/pages/FeeSetIndividual"
import FeePayFees from "../../fees/pages/FeePayFees"
import FeeUpdateType from "../../fees/pages/FeeUpdateType"
import FeeViewReceipt from "../../fees/pages/FeeViewReceipt"
import FeeViewPendingFees from "../../fees/pages/FeeViewPendingFees"
const AdminFeeRoutes = () => (
    <span>
        <AdminDashboardRoutes exact path="/admin/fees" component={FeesAdminHomePage} />
        <AdminDashboardRoutes exact path="/admin/fees/set-installments" component={FeeInstallments} />
        <AdminDashboardRoutes exact path="/admin/fees/set-due-dates" component={FeeSetDueDate} />
        <AdminDashboardRoutes exact path="/admin/fees/set-fees-class-wise" component={FeeSetClassWise} />
        <AdminDashboardRoutes exact path="/admin/fees/set-fees-individual" component={FeeSetIndividual} />
        <AdminDashboardRoutes exact path="/admin/fees/pay-fees" component={FeePayFees} />
        <AdminDashboardRoutes exact path="/admin/fees/view-receipt" component={FeeViewReceipt} />
        <AdminDashboardRoutes exact path="/admin/fees/fee-type" component={FeeUpdateType} />
        <AdminDashboardRoutes exact path="/admin/fees/pending-fees" component={FeeViewPendingFees} />

    </span>
)

export default AdminFeeRoutes
