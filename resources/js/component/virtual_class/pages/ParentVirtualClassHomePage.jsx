import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import VirtualClassHeader from "../../header/parent/VirtualClassHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import Row from "../../utils/Row"

const ParentVirtualClassHomePage = () => (
    <div>
        <TopBreadCrumb mainHeader="Virtual Class" header="Home">
            <VirtualClassHeader />
        </TopBreadCrumb>
        <BodyComponent>
            <Row>
                <ColComponent
                    title="View Today's Classes"
                    description="View Todays Classes"
                    link="/parent/virtual_class/today_classes"
                    button_text="View"
                />
                <ColComponent
                    title="View Past Classes"
                    description="View Past Classes"
                    link="/parent/virtual_class/past_classes"
                    button_text="View"
                />
            </Row>
        </BodyComponent>
    </div>
)
export default ParentVirtualClassHomePage