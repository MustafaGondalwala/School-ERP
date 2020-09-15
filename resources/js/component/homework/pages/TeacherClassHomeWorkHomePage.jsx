import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import ColComponent from "../../utils/ColComponent"

class TeacherClassHomeWorkHomePage extends Component{
    render(){
        const {class_id} = this.props.match.params
        return(
            <div>
                <EmptyHeader mainHeader="HomeWork" header="Home"/>
                <BodyComponent>
                    <ColComponent
                        title="View Current HomeWork"
                        description="View Current HomeWork of Class"
                        link={"/teacher/homework/view-current-homework/"+class_id}
                        button_text="View"
                    />
                    <ColComponent
                        title="View Past HomeWork"
                        description="View Past HomeWork of Class"
                        link={"/teacher/homework/view-past-homework/"+class_id}
                        button_text="View"
                    />
                </BodyComponent>
            </div>
        )
    }
}
export default TeacherClassHomeWorkHomePage