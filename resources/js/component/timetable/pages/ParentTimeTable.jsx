import React from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"

const ParentTimeTable = () => (
    <div>
        <EmptyHeader mainHeader="TimeTable" header="View Current TimeTable" /> 
        <BodyComponent>
            <CardComponent title="Current TimeTable">
            </CardComponent>
        </BodyComponent>
    </div>
)

export default ParentTimeTable
