import React from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import Row from "../../utils/Row"
import CardComponent from "../../utils/CardComponent"

const ParentEventHomePage = () => (
    <div>
    <EmptyHeader mainHeader="Event" header="Home"/>
        <BodyComponent>
            <CardComponent title="Events">
            </CardComponent>
        </BodyComponent>
    </div>
)

export default ParentEventHomePage