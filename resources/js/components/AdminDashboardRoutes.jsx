import React from 'react'
import { Route } from 'react-router-dom'

import AdminDashboard from './dashboard/AdminDashboard'


const AdminDashboardRoutes = ({ component: Component, ...rest }) => {
    const checkAuth = {
    	isAuthenticated:false

    }
    return (
        <Route {...rest} render={props => (
            <AdminDashboard {...rest}>
                <Component {...props} />
            </AdminDashboard>
        )} />
    )
}

export default AdminDashboardRoutes
