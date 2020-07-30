import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"


class StudentOnlineTestHomePage extends Component{
    render(){
        return(
            <div>
                <EmptyHeader mainHeader="Online Test" header="Home"/>
                <BodyComponent>
                    <ColComponent
                        title="View Online Test"
                        description="View Online Test"
                        link={"/student/online-test/view"}
                        button_text="View"
                    />
                    <ColComponent
                        title="View Past Online Test"
                        description="View Past Online Test"
                        link={"/student/online-test/past"}
                        button_text="View"
                    />
                </BodyComponent>
            </div>
        )
    }
}

export default StudentOnlineTestHomePage