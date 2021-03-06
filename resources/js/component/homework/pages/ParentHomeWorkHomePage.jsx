import React,{Component} from "react"
import ParentHeader from "../header/ParentHeader"
import ColComponent from "../../utils/ColComponent"
import CardComponent from "../../utils/CardComponent"

const ParentHomeWorkHomePage = (props) => {
    const {student_id} = props.match.params
    console.log(student_id)
    return(
            <div>
                <ParentHeader mainHeader="HomeWork" header="Home"/>
                <div className="container-fluid mt--6">
                <div className="row">
                    <ColComponent
                        title="View Home"
                        description="View Current/Past HomeWork"
                        link={`/parent/homework/view/${student_id}`}
                        button_text="Set"
                        />
                    <ColComponent
                        title="View Assignment"
                        description="View Current/Past Assigment"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                    <ColComponent
                        title="View Project"
                        description="View Current/Past Project"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                    <ColComponent
                        title="View Raise Issue"
                        description="View all the Current Rise Issues"
                        link="/admin/fees/set-installments"
                        button_text="Set"
                    />
                </div>
                <div className="card-deck flex-column flex-xl-row">
          <CardComponent title="Report">
            <div className="row card-wrapper">
                        <ColComponent
                        title="View Home Report"
                        description="View/Print HomeWork Report"
                        link={`/parent/homework/view/${student_id}`}
                        button_text="Set"
                        />
                        <ColComponent
                        title="View Assignment Report"
                        description="View/Print Assignment Report"
                        link={`/parent/homework/view/${student_id}`}
                        button_text="Set"
                        />
                        <ColComponent
                        title="View Project Report"
                        description="View/Print Project Report"
                        link={`/parent/homework/view/${student_id}`}
                        button_text="Set"
                        />
            
            </div>
            </CardComponent>
            </div>

            </div>
            </div>
    )
}

export default ParentHomeWorkHomePage