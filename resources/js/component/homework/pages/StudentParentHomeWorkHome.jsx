import React from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import ParentHeader from "../header/ParentHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import EmptyHeader from "../../utils/EmptyHeader"


const StudentParentHomeWorkPage = (props) => {
    const {student_id} = props.match.params
    var user_type = "student"
    if(localStorage.getItem('user_type') == 3)
        user_type = "parent"
    return(
        <div>
            <EmptyHeader mainHeader="Homework" header="Home"/>
            <BodyComponent>
                <div className="row">
                    <ColComponent
                        title="View Current Homework"
                        description="View Current/OnGoing Homework"
                        link={`/${user_type}/homework/current/${student_id}`}
                        button_text="View"
                        />
                    <ColComponent
                        title="View Past Homework"
                        description="View Past Homework"
                        link={`/${user_type}/homework/past/${student_id}`}
                        button_text="View"
                        />
                </div>
            </BodyComponent>
        </div>
    )
}

export default StudentParentHomeWorkPage