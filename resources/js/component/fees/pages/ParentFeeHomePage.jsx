import React,{Component} from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent";


class ParentFeeHomePage extends Component{
    render(){
        const {student_id} = this.props.match.params
        return(
            <div>
                <EmptyHeader mainHeader="Fee" header="Home"/>
                <BodyComponent>
                    <ColComponent
                        title="View Fees"
                        description="Check Total Fees"
                        link={"/parent/fees/total-fees/"+student_id}
                        button_text="View"
                    />
                    <ColComponent
                        title="View/Print Receipt"
                        description="View/Print The Fees Receipt for Student"
                        link={"/parent/fees/view-receipt/"+student_id}
                        button_text="View"
                    />
                    <ColComponent
                        title="Pending Fees"
                        description="Check Total Pending Fees"
                        link={"/parent/fees/pending-fees/"+student_id}
                        button_text="View"
                    />
                </BodyComponent>
            </div>
        )
    }
}

export default ParentFeeHomePage