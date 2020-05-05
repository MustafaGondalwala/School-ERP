import React from 'react'
import { Route } from 'react-router-dom'

import ParentDashboard from './dashboard/ParentDashboard'
const ParentDashboardRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            <ParentDashboard {...rest}>
                <Component {...props} />
            </ParentDashboard>
        )} />
    )
}

export default ParentDashboardRoutes
