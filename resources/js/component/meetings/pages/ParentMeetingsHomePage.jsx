import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import MeetingHeader from "../../header/parent/MeetingHeader"
const ParentMeetingsHomePage = () => (
    <div>
        <TopBreadCrumb mainHeader="Meeting" header="Home">
            <MeetingHeader />
        </TopBreadCrumb>
    </div>
)

export default ParentMeetingsHomePage