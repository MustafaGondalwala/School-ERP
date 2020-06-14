import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import NoticeBoardHeader from "../../header/parent/NoticeBoardHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
const ParentNoticeBoardHomePage = () => (
    <div>
        <TopBreadCrumb mainHeader="NoticeBoard" header="Home">
            <NoticeBoardHeader />
        </TopBreadCrumb>
        <BodyComponent>
            <CardComponent title="Notice Board">
            </CardComponent>
        </BodyComponent>
    </div>
)
export default ParentNoticeBoardHomePage