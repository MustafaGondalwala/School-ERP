import React, { Component, Suspense } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
const AddExamType = React.lazy(() => import("../../setting/utils/AddExamType")) 
import BodyComponent from "../../utils/BodyComponent"


class AdminExamType extends Component{
    render(){
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="Exam Type"/>
                <BodyComponent>
                    <Suspense fallback={<h2>Component Loading ...</h2>}>
                        <AddExamType />
                    </Suspense>
                </BodyComponent>
            </div>
        )
    }
}

export default AdminExamType