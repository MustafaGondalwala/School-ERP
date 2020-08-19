import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent";

class ParentLeaveHomePage extends Component{
    render(){
        const {student_id} = this.props.match.params
        return(
            <div>
                <EmptyHeader mainHeader="Leave" header="Home"/>
                <BodyComponent>
                    <ColComponent
                        title="Apply for Leave"
                        description="Apply for Leave for Particular Student"
                        link={"/parent/leave/apply/"+student_id}
                        button_text="Apply"
                    />
                    <ColComponent
                        title="View Leave Status"
                        description="View Leave for Particular Student"
                        link={"/parent/leave/manage/"+student_id}
                        button_text="View"
                    />
                </BodyComponent>
            </div>
        )
    }
}

export default ParentLeaveHomePage