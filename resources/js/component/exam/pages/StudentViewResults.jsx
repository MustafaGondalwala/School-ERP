import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"

const StudentViewResults = () => {
    const userAccount = JSON.parse(localStorage.getItem('userAccount'))
    const student_id = userAccount.info.id
    return(
            <div>
                <EmptyHeader mainHeader="Exam" header="View Results"/>
                <BodyComponent>
                    <div className="row card-wrapper">
                        <ColComponent
                            title="View MonthlyTest"
                            description="View MontlyTest Results"
                            link={"/student/view-result/monthlytest/"+student_id}
                            button_text="View"
                        />
                    </div>
                </BodyComponent>
            </div>
    )
}
export default StudentViewResults;