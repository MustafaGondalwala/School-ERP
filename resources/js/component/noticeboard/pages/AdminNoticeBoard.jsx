import React, { Component, Suspense } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import ColComponent from "../../utils/ColComponent"
const AdminNoticeBoardHeader = React.lazy(() => import("../../header/admin/AdminNoticeBoardHeader"))

export default class AdminNoticeBoard extends Component{
    render(){
        return(
            <div>
                <TopBreadCrumb mainHeader="Notice Board" header="Home">
                    <Suspense fallback={<h1>Loading ...</h1>}>
                        <AdminNoticeBoardHeader />
                    </Suspense>
                </TopBreadCrumb>
                <BodyComponent>
                    <div className="row card-wrapper">
                        <ColComponent
                            title="Add Notice"
                            description="Add Notice for Each User or All"
                            link="/admin/noticeboard/add"
                            button_text="Add"
                        />
                        
                        <ColComponent
                            title="View Notice"
                            description="View Notice for Each User or All"
                            link="/admin/noticeboard/view"
                            button_text="View"
                        />
                        <ColComponent
                            title="View Engagement on Notice"
                            description="View Engagement on Notice"
                            link="/admin/noticeboard/view/engagement"
                            button_text="View"
                        />
                    </div>
                </BodyComponent>
            </div>
        )
    }
}